import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/ui/Toast";
import { PetalCanvas } from "@/components/reactbits/PetalCanvas";
import { CartDrawer } from "@/components/cart/CartDrawer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kembang Berseri - Florist & Buket Bunga Cantik Bandung",  
  description:
    "Merangkai cinta dalam setiap buket. Toko bunga segar di Bandung untuk wisuda, ulang tahun, anniversary, pernikahan, dan momen spesial lainnya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${greatVibes.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-pastel-bg text-plum-900">
        <CartProvider>
          <ToastProvider>
            <PetalCanvas />
            {children}
            <CartDrawer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
