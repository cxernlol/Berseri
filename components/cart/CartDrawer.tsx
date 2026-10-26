"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/context/CartContext";
import { formatRupiah } from "@/lib/utils";

// ponytail: in-viewport drawer sidebar. Upgrade path: swipe-to-close gestures.
export function CartDrawer() {
  const {
    items,
    totalItems,
    totalHarga,
    subtotal,
    potonganDiskon,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  // Lock body scroll saat drawer terbuka & listener tombol Escape
  useEffect(() => {
    if (isCartOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeCart();
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop gelap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            aria-label="Tutup keranjang"
            className="fixed inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Panel Sidebar Kanan */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-plum-100"
            role="dialog"
            aria-modal="true"
            aria-label="Sidebar Keranjang Belanja"
          >
            {/* Header Drawer */}
            <div className="p-4 sm:p-5 border-b border-plum-100 flex items-center justify-between bg-pastel-bg/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-full bg-pastel-pink text-plum-900">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-plum-900">
                    Keranjang Belanja
                  </h2>
                  <p className="text-xs text-plum-800/70">
                    {totalItems} buket dipilih
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCart}
                className="p-2 rounded-full text-plum-700 hover:text-plum-900 hover:bg-plum-100/60 transition-colors"
                aria-label="Tutup sidebar keranjang"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List Isi Keranjang */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-plum-50">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-pastel-pink flex items-center justify-center text-3xl">
                    🌸
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-plum-900">
                      Keranjang masih kosong
                    </h3>
                    <p className="text-xs text-plum-800/70 mt-1 max-w-xs">
                      Pilih buket favoritmu dari koleksi kami untuk menambahkannya ke keranjang.
                    </p>
                  </div>
                  <Link
                    href="/katalog"
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-plum-600 hover:bg-plum-700 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    <span>Mulai Belanja</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 py-3 border-b border-plum-50 last:border-0"
                    >
                      {/* Foto Produk */}
                      <Link
                        href={`/katalog/${item.product.slug}`}
                        onClick={closeCart}
                        className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-pastel-pink/50 border border-plum-100"
                      >
                        <Image
                          src={item.product.gambar}
                          alt={item.product.nama}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>

                      {/* Detail & Kontrol */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/katalog/${item.product.slug}`}
                            onClick={closeCart}
                            className="text-xs sm:text-sm font-bold text-plum-900 hover:text-plum-600 line-clamp-1"
                          >
                            {item.product.nama}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-plum-400 hover:text-rose-600 p-1 transition-colors"
                            aria-label={`Hapus ${item.product.nama}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.catatanKhusus && (
                          <p className="text-[11px] text-plum-800/60 line-clamp-1 italic">
                            Catatan: {item.catatanKhusus}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-bold text-plum-800">
                            {formatRupiah(item.product.harga * item.quantity)}
                          </span>

                          {/* Tombol Kuantitas */}
                          <div className="flex items-center border border-plum-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="p-1 hover:bg-plum-50 text-plum-800 transition-colors"
                              aria-label="Kurangi kuantitas"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold text-plum-900 select-none">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 hover:bg-plum-50 text-plum-800 transition-colors"
                              aria-label="Tambah kuantitas"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Drawer */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-plum-100 bg-pastel-bg/60 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-plum-800/70">
                    <span>Subtotal</span>
                    <span>{formatRupiah(subtotal)}</span>
                  </div>
                  {potonganDiskon > 0 && (
                    <div className="flex justify-between text-rose-600 font-semibold">
                      <span>Diskon</span>
                      <span>-{formatRupiah(potonganDiskon)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-plum-900 pt-1 border-t border-plum-100">
                    <span>Total Pembayaran</span>
                    <span className="text-base text-plum-800 font-extrabold">
                      {formatRupiah(totalHarga)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-plum-900 hover:bg-plum-800 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md active:scale-98"
                  >
                    <span>Lanjut ke Pembayaran</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/keranjang"
                    onClick={closeCart}
                    className="w-full inline-flex items-center justify-center py-2.5 rounded-full bg-white hover:bg-plum-50 border border-plum-200 text-plum-900 font-medium text-xs transition-colors"
                  >
                    Lihat Halaman Keranjang Lengkap
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
