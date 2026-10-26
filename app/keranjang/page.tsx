import React from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { CartView } from "@/components/cart/CartView";

export const metadata = {
  title: "Keranjang Belanja - Kembang Berseri Bandung",
  description: "Lihat dan selesaikan pesanan rangkaian buket bunga segar impianmu.",
};

export default function CartPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 py-10 bg-pastel-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CartView />
        </div>
      </main>

      <Footer />
    </>
  );
}
