"use client";

import { useRouter } from "next/navigation";
import ChatBox from "../components/ChatBox"; // JALUR YANG BENAR

export default function ChatKuyoPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-[#CDE7FF]">
      {/* Tombol Kembali */}
      <button
        onClick={() => router.push("/beranda")}
        className="absolute top-4 left-4 bg-white text-gray-700 px-4 py-2 rounded-full shadow hover:bg-gray-100 z-50"
      >
        ← 
      </button>

      {/* ChatBox */}
      <ChatBox />
    </div>
  );
}