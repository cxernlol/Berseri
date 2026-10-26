import { PRODUCTS } from "@/data/products";
import { Product, ProductCategory } from "@/types";

export async function getAllProducts(): Promise<Product[]> {
  // ponitail: in-memory mock. upgrade path: fetch from DB/API
  return PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // Pilihan terlaris dari desain Figma (5 produk unggulan)
  return PRODUCTS.filter((p) =>
    [
      "bouquet-mawar-rossa-romantis",
      "handbouquet-wisuda-pink-dreamy",
      "buket-tulip-pastel-dreamy",
      "handbouquet-wisuda-classic-white",
      "handbouquet-premium-rose-gold",
    ].includes(p.slug)
  );
}

export function getAllCategories(): ProductCategory[] {
  return [
    "Wisuda",
    "Ulang Tahun",
    "Anniversary",
    "Pernikahan",
    "Bela Sungkawa",
    "Ucapan",
  ];
}

export interface FilterOptions {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "terlaris" | "termurah" | "termahal" | "rating";
}

export function filterAndSortProducts(
  products: Product[],
  options: FilterOptions
): Product[] {
  let result = [...products];

  if (options.query && options.query.trim() !== "") {
    const q = options.query.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.nama.toLowerCase().includes(q) ||
        p.deskripsi.toLowerCase().includes(q) ||
        p.kategori.some((k) => k.toLowerCase().includes(q))
    );
  }

  if (options.category && options.category !== "Semua") {
    result = result.filter((p) =>
      p.kategori.includes(options.category as ProductCategory)
    );
  }

  if (options.minPrice !== undefined && options.minPrice > 0) {
    result = result.filter((p) => p.harga >= (options.minPrice || 0));
  }

  if (options.maxPrice !== undefined && options.maxPrice > 0) {
    result = result.filter((p) => p.harga <= (options.maxPrice || Infinity));
  }

  if (options.sortBy) {
    switch (options.sortBy) {
      case "termurah":
        result.sort((a, b) => a.harga - b.harga);
        break;
      case "termahal":
        result.sort((a, b) => b.harga - a.harga);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "terlaris":
      default:
        result.sort((a, b) => b.jumlahUlasan - a.jumlahUlasan);
        break;
    }
  }

  return result;
}
