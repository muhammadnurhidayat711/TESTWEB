# Panduan Deploy ke cPanel — Pelita Cemerlang School

## File Siap Upload

**File:** `deploy-pelita-cemerlang.zip` (251MB)
**Lokasi:** `D:\www\TESTWEB\deploy-pelita-cemerlang.zip`

## Isi File

- Standalone Next.js server (`server.js`)
- Semua static assets (`.next/static/`)
- File publik (gambar, favicon, dll)
- Folder `content/` (konten dinamis)
- Node.js modules (18MB)
- File entry `package.json` dengan script `"start": "node server.js"`

## Cara Upload ke cPanel

### 1. Upload via File Manager cPanel
1. Login ke cPanel → **File Manager**
2. Buka folder tujuan (misal: `public_html/` atau subfolder domain)
3. Upload `deploy-pelita-cemerlang.zip` (atau isi folder `deploy/` secara langsung)
4. Extract (klik kanan → **Extract**)
5. Pindahkan semua isi ke root public_html

> Alternatif cepat: jalankan `npm run deploy:cpanel` lalu upload isi folder `deploy/` ke hosting.

### 2. Upload via FTP (alternatif)
- Gunakan FileZilla / WinSCP
- Koneksi ke FTP server cPanel
- Upload semua isi folder `deploy/` ke `public_html/`

## Setup Node.js App di cPanel

### SetupNode.js App (cPanel version 130+)

1. Di cPanel, cari **Setup Node.js App**
2. Klik **Create Application**
3. Isi:
   - **Node.js version:** pilih 20.x atau 22.x (sesuai yang tersedia)
   - **Application mode:** Production
   - **Application root:** `public_html` (atau subfolder sesuai path)
   - **Application URL:** pilih domain kamu
   - **Application startup file:** `server.js`
   - **Passenger log file:** biarkan default
   - **Environment variables:** tambahkan `NODE_ENV=production`
4. Klik **Create**

### Jika menggunakan subdomain

Contoh untuk domain `testsipinjam.sika.web.id`:
- Application root: `public_html/testsipinjam.sika.web.id/`
- Application URL: `https://testsipinjam.sika.web.id`

## Verifikasi

1. Setelah create, klik **Run npm install** (mungkin otomatis terdeteksi)
2. Klik **Start** atau restart app
3. Buka domain di browser — website seharusnya sudah live

## Troubleshooting

- **Error 500 / Internal Server Error** → cek Node.js version (min 18.x), pastikan `server.js` ada
- **File not found** → pastikan path ekstraksi benar, semua file dari zip ada di root public_html
- **Port sudah dipake** → cPanel biasanya handle routing otomatis, pastikan app status Running
- **CSS/JS broken** → cek di `.htaccess` atau pastikan path static files benar

## Catatan

- Project menggunakan **Next.js standalone output** — server berjalan via Node.js (bukan PHP)
- Build sudah dilakukan pada 15 Juli 2026
- Untuk rebuild di masa depan: `npm run build && node scripts/prepare-cpanel.js`
- Seluruh konten statis termuat dalam folder `content/`
