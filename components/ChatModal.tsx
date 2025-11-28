import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2, MessageSquare } from 'lucide-react';
import { sendMessage, resetChat } from '../services/chatService';
import { Message } from '../types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  // Initial message is static, but chat history in AI service needs to be reset on new session
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Assalamualaikum, ada yang bisa saya bantu mengenai informasi haji di Kota Gorontalo?', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      // Reset AI session backend to ensure clean history for new UI session
      resetChat();
      
      // Reset UI messages to default greeting
      setMessages([
        { id: '1', role: 'model', text: 'Assalamualaikum, ada yang bisa saya bantu mengenai informasi haji di Kota Gorontalo?', timestamp: new Date() }
      ]);

      // Prevent body scroll when modal is open on mobile
      document.body.style.overflow = 'hidden';
      setTimeout(scrollToBottom, 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendMessage(userMsg.text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      // Error handled in service
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (text: string) => {
    // Simple parser to handle bold text **text** and render it
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
      <span className="whitespace-pre-wrap">
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 bg-black-900/60 backdrop-blur-sm transition-opacity">
      {/* Modal Container: Full screen on mobile, fixed size on desktop */}
      <div className="bg-white w-full h-[100dvh] sm:h-[600px] sm:max-w-md sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gold-500/20 transition-all animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:fade-in duration-300">
        
        {/* Header */}
        <div className="bg-black-900 p-4 flex justify-between items-center text-white border-b border-gold-600 shrink-0 relative shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center shadow-lg border-2 border-black-800">
              <Bot size={20} className="text-black-900" />
            </div>
            <div>
              <h3 className="font-bold text-base">Asisten Haji Pintar</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-gold-500 text-xs font-medium">Online • Layanan 24 Jam</p>
              </div>
            </div>
          </div>
          
          {/* Tombol Close */}
          <button 
            onClick={onClose} 
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500"
            aria-label="Tutup Chat"
          >
            <X size={28} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4 scroll-smooth">
          {/* Date/Info Separator */}
          <div className="flex justify-center my-2">
            <span className="text-[10px] text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider font-medium">
              Hari Ini
            </span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] sm:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                
                {/* Avatar (only for bot) */}
                {msg.role === 'model' && (
                  <div className="w-6 h-6 rounded-full bg-black-900 flex items-center justify-center shrink-0 mb-1">
                    <Bot size={12} className="text-gold-500" />
                  </div>
                )}

                {/* Bubble */}
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-gold-500 text-black-900 rounded-br-sm' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
                }`}>
                  {msg.role === 'model' ? renderMessage(msg.text) : msg.text}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
             <div className="flex justify-start w-full">
               <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-black-900 flex items-center justify-center shrink-0 mb-1">
                    <Bot size={12} className="text-gold-500" />
                  </div>
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce"></span>
                  </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 sm:p-4 bg-white border-t border-gray-100 shrink-0 pb-safe">
          <div className="flex gap-2 items-end bg-gray-50 p-1.5 rounded-[24px] border border-gray-200 focus-within:border-gold-500 focus-within:ring-1 focus-within:ring-gold-500/30 transition-all">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ketik pertanyaan..."
              className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-sm min-h-[44px] max-h-32"
            />
            <button 
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              className="w-11 h-11 bg-black-900 text-gold-500 rounded-full flex items-center justify-center hover:bg-black-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 shrink-0 mb-[1px]"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="ml-0.5" />}
            </button>
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-2">
            AI dapat membuat kesalahan. Mohon verifikasi informasi penting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;