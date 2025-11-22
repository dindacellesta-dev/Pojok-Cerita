"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const trimmed = code.trim();

    // ---- CEK LOGIN ----
    if (trimmed === "12345") {
      // Murid
      router.push("/beranda");
    } else if (trimmed.toLowerCase() === "12345-bk") {
      // Guru BK
      router.push("/bk/dashboard");
    } else {
      alert("Kode salah! Coba lagi.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#CDE7FF]">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-[350px]">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-5">
          Selamat Datang di Pojok Cerita
        </h1>

        <input
          type="text"
          placeholder="Masukkan kode"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
        >
          Masuk
        </button>
      </div>
    </div>
  );
}