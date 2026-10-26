export type ProductCategory =
  | "Anniversary"
  | "Ulang Tahun"
  | "Wisuda"
  | "Pernikahan"
  | "Bela Sungkawa"
  | "Ucapan";

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  slug: string;
  nama: string;
  kategori: ProductCategory[];
  harga: number;
  hargaAsli?: number;
  rating: number;
  jumlahUlasan: number;
  label?: string;
  gambar: string;
  deskripsi: string;
  maknaBunga?: string;
  isiPaket?: string[];
  pilihanKustomisasi?: string[];
  ulasan?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  catatanKhusus?: string;
  kustomisasiPilihan?: {
    jumlahBunga?: string;
    warnaPita?: string;
    tambahCokelat?: boolean;
  };
}

export interface OrderForm {
  namaLengkap: string;
  nomorWhatsapp: string;
  email: string;
  alamatLengkap: string;
  kota: string;
  kodePos: string;
  tanggalPengiriman: string;
  waktuPengiriman: string;
  metodePembayaran: "transfer_bank" | "qris" | "cod" | "kartu_kredit";
  catatanPesanan: string;
}
