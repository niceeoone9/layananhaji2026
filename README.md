# Layanan Haji Kota Gorontalo 2026

Aplikasi web informasi dan layanan untuk calon jemaah haji Kota Gorontalo tahun 1447H/2026M yang dilengkapi dengan AI Assistant berbasis Google Gemini.

## Fitur Utama

- 📋 **Informasi Data Jemaah** - Akses data dan statistik jemaah haji Kota Gorontalo
- 📜 **Regulasi & Ketentuan** - Informasi lengkap UU, Peraturan Menteri, dan Surat Edaran terkini
- 👥 **Rekrutmen PPIH** - Informasi rekrutmen Petugas Penyelenggara Ibadah Haji
- 🤖 **AI Chat Assistant** - Asisten virtual cerdas untuk menjawab pertanyaan seputar haji
- 🎤 **Voice Assistant** - Fitur voice chat real-time dengan AI menggunakan Gemini Live API
- 📱 **Responsive Design** - Tampilan optimal di berbagai perangkat

## Teknologi

- **React 19** - Library UI modern
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool dan dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Google Gemini AI** - Large Language Model untuk chat dan voice assistant
- **Lucide React** - Icon library

## Prasyarat

- Node.js (versi 16 atau lebih tinggi)
- NPM atau Yarn
- Google Gemini API Key

## Instalasi

1. Clone repository:
```bash
git clone <repository-url>
cd layananhaji2026
```

2. Install dependencies:
```bash
npm install
```

3. Setup API Key:
   - Buat file `.env.local` di root project
   - Dapatkan API key dari [Google AI Studio](https://ai.google.dev/gemini-api/docs/api-key)
   - Tambahkan API key ke file `.env.local`:
```env
GEMINI_API_KEY=your_api_key_here
```

4. Jalankan development server:
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Build untuk Production

```bash
npm run build
```

File build akan tersedia di folder `dist/`

## Preview Production Build

```bash
npm run preview
```

## Struktur Proyek

```
layananhaji2026/
├── components/          # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Contact.tsx
│   ├── ChatModal.tsx
│   ├── VoiceModal.tsx
│   └── AIFloatingButton.tsx
├── services/           # API services
│   ├── chatService.ts  # Text chat dengan Gemini
│   └── liveService.ts  # Voice chat dengan Gemini Live
├── knowledgebase/      # Data pengetahuan regulasi haji
│   └── pengetahuan.json
├── constants.ts        # Konstanta dan system instruction AI
├── types.ts           # TypeScript type definitions
├── App.tsx            # Root component
├── index.tsx          # Entry point
└── vite.config.ts     # Vite configuration
```

## Fitur AI Assistant

### Chat Assistant
- Powered by Gemini 2.5 Flash
- Knowledge base khusus regulasi haji Indonesia
- Context-aware conversations
- Informasi akurat berdasarkan UU dan Peraturan terkini

### Voice Assistant
- Real-time voice conversation
- Gemini 2.5 Flash dengan Native Audio
- Natural voice interaction menggunakan voice preset "Kore"
- Audio processing dengan Web Audio API

## Basis Pengetahuan

AI Assistant dilengkapi dengan dokumen resmi:
- UU Nomor 14 Tahun 2025
- Perpres Nomor 92 Tahun 2025
- Peraturan Menteri Haji dan Umrah
- Surat Edaran Dirjen Pelayanan Haji
- Petunjuk Teknis Pengisian Kuota Haji

## Kontak

**Kantor Kementerian Haji dan Umrah Kota Gorontalo**
- Alamat: PLHUT Kota Gorontalo, Jl. Arif Rahman Hakim 22, Kota Gorontalo
- Telepon/WA: +62 811-4330-2000
- Kepala Kantor: Bapak Abdul Qohar Salilama

## Keamanan

⚠️ **PENTING**: Jangan commit file `.env.local` ke repository. File ini sudah ditambahkan ke `.gitignore` untuk melindungi API key Anda.

## Lisensi

© 2025 Kementerian Haji dan Umrah Kota Gorontalo

## Kontribusi

Proyek ini dikembangkan untuk melayani calon jemaah haji Kota Gorontalo. Untuk pertanyaan atau saran, silakan hubungi kantor kami.
