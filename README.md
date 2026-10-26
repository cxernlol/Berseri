# 🌸 Berseri — Artisanal Florist Boutique & E-Commerce

[![CI/CD Pipeline](https://github.com/cxernlol/Berseri/actions/workflows/ci.yml/badge.svg)](https://github.com/cxernlol/Berseri/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-black?logo=vercel&logoColor=white)](https://kembangberseri.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Bun](https://img.shields.io/badge/Bun-1.4.2-fbf0df?logo=bun&logoColor=black)](https://bun.sh/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**Berseri** adalah aplikasi web toko bunga modern (*artisanal florist boutique*) yang dirancang dengan estetika visual elegan, animasi dinamis, serta pengalaman belanja buket bunga yang intuitif dan menyenangkan.

🌐 **Live Demo:** [https://kembangberseri.vercel.app/](https://kembangberseri.vercel.app/)

---

## ✨ Fitur Utama

- **💐 Katalog Bunga Tematik & Interaktif**: Rangkaian buket untuk berbagai momen spesial (Wisuda, Ulang Tahun, Anniversary, Pernikahan, Ucapan Selamat, dan Bela Sungkawa) dengan filter kategori instan.
- **🔍 Detail Produk Lengkap**: Informasi detail isi paket, makna filosofi bunga, pilihan kustomisasi (jumlah tangkai, warna pita, tambahan cokelat), dan ulasan pelanggan.
- **🛒 Keranjang Belanja Dinamis**: Dilengkapi *Slide-out Cart Drawer* dan halaman keranjang penuh dengan kalkulasi subtotal dan diskon otomatis secara real-time.
- **💌 Pesan Kartu Ucapan & Penjadwalan**: Form checkout terintegrasi dengan opsi penulisan pesan kartu ucapan custom dan tanggal pengiriman bunga.
- **🪄 Interaksi & Animasi Halus (React Bits & Motion)**:
  - Partikel kelopak bunga melayang di latar belakang menggunakan canvas 2D ringan (*Petal Canvas*).
  - Efek 3D *Card Tilt* dan *Spotlight* pada kartu produk.
  - Notifikasi *Toast* responsif saat menambah produk atau wishlist.
- **📱 Responsif & Mobile-First**: Tampilan optimal di perangkat smartphone, tablet, maupun desktop.
- **🎨 Skema Warna 60-30-10 yang Terkurasi**: Palet *Warm Ivory & Soft Blossom* (`#FAF7F5` / `#2C1820` / `#D44976`) untuk memaksimalkan fokus keindahan foto rangkaian bunga.

---

## 🛠️ Tech Stack

| Layer | Teknologi | Deskripsi |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Turbopack, Partial Prerendering (PPR) |
| **Runtime & Package Manager** | [Bun](https://bun.sh/) | Runtime JavaScript ultra-cepat & manajemen paket |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Static type safety di seluruh komponen |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Engine utility-first CSS generasi terbaru |
| **Animation** | [Motion](https://motion.dev/) | Animasi gesture, layout transition, dan micro-interactions |
| **Icons** | [Lucide React](https://lucide.dev/) | Set ikon modern dan konsisten |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) | Otomatisasi pengujian lint dan build dengan runner Bun |
| **Deployment** | [Vercel](https://vercel.com/) | Global Edge Network dengan serverless rendering |

---

## 📂 Struktur Proyek

```text
Berseri/
├── .github/
│   └── workflows/
│       └── ci.yml             # Pipeline GitHub Actions (CI & CD Bun)
├── app/
│   ├── checkout/              # Halaman formulir pemesanan & pengiriman
│   ├── daftar/                # Halaman registrasi akun
│   ├── katalog/               # Halaman katalog lengkap & pencarian
│   │   └── [slug]/            # Halaman detail masing-masing buket
│   ├── keranjang/             # Halaman ringkasan keranjang belanja
│   ├── masuk/                 # Halaman login
│   ├── tentang/               # Halaman cerita brand & visi Berseri
│   ├── globals.css            # Desain token, tema warna, & font
│   ├── layout.tsx             # Root layout dengan Navbar & Footer
│   └── page.tsx               # Halaman beranda (Hero, Featured, Testimoni)
├── components/
│   ├── cart/                  # Komponen CartDrawer & CartView
│   ├── catalog/               # Komponen filter & daftar katalog
│   ├── checkout/              # Form checkout & ringkasan pesanan
│   ├── common/                # Navbar, Footer, HeroSlider
│   ├── product/               # ProductCard & ProductDetailClient
│   ├── reactbits/             # PetalCanvas, TiltCard, SpotlightCard, FadeIn
│   └── ui/                    # Toast notifications & UI primitives
├── context/
│   └── CartContext.tsx        # Global state management keranjang belanja
├── data/
│   └── products.ts            # Data katalog buket bunga & ulasan
├── types/
│   └── index.ts               # Type definitions (Product, CartItem, dll.)
├── bun.lock                   # Lockfile dependensi Bun
└── package.json               # Konfigurasi dependensi dan scripts
```

---

## 🚀 Memulai (Local Development)

### 1. Prasyarat
Pastikan Anda telah memasang **[Bun](https://bun.sh/)** di komputer Anda:
```bash
bun --version
```
*(Atau Anda juga dapat menggunakan Node.js 20+ dengan npm / pnpm).*

### 2. Kloning Repository
```bash
git clone https://github.com/cxernlol/Berseri.git
cd Berseri
```

### 3. Pasang Dependensi
```bash
bun install
```

### 4. Jalankan Development Server
```bash
bun dev
```
Buka browser di **[http://localhost:3000](http://localhost:3000)**.

---

## 📦 Perintah Script yang Tersedia

| Script | Perintah | Deskripsi |
|---|---|---|
| **Development** | `bun dev` | Menjalankan server dev dengan Next.js Turbopack |
| **Build** | `bun run build` | Mengompilasi dan mengoptimasi aplikasi untuk produksi |
| **Start** | `bun start` | Menjalankan server produksi lokal hasil build |
| **Lint** | `bun run lint` | Menjalankan audit kode dengan ESLint |

---

## 🔄 Alur CI/CD

Repository ini telah dikonfigurasi dengan pipeline otomatis pada file [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

1. **Continuous Integration (CI)**:
   - Dijalankan di setiap *push* dan *pull request* ke branch `main`.
   - Menyiapkan environment **Bun**.
   - Memeriksa kode dengan `bun run lint`.
   - Menguji kompilasi dengan `bun run build`.
2. **Continuous Deployment (CD)**:
   - Terintegrasi langsung dengan platform **Vercel** untuk auto-deploy saat branch `main` diperbarui.
   - Menyediakan *Preview Deployment* otomatis untuk setiap Pull Request.

---

## 📄 Lisensi

Didistribusikan di bawah Lisensi [MIT](LICENSE).
Dikembangkan dengan ❤️ untuk menghadirkan keindahan bunga di setiap momen berharga.
