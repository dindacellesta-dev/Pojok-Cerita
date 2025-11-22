"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LoginBK() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");

    if (!code.trim()) {
      setError("Masukkan kode sekolah.");
      return;
    }

    const ref = doc(db, "schools", code.trim());
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      setError("Kode sekolah tidak ditemukan.");
      return;
    }

    // Simpan data login sederhana
    localStorage.setItem("schoolId", code.trim());
    localStorage.setItem("role", "bk");

    router.push("/bk/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#CDE7FF] px-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Login Guru BK</h1>

      <input
        className="p-3 w-full max-w-md bg-white rounded-xl border"
        placeholder="Masukkan Kode Sekolah (contoh: 12345-BK)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-600"
        onClick={login}
      >
        Masuk
      </button>

      {error && <p className="mt-3 text-red-600">{error}</p>}
    </div>
  );
}