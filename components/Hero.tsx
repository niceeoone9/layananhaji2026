import React from 'react';
import { ArrowRight, MessageSquareText, Mic } from 'lucide-react';

interface HeroProps {
  onOpenChat: () => void;
  onOpenVoice: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenChat, onOpenVoice }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black-900">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://mediaim.expedia.com/destination/1/574dfc983d34cf0ca1ffb20a45aca0de.jpg" 
          alt="Suasana Masjidil Haram" 
          className="w-full h-full object-cover opacity-70"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black-900 via-black-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-black-900/30"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center md:text-left mt-20">
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-1 border border-gold-500 rounded-full mb-6 bg-black-900/60 backdrop-blur-sm">
            <span className="text-gold-500 uppercase text-xs font-bold tracking-widest">Pelunasan Haji 2026 Sudah Dimulai</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Layanan Haji Kota Gorontalo <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              Tahun 2026
            </span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl drop-shadow-md">
            Pusat informasi dan layanan resmi Haji Kota Gorontalo. Dapatkan kemudahan akses data jemaah, regulasi terbaru, dan bimbingan manasik profesional.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#data-jemaah" className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-black-900 font-bold rounded-lg transition-all flex items-center justify-center gap-2 group shadow-lg hover:shadow-gold-500/20">
              Cek Data Jemaah
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="flex gap-4">
              <button 
                onClick={onOpenChat}
                className="flex-1 sm:flex-none px-6 py-4 border border-white/40 hover:border-gold-500 hover:bg-gold-500/20 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <MessageSquareText size={20} className="text-gold-500" />
                Chat AI
              </button>
              
              <button 
                onClick={onOpenVoice}
                className="flex-1 sm:flex-none px-6 py-4 border border-white/40 hover:border-gold-500 hover:bg-gold-500/20 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <Mic size={20} className="text-gold-500" />
                Live AI
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;