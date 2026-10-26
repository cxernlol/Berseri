import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { ProductCard } from "@/components/product/ProductCard";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan - Kembang Berseri",
    };
  }

  return {
    title: `${product.nama} - Kembang Berseri`,
    description: product.deskripsi,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getAllProducts();
  const relatedProducts = allProducts
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <Navbar />

      <main className="flex-1 py-8 bg-pastel-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb / Back button */}
          <div>
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-plum-800 hover:text-plum-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Katalog</span>
            </Link>
          </div>

          {/* Product Detail Interactive Client */}
          <ProductDetailClient product={product} />

          {/* Produk Lainnya Section */}
          <section className="pt-12 border-t border-plum-100 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-plum-600">
                  Rekomendasi
                </span>
                <h3 className="text-2xl font-extrabold text-plum-900 mt-1">
                  Produk Lainnya
                </h3>
              </div>
              <Link
                href="/katalog"
                className="text-xs sm:text-sm font-bold text-plum-700 hover:text-plum-900"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
