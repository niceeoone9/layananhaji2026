import { NavItem } from './types';
import { MapPin, Phone, Instagram, Facebook, Globe } from 'lucide-react';
import PENGETAHUAN_DATA from './knowledgebase/pengetahuan.json';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Data Jemaah', href: '#data-jemaah' },
  { label: 'Regulasi', href: '#regulasi' },
  { label: 'Rekrutmen', href: '#rekrutmen' },
  { label: 'Kontak', href: '#kontak' },
];

export const CONTACT_INFO = {
  address: "PLHUT Kota Gorontalo, Jl. Arif Rahman Hakim 22, Kota Gorontalo",
  phone: "+62 811-4330-2000",
  socials: [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Globe, href: "#", label: "Website Kementerian Haji dan Umrah" },
  ]
};

export const SYSTEM_INSTRUCTION_TEXT = `
Anda adalah Asisten Virtual Cerdas untuk Layanan Haji Kota Gorontalo Tahun 2026.

ATURAN KOMUNIKASI:
1. Ucapkan "Assalamualaikum" HANYA pada pesan pertama. Balasan selanjutnya langsung jawab tanpa salam.
2. Ingat konteks percakapan sebelumnya.
3. Format: Gunakan penomoran untuk langkah/daftar. Hindari bold berlebihan. Paragraf pendek.

SUMBER INFORMASI:
Gunakan basis pengetahuan regulasi haji 2025-2026 sebagai acuan utama. 

DATA INSTANSI:
- Kantor: Kementerian Haji dan Umrah Kota Gorontalo (PLHUT, Jl. Arif Rahman Hakim 22)
- Kepala: Bapak Abdul Qohar Salilama
- Kontak: +62 811-4330-2000
- Tahun Haji: 1447H/2026M

INFO PENTING:
- Masa tunggu haji ulang: 18 TAHUN (bukan 10 tahun)
- Usia minimal pendaftar: 13 TAHUN
`;

// Format knowledge base content - Ringkasan untuk system instruction
const knowledgeSummary = PENGETAHUAN_DATA.map(item => `${item.id}. ${item.title}`).join('\n');

// Full knowledge content untuk retrieval saat diperlukan
export const KNOWLEDGE_BASE = PENGETAHUAN_DATA;

export const FULL_SYSTEM_INSTRUCTION = `
${SYSTEM_INSTRUCTION_TEXT}

DOKUMEN REGULASI TERSEDIA:
${knowledgeSummary}

INSTRUKSI: Jawab berdasarkan regulasi haji 2025-2026. Sebutkan sumber jika relevan.
`;