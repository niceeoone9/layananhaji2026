import React, { useState } from 'react';
import { MessageSquareText, Mic, Sparkles, X } from 'lucide-react';

interface AIFloatingButtonProps {
  onOpenChat: () => void;
  onOpenVoice: () => void;
}

const AIFloatingButton: React.FC<AIFloatingButtonProps> = ({ onOpenChat, onOpenVoice }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col gap-3 animate-fade-in-up">
          <button 
            onClick={() => { onOpenVoice(); setIsOpen(false); }}
            className="flex items-center gap-3 pr-4 pl-3 py-2 bg-white text-black-900 rounded-full shadow-lg border border-gold-500/30 hover:bg-gold-50 transition-all transform hover:scale-105 group"
          >
            <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute right-14 whitespace-nowrap bg-black-900 text-white px-2 py-1 rounded text-xs">Suara Langsung</span>
            <div className="w-10 h-10 bg-black-900 rounded-full flex items-center justify-center text-gold-500">
               <Mic size={20} />
            </div>
          </button>

          <button 
            onClick={() => { onOpenChat(); setIsOpen(false); }}
            className="flex items-center gap-3 pr-4 pl-3 py-2 bg-white text-black-900 rounded-full shadow-lg border border-gold-500/30 hover:bg-gold-50 transition-all transform hover:scale-105 group"
          >
            <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute right-14 whitespace-nowrap bg-black-900 text-white px-2 py-1 rounded text-xs">Chat Text</span>
            <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center text-black-900">
               <MessageSquareText size={20} />
            </div>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-gray-800 text-white rotate-45' : 'bg-gradient-to-r from-gold-500 to-gold-600 text-black-900 hover:scale-110'
        }`}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </button>
    </div>
  );
};

export default AIFloatingButton;