"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function PercayaDiriPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: "Ayo Percaya Diri!",
      content: (
        <p className="text-gray-700 leading-relaxed">
          Hai kamu 👋  
          Duduk sini dulu, yuk kita ngobrol pelan-pelan.  
          Kadang kita ngerasa minder, nggak cukup baik, atau takut salah.  
          Tenang… itu manusiawi banget kok.  
          Di sini kamu bakal jalan pelan-pelan bareng aku buat bangun rasa percaya dirimu 🌱✨
        </p>
      ),
    },
    {
      title: "Kenali Dirimu Dulu",
      content: (
        <p className="text-gray-700 leading-relaxed">
          Mulai dari hal sederhana: kamu suka apa?  
          Kamu kuat di bagian mana?  
          Kamu pernah bangga pada dirimu kapan?  
          Walau kecil, itu tetap pencapaian.  
          Coba bilang ke diri sendiri:  
          <i>“Aku punya kekuatan, meskipun belum semuanya kelihatan.”</i>
        </p>
      ),
    },
    {
      title: "Keluar dari Zona Nyaman (Pelan-pelan)",
      content: (
        <p className="text-gray-700 leading-relaxed">
          Kamu nggak harus langsung jadi yang paling berani.  
          Confidence itu kayak otot — dilatih pelan-pelan.  
          Berani ngomong sedikit, berani coba sedikit,  
          berani bilang, “aku mau belajar.”  
          Itu sudah luar biasa 💪✨
        </p>
      ),
    },
    {
      title: "Berhenti Bandingkan Diri",
      content: (
        <p className="text-gray-700 leading-relaxed">
          Perbandingan itu pencuri kebahagiaan.  
          Ingat, tiap orang punya waktunya masing-masing.  
          Kamu nggak telat. Kamu cuma di jalur yang berbeda.  
          Fokus jadi diri sendiri versi lebih baik dari kemarin.
        </p>
      ),
    },
    {
      title: "Bicara Baik ke Diri Sendiri",
      content: (
        <p className="text-gray-700 leading-relaxed">
          Self-talk itu penting banget secara psikologis.  
          Coba bilang ini dalam hati:  
          <i>“Aku berkembang, aku belajar, aku pantas dicoba.”</i>  
          Kalimat kecil, tapi efeknya besar banget.
        </p>
      ),
    },
    {
      title: "Rayakan Progress Kecilmu",
      content: (
        <p className="text-gray-700 leading-relaxed">
          Selalu rayakan hal kecil:  
          Kamu bangun pagi? Keren.  
          Kamu coba hal baru? Mantap.  
          Kamu jujur dengan perasaanmu? Luar biasa.  
          Kamu lagi tumbuh… dan itu sesuatu yang patut dibanggakan 🌿💛
        </p>
      ),
    },
    {
      title: "Rekomendasi Video",
      content: (
        <div className="text-gray-700">
          <p className="mb-3">
            Mau belajar lebih dalam soal percaya diri?  
            Ini video dari Gita Savitri yang cocok banget:
          </p>

          <a
            href="https://youtu.be/4Op3RS3cobo"
            target="_blank"
            className="block"
          >
            <img
              src="https://img.youtube.com/vi/4Op3RS3cobo/maxresdefault.jpg"
              className="rounded-xl shadow-md hover:opacity-90 transition"
            />
          </a>
        </div>
      ),
    },
  ];

  const nextPage = () => {
    if (page < pages.length - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div className="min-h-screen bg-[#CDE7FF] px-6 py-10 flex flex-col items-center">

      {/* Tombol Kembali */}
      <button
        onClick={() => router.push("/beranda")}
        className="absolute top-4 left-4 bg-white text-gray-700 px-4 py-2 rounded-full shadow hover:bg-gray-100 z-50"
      >
        ←
      </button>

      {/* Buku */}
      <div className="bg-[#FFFDF7] w-full max-w-2xl p-6 rounded-2xl shadow-lg border-[3px] border-[#F3E6C9]">

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
              {pages[page].title}
            </h1>

            <div className="text-[16px] leading-relaxed">
              {pages[page].content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tombol Navigasi */}
        <div className="flex justify-between mt-8">
          {page > 0 ? (
            <button
              onClick={prevPage}
              className="px-4 py-2 bg-white rounded-xl shadow hover:bg-gray-100"
            >
              ← Sebelumnya
            </button>
          ) : <div></div>}

          {page < pages.length - 1 ? (
            <button
              onClick={nextPage}
              className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600"
            >
              Lanjut →
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}