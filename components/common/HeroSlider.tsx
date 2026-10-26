"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export interface SlideData {
  id: number;
  subtitle: string;
  title: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  alt: string;
}

// Data slide hero - mudah diedit atau ditambah
export const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    subtitle: "RANGKAIAN BUNGA SEGAR & ABADI",
    title: "Keindahan di Setiap Kelopak",
    buttonText: "LIHAT KATALOG",
    buttonLink: "#katalog",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1920&q=85",
    alt: "Keindahan di Setiap Kelopak - Kembang Berseri",
  },
  {
    id: 2,
    subtitle: "UNTUK MOMEN SPESIAL BERHARGA",
    title: "Buket & Dekorasi Bunga Custom",
    buttonText: "JELAJAHI KOLEKSI",
    buttonLink: "/katalog",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1920&q=85",
    alt: "Buket & Dekorasi Bunga Custom",
  },
  {
    id: 3,
    subtitle: "PENGIRIMAN HARI YANG SAMA BANDUNG & SEKITARNYA",
    title: "Ungkapkan Perasaan Terdalammu",
    buttonText: "PESAN CUSTOM",
    buttonLink: "https://wa.me/6281234567890?text=Halo%20Kembang%20Berseri%2C%20saya%20ingin%20pesan%20bunga%20custom",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1920&q=85",
    alt: "Ungkapkan Perasaan Terdalammu",
  },
];

interface HeroSliderProps {
  slides?: SlideData[];
  autoSlideInterval?: number; // milidetik
}

export function HeroSlider({
  slides = HERO_SLIDES,
  autoSlideInterval = 5000,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  // Auto-slide setiap 5 detik
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [nextSlide, autoSlideInterval, slides.length]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-neutral-900 select-none">
      {/* Background Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center transform scale-100 transition-transform duration-7000 ease-out"
            />
            {/* Overlay tipis agar teks selalu kontras & terbaca */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        );
      })}

      {/* Konten Hero di Tengah (Horizontal & Vertikal) */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center justify-center">
        {slides.map((slide, index) => {
          if (index !== currentIndex) return null;
          return (
            <div
              key={slide.id}
              className="flex flex-col items-center animate-fadeIn"
            >
              {/* Subjudul kecil */}
              <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/90 font-medium mb-3 sm:mb-4">
                {slide.subtitle}
              </p>

              {/* Judul besar responsif */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-wide text-white uppercase sm:capitalize leading-tight mb-8 max-w-3xl drop-shadow-sm">
                {slide.title}
              </h1>

              {/* Tombol CTA plum sudut membulat */}
              <Link
                href={slide.buttonLink}
                className="inline-block bg-plum-900 hover:bg-plum-800 text-white font-medium text-xs sm:text-sm tracking-[0.2em] uppercase px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 shadow-lg border border-plum-700/50"
              >
                {slide.buttonText}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Tombol Navigasi Kiri */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Slide Sebelumnya"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2 text-white/60 hover:text-white transition-colors duration-200"
      >
        <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.2]" />
      </button>

      {/* Tombol Navigasi Kanan */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Slide Berikutnya"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 text-white/60 hover:text-white transition-colors duration-200"
      >
        <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.2]" />
      </button>

      {/* Indikator Titik (Dots) Slide */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ke slide ${index + 1}`}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Link Cepat ke Katalog Bawah */}
      <Link
        href="#katalog"
        aria-label="Lihat Katalog"
        className="hidden sm:inline-flex absolute bottom-7 right-6 sm:right-10 z-20 items-center gap-1.5 text-white/80 hover:text-white text-xs tracking-widest uppercase transition-colors"
      >
        <span>Katalog Bunga</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </Link>
    </section>
  );
}
