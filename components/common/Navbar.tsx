"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, User, Search, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent }: NavbarProps) {
  const pathname = usePathname();
  const { totalItems, isLoaded, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState("IDR");
  const [scrolled, setScrolled] = useState(false);

  // Jika transparent tidak di-pass, otomatis transparan hanya di homepage "/"
  const isTransparent = transparent ?? pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Katalog", href: "/katalog" },
    { name: "Dekorasi", href: "/katalog?kategori=Pernikahan" },
    { name: "Tentang Kami", href: "/tentang" },
    { name: "Kontak", href: "/tentang#kontak" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("?")[0].split("#")[0]);
  };

  // Gaya dinamis saat di atas hero transparan vs di halaman biasa
  const headerClasses = isTransparent
    ? cn(
        "absolute top-0 inset-x-0 z-50 transition-all duration-300 text-white",
        scrolled ? "bg-black/40 backdrop-blur-md py-4" : "bg-transparent py-5 sm:py-6"
      )
    : "sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-plum-100 text-plum-900 py-4";

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo brand sebelumnya */}
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-brand text-4xl sm:text-5xl text-plum-900 group-hover:text-plum-600 transition-colors tracking-tight leading-none">
              Kembang
            </span>
            <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase font-semibold text-plum-700/80 -mt-1 pl-1">
              Berseri
            </span>
          </Link>

          {/* SISI TENGAH: Menu Utama (Home, Shop, Contact Us, Articles, Decoration) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-xs uppercase tracking-[0.18em] transition-all duration-200 py-1",
                    active
                      ? "font-bold border-b border-current"
                      : "font-light hover:opacity-80 opacity-90"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* SISI KANAN: Currency (IDR), Search, User, Cart */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Dropdown Mata Uang */}
            <div className="relative hidden sm:inline-flex items-center">
              <select
                aria-label="Pilih Mata Uang"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={cn(
                  "bg-transparent text-xs tracking-widest uppercase pr-4 cursor-pointer focus:outline-none appearance-none font-light",
                  isTransparent ? "text-white" : "text-plum-900"
                )}
              >
                <option value="IDR" className="text-black bg-white">
                  IDR
                </option>
                <option value="USD" className="text-black bg-white">
                  USD
                </option>
                <option value="SGD" className="text-black bg-white">
                  SGD
                </option>
              </select>
              <ChevronDown className="w-3 h-3 absolute right-0 pointer-events-none opacity-70" />
            </div>

            {/* Ikon Search */}
            <Link
              href="/katalog"
              className="p-1 hover:opacity-75 transition-opacity"
              aria-label="Cari Produk"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </Link>

            {/* Ikon User / Auth */}
            <Link
              href="/masuk"
              className="p-1 hover:opacity-75 transition-opacity"
              aria-label="Akun Saya"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </Link>

            {/* Ikon Keranjang dengan Badge Jumlah Item */}
            <button
              type="button"
              onClick={openCart}
              className="relative p-1 hover:opacity-75 transition-opacity cursor-pointer"
              aria-label="Buka Keranjang Belanja"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              {isLoaded && totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-plum-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Tombol Hamburger di Layar Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 hover:opacity-75 transition-opacity"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.5]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              "lg:hidden px-6 pt-4 pb-8 flex flex-col gap-4 border-t mt-4",
              isTransparent
                ? "bg-neutral-950/95 backdrop-blur-lg border-white/10 text-white"
                : "bg-white border-plum-100 text-plum-900"
            )}
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-xs uppercase tracking-[0.2em] py-2 transition-colors",
                    active ? "font-bold text-white underline underline-offset-4" : "font-light opacity-80"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest opacity-70">
                Mata Uang
              </span>
              <select
                aria-label="Pilih Mata Uang Mobile"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-xs tracking-widest uppercase cursor-pointer focus:outline-none"
              >
                <option value="IDR" className="text-black bg-white">IDR</option>
                <option value="USD" className="text-black bg-white">USD</option>
                <option value="SGD" className="text-black bg-white">SGD</option>
              </select>
            </div>

            <Link
              href="/masuk"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 text-xs uppercase tracking-[0.2em] font-medium bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Masuk / Akun
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
