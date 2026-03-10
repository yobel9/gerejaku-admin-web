# GerejaKu Admin - Panduan Pengguna

## Table of Contents
1. [Pengenalan](#pengenalan)
2. [Login](#login)
3. [Dashboard](#dashboard)
4. [Manajemen Jemaat](#manajemen-jemaat)
5. [Keuangan](#keuangan)
6. [Kehadiran](#keuangan)
7. [Event](#event)
8. [Inventaris](#inventaris)
9. [Pengaturan](#pengaturan)
10. [Database](#database)

---

## Pengenalan

GerejaKu Admin adalah aplikasi manajemen gereja yang membantu dalam:
- Mengelola data jemaat
- Mencatat donasi dan pengeluaran
- Mengatur kehadiran ibadah
- Mengelola event dan jadwal
- Menyimpan inventaris gereja

---

## Login

### Default Login
- **Username:** `admin`
- **Password:** `admin123`

### Cara Login
1. Buka aplikasi di browser
2. Masukkan username dan password
3. Klik tombol **Masuk**

### Reset Password
Jika lupa password, hubungi administrator.

---

## Dashboard

Dashboard menampilkan informasi ringkas:
- **Total Jemaat Aktif** - Jumlah jemaat yang aktif
- **Jemaat Baru Bulan Ini** - Jumlah jemaat yang bergabung bulan ini
- **Kehadiran Minggu Ini** - Jumlah jemaat yang hadir minggu ini
- **Donasi Bulan Ini** - Total donasi bulan ini

---

## Manajemen Jemaat

### Menambah Jemaat Baru
1. Buka menu **Jemaat**
2. Klik tombol **+ Tambah Jemaat**
3. Isi formulir:
   - Nama lengkap (wajib)
   - Jenis kelamin (Laki-laki/Perempuan)
   - Tanggal lahir
   - Tempat lahir
   - Nomor telepon (wajib)
   - Email
   - Alamat
   - Kota
   - Kode pos
   - Tanggal bergabung
   - Status (Aktif/Tidak Aktif)
   - Foto (opsional)
   - Catatan
4. Klik **Simpan**

### Mengedit Jemaat
1. Cari jemaat yang ingin diedit
2. Klik tombol **Edit** (ikon pensil)
3. Ubah data yang diinginkan
4. Klik **Simpan**

### Menghapus Jemaat
1. Cari jemaat yang ingin dihapus
2. Klik tombol **Hapus** (ikon tempat sampah)
3. Konfirmasi penghapusan

### Fitur Tambahan
- **Pencarian** - Cari jemaat berdasarkan nama atau nomor telepon
- **Filter** - Filter berdasarkan status atau jenis kelamin
- **Export** - Export data jemaat ke CSV

---

## Keuangan

### Donasi
1. Buka menu **Keuangan**
2. Klik **+ Pemasukan**
3. Isi formulir:
   - Tanggal
   - Nama donatur
   - Jumlah (dalam rupiah)
   - Kategori (Persepuluhan, Kolekte, Dana Bangunan, Donasi Khusus, Lainnya)
   - Metode pembayaran (Tunai, Transfer, Cek, QRIS)
   - Catatan
4. Klik **Simpan**

### Pengeluaran
1. Buka menu **Keuangan**
2. Klik **+ Pengeluaran**
3. Isi formulir:
   - Tanggal
   - Nama pihak (perusahaan/perorangan)
   - Jumlah (dalam rupiah)
   - Kategori (Listrik, Perbaikan, Gaji, Bahan, Lainnya)
   - Metode pembayaran (Tunai, Transfer, Cek)
   - Catatan
4. Klik **Simpan**

### Laporan Keuangan
- Lihat ringkasan donasi dan pengeluaran per bulan
- Filter berdasarkan tanggal atau kategori
- Export laporan ke CSV

---

## Kehadiran

### Mencatat Kehadiran
1. Buka menu **Struktur**
2. Pilih tanggal dan jenis ibadah
3. Centang nama jemaat yang hadir
4. Klik **Simpan Kehadiran**

### Lihat Riwayat Kehadiran
- Tabel menampilkan riwayat kehadiran
- Filter berdasarkan tanggal atau jenis ibadah
- Lihat persentase kehadiran per jemaat

---

## Event

### Membuat Event Baru
1. Buka menu **Event**
2. Klik **+ Event Baru**
3. Isi formulir:
   - Nama event
   - Tanggal
   - Waktu mulai
   - Waktu selesai
   - Lokasi
   - Kategori (Ibadah, Persekutuan, Latihan, Perayaan, Studi, Lainnya)
   - Prioritas (Rendah, Normal, Tinggi)
   - Deskripsi
4. Klik **Simpan**

### Mengedit Event
1. Klik tombol **Edit** pada event yang diinginkan
2. Ubah data
3. Klik **Simpan**

### Menghapus Event
1. Klik tombol **Hapus** pada event yang diinginkan
2. Konfirmasi penghapusan

---

## Inventaris

### Menambah Inventaris
1. Buka menu **Inventaris**
2. Klik **+ Tambah Inventaris**
3. Isi formulir:
   - Nama barang
   - Kategori (Furniture, Elektronik, Musik, Bahan, Lainnya)
   - Jumlah
   - Satuan (unit, buah, dll)
   - Kondisi (Baik, Cukup, Buruk, Kerusakan Kecil, Perlu Perbaikan)
   - Lokasi
   - Tanggal perolehan
   - Nilai (opsional)
   - Foto (opsional)
   - Catatan
4. Klik **Simpan**

### Mengedit Inventaris
1. Klik tombol **Edit** pada barang yang diinginkan
2. Ubah data
3. Klik **Simpan**

### Menghapus Inventaris
1. Klik tombol **Hapus** pada barang yang diingdingkan
2. Konfirmasi penghapusan

---

## Pengaturan

### Manajemen User
1. Buka menu **User**
2. Klik **+ Tambah User**
3. Isi formulir:
   - Username
   - Password
   - Nama lengkap
   - Role (Admin/Staff)
   - Status (Aktif/Tidak Aktif)
4. Klik **Simpan**

### Pengaturan Database
1. Buka menu **Pengaturan**
2. Pilih **Database**
3. Masukkan:
   - Supabase URL
   - Supabase Anon Key
4. Klik **Simpan**

### Backup & Restore
- **Backup:** Download semua data ke file JSON
- **Restore:** Upload file JSON untuk memulihkan data

---

## Database

### Mode Lokal
- Data disimpan di browser
- Data tidak tersinkron ke device lain
- Cocok untuk penggunaan pribadi

### Mode Database
- Data disimpan di Supabase
- Data tersinkron ke device lain
- Cocok untuk penggunaan tim

### Cara Mengaktifkan Database
1. Buka menu **Pengaturan**
2. Pilih **Database**
3. Masukkan URL dan API Key dari Supabase
4. Klik **Simpan**
5. Refresh halaman

### Konfigurasi Supabase
1. Daftar di [supabase.com](https://supabase.com)
2. Buat project baru
3. Copy URL dan API Key
4. Jalankan SQL di `supabase-schema.sql`

---

## Tips & Trik

1. **Backup Data** - Lakukan backup secara berkala
2. **Password** - Ubah password default setelah pertama kali login
3. **Auto Sync** - Aktifkan auto sync untuk sinkronisasi otomatis
4. **Filter** - Gunakan filter untuk mencari data lebih cepat
5. **Export** - Export data untuk keperluan laporan

---

## Troubleshooting

### Tidak bisa Login
- Cek username dan password
- Pastikan akun aktif
- Hubungi administrator

### Data Tidak Tersimpan
- Cek koneksi internet
- Cek mode database (aktifkan jika belum)
- Refresh halaman

### Error Database
- Cek konfigurasi Supabase
- Verifikasi API Key
- Cek koneksi internet

---

## Kontak

Jika mengalami masalah:
1. Cek dokumentasi di website resmi
2. Hubungi tim support
3. Lapor melalui email

---

## Lisensi

GerejaKu Admin dibuat untuk keperluan gereja.
