import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { FULL_SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key not found");
  return new GoogleGenAI({ apiKey });
};

export const initChat = async () => {
  if (chatSession) return chatSession;
  
  const ai = getClient();
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: FULL_SYSTEM_INSTRUCTION,
    },
  });
  return chatSession;
};

export const resetChat = () => {
  chatSession = null;
};

export const sendMessage = async (message: string): Promise<string> => {
  if (!chatSession) await initChat();
  if (!chatSession) throw new Error("Failed to initialize chat");

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";
  } catch (error: any) {
    console.error("Chat Error:", error);
    
    // Handle rate limit error
    if (error?.message?.includes('429') || error?.message?.includes('quota') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
      return "Maaf, sistem sedang sibuk karena banyak permintaan. Mohon tunggu 1-2 menit lalu coba lagi. Terima kasih atas kesabarannya.";
    }
    
    return "Terjadi kesalahan pada sistem AI. Silakan coba lagi nanti.";
  }
};