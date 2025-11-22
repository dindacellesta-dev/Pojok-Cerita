"use client";

import { useRouter } from "next/navigation";

export default function BKDashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#CDE7FF] p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Guru BK</h1>

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => router.push("/bk/urgent")}
          className="bg-red-500 text-white p-4 rounded-xl shadow-lg text-left"
        >
          🚨 Urgent Case
        </button>

        <button
          onClick={() => router.push("/bk/cerita")}
          className="bg-blue-600 text-white p-4 rounded-xl shadow-lg text-left"
        >
          📘 Baca Cerita Murid
        </button>

        <button
          onClick={() => router.push("/bk/chat")}
          className="bg-purple-500 text-white p-4 rounded-xl shadow-lg text-left"
        >
          💬 Chat (Coming Soon)
        </button>
      </div>
    </div>
  );
}