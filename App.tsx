import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { DataJemaah, Regulasi, Rekrutmen } from './components/Features';
import Contact from './components/Contact';
import AIFloatingButton from './components/AIFloatingButton';
import ChatModal from './components/ChatModal';
import VoiceModal from './components/VoiceModal';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  return (
    <div className="font-sans antialiased text-gray-900 bg-white">
      <Navbar />
      
      <main>
        <Hero 
          onOpenChat={() => setIsChatOpen(true)}
          onOpenVoice={() => setIsVoiceOpen(true)}
        />
        <DataJemaah />
        <Regulasi />
        <Rekrutmen />
      </main>

      <Contact />

      <AIFloatingButton 
        onOpenChat={() => setIsChatOpen(true)}
        onOpenVoice={() => setIsVoiceOpen(true)}
      />

      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      <VoiceModal 
        isOpen={isVoiceOpen} 
        onClose={() => setIsVoiceOpen(false)} 
      />
    </div>
  );
};

export default App;