"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

// Tipe data cerita
type Cerita = {
  id: string;
  judul: string;
  isi: string;
  isUrgent?: boolean;
  balasan?: string;
};

export default function BK_BacaCeritaPage() {
  const [listCerita, setListCerita] = useState<Cerita[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [balasanInput, setBalasanInput] = useState<Record<string, string>>({});
  const router = useRouter();

  const scrollRef = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const q = query(collection(db, "cerita"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Cerita[];
      setListCerita(data);

      // isi balasan awal saat data masuk
      const obj: Record<string, string> = {};
      data.forEach((c) => {
        obj[c.id] = c.balasan || "";
      });
      setBalasanInput(obj);
    });

    return () => unsub();
  }, []);

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
    setTimeout(() => {
      if (scrollRef.current[id]) {
        scrollRef.current[id]!.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  };

  const kirimBalasan = async (id: string) => {
    await updateDoc(doc(db, "cerita", id), {
      balasan: balasanInput[id],
    });

    alert("Balasan terkirim!");
  };

  return (
    <div className="min-h-screen bg-[#CDE7FF] px-5 py-8 flex flex-col items-center relative">
      {/* Tombol Kembali */}
      <button
        onClick={() => router.push("/bk/dashboard")}
        className="absolute top-4 left-4 bg-white text-gray-700 px-4 py-2 rounded-full shadow hover:bg-gray-100 z-50"
      >
        ←
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-10">
        Baca Cerita Murid
      </h1>

      <div className="w-full max-w-xl space-y-5 pb-10">
        {listCerita.map((c) => (
          <div
            key={c.id}
            ref={(el) => (scrollRef.current[c.id] = el)}
            className="bg-white border border-[#DDE7FF] rounded-3xl shadow-md p-5"
          >
            {/* Header + URGENT tag */}
            <button
              onClick={() => toggleOpen(c.id)}
              className="w-full text-left flex justify-between items-center"
            >
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                {c.judul}

                {c.isUrgent && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    URGENT
                  </span>
                )}
              </h2>

              <span className="text-gray-600">
                {openId === c.id ? "▲" : "▼"}
              </span>
            </button>

            {/* Isi cerita */}
            {openId === c.id && (
              <div className="mt-3">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-4">
                  {c.isi}
                </p>

                {/* Balasan Guru BK */}
