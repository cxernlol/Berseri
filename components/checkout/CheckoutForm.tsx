"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Building2,
  QrCode,
  Banknote,
  CreditCard,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatRupiah } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export function CheckoutForm() {
  const { items, totalItems, subtotal, potonganDiskon, totalHarga, clearCart, isLoaded } =
    useCart();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    namaLengkap: "",
    nomorWhatsapp: "",
    email: "",
    alamatLengkap: "",
    kota: "Bandung",
    kodePos: "40123",
    tanggalPengiriman: "",
    waktuPengiriman: "Pagi (09.00 - 12.00 WIB)",
    metodePembayaran: "transfer_bank",
    catatanPesanan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  if (!isLoaded) {
    return (
      <div className="text-center py-24 text-plum-700 font-semibold text-sm">
        Memuat halaman pesanan...
      </div>
    );
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="max-w-md mx-auto text-center bg-white p-10 rounded-3xl border border-plum-100 shadow-sm space-y-4 my-8">
        <div className="text-3xl">🌸</div>
        <h2 className="text-xl font-bold text-plum-900">
          Tidak ada pesanan untuk diproses
        </h2>
        <p className="text-xs text-plum-800/70">
          Silakan pilih buket cantik di katalog kami terlebih dahulu.
        </p>
        <Link
          href="/katalog"
          className="inline-block px-6 py-2.5 rounded-full bg-plum-600 text-white font-semibold text-xs"
        >
          Ke Katalog
        </Link>
      </div>
    );
  }

  // SUCCESS SCREEN
  if (orderComplete) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-plum-100 shadow-md text-center space-y-6 my-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-plum-600 uppercase tracking-widest">
            Pesanan Berhasil Dibuat
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-plum-900">
            Terima Kasih, {form.namaLengkap}!
          </h1>
          <p className="text-xs sm:text-sm text-plum-800/80">
            Nomor Pesanan: <span className="font-mono font-bold text-plum-900">{orderComplete}</span>
          </p>
          <p className="text-xs text-plum-800/60 max-w-md mx-auto">
            Tim florist Kembang Berseri telah menerima pesananmu dan akan
            menyiapkan rangkaian bunga segar pilihan dengan penuh ketelitian.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-pastel-pink/60 border border-plum-100 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-plum-800/70">Tujuan Pengiriman:</span>
            <span className="font-semibold text-plum-900">{form.alamatLengkap}, {form.kota}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-plum-800/70">Jadwal Kirim:</span>
            <span className="font-semibold text-plum-900">
              {form.tanggalPengiriman || "Hari ini"} ({form.waktuPengiriman})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-plum-800/70">Total Tagihan:</span>
            <span className="font-bold text-plum-700">{formatRupiah(totalHarga)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={`https://wa.me/6281234567890?text=${encodeURIComponent(
              `Halo Florist Kembang Berseri! Saya telah membuat pesanan #${orderComplete} atas nama ${form.namaLengkap}. Mohon konfirmasi jadwal & pembayarannya.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Konfirmasi ke WhatsApp</span>
          </a>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-pastel-pink hover:bg-pastel-rose text-plum-900 font-semibold text-xs border border-plum-200"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.namaLengkap.trim()) {
      showToast("Nama lengkap wajib diisi.", "error");
      return;
    }
    if (!form.nomorWhatsapp.trim() || form.nomorWhatsapp.length < 8) {
      showToast("Nomor WhatsApp wajib diisi dengan benar.", "error");
      return;
    }
    if (!form.alamatLengkap.trim()) {
      showToast("Alamat pengiriman wajib diisi.", "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = "KB-" + Math.floor(100000 + Math.random() * 900000);
      setOrderComplete(orderId);
      clearCart();
      setIsSubmitting(false);
      showToast("Pesanan berhasil dikirim!", "success");
    }, 700);
  };

  const handleWhatsappDirect = () => {
    if (!form.namaLengkap.trim() || !form.nomorWhatsapp.trim()) {
      showToast("Isi nama dan nomor kontak terlebih dahulu.", "error");
      return;
    }

    const itemsSummary = items
      .map((it) => `- ${it.product.nama} (${it.quantity}x) = ${formatRupiah(it.product.harga * it.quantity)}`)
      .join("\n");

    const text = `Halo Florist Kembang Berseri! Saya ingin memproses pesanan:
Nama: ${form.namaLengkap}
WA: ${form.nomorWhatsapp}
Alamat: ${form.alamatLengkap || "Konfirmasi via chat"}
Waktu Kirim: ${form.tanggalPengiriman || "Segera"} - ${form.waktuPengiriman}

Daftar Item:
${itemsSummary}

Total: ${formatRupiah(totalHarga)}
Metode Bayar: ${form.metodePembayaran}
${form.catatanPesanan ? `Catatan: ${form.catatanPesanan}` : ""}`;

    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-plum-600">
          Checkout
        </span>
        <h1 className="text-3xl font-extrabold text-plum-900">Proses Pesanan</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Input Section */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Informasi Pemesan */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-plum-100 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-plum-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-plum-100 text-plum-800 text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Informasi Pemesan</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-plum-900 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama lengkap"
                  value={form.namaLengkap}
                  onChange={(e) => setForm({ ...form, namaLengkap: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-plum-900 mb-1">
                  Nomor HP / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0812-xxxx-xxxx"
                  value={form.nomorWhatsapp}
                  onChange={(e) => setForm({ ...form, nomorWhatsapp: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-plum-900 mb-1">
                  Email (opsional)
                </label>
                <input
                  type="email"
                  placeholder="contoh@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                />
              </div>
            </div>
          </div>

          {/* 2. Alamat Pengiriman */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-plum-100 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-plum-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-plum-100 text-plum-800 text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Alamat Pengiriman</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-plum-900 mb-1">
                  Alamat Lengkap *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan..."
                  value={form.alamatLengkap}
                  onChange={(e) => setForm({ ...form, alamatLengkap: e.target.value })}
                  className="w-full p-3 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-plum-900 mb-1">
                    Kota / Kabupaten *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.kota}
                    onChange={(e) => setForm({ ...form, kota: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum-900 mb-1">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    value={form.kodePos}
                    onChange={(e) => setForm({ ...form, kodePos: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-plum-900 mb-1">
                    Tanggal Pengiriman
                  </label>
                  <input
                    type="date"
                    value={form.tanggalPengiriman}
                    onChange={(e) => setForm({ ...form, tanggalPengiriman: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum-900 mb-1">
                    Waktu Pengiriman
                  </label>
                  <select
                    value={form.waktuPengiriman}
                    onChange={(e) => setForm({ ...form, waktuPengiriman: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                  >
                    <option>Pagi (09.00 - 12.00 WIB)</option>
                    <option>Siang (12.00 - 15.00 WIB)</option>
                    <option>Sore (15.00 - 18.00 WIB)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Metode Pembayaran (Figma Page 13 & 14) */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-plum-100 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-plum-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-plum-100 text-plum-800 text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>Metode Pembayaran</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: "transfer_bank",
                  icon: Building2,
                  title: "Transfer Bank",
                  subtitle: "BCA, Mandiri, BNI, BRI",
                },
                {
                  id: "qris",
                  icon: QrCode,
                  title: "QRIS",
                  subtitle: "GoPay, OVO, Dana, ShopeePay",
                },
                {
                  id: "cod",
                  icon: Banknote,
                  title: "COD (Bayar di Tempat)",
                  subtitle: "Khusus area Bandung",
                },
                {
                  id: "kartu_kredit",
                  icon: CreditCard,
                  title: "Kartu Kredit / Debit",
                  subtitle: "Visa, Mastercard",
                },
              ].map((m) => {
                const IconComp = m.icon;
                const isSelected = form.metodePembayaran === m.id;
                return (
                  <label
                    key={m.id}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-pastel-pink border-plum-600 shadow-2xs"
                        : "bg-pastel-bg border-plum-100 hover:border-plum-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.id}
                      checked={isSelected}
                      onChange={() => setForm({ ...form, metodePembayaran: m.id })}
                      className="mt-1 accent-plum-700"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-plum-900">
                        <IconComp className="w-4 h-4 text-plum-700" />
                        <span>{m.title}</span>
                      </div>
                      <p className="text-[11px] text-plum-800/60 mt-0.5">
                        {m.subtitle}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 4. Catatan Pesanan */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-plum-100 shadow-2xs space-y-3">
            <h2 className="text-base font-bold text-plum-900">Catatan Pesanan</h2>
            <textarea
              rows={2}
              placeholder="Contoh: 'Tolong tuliskan selamat ulang tahun di kartu untuk Mama', atau permintaan khusus lainnya..."
              value={form.catatanPesanan}
              onChange={(e) => setForm({ ...form, catatanPesanan: e.target.value })}
              className="w-full p-3 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
            />
          </div>
        </div>

        {/* Sidebar Ringkasan (Figma Page 14) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-plum-100 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-plum-900 border-b border-plum-50 pb-3">
            Ringkasan ({totalItems} item)
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((it) => (
              <div key={it.product.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-pastel-pink">
                    <Image
                      src={it.product.gambar}
                      alt={it.product.nama}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-plum-900 line-clamp-1">{it.product.nama}</p>
                    <p className="text-[10px] text-plum-800/60">Qty: {it.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold text-plum-900 whitespace-nowrap">
                  {formatRupiah(it.product.harga * it.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-3 border-t border-plum-100 text-xs text-plum-800/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-plum-900">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Ongkos kirim</span>
              <span>GRATIS</span>
            </div>
            {potonganDiskon > 0 && (
              <div className="flex justify-between text-rose-600 font-semibold">
                <span>Diskon Kupon</span>
                <span>-{formatRupiah(potonganDiskon)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-plum-100 flex justify-between items-center text-sm font-extrabold text-plum-900">
              <span>Total Tagihan</span>
              <span className="text-base text-plum-700">{formatRupiah(totalHarga)}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-2 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-plum-600 hover:bg-plum-700 disabled:bg-plum-300 text-white font-bold text-xs shadow-md transition-all active:scale-98"
            >
              {isSubmitting ? "Memproses..." : "Buat Pesanan"}
            </button>

            <button
              type="button"
              onClick={handleWhatsappDirect}
              className="w-full py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Pesan via WhatsApp</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-plum-800/60">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Transaksi aman & terjamin</span>
          </div>
        </div>
      </div>
    </form>
  );
}
