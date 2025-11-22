"use client";
import { useRouter } from "next/navigation";

export default function Beranda() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#CDE7FF] px-6 py-10">

      {/* Header */}
      <header className="w-full">
        <div className="px-6 py-3 bg-[#F4FBFF] flex items-center rounded-b-2xl shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">Pojok Cerita</h1>
        </div>
      </header>

      {/* Garis pemisah */}
      <div className="w-full h-3 bg-[#E3F1FF] mb-10"></div>

      {/* Menu 3 kotak */}
      <div className="flex gap-4 justify-center flex-wrap max-w-3xl mb-16">

        {/* Tulis Cerita */}
        <button
          onClick={() => router.push("/cerita/tulis-cerita")}
          className="bg-white w-44 h-44 rounded-xl shadow-md flex flex-col items-center justify-center text-center
                     text-gray-700 hover:bg-gray-100 transition"
        >
          <span className="mt-2 font-semibold">Tulis Cerita</span>
        </button>

        {/* Baca Cerita */}
        <button
          onClick={() => router.push("/cerita/baca-cerita")}
          className="bg-white w-44 h-44 rounded-xl shadow-md flex flex-col items-center justify-center text-center
                     text-gray-700 hover:bg-gray-100 transition"
        >
          <span className="mt-2 font-semibold">Baca Cerita</span>
        </button>

        {/* Chat Kuyo */}
        <button
          onClick={() => router.push("/chat-kuyo")}
          className="bg-white w-44 h-44 rounded-xl shadow-md flex flex-col items-center justify-center text-center
                     text-gray-700 hover:bg-gray-100 transition"
        >
          <span className="mt-2 font-semibold">Ngobrol dengan Kuyo</span>
        </button>

        {/* Percaya Diri */}
<button
  onClick={() => router.push("/percaya-diri")}
  className="bg-white w-44 h-44 rounded-xl shadow-md flex flex-col items-center justify-center text-center
             text-gray-700 hover:bg-gray-100 transition"
>
  <span className="mt-2 font-semibold">Ayo Percaya Diri!</span>
</button>
      </div>

      {/* Quote */}
      <div className="text-center text-gray-700 italic mb-6">
        "Ceritakan lelahmu hari ini, dan kembalilah dengan cerita yang lebih bahagia"
      </div>

      {/* Info Developer */}
      <div className="text-center text-sm text-gray-600 mb-6">
        oleh <b>Dinda Celesta</b> • @dinclst_ <br />
        081385102991 <br />
        since 2025
      </div>

      {/* Feedback */}
      <div className="w-full max-w-2xl bg-white p-5 rounded-xl shadow-md mb-10">
        <h3 className="font-semibold text-gray-700 mb-2 text-center">Feedback</h3>
        <textarea
          className="w-full p-3 border rounded-lg outline-none"
          rows={2}
          placeholder="Tulis feedback kamu..."
        ></textarea>
        <button className="w-full mt-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          Kirim
        </button>
      </div>

    </div>
  );
}