"use client";

import React, { useState, useMemo, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { filterAndSortProducts, getAllCategories } from "@/lib/products";
import { motion, AnimatePresence } from "motion/react";

interface CatalogContentProps {
  initialProducts: Product[];
}

export function CatalogContent({ initialProducts }: CatalogContentProps) {
  const searchParams = useSearchParams();
  const initialKategoriParam = searchParams.get("kategori") || "Semua";

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialKategoriParam);
  const [sortBy, setSortBy] = useState<"terlaris" | "termurah" | "termahal" | "rating">("terlaris");
  const [pricePreset, setPricePreset] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [, startTransition] = useTransition();

  const categories = useMemo(() => ["Semua", ...getAllCategories()], []);

  // Handle Preset Price Selection
  const handlePricePreset = (val: string) => {
    setPricePreset(val);
    if (val === "100-175") {
      setMinPrice("100000");
      setMaxPrice("175000");
    } else if (val === "150-225") {
      setMinPrice("150000");
      setMaxPrice("225000");
    } else if (val === "200-350") {
      setMinPrice("200000");
      setMaxPrice("350000");
    } else {
      setMinPrice("");
      setMaxPrice("");
    }
  };

  const handleResetFilter = () => {
    setQuery("");
    setSelectedCategory("Semua");
    setSortBy("terlaris");
    setPricePreset("all");
    setMinPrice("");
    setMaxPrice("");
  };

  const isFiltered =
    query.trim() !== "" ||
    selectedCategory !== "Semua" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    sortBy !== "terlaris";

  const filteredProducts = useMemo(() => {
    const min = minPrice ? parseInt(minPrice, 10) : undefined;
    const max = maxPrice ? parseInt(maxPrice, 10) : undefined;

    return filterAndSortProducts(initialProducts, {
      query,
      category: selectedCategory === "Semua" ? undefined : selectedCategory,
      minPrice: isNaN(min as number) ? undefined : min,
      maxPrice: isNaN(max as number) ? undefined : max,
      sortBy,
    });
  }, [initialProducts, query, selectedCategory, minPrice, maxPrice, sortBy]);

  return (
    <div className="space-y-8">
      {/* Search Bar & Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-plum-100 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-plum-600">
            Katalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-plum-900">
            Temukan Buket Sempurnamu
          </h1>
          <p className="text-sm text-plum-800/70">
            Pilihan buket terbaik untuk setiap momen istimewa
          </p>
        </div>

        {/* Input Search */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-plum-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => startTransition(() => setQuery(e.target.value))}
            placeholder="Cari nama buket atau kata kunci..."
            className="w-full pl-12 pr-4 py-3.5 bg-pastel-bg border border-plum-200 rounded-full text-sm text-plum-900 placeholder:text-plum-800/50 focus:outline-hidden focus:ring-2 focus:ring-plum-500/30 focus:border-plum-600 transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {categories.map((kat) => {
            const isSelected = selectedCategory === kat;
            return (
              <button
                key={kat}
                type="button"
                onClick={() => setSelectedCategory(kat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isSelected
                    ? "bg-plum-900 text-white shadow-sm"
                    : "bg-pastel-pink/70 text-plum-800 hover:bg-pastel-rose border border-plum-100"
                }`}
              >
                {kat === "Semua" ? "🌸 Semua Momen" : kat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Bar & Sorting Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-plum-100 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
              showFilters
                ? "bg-plum-100 text-plum-900 border-plum-300"
                : "bg-pastel-bg text-plum-800 border-plum-200 hover:bg-plum-50"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter Rentang Harga</span>
          </button>

          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilter}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Hapus Filter</span>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs font-medium text-plum-800/70">
            {filteredProducts.length} produk ditemukan
          </span>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-xs text-plum-800/70 font-semibold whitespace-nowrap">
              Urutkan:
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "terlaris" | "termurah" | "termahal" | "rating"
                )
              }
              className="text-xs font-semibold bg-pastel-bg border border-plum-200 rounded-xl px-3 py-2 text-plum-900 focus:outline-hidden focus:border-plum-600"
            >
              <option value="terlaris">Terlaris</option>
              <option value="termurah">Harga: Rendah ke Tinggi</option>
              <option value="termahal">Harga: Tinggi ke Rendah</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expanded Price Filter Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-6 rounded-2xl border border-plum-100 shadow-2xs space-y-4">
              <h4 className="text-sm font-bold text-plum-900">Rentang Harga</h4>

              {/* Preset Buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Semua Harga", val: "all" },
                  { label: "Rp 100.000 – Rp 175.000", val: "100-175" },
                  { label: "Rp 150.000 – Rp 225.000", val: "150-225" },
                  { label: "Rp 200.000 – Rp 350.000", val: "200-350" },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => handlePricePreset(item.val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      pricePreset === item.val
                        ? "bg-plum-900 text-white border-plum-900"
                        : "bg-pastel-bg text-plum-800 border-plum-200 hover:bg-pastel-pink"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Custom Min / Max input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-plum-800/70 mb-1">
                    Harga Minimum (Rp)
                  </label>
                  <input
                    type="number"
                    placeholder="Contoh: 100000"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setPricePreset("custom");
                    }}
                    className="w-full px-3 py-2 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-plum-800/70 mb-1">
                    Harga Maksimum (Rp)
                  </label>
                  <input
                    type="number"
                    placeholder="Contoh: 300000"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setPricePreset("custom");
                    }}
                    className="w-full px-3 py-2 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Produk Hasil Filter */}
      {filteredProducts.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((prod) => (
            <motion.div
              key={prod.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard product={prod} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* Empty State */
        <div className="bg-white p-12 text-center rounded-3xl border border-dashed border-plum-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-pastel-pink text-plum-700 flex items-center justify-center mx-auto text-2xl">
            🌸
          </div>
          <h3 className="text-lg font-bold text-plum-900">
            Tidak ada buket yang sesuai
          </h3>
          <p className="text-xs sm:text-sm text-plum-800/70 max-w-sm mx-auto">
            Coba gunakan kata kunci lain atau bersihkan filter pencarian dan rentang harga.
          </p>
          <button
            type="button"
            onClick={handleResetFilter}
            className="px-6 py-2.5 rounded-full bg-plum-600 text-white font-semibold text-xs shadow-sm hover:bg-plum-700 transition-colors"
          >
            Hapus Semua Filter
          </button>
        </div>
      )}
    </div>
  );
}
