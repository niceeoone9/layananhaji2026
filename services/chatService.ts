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
  } catch (error) {
    console.error("Chat Error:", error);
    return "Terjadi kesalahan pada sistem AI. Silakan coba lagi nanti.";
  }
};