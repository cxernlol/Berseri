import React from "react";
import Image from "next/image";
import {
  Star,
  Sparkles,
  Heart,
  ShieldCheck,
  Users,
  MessageCircle,
} from "lucide-react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

export const metadata = {
  title: "Tentang Kami - Kembang Berseri Bandung",
  description:
    "Kisah Kembang Berseri merangkai cinta sejak 2021 di Bandung. Temui tim florist kami dan filosofi rangkaian bunga segar.",
};

export default function AboutPage() {
  const missionList = [
    "Menyediakan bunga segar berkualitas tinggi setiap hari",
    "Menciptakan rangkaian yang bermakna untuk setiap momen",
    "Memberikan pengalaman berbelanja yang mudah dan menyenangkan",
    "Mendukung petani bunga lokal Indonesia",
    "Menginspirasi kreativitas melalui workshop dan edukasi",
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-pastel-bg">
        {/* Header Hero */}
        <section className="py-16 sm:py-24 text-center bg-gradient-to-b from-pastel-pink/70 via-pastel-bg to-pastel-bg">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-plum-600">
              Tentang Kami
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-plum-900 leading-tight">
              Kembang Berseri
              <span className="block text-2xl sm:text-3xl font-semibold text-plum-700/80 mt-2">
                Merangkai Cinta Sejak 2021
              </span>
            </h1>
            <p className="text-base sm:text-lg text-plum-800/80 max-w-2xl mx-auto leading-relaxed">
              Kami percaya bahwa bunga adalah bahasa universal yang mampu
              mengungkapkan perasaan terdalam — rasa syukur, cinta, simpati,
              dan kebahagiaan.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-plum-100 shadow-2xs">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                ))}
              </div>
              <span className="text-xs font-bold text-plum-900">
                4.8 / 5 dari 500+ ulasan pelanggan
              </span>
            </div>
          </div>
        </section>

        {/* Kisah Kami (Sari) */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-plum-600">
                Kisah Kami
              </span>
              <h2 className="text-3xl font-extrabold text-plum-900">
                Berawal dari Sebuah Mimpi
              </h2>
              <div className="space-y-3 text-sm text-plum-800/80 leading-relaxed">
                <p>
                  Kembang Berseri dimulai dari kecintaan seorang florist muda
                  bernama <span className="font-bold text-plum-900">Sari</span> terhadap bunga.
                  Di sudut kecil Bandung, ia mulai merangkai buket untuk teman-temannya
                  yang akan wisuda, ulang tahun, dan perayaan lainnya.
                </p>
                <p>
                  Dari mulut ke mulut, nama Kembang Berseri mulai dikenal. Pelanggan
                  tidak hanya jatuh cinta pada keindahan buketnya, tapi juga pada
                  kehangatan pelayanan dan perhatian pada setiap detail kecil.
                </p>
                <p>
                  Kini, dengan tim kecil yang penuh semangat, kami terus berkomitmen
                  untuk menghadirkan kebahagiaan melalui setiap rangkaian bunga yang kami ciptakan.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=80"
                  alt="Florist Merangkai Bunga"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Visi & Misi */}
        <section className="py-16 bg-white border-y border-plum-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Visi */}
              <div className="p-8 rounded-3xl bg-pastel-pink/50 border border-plum-100 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-plum-600">
                  Visi Kami
                </span>
                <h3 className="text-2xl font-black text-plum-900">
                  Menjadi Florist Pilihan Utama
                </h3>
                <p className="text-sm text-plum-800/80 leading-relaxed">
                  Menjadi florist pilihan utama di Indonesia yang dikenal karena
                  kualitas bunga terbaik, kreativitas tanpa batas, dan pelayanan
                  yang sepenuh hati — menghadirkan kebahagiaan di setiap momen
                  kehidupan.
                </p>
              </div>

              {/* Misi */}
              <div className="p-8 rounded-3xl bg-pastel-pink/50 border border-plum-100 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-plum-600">
                  Misi Kami
                </span>
                <h3 className="text-2xl font-black text-plum-900">
                  Komitmen Kami
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-plum-800/90">
                  {missionList.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-plum-600 shrink-0">✿</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Keunggulan Kami (Mengapa Memilih Kami?) */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-plum-600">
              Keunggulan Kami
            </span>
            <h2 className="text-3xl font-extrabold text-plum-900">
              Mengapa Memilih Kami?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-plum-100 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-pastel-pink text-plum-700 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-plum-900">
                Bahan Segar Berkualitas
              </h4>
              <p className="text-xs text-plum-800/70 leading-relaxed">
                Setiap bunga dipilih langsung dari petani lokal pilihan setiap pagi agar selalu dalam kondisi terbaik.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-plum-100 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-pastel-pink text-plum-700 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-plum-900">
                Dirangkai dengan Cinta
              </h4>
              <p className="text-xs text-plum-800/70 leading-relaxed">
                Setiap buket dikerjakan oleh florist berpengalaman yang mencurahkan perhatian pada setiap detail.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-plum-100 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-pastel-pink text-plum-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-plum-900">
                Garansi Kepuasan
              </h4>
              <p className="text-xs text-plum-800/70 leading-relaxed">
                Jika kamu tidak puas, kami akan memperbaiki atau mengembalikan uangmu. Kepuasanmu adalah prioritas kami.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-plum-100 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-pastel-pink text-plum-700 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-plum-900">
                Komunitas yang Hangat
              </h4>
              <p className="text-xs text-plum-800/70 leading-relaxed">
                Bergabunglah dengan komunitas pecinta bunga kami melalui workshop dan kegiatan kreativitas.
              </p>
            </div>
          </div>
        </section>

        {/* Galeri Karya Kami */}
        <section className="py-16 bg-pastel-pink/30 border-t border-plum-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-plum-600">
                Galeri
              </span>
              <h2 className="text-3xl font-extrabold text-plum-900">
                Karya Pilihan Kami
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {galleryImages.map((src, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-plum-100 shadow-2xs group"
                >
                  <Image
                    src={src}
                    alt={`Galeri Karya ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl font-extrabold text-plum-900">
              Siap Memulai Momen Indahmu?
            </h2>
            <p className="text-sm text-plum-800/80">
              Hubungi kami dan biarkan florist kami membantu merangkai buket sempurna untuk orang tersayangmu.
            </p>
            <div>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Florist%20Kembang%20Berseri%2C%20saya%20ingin%20konsultasi%20pesanan%20bunga"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-plum-600 hover:bg-plum-700 text-white font-semibold text-sm shadow-md transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Hubungi Kami via WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
