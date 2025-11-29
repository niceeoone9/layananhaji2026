import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { FULL_SYSTEM_INSTRUCTION } from "../constants";

// Audio Contexts and Nodes
let inputAudioContext: AudioContext | null = null;
let outputAudioContext: AudioContext | null = null;
let outputNode: GainNode | null = null;
const sources = new Set<AudioBufferSourceNode>();
let nextStartTime = 0;
let sessionPromise: Promise<any> | null = null;
let activeStream: MediaStream | null = null;

// Helper: Create Blob for PCM
function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = Math.max(-1, Math.min(1, data[i])) * 32767; // Clamp and scale
  }
  
  let binary = '';
  const bytes = new Uint8Array(int16.buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64Data = btoa(binary);

  return {
    data: base64Data,
    mimeType: 'audio/pcm;rate=16000',
  };
}

// Helper: Decode Audio
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const startLiveSession = async (
  onConnect: () => void,
  onDisconnect: () => void,
  onError: (err: any) => void
) => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const ai = new GoogleGenAI({ apiKey });

    // Initialize Audio Contexts safely
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) throw new Error("AudioContext not supported");

    inputAudioContext = new AudioContextClass({ sampleRate: 16000 });
    outputAudioContext = new AudioContextClass({ sampleRate: 24000 });
    outputNode = outputAudioContext.createGain();
    outputNode.connect(outputAudioContext.destination);

    activeStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    sessionPromise = ai.live.connect({
      model: 'gemini-1.5-pro',
      callbacks: {
        onopen: () => {
          onConnect();
          if (!inputAudioContext || !activeStream) return;

          const source = inputAudioContext.createMediaStreamSource(activeStream);
          const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
          
          scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
             const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
             const pcmBlob = createBlob(inputData);
             
             if(sessionPromise) {
                 sessionPromise.then((session) => {
                    session.sendRealtimeInput({ media: pcmBlob });
                 }).catch(err => {
                   // Suppress errors if session is closing or network failed momentarily
                   console.warn("Failed to send audio chunk", err);
                 });
             }
          };

          source.connect(scriptProcessor);
          scriptProcessor.connect(inputAudioContext.destination);
        },
        onmessage: async (message: LiveServerMessage) => {
          const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (base64Audio && outputAudioContext && outputNode) {
             nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
             
             try {
               const audioBuffer = await decodeAudioData(
                  decode(base64Audio),
                  outputAudioContext,
                  24000,
                  1
               );

               const source = outputAudioContext.createBufferSource();
               source.buffer = audioBuffer;
               source.connect(outputNode);
               source.addEventListener('ended', () => {
                  sources.delete(source);
               });
               source.start(nextStartTime);
               nextStartTime += audioBuffer.duration;
               sources.add(source);
             } catch (e) {
               console.error("Audio decode error", e);
             }
          }

           const interrupted = message.serverContent?.interrupted;
           if (interrupted) {
               for (const src of sources) {
                   try { src.stop(); } catch (e) { /* ignore */ }
                   sources.delete(src);
               }
               nextStartTime = 0;
           }
        },
        onclose: () => {
          onDisconnect();
        },
        onerror: (err) => {
          onError(err);
        }
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
        systemInstruction: FULL_SYSTEM_INSTRUCTION + " Jawablah dengan ringkas dan jelas karena ini adalah percakapan suara.",
      },
    });
    
    // Catch initial connection errors
    await sessionPromise.catch(err => {
       onError(err);
       throw err;
    });

  } catch (error) {
    onError(error);
  }
};

export const stopLiveSession = async () => {
  if (sessionPromise) {
    try {
      const session = await sessionPromise;
      session.close(); 
    } catch (e) {
      console.warn("Error closing session", e);
    }
  }

  // Stop Audio Contexts
  try {
    if (inputAudioContext && inputAudioContext.state !== 'closed') await inputAudioContext.close();
    if (outputAudioContext && outputAudioContext.state !== 'closed') await outputAudioContext.close();
  } catch (e) {
    console.warn("Error closing audio contexts", e);
  }
  
  // Stop Mic
  if (activeStream) {
    activeStream.getTracks().forEach(track => track.stop());
  }

  // Reset vars
  inputAudioContext = null;
  outputAudioContext = null;
  outputNode = null;
  sessionPromise = null;
  activeStream = null;
  sources.clear();
  nextStartTime = 0;
};