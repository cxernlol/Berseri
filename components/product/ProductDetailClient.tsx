"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Star,
  ShoppingBag,
  MessageCircle,
  Plus,
  Minus,
  CheckCircle2,
  Heart,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { Product } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"detail" | "makna" | "ulasan">("detail");
  const [catatan, setCatatan] = useState("");

  const hemat = product.hargaAsli ? product.hargaAsli - product.harga : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, catatan);
    showToast(
      `${quantity}x "${product.nama}" berhasil ditambahkan ke keranjang!`,
      "success"
    );
  };

  const generateWhatsappUrl = () => {
    const text = `Halo Florist Kembang Berseri! Saya ingin memesan:
- Produk: ${product.nama}
- Jumlah: ${quantity} buket
- Total: ${formatRupiah(product.harga * quantity)}
${catatan ? `- Catatan Khusus: ${catatan}` : ""}`;
    return `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      {/* Product Image Column */}
      <div className="lg:col-span-6 space-y-4">
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-plum-100 shadow-sm">
          <Image
            src={product.gambar}
            alt={product.nama}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          {product.label && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-plum-900 text-white shadow-sm">
                {product.label}
              </span>
            </div>
          )}
        </div>

        {/* Value Badges */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-plum-100">
            <Heart className="w-4 h-4 text-rose-500 mb-1" />
            <span className="text-[11px] font-bold text-plum-900">100% Segar</span>
            <span className="text-[10px] text-plum-800/60">Bunga petani lokal</span>
          </div>
          <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-plum-100">
            <Truck className="w-4 h-4 text-plum-600 mb-1" />
            <span className="text-[11px] font-bold text-plum-900">Same-Day</span>
            <span className="text-[10px] text-plum-800/60">Area Bandung</span>
          </div>
          <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-plum-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
            <span className="text-[11px] font-bold text-plum-900">Garansi</span>
            <span className="text-[10px] text-plum-800/60">Kepuasan pembeli</span>
          </div>
        </div>
      </div>

      {/* Product Info Column */}
      <div className="lg:col-span-6 space-y-6">
        {/* Category tags */}
        <div className="flex flex-wrap gap-2">
          {product.kategori.map((k) => (
            <span
              key={k}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-pastel-pink text-plum-800 border border-plum-100"
            >
              {k}
            </span>
          ))}
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-plum-900">
            {product.nama}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
            </div>
            <span className="text-sm font-bold text-plum-900">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-plum-800/60">
              ({product.jumlahUlasan} ulasan)
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="p-4 rounded-2xl bg-pastel-pink/60 border border-plum-100 flex items-center justify-between gap-4">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-plum-900">
              {formatRupiah(product.harga)}
            </div>
            {product.hargaAsli && (
              <div className="text-xs sm:text-sm text-plum-800/60 line-through">
                {formatRupiah(product.hargaAsli)}
              </div>
            )}
          </div>

          {hemat > 0 && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-xs">
              Hemat {formatRupiah(hemat)}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-plum-800/80 leading-relaxed">
          {product.deskripsi}
        </p>

        {/* TABS (Detail, Makna Bunga, Ulasan) */}
        <div className="border border-plum-100 rounded-2xl bg-white overflow-hidden shadow-2xs">
          <div className="flex border-b border-plum-100 bg-pastel-bg/50">
            {(["detail", "makna", "ulasan"] as const).map((tab) => {
              const labels = {
                detail: "Detail Paket",
                makna: "Makna Bunga",
                ulasan: `Ulasan (${product.ulasan?.length || 0})`,
              };
              const isSelected = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                    isSelected
                      ? "border-plum-700 text-plum-900 bg-white"
                      : "border-transparent text-plum-800/60 hover:text-plum-900"
                  }`}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          <div className="p-5 text-sm text-plum-900">
            {activeTab === "detail" && (
              <div className="space-y-4">
                {product.isiPaket && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-plum-700 mb-2">
                      Isi Paket:
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-plum-800/80">
                      {product.isiPaket.map((isi, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-plum-600 shrink-0 mt-0.5" />
                          <span>{isi}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.pilihanKustomisasi && (
                  <div className="pt-2 border-t border-plum-50">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-plum-700 mb-2">
                      Pilihan Kustomisasi:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-xs text-plum-800/70">
                      {product.pilihanKustomisasi.map((cust, idx) => (
                        <li key={idx}>{cust}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "makna" && (
              <div className="space-y-3">
                <blockquote className="italic border-l-2 border-plum-400 pl-4 text-plum-800/90 text-xs sm:text-sm leading-relaxed">
                  &ldquo;{product.maknaBunga || product.deskripsi}&rdquo;
                </blockquote>
                <div className="text-xs text-plum-700 font-semibold pt-2">
                  Cocok untuk momen: {product.kategori.join(", ")}
                </div>
              </div>
            )}

            {activeTab === "ulasan" && (
              <div className="space-y-4">
                {product.ulasan && product.ulasan.length > 0 ? (
                  product.ulasan.map((rev) => (
                    <div
                      key={rev.id}
                      className="border-b border-plum-50 last:border-b-0 pb-3 last:pb-0 space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-plum-900">{rev.name}</span>
                        <span className="text-plum-800/50">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(rev.rating)
                                ? "fill-amber-400 stroke-amber-500"
                                : "stroke-plum-200 fill-transparent"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-plum-800/80 italic">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-plum-800/60">
                    Belum ada ulasan untuk buket ini.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Input Catatan / Permintaan Khusus */}
        <div>
          <label className="block text-xs font-bold text-plum-900 mb-1.5">
            Catatan / Permintaan Khusus (opsional)
          </label>
          <textarea
            rows={2}
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            placeholder="Contoh: Tambah pita merah, tulis 'Selamat Wisuda Dini' di kartu..."
            className="w-full p-3 text-xs bg-white border border-plum-200 rounded-xl text-plum-900 placeholder:text-plum-800/40 focus:outline-hidden focus:ring-1 focus:ring-plum-600"
          />
        </div>

        {/* Quantity and Actions */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-plum-200 rounded-full bg-white p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center text-plum-800 hover:bg-pastel-pink transition-colors"
                aria-label="Kurangi kuantitas"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-bold text-sm text-plum-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-plum-800 hover:bg-pastel-pink transition-colors"
                aria-label="Tambah kuantitas"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-3 px-6 rounded-full bg-plum-600 hover:bg-plum-700 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Tambah ke Keranjang</span>
            </button>
          </div>

          <a
            href={generateWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-6 rounded-full bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Pesan via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
