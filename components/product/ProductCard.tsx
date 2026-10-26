"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { Product } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";
import { TiltCard } from "@/components/reactbits/TiltCard";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [btnBounced, setBtnBounced] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setBtnBounced(true);
    setTimeout(() => setBtnBounced(false), 400);
    showToast(`"${product.nama}" ditambahkan ke keranjang!`, "success");
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked((prev) => !prev);
    showToast(
      !isLiked
        ? `"${product.nama}" disimpan ke wishlist!`
        : `Dihapus dari wishlist.`,
      "info"
    );
  };

  return (
    <TiltCard maxTilt={6} className="h-full">
      <div className="group flex flex-col h-full bg-white border border-plum-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-plum-300 transition-all duration-300">
        <Link href={`/katalog/${product.slug}`} className="flex flex-col h-full">
          {/* Gambar buket */}
          <div className="relative aspect-4/3 w-full overflow-hidden bg-pastel-pink/40">
            <Image
              src={product.gambar}
              alt={product.nama}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />

            {/* Badge Label */}
            {product.label && (
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-block px-2.5 py-1 text-[11px] font-bold tracking-wide rounded-full bg-plum-900/90 text-white shadow-sm backdrop-blur-xs">
                  {product.label}
                </span>
              </div>
            )}

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={handleToggleLike}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-xs text-plum-900 hover:bg-white shadow-xs transition-transform active:scale-80"
              aria-label="Simpan ke wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isLiked
                    ? "fill-rose-500 text-rose-500 scale-110"
                    : "text-plum-700 hover:text-rose-500"
                }`}
              />
            </button>

            {/* Kategori tag overlay */}
            <div className="absolute bottom-3 left-3 z-10 flex flex-wrap gap-1">
              {product.kategori.slice(0, 2).map((kat) => (
                <span
                  key={kat}
                  className="inline-block px-2 py-0.5 text-[10px] font-medium rounded-md bg-white/90 text-plum-900 shadow-xs backdrop-blur-xs"
                >
                  {kat}
                </span>
              ))}
            </div>
          </div>

          {/* Info Konten */}
          <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-plum-900 line-clamp-1 group-hover:text-plum-600 transition-colors">
                {product.nama}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                </div>
                <span className="text-xs font-semibold text-plum-900">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-plum-800/60">
                  ({product.jumlahUlasan})
                </span>
              </div>
            </div>

            {/* Harga dan CTA */}
            <div className="pt-2 border-t border-plum-50 flex items-center justify-between gap-2 mt-auto">
              <div>
                <div className="text-base sm:text-lg font-bold text-plum-800">
                  {formatRupiah(product.harga)}
                </div>
                {product.hargaAsli && (
                  <div className="text-xs text-plum-800/50 line-through">
                    {formatRupiah(product.hargaAsli)}
                  </div>
                )}
              </div>

              <motion.button
                type="button"
                onClick={handleAddToCart}
                animate={btnBounced ? { scale: [1, 1.25, 0.95, 1] } : {}}
                transition={{ duration: 0.35 }}
                className="p-2.5 rounded-full bg-pastel-pink text-plum-800 hover:bg-plum-600 hover:text-white transition-all duration-200 active:scale-95 shadow-xs"
                aria-label={`Tambah ${product.nama} ke keranjang`}
                title="Tambah ke Keranjang"
              >
                <ShoppingBag className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </Link>
      </div>
    </TiltCard>
  );
}
