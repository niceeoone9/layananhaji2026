import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <footer id="kontak" className="bg-black-900 text-white pt-24 pb-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
             <div className="flex items-center gap-3 mb-6">
               <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/0/08/Lambang_Kementerian_Haji_dan_Umrah_Republik_Indonesia_%282025%29.svg" 
                 alt="Logo Kementerian Haji dan Umrah" 
                 className="w-14 h-14 object-contain" 
               />
               <div className="text-white">
                 <h1 className="font-bold text-lg leading-tight">Haji Kota Gorontalo</h1>
                 <p className="text-gold-500 text-xs tracking-wider">Layanan 2026</p>
               </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Melayani jemaah haji Kota Gorontalo dengan sepenuh hati, amanah, dan profesional demi mencapai haji yang mabrur.
            </p>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-6 text-gold-500">Kantor Pelayanan</h4>
            <div className="flex items-start gap-4 mb-4">
              <MapPin className="text-gold-500 shrink-0 mt-1" size={20} />
              <div>
                <p className="font-medium text-white">PLHUT Kota Gorontalo</p>
                <p className="text-gray-400 text-sm">{CONTACT_INFO.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-gold-500 shrink-0" size={20} />
              <div>
                 <p className="text-xl font-bold text-white">{CONTACT_INFO.phone}</p>
                 <p className="text-gray-500 text-xs">Layanan Informasi & WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold-500">Ikuti Kami</h4>
            <div className="flex gap-4">
              {CONTACT_INFO.socials.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gold-500 hover:text-black-900 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Layanan Haji & Umrah Kota Gorontalo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;