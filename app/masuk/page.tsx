"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Email dan kata sandi wajib diisi.", "error");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast("Berhasil masuk ke akun Kembang Berseri!", "success");
      router.push("/");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-pastel-bg flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Tombol Kembali */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-plum-800 hover:text-plum-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </Link>
        </div>

        {/* Card Login */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-plum-100 shadow-md space-y-6">
          <div className="text-center space-y-2">
            <Link href="/" className="inline-block">
              <span className="font-brand text-4xl text-plum-900">Kembang</span>
              <span className="block text-xs tracking-[0.35em] uppercase font-semibold text-plum-700/80 -mt-2">
                Berseri
              </span>
            </Link>
            <h1 className="text-2xl font-black text-plum-900 pt-2">
              Selamat datang kembali! 👋
            </h1>
            <p className="text-xs text-plum-800/70">
              Masuk ke akun Kembang Berseri-mu
            </p>
          </div>

          {/* Social SSO */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => showToast("Login Google (tampilan saja)", "info")}
              className="w-full py-2.5 px-4 rounded-xl border border-plum-200 bg-white hover:bg-pastel-pink text-xs font-bold text-plum-900 flex items-center justify-center gap-2.5 transition-colors shadow-2xs"
            >
              <span className="text-blue-500 font-bold">G</span>
              <span>Lanjutkan dengan Google</span>
            </button>

            <button
              type="button"
              onClick={() => showToast("Login Facebook (tampilan saja)", "info")}
              className="w-full py-2.5 px-4 rounded-xl border border-plum-200 bg-white hover:bg-pastel-pink text-xs font-bold text-plum-900 flex items-center justify-center gap-2.5 transition-colors shadow-2xs"
            >
              <span className="text-blue-600 font-bold">f</span>
              <span>Lanjutkan dengan Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-plum-100 w-full" />
            <span className="bg-white px-3 text-[11px] text-plum-800/50 uppercase font-semibold">
              atau masuk dengan email
            </span>
          </div>

          {/* Form Email */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-plum-900 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-plum-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="contoh@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-plum-900">
                  Kata Sandi
                </label>
                <button
                  type="button"
                  onClick={() =>
                    showToast("Tautan reset kata sandi dikirim ke email.", "info")
                  }
                  className="text-[11px] text-plum-600 hover:underline"
                >
                  Lupa kata sandi?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-plum-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Min. 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-pastel-bg border border-plum-200 rounded-xl text-plum-900 focus:outline-hidden focus:border-plum-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-plum-600 hover:bg-plum-700 disabled:bg-plum-300 text-white font-bold text-xs shadow-sm transition-all active:scale-98"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center text-xs text-plum-800/70 pt-2 border-t border-plum-50">
            Belum punya akun?{" "}
            <Link
              href="/daftar"
              className="font-bold text-plum-600 hover:underline"
            >
              Daftar sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
