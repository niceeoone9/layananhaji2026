import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Height of navbar + padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black-900/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
           <img 
             src="https://upload.wikimedia.org/wikipedia/commons/0/08/Lambang_Kementerian_Haji_dan_Umrah_Republik_Indonesia_%282025%29.svg" 
             alt="Logo Kementerian Haji dan Umrah" 
             className="w-14 h-14 object-contain drop-shadow-md" 
           />
           <div className="text-white">
             <h1 className="font-bold text-lg leading-tight">Haji Kota Gorontalo</h1>
             <p className="text-gold-500 text-xs tracking-wider">Layanan 2026</p>
           </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-white hover:text-gold-500 transition-colors font-medium text-sm"
            >
              {item.label}
            </a>
          ))}
          <button onClick={(e) => { e.preventDefault(); const el = document.querySelector('#data-jemaah'); if(el) el.scrollIntoView({behavior: 'smooth', block: 'start'}); }} className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-black-900 font-bold rounded-full transition-all transform hover:scale-105">
            Cek Porsi
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black-800 border-t border-white/10 p-6 flex flex-col gap-4 shadow-xl">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-white hover:text-gold-500 text-lg font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;