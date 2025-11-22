"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function UrgentPage() {
  const [urgentList, setUrgentList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(
      collection(db, "cerita"),
      where("isUrgent", "==", true),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUrgentList(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F5FF] px-6 py-10">

      {/* Tombol Kembali */}
      <button
        onClick={() => router.push("/bk/dashboard")}
        className="bg-white px-4 py-2 rounded-full shadow hover:bg-gray-100 mb-6"
      >
        ← Kembali
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        🚨 Cerita Urgent
      </h1>

      {urgentList.length === 0 && (
        <p className="text-gray-600">Tidak ada cerita urgent 😊</p>
      )}

      <div className="space-y-4">
        {urgentList.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl p-5 shadow border border-[#E0E8FF]"
          >
            <h2 className="text-lg font-semibold text-gray-900">{c.judul}</h2>

            <p className="text-gray-700 mt-2 whitespace-pre-line">
              {c.isi}
            </p>

            <p className="mt-3 text-sm text-red-600">
              ⚠ Kata terdeteksi: {c.flaggedWords.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}