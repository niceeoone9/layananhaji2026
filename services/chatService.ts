import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { FULL_SYSTEM_INSTRUCTION, KNOWLEDGE_BASE } from "../constants";

let chatSession: Chat | null = null;

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key not found");
  return new GoogleGenAI({ apiKey });
};

// Simple keyword search untuk menemukan dokumen relevan
const findRelevantKnowledge = (message: string): string => {
  const keywords = message.toLowerCase();
  const relevantDocs = KNOWLEDGE_BASE.filter(doc => {
    const searchText = (doc.title + ' ' + doc.content).toLowerCase();
    return keywords.split(' ').some(word => word.length > 3 && searchText.includes(word));
  });

  if (relevantDocs.length === 0) return '';
  
  return '\n\nKONTEKS RELEVAN:\n' + relevantDocs.slice(0, 2).map(doc => 
    `[${doc.title}]\n${doc.content.substring(0, 500)}...`
  ).join('\n\n');
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
    // Tambahkan konteks relevan dari knowledge base
    const context = findRelevantKnowledge(message);
    const enhancedMessage = message + context;
    
    const response: GenerateContentResponse = await chatSession.sendMessage({ message: enhancedMessage });
    return response.text || "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";
  } catch (error: any) {
    console.error("Chat Error:", error);
    
    // Handle rate limit error specifically
    if (error?.message?.includes('429') || error?.message?.includes('quota')) {
      return "Maaf, sistem sedang sibuk. Mohon tunggu sebentar (30-60 detik) lalu coba lagi. Jika masih error, silakan hubungi administrator untuk upgrade API quota.";
    }
    
    return "Terjadi kesalahan pada sistem AI. Silakan coba lagi nanti.";
  }
};