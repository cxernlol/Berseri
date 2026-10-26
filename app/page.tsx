import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { HeroSlider } from "@/components/common/HeroSlider";
import { Footer } from "@/components/common/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getAllProducts, getAllCategories } from "@/lib/products";
import { FadeIn } from "@/components/reactbits/FadeIn";

export default async function HomePage() {
  const products = await getAllProducts();
  const categories = getAllCategories();

  return (
    <>
      <Navbar transparent />

      <main className="flex-1">
        {/* HERO SECTION */}
        <HeroSlider />

        {/* KATALOG PRODUK */}
        <section id="katalog" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-plum-600">
                  <Sparkles className="w-3.5 h-3.5" /> Koleksi Unggulan
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-plum-900 mt-1">
                  Katalog Bunga Pilihan
                </h2>
                <p className="text-sm text-plum-800/70 mt-1">
                  Rangkaian buket bunga segar terbaik untuk setiap momen spesialmu
                </p>
              </div>

              <Link
                href="/katalog"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-plum-700 hover:text-plum-900 group"
              >
                <span>Lihat Semua Katalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Kategori Momen Pilihan */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
              <Link
                href="/katalog"
                className="shrink-0 px-4 py-2 rounded-full text-xs font-semibold bg-plum-900 text-white shadow-xs"
              >
                🌸 Semua Momen
              </Link>
              {categories.map((kat) => (
                <Link
                  key={kat}
                  href={`/katalog?kategori=${encodeURIComponent(kat)}`}
                  className="shrink-0 px-4 py-2 rounded-full text-xs font-semibold bg-pastel-pink/80 text-plum-800 hover:bg-pastel-rose border border-plum-100 transition-colors"
                >
                  {kat}
                </Link>
              ))}
            </div>
          </FadeIn>

          {/* Grid Katalog Produk */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* CTA Ke Halaman Katalog Penuh */}
          <div className="mt-14 text-center">
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-plum-900 hover:bg-plum-800 text-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-md"
            >
              <span>Jelajahi Seluruh Katalog Bunga</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
