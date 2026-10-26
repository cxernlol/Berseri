"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nomorHp: "",
    password: "",
    agreeTerms: true,
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleStepOneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim() || !formData.email.trim() || !formData.password) {
      showToast("Lengkapi semua kolom pendaftaran.", "error");
      return;
    }
    if (formData.password.length < 8) {
      showToast("Kata sandi minimal 8 karakter.", "error");
      return;
    }
    if (!formData.agreeTerms) {
      showToast("Setujui Syarat & Ketentuan terlebih dahulu.", "error");
      return;
    }

    setStep(2);
    showToast(`Kode 6 digit dikirimkan ke ${formData.email}`, "info");
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      showToast("Masukkan 6 digit kode verifikasi lengkap.", "error");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast("Pendaftaran berhasil! Selamat datang di Kembang Berseri.", "success");
      router.push("/");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-pastel-bg flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-6">
        <div>
          <button
            type="button"
            onClick={() => (step === 2 ? setStep(1) : router.back())}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-plum-800 hover:text-plum-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-plum-100 shadow-md space-y-6">
          {/* Brand header */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-block">
              <span className="font-brand text-4xl text-plum-900">Kembang</span>
              <span className="block text-xs tracking-[0.35em] uppercase font-semibold text-plum-700/80 -mt-2">
                Berseri
              </span>
            </Link>

            {/* Stepper (Figma Page 10 & 11) */}
            <div className="flex items-center justify-center gap-4 pt-3">
              <div
                className={`flex items-center gap-1.5 text-xs font-bold ${
                  step === 1 ? "text-plum-900" : "text-plum-800/50"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step === 1
                      ? "bg-plum-900 text-white"
                      : "bg-emerald-100 text-emerald-700 font-bold"
                  }`}
                >
                  {step > 1 ? "✓" : "1"}
                </span>
                <span>Informasi Akun</span>
              </div>
              <span className="text-plum-200">/</span>
              <div
                className={`flex items-center gap-1.5 text-xs font-bold ${
                  step === 2 ? "text-plum-900" : "text-plum-800/50"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step === 2
                      ? "bg-plum-900 text-white"
                      : "bg-pastel-pink text-plum-600"
                  }`}
                >
                  2
                </span>
                <span>Verifikasi</span>
              </div>
            </div>
          </div>

          {/* STEP 1: FORM PENDAFTARAN */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <h1 className="text-xl font-black text-plum-900">
                  Buat Akun Baru 🌸
                </h1>
                <p className="text-xs text-plum-800/70">
                  Bergabunglah dengan komunitas Kembang Berseri
                </p>
              </div>

              {/* Social Google */}
              <button
                type="button"
                onClick={() => showToast("Daftar Google (tampilan saja)", "info")}
                className="w-full py-2.5 px-4 rounded-xl border border-plum-200 bg-white hover:bg-pastel-pink text-xs font-bold text-plum-900 flex items-center justify-center gap-2.5 transition-colors shadow-2xs"
              >
                <span className="text-blue-500 font-bold">G</span>
                <span>Daftar dengan Google</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-plum-100 w-full" />
                <span className="bg-white px-3 text-[11px] text-plum-800/50 uppercase font-semibold">
                  atau daftar dengan email
                </span>
              </div>

              <form onSubmit={handleStepOneSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-plum-900 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama kamu"
                    value={formData.nama}
                    onChange={(e) =>
                      setFormData({ ...formData, nama: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum-900 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contoh@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum-900 mb-1">
                    Nomor HP / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={formData.nomorHp}
                    onChange={(e) =>
                      setFormData({ ...formData, nomorHp: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum-900 mb-1">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Min. 8 karakter"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                  />
                </div>

                <label className="flex items-start gap-2 pt-1 text-[11px] text-plum-800/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) =>
                      setFormData({ ...formData, agreeTerms: e.target.checked })
                    }
                    className="mt-0.5 accent-plum-700"
                  />
                  <span>
                    Saya setuju dengan Syarat & Ketentuan dan Kebijakan Privasi
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-plum-600 hover:bg-plum-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Lanjutkan
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: VERIFIKASI OTP 6 DIGIT (Figma Page 11 & 26) */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-3xl">🌸</span>
                <h1 className="text-xl font-black text-plum-900">
                  Verifikasi Email
                </h1>
                <p className="text-xs text-plum-800/70">
                  Kami telah mengirimkan kode verifikasi ke{" "}
                  <span className="font-bold text-plum-900">
                    {formData.email}
                  </span>
                </p>
                <p className="text-[11px] text-plum-800/50">
                  Masukkan kode 6 digit yang telah dikirimkan
                </p>
              </div>

              <form onSubmit={handleVerify} className="space-y-6">
                <div className="flex justify-center gap-2 sm:gap-2.5">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-10 sm:w-12 h-12 text-center text-lg font-bold bg-pastel-bg border border-plum-200 rounded-xl focus:outline-hidden focus:border-plum-600 focus:ring-2 focus:ring-plum-400/20 text-plum-900"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-full bg-plum-600 hover:bg-plum-700 disabled:bg-plum-300 text-white font-bold text-xs shadow-sm transition-all"
                >
                  {isLoading ? "Memverifikasi..." : "Verifikasi & Daftar"}
                </button>

                <div className="text-center text-xs text-plum-800/70 flex items-center justify-center gap-1">
                  <span>Tidak menerima kode?</span>
                  <button
                    type="button"
                    onClick={() =>
                      showToast("Kode baru telah dikirim ulang ke email.", "info")
                    }
                    className="font-bold text-plum-600 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Kirim ulang</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Sudah punya akun */}
          <div className="text-center text-xs text-plum-800/70 pt-2 border-t border-plum-50">
            Sudah punya akun?{" "}
            <Link
              href="/masuk"
              className="font-bold text-plum-600 hover:underline"
            >
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
