import React, { useState } from 'react';
import { Users, ChevronRight, ExternalLink, Award, ClipboardList, Database, CalendarClock, FileX, CreditCard, HeartPulse, Briefcase } from 'lucide-react';
import DataModal from './DataModal';

export const DataJemaah: React.FC = () => {
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);

  return (
    <section id="data-jemaah" className="py-24 bg-white scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-gold-600 font-bold tracking-wider uppercase mb-2">Informasi Keberangkatan</h2>
          <h3 className="text-4xl font-bold text-black-900">Kategori Jemaah Haji 2026</h3>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Klik pada kartu kategori di bawah atau tombol detail untuk melihat tabel lengkap data jemaah yang terupdate secara berkala.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {[
            { icon: Users, title: "Jemaah Urut Porsi", value: "Kuota Reguler", desc: "Jemaah yang berhak melunasi Bipih berdasarkan urutan nomor porsi pendaftaran di Kota Gorontalo." },
            { icon: Award, title: "Prioritas Lansia", value: "Kuota Prioritas", desc: "Jemaah lanjut usia yang mendapatkan prioritas keberangkatan tahun 2026 sesuai regulasi." },
            { icon: ClipboardList, title: "Jemaah Cadangan", value: "Kuota Pengganti", desc: "Jemaah yang disiapkan untuk mengisi kekosongan kuota apabila terdapat jemaah reguler yang menunda." },
          ].map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => setIsDataModalOpen(true)}
              className="p-8 border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-white group cursor-pointer hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="text-gold-500" size={20} />
              </div>
              <div className="w-14 h-14 bg-gold-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors">
                <item.icon className="text-gold-600 group-hover:text-white transition-colors" size={28} />
              </div>
              <h4 className="text-xl font-bold text-black-800 mb-2">{item.title}</h4>
              <p className="text-2xl font-bold text-gold-600 mb-2">{item.value}</p>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Database Button */}
        <div className="flex justify-center mb-12">
           <button 
             onClick={() => setIsDataModalOpen(true)}
             className="flex items-center gap-2 px-8 py-3 bg-black-900 text-white rounded-full font-bold hover:bg-gold-500 hover:text-black-900 transition-all shadow-lg transform hover:scale-105"
           >
             <Database size={20} />
             Lihat Database Lengkap
           </button>
        </div>

        {/* External Links Section */}
        <div className="max-w-4xl mx-auto border-t border-gray-100 pt-10">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Layanan Cepat BPKH & Kemenag RI</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a 
              href="https://haji.go.id/estimasi-keberangkatan?tab=estimasi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-blue-100 hover:border-blue-500 hover:bg-blue-50 transition-all group text-center h-full"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <CalendarClock size={20} />
              </div>
              <span className="text-sm font-bold text-gray-700 group-hover:text-blue-700">Estimasi Keberangkatan</span>
            </a>

            <a 
              href="https://haji.go.id/estimasi-keberangkatan?tab=pembatalan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-red-100 hover:border-red-500 hover:bg-red-50 transition-all group text-center h-full"
            >
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FileX size={20} />
              </div>
              <span className="text-sm font-bold text-gray-700 group-hover:text-red-700">Pembatalan</span>
            </a>

            <a 
              href="https://haji.go.id/estimasi-keberangkatan?tab=pelunasan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-green-100 hover:border-green-500 hover:bg-green-50 transition-all group text-center h-full"
            >
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <CreditCard size={20} />
              </div>
              <span className="text-sm font-bold text-gray-700 group-hover:text-green-700">Pelunasan</span>
            </a>

            <a 
              href="https://haji.go.id/estimasi-keberangkatan?tab=istitaah" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-purple-100 hover:border-purple-500 hover:bg-purple-50 transition-all group text-center h-full"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <HeartPulse size={20} />
              </div>
              <span className="text-sm font-bold text-gray-700 group-hover:text-purple-700">Istithaah</span>
            </a>
          </div>
          
          <p className="text-center text-[10px] text-gray-400 mt-4 italic">
            Sumber Data: Website Resmi <span className="font-semibold text-gray-600">haji.go.id</span>
          </p>
        </div>

        <DataModal 
          isOpen={isDataModalOpen} 
          onClose={() => setIsDataModalOpen(false)} 
        />
      </div>
    </section>
  );
};

export const Regulasi: React.FC = () => (
  <section id="regulasi" className="py-24 bg-black-900 text-white relative overflow-hidden">
    {/* Increased opacity from 5 to 10 for better visibility */}
    <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-500/10 skew-x-12"></div>
    
    <div className="container mx-auto px-6 relative z-10">
       <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
             <h2 className="text-gold-500 font-bold tracking-wider uppercase mb-2">Regulasi Terbaru</h2>
             <h3 className="text-4xl font-bold mb-6">Syarat & Ketentuan Haji 2026</h3>
             <p className="text-gray-400 mb-8 leading-relaxed">
               Pemerintah melalui Kementerian Agama telah menetapkan regulasi terbaru untuk menjamin kenyamanan dan keamanan jemaah. Pastikan Anda memenuhi syarat istitha'ah kesehatan dan pelunasan Bipih.
             </p>
             <ul className="space-y-4">
               {[
                 "Usia minimal 13 tahun saat mendaftar haji.",
                 "Memiliki kemampuan kesehatan (Istitha'ah) fisik dan mental.",
                 "Belum pernah berhaji dalam 18 tahun terakhir.",
                 "Melunasi Biaya Perjalanan Ibadah Haji (Bipih) tepat waktu."
               ].map((rule, i) => (
                 <li key={i} className="flex items-start gap-3">
                   <div className="mt-1 min-w-[20px]"><div className="w-2 h-2 bg-gold-500 rounded-full"></div></div>
                   <span className="text-gray-300">{rule}</span>
                 </li>
               ))}
             </ul>
             <button className="mt-8 text-gold-500 flex items-center gap-2 hover:gap-4 transition-all font-medium">
               Unduh Dokumen Lengkap <ChevronRight size={18} />
             </button>
          </div>
          <div className="md:w-1/2 relative">
             <div className="absolute -inset-4 bg-gold-500/20 rounded-2xl blur-lg"></div>
             <img 
               src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=2070&auto=format&fit=crop" 
               alt="Regulasi Haji dan Dokumen" 
               className="rounded-2xl shadow-2xl relative z-10 border border-gray-800 w-full h-auto object-cover"
             />
          </div>
       </div>
    </div>
  </section>
);

export const Rekrutmen: React.FC = () => {
  return (
  <section id="rekrutmen" className="py-24 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-gold-600 font-bold tracking-wider uppercase mb-2">Bergabung Bersama Kami</h2>
        <h3 className="text-4xl font-bold text-black-900 mb-8">Rekrutmen Petugas Haji</h3>
        
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="text-gold-600" size={36} />
          </div>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Pendaftaran dan seleksi Petugas Penyelenggara Ibadah Haji (PPIH) Kloter maupun Arab Saudi dilakukan secara terpusat dan online. Untuk informasi lengkap mengenai persyaratan, jadwal, dan tata cara pendaftaran, silakan kunjungi portal resmi rekrutmen Kementerian Agama RI.
          </p>
          
          <a 
            href="https://petugas.haji.go.id" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black-900 text-white font-bold rounded-full hover:bg-gold-500 hover:text-black-900 transition-all transform hover:scale-105 shadow-lg group"
          >
            Kunjungi Portal Pendaftaran
            <ExternalLink size={20} className="group-hover:rotate-45 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  </section>
)};