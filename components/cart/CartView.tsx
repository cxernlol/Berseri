"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatRupiah } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export function CartView() {
  const {
    items,
    totalItems,
    subtotal,
    potonganDiskon,
    totalHarga,
    voucherCode,
    isLoaded,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyVoucher,
    removeVoucher,
  } = useCart();

  const { showToast } = useToast();
  const [voucherInput, setVoucherInput] = useState("");

  if (!isLoaded) {
    return (
      <div className="text-center py-24 text-plum-700 font-semibold text-sm">
        Memuat keranjang belanjamu...
      </div>
    );
  }

  // EMPTY STATE (Figma Page 9 & 27)
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center bg-white p-12 rounded-3xl border border-plum-100 shadow-sm space-y-5 my-8">
        <div className="w-20 h-20 rounded-full bg-pastel-pink flex items-center justify-center mx-auto text-3xl">
          🌸
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-plum-900">
            Keranjangmu masih kosong
          </h1>
          <p className="text-sm text-plum-800/70">
            Yuk, temukan buket cantik yang cocok untukmu!
          </p>
        </div>
        <div>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-plum-600 hover:bg-plum-700 text-white font-semibold text-sm shadow-sm transition-all"
          >
            <span>Jelajahi Katalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // FILLED STATE (Figma Page 12 & 28)
  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;
    const res = applyVoucher(voucherInput);
    showToast(res.message, res.success ? "success" : "error");
    if (res.success) setVoucherInput("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-plum-900">
            Keranjang Belanjaku
          </h1>
          <p className="text-xs sm:text-sm text-plum-800/60 mt-1">
            ({totalItems} item buket dipilih)
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (confirm("Kosongkan semua buket dari keranjang?")) {
              clearCart();
              showToast("Keranjang berhasil dikosongkan.", "info");
            }
          }}
          className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline transition-colors"
        >
          Kosongkan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* List Keranjang */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-plum-100 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-pastel-pink shrink-0">
                  <Image
                    src={item.product.gambar}
                    alt={item.product.nama}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-plum-600 bg-pastel-pink px-2 py-0.5 rounded-md">
                    {item.product.kategori[0]}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-plum-900">
                    {item.product.nama}
                  </h3>
                  <p className="text-xs font-semibold text-plum-800">
                    {formatRupiah(item.product.harga)}
                  </p>
                  {item.catatanKhusus && (
                    <p className="text-[11px] text-plum-800/60 italic line-clamp-1">
                      Catatan: &ldquo;{item.catatanKhusus}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              {/* Quantity Controls & Delete */}
              <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-plum-50">
                <div className="flex items-center border border-plum-200 rounded-full bg-pastel-bg p-1">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-plum-800 hover:bg-white"
                    aria-label="Kurangi kuantitas"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-plum-900">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-plum-800 hover:bg-white"
                    aria-label="Tambah kuantitas"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <p className="text-xs sm:text-sm font-bold text-plum-900">
                    {formatRupiah(item.product.harga * item.quantity)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    removeFromCart(item.product.id);
                    showToast(`Buket dihapus dari keranjang.`, "info");
                  }}
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                  aria-label="Hapus item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div>
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 text-xs font-bold text-plum-700 hover:text-plum-900"
            >
              <span>← Lanjut belanja</span>
            </Link>
          </div>
        </div>

        {/* Ringkasan Pesanan (Figma Page 12) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-plum-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-plum-900 border-b border-plum-50 pb-3">
            Ringkasan Pesanan
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-plum-800/80">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems} item)</span>
              <span className="font-bold text-plum-900">{formatRupiah(subtotal)}</span>
            </div>

            <div className="flex justify-between items-center text-emerald-700 font-semibold">
              <span>Ongkos kirim</span>
              <span className="bg-emerald-50 px-2 py-0.5 rounded text-xs">GRATIS</span>
            </div>

            {voucherCode && (
              <div className="flex justify-between items-center text-rose-600 font-semibold">
                <span className="flex items-center gap-1">
                  Kupon ({voucherCode})
                  <button
                    type="button"
                    onClick={removeVoucher}
                    className="text-[10px] underline ml-1 hover:text-rose-800"
                  >
                    Hapus
                  </button>
                </span>
                <span>-{formatRupiah(potonganDiskon)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-plum-100 flex justify-between items-center text-base font-extrabold text-plum-900">
              <span>Total</span>
              <span className="text-lg text-plum-700">{formatRupiah(totalHarga)}</span>
            </div>
          </div>

          {/* Form Kode Voucher (Figma Page 12) */}
          <div className="space-y-2 pt-2 border-t border-plum-50">
            <label className="block text-xs font-bold text-plum-900">
              Kode Voucher
            </label>
            <form onSubmit={handleApplyVoucher} className="flex gap-2">
              <input
                type="text"
                value={voucherInput}
                onChange={(e) => setVoucherInput(e.target.value)}
                placeholder="Masukkan kupon..."
                className="flex-1 px-3 py-2 text-xs bg-pastel-bg border border-plum-200 rounded-xl uppercase text-plum-900 focus:outline-hidden focus:border-plum-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-plum-900 text-white rounded-xl text-xs font-bold hover:bg-plum-800 transition-colors"
              >
                Pakai
              </button>
            </form>
            <p className="text-[11px] text-plum-800/60">
              Coba: <span className="font-semibold text-plum-700">KEMBANG10</span>,{" "}
              <span className="font-semibold text-plum-700">WISUDA20</span>,{" "}
              <span className="font-semibold text-plum-700">NEWUSER</span>
            </p>
          </div>

          {/* CTA Proses Pesanan */}
          <Link
            href="/checkout"
            className="w-full py-3.5 rounded-full bg-plum-600 hover:bg-plum-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <span>Proses Pesanan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
