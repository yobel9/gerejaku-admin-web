# GerejaKu Admin

Aplikasi web manajemen gereja dengan fitur lengkap untuk mengelola jemaat, keuangan, kehadiran, event, dan inventaris.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## 📋 Fitur

- ✅ Manajemen Jemaat (CRUD)
- ✅ Keuangan (Donasi & Pengeluaran)
- ✅ Kehadiran Ibadah
- ✅ Event & Jadwal
- ✅ Inventaris Gereja
- ✅ Pengumuman
- ✅ Multi-user Support
- ✅ Database Sync (LocalStorage/Supabase)
- ✅ Auto Backup & Restore
- ✅ Responsive Design

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm atau yarn

### Installation

1. Clone repository:
```bash
git clone https://github.com/yourusername/gerejaku-admin.git
cd gerejaku-admin
```

2. Install dependencies:
```bash
npm install
```

3. Open in browser:
```bash
npm run dev
```

## 📁 Struktur Project

```
gerejaku-admin/
├── index.html          # Main HTML
├── SPEC.md            # Spesifikasi aplikasi
├── TODO.md            # Roadmap proyek
├── DEPLOYMENT.md      # Panduan deployment
├── USER_GUIDE.md      # Panduan pengguna
├── supabase-schema.sql # Schema database
├── supabase-setup-guide.md # Panduan setup Supabase
├── css/
│   └── styles.css     # CSS styles
└── js/
    ├── app.js         # Main application
    ├── auth.js        # Authentication
    ├── components.js  # UI Components
    ├── data.js        # Data management
    ├── storage.js     # Storage adapter
    └── pages/         # Page components
```

## 🔐 Login Default

- **Username:** `admin`
- **Password:** `admin123`

## 🗄️ Database Setup

### Option 1: LocalStorage (Default)
Data tersimpan di browser, cocok untuk penggunaan pribadi.

### Option 2: Supabase
Data tersimpan di cloud, cocok untuk penggunaan tim.

#### Langkah Setup Supabase:

1. **Daftar di [supabase.com](https://supabase.com)**
2. **Buat Project Baru**
3. **Copy URL dan Anon Key** dari Project Settings → API
4. **Jalankan SQL** di SQL Editor:
   ```bash
   # Buka file supabase-schema.sql dan jalankan di Supabase
   ```

5. **Konfigurasi di Aplikasi:**
   - Buka menu **Pengaturan** → **Database**
   - Masukkan URL dan API Key
   - Klik **Simpan**

Lihat detail di [`supabase-setup-guide.md`](supabase-setup-guide.md)

## 📦 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

Lihat detail di [`DEPLOYMENT.md`](DEPLOYMENT.md)

## 📚 Dokumentasi

- [`USER_GUIDE.md`](USER_GUIDE.md) - Panduan pengguna lengkap
- [`DEPLOYMENT.md`](DEPLOYMENT.md) - Panduan deployment
- [`supabase-setup-guide.md`](supabase-setup-guide.md) - Panduan setup database
- [`SPEC.md`](SPEC.md) - Spesifikasi teknis

## 🛠️ Development

### Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Tech Stack

- HTML5
- CSS3 (CSS Variables)
- JavaScript (ES6+)
- Supabase (Database)
- LocalStorage (Fallback)

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - Lihat LICENSE file untuk detail.

## 📧 Support

Jika mengalami masalah:
1. Cek dokumentasi di [`USER_GUIDE.md`](USER_GUIDE.md)
2. Cek [`DEPLOYMENT.md`](DEPLOYMENT.md) untuk troubleshooting
3. Buka issue di GitHub

---

**Dibuat dengan ❤️ untuk Gereja**
