import React from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata = {
  title: "Checkout Pesanan - Kembang Berseri Bandung",
  description: "Lengkapi data pengiriman dan pilih metode pembayaran pesanan buket bungamu.",
};

export default function CheckoutPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 py-10 bg-pastel-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CheckoutForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
