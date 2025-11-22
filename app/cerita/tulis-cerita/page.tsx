"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { findFlaggedWords } from "@/utils/urgentChecker";

export default function TulisCeritaPage() {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");

  const submitCerita = async () => {
    // 🔍 Deteksi kata terlarang
    const flagged = findFlaggedWords(judul + " " + isi);
    const isUrgent = flagged.length > 0;

    await addDoc(collection(db, "cerita"), {
      judul,
      isi,
      createdAt: serverTimestamp(),

      // 🆕 data tambahan untuk urgent
      isUrgent: isUrgent,
      flaggedWords: flagged,
    });

    alert("Cerita berhasil disimpan ✨");
    setJudul("");
    setIsi("");
  };

  return (
    <div className="min-h-screen bg-[#F5F9FF] px-6 py-10 flex flex-col items-center relative">

      {/* Tombol Kembali */}
      <button
        onClick={() => router.push("/beranda")}
        className="absolute top-4 left-4 bg-white text-gray-700 px-4 py-2 rounded-full shadow hover:bg-gray-100 z-50"
      >
        ← 
      </button>

      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg px-6 py-6 border border-[#E3ECFF] mt-10">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
           Tulis Cerita Kamu
        </h1>

        {/* Input Judul */}
        <input
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="Judul Cerita..."
          className="w-full p-3 mb-4 rounded-xl bg-[#F8FBFF] border border-[#D9E6FF] outline-none 
                     focus:ring-2 focus:ring-[#9EC5FF] transition"
        />

        {/* Input Isi Cerita */}
        <textarea
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          placeholder="Tulis isi cerita kamu di sini..."
          className="w-full p-3 h-40 rounded-xl bg-[#F8FBFF] border border-[#D9E6FF] outline-none
                     focus:ring-2 focus:ring-[#9EC5FF] transition"
        />

        {/* Tombol Submit */}
        <button
          onClick={submitCerita}
          className="mt-5 w-full bg-gradient-to-r from-[#7AB3FF] to-[#A3C8FF] 
                     text-white py-3 rounded-2xl text-lg font-semibold shadow-md
                     hover:opacity-90 transition"
        >
          Simpan Cerita 
        </button>
      </div>

    </div>
  );
}