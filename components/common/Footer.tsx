import React from "react";
import Link from "next/link";
import { Phone, MapPin, Clock, Heart } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-plum-900 text-white pt-16 pb-10 border-t border-plum-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-brand text-4xl text-rose-200">Kembang</span>
              <span className="block text-xs tracking-[0.35em] uppercase font-semibold text-rose-300/80 -mt-2 pl-1">
                Berseri
              </span>
            </Link>
            <p className="text-sm text-rose-100/80 leading-relaxed max-w-sm">
              Merangkai cinta dalam setiap buket. Hadir untuk merayakan setiap
              momen spesialmu dengan keindahan bunga segar pilihan.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-rose-300 mb-4">
              Navigasi
            </h3>
            <ul className="space-y-2.5 text-sm text-rose-100/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/katalog"
                  className="hover:text-white transition-colors"
                >
                  Katalog
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className="hover:text-white transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/keranjang"
                  className="hover:text-white transition-colors"
                >
                  Keranjang
                </Link>
              </li>
            </ul>
          </div>

          {/* Momen Spesial */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-rose-300 mb-4">
              Momen Spesial
            </h3>
            <ul className="space-y-2.5 text-sm text-rose-100/80">
              <li>
                <Link
                  href="/katalog?kategori=Wisuda"
                  className="hover:text-white transition-colors"
                >
                  Wisuda
                </Link>
              </li>
              <li>
                <Link
                  href="/katalog?kategori=Ulang+Tahun"
                  className="hover:text-white transition-colors"
                >
                  Ulang Tahun
                </Link>
              </li>
              <li>
                <Link
                  href="/katalog?kategori=Anniversary"
                  className="hover:text-white transition-colors"
                >
                  Anniversary
                </Link>
              </li>
              <li>
                <Link
                  href="/katalog?kategori=Pernikahan"
                  className="hover:text-white transition-colors"
                >
                  Pernikahan
                </Link>
              </li>
              <li>
                <Link
                  href="/katalog?kategori=Bela+Sungkawa"
                  className="hover:text-white transition-colors"
                >
                  Bela Sungkawa
                </Link>
              </li>
              <li>
                <Link
                  href="/katalog?kategori=Ucapan"
                  className="hover:text-white transition-colors"
                >
                  Ucapan Selamat
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak & Alamat */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-rose-300 mb-4">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-sm text-rose-100/80">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <InstagramIcon className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                <span className="hover:text-white cursor-pointer transition-colors">
                  @kembangberseri
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                <span>Jl. Bunga Indah No. 12, Bandung, Jawa Barat</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                <span>Senin–Sabtu, 08.00–20.00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-plum-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rose-200/60">
          <p>© 2024 Kembang Berseri. Semua hak dilindungi.</p>
          <p className="flex items-center gap-1.5">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> untuk setiap momen spesialmu
          </p>
        </div>
      </div>
    </footer>
  );
}
