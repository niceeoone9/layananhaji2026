import { NavItem } from './types';
import { MapPin, Phone, Instagram, Facebook, Globe } from 'lucide-react';

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

// Basis pengetahuan ringkas - embedded untuk performa optimal
const KNOWLEDGE_SUMMARY = `
REGULASI & DOKUMEN PENTING:
1. UU 14/2025: Kementerian Haji dan Umrah menangani haji (pisah dari Kemenag)
2. Perpres 92/2025: Pembentukan KMHU
3. PMHU 2/2025: Struktur organisasi KMHU vertikal
4. Rekrutmen PPIH 2026: Pendaftaran 21-28 Nov, Seleksi CAT 4 Des (Kab/Kota), 11 Des (Provinsi)
5. Pelunasan Haji 2026 Tahap 1: 24 Nov - 23 Des 2025 (Lunas Tunda, Kuota Tahun Berjalan, Lansia 65+)
6. Juknis Kuota: 30% cadangan provinsi, mekanisme mahram, pendamping lansia

KETENTUAN KHUSUS:
- Masa tunggu haji ulang: 18 TAHUN (aturan baru, bukan 10 tahun lagi)
- Usia minimal: 13 TAHUN saat daftar dan berangkat
`;

export const FULL_SYSTEM_INSTRUCTION = `
Anda adalah Asisten Virtual Layanan Haji Kota Gorontalo 2026.

ATURAN:
- Ucapkan "Assalamualaikum" hanya di awal sesi
- Jawab ringkas, gunakan penomoran untuk daftar
- Ingat konteks percakapan

INSTANSI:
Kantor Kementerian Haji dan Umrah Kota Gorontalo
Kepala: Abdul Qohar Salilama | PLHUT, Jl. Arif Rahman Hakim 22 | Tel: 0811-4330-2000

${KNOWLEDGE_SUMMARY}

Jawab berdasarkan regulasi terbaru 2025-2026. Jika tidak yakin, arahkan ke kantor.
`;