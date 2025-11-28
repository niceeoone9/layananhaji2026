# Panduan Deploy ke Cloudflare Pages

Dokumen ini menjelaskan langkah-langkah untuk deploy aplikasi Layanan Haji Kota Gorontalo 2026 ke Cloudflare Pages.

## Prasyarat

- Akun Cloudflare (gratis) - [Daftar di sini](https://dash.cloudflare.com/sign-up)
- Repository GitHub sudah tersedia (✅ https://github.com/niceeoone9/layananhaji2026)
- Gemini API Key

---

## Langkah 1: Akses Cloudflare Pages

1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Pilih **Workers & Pages** di sidebar kiri
3. Klik tombol **Create Application**
4. Pilih tab **Pages**
5. Klik **Connect to Git**

---

## Langkah 2: Koneksi ke GitHub

1. Pilih **GitHub** sebagai Git provider
2. Jika belum terkoneksi, klik **Connect GitHub** dan authorize Cloudflare
3. Setelah terkoneksi, pilih repository: **niceeoone9/layananhaji2026**
4. Klik **Begin setup**

---

## Langkah 3: Konfigurasi Build

Pada halaman setup, isi konfigurasi berikut:

### Build Settings:
- **Project name**: `layananhaji2026` (atau nama yang Anda inginkan)
- **Production branch**: `main`
- **Framework preset**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`

### Environment Variables:
Klik **Add variable** dan tambahkan:

| Variable Name | Value |
|--------------|-------|
| `GEMINI_API_KEY` | `your_gemini_api_key_here` |
| `NODE_VERSION` | `18` |

⚠️ **PENTING**: Pastikan variable name adalah `GEMINI_API_KEY` (sama persis dengan yang di .env.local)

---

## Langkah 4: Deploy

1. Klik tombol **Save and Deploy**
2. Cloudflare akan mulai build dan deploy aplikasi Anda
3. Proses build biasanya memakan waktu 2-5 menit
4. Setelah selesai, Anda akan mendapatkan URL deployment seperti:
   - `https://layananhaji2026.pages.dev` (atau dengan project name yang Anda pilih)

---

## Langkah 5: Verifikasi Deployment

1. Buka URL yang diberikan Cloudflare
2. Test fitur-fitur aplikasi:
   - ✅ Navigasi antar section
   - ✅ Chat AI Assistant (pastikan API key bekerja)
   - ✅ Voice Assistant (pastikan microphone permission diberikan)
   - ✅ Favicon muncul di browser tab

---

## Auto-Deploy (Otomatis)

Setelah setup awal, setiap kali Anda push ke branch `main`:
1. Cloudflare Pages akan otomatis detect perubahan
2. Build ulang aplikasi secara otomatis
3. Deploy versi terbaru

---

## Konfigurasi Custom Domain (Opsional)

Jika ingin menggunakan domain sendiri (misal: haji.gorontalokota.go.id):

1. Di Cloudflare Pages dashboard, pilih project Anda
2. Klik tab **Custom domains**
3. Klik **Set up a custom domain**
4. Masukkan domain Anda dan ikuti instruksi DNS setup

---

## Troubleshooting

### Build Gagal
- Periksa logs di Cloudflare dashboard
- Pastikan semua dependencies ada di package.json
- Pastikan NODE_VERSION sudah diset

### API Key Tidak Bekerja
- Periksa Environment Variables di Cloudflare
- Pastikan variable name adalah `GEMINI_API_KEY` (case-sensitive)
- Pastikan tidak ada spasi di awal/akhir API key

### Voice Assistant Tidak Bekerja
- Pastikan menggunakan HTTPS (Cloudflare Pages otomatis HTTPS)
- Berikan permission microphone di browser
- Test di browser yang support Web Audio API (Chrome/Edge recommended)

---

## Monitoring & Analytics

Cloudflare Pages menyediakan:
- **Analytics**: Lihat traffic dan usage di tab Analytics
- **Deployment History**: Lihat semua deployment di tab Deployments
- **Build Logs**: Debug build issues dari detail deployment

---

## Keamanan

✅ **Yang sudah aman:**
- File `.env.local` tidak ter-upload ke GitHub (ada di .gitignore)
- API key disimpan sebagai Environment Variable di Cloudflare (encrypted)
- HTTPS otomatis enabled

⚠️ **Jangan:**
- Commit API key ke code
- Share screenshot yang menampilkan API key
- Expose environment variables di client-side code

---

## Update Aplikasi

Untuk update aplikasi:
1. Edit code secara lokal
2. Test dengan `npm run dev`
3. Commit changes: `git add . && git commit -m "Update message"`
4. Push ke GitHub: `git push`
5. Cloudflare akan auto-deploy (tunggu 2-5 menit)

---

## Support

Jika ada masalah:
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Selamat! Aplikasi Anda sekarang live di internet! 🎉**
