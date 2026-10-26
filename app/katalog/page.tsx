import React, { Suspense } from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { getAllProducts } from "@/lib/products";
import { CatalogContent } from "@/components/catalog/CatalogContent";

export const metadata = {
  title: "Katalog Buket Bunga - Kembang Berseri Bandung",
  description:
    "Jelajahi koleksi buket bunga segar terbaik untuk wisuda, anniversary, ulang tahun, pernikahan, dan duka cita di Kembang Berseri.",
};

export default async function CatalogPage() {
  const products = await getAllProducts();

  return (
    <>
      <Navbar />

      <main className="flex-1 py-10 bg-pastel-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="text-center py-20 text-plum-700 font-semibold text-sm">
                Memuat katalog bunga...
              </div>
            }
          >
            <CatalogContent initialProducts={products} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
