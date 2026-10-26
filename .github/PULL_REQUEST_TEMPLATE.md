## 📋 Deskripsi

<!-- Jelaskan secara singkat apa yang diubah dan mengapa. -->


## 🔗 Tipe Perubahan

<!-- Centang yang relevan. -->

- [ ] 🐛 Bug fix (perubahan non-breaking yang memperbaiki masalah)
- [ ] ✨ Fitur baru (perubahan non-breaking yang menambah fungsionalitas)
- [ ] 💥 Breaking change (perbaikan atau fitur yang mengubah perilaku yang sudah ada)
- [ ] 🎨 Style / UI (perubahan tampilan, warna, layout, animasi)
- [ ] 📝 Dokumentasi (perubahan hanya pada README, komentar, atau docs)
- [ ] ♻️ Refactor (perubahan kode tanpa mengubah fitur atau memperbaiki bug)
- [ ] ⚡ Peningkatan performa
- [ ] 🔧 Konfigurasi / CI/CD / DevOps

---

## ✅ Checklist — Automated (CI)

<!-- Pastikan semua pipeline CI hijau sebelum minta review. -->

- [ ] `bun run lint` — ESLint lolos tanpa error
- [ ] `bun run build` — Next.js build berhasil (semua rute ter-prerender)
- [ ] GitHub Actions CI pipeline **passing** ✓
- [ ] Vercel Preview Deployment **ready** dan bisa diakses

---

## 🧪 Checklist — Manual Verification

<!-- Lakukan pengecekan manual di Vercel Preview URL atau localhost. -->

### Tampilan & Responsif
- [ ] Halaman beranda tampil dengan benar (Hero slider, katalog unggulan, testimoni)
- [ ] Halaman katalog — filter kategori berfungsi (Wisuda, Anniversary, dll.)
- [ ] Halaman detail produk — gambar, deskripsi, ulasan, dan tombol "Tambah ke Keranjang" berfungsi
- [ ] Layout responsif: dicek di **mobile** (≤640px), **tablet** (768px), dan **desktop** (≥1024px)
- [ ] Tidak ada *horizontal scroll* atau elemen yang *overflow* di mobile

### Interaksi & Fungsionalitas
- [ ] Menambah produk ke keranjang — notifikasi Toast muncul dan jumlah di ikon keranjang bertambah
- [ ] Cart Drawer terbuka dan menampilkan produk dengan benar
- [ ] Halaman keranjang — jumlah dan subtotal terhitung otomatis, tombol hapus berfungsi
- [ ] Halaman checkout — form input berfungsi (nama, alamat, jadwal pengiriman, pesan kartu)
- [ ] Wishlist (ikon hati) — toggle on/off dengan notifikasi Toast
- [ ] Navigasi antar halaman berjalan lancar tanpa error di console

### Visual & Animasi
- [ ] Petal Canvas (partikel kelopak bunga) terlihat di halaman beranda
- [ ] Efek Tilt Card pada kartu produk berfungsi saat hover
- [ ] Transisi halaman dan animasi scroll berjalan mulus
- [ ] Warna, tipografi, dan spacing konsisten di seluruh halaman

### Aksesibilitas & SEO
- [ ] Semua gambar memiliki atribut `alt`
- [ ] Heading hierarchy benar (satu `<h1>` per halaman)
- [ ] Halaman bisa diakses dengan keyboard (Tab, Enter, Escape)

---

## 📸 Screenshot / Preview

<!-- Tambahkan screenshot perbandingan sebelum & sesudah jika ada perubahan visual. -->

| Sebelum | Sesudah |
|---------|---------|
| *(screenshot)* | *(screenshot)* |

**Vercel Preview URL:** <!-- Tempel link Vercel Preview dari komentar bot Vercel -->

---

## 📝 Catatan Tambahan

<!-- Informasi tambahan untuk reviewer: breaking changes, migrasi data, env baru, dll. -->

