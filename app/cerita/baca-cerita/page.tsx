"use client";

import React, { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";

// Tipe data cerita
type Cerita = {
  id: string;
  judul?: string;
  isi?: string;
};

export default function BacaCeritaPage(): JSX.Element {
  const [listCerita, setListCerita] = useState<Cerita[]>([]);
  const [openId, setOpenId] = useState<string | null>(null); // untuk buka/tutup cerita
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
    });

    return () => unsub();
  }, []);

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));

    // scroll smooth ketika cerita dibuka
    setTimeout(() => {
      if (scrollRef.current[id]) {
        scrollRef.current[id]!.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#F1F5FF] px-5 py-8 flex flex-col items-center relative">
      {/* Tombol Kembali */}
      <button
        onClick={() => router.push("/beranda")}
        className="absolute top-4 left-4 bg-white text-gray-700 px-4 py-2 rounded-full shadow hover:bg-gray-100 z-50"
      >
        ←
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-10">
        Baca Cerita
      </h1>

      <div className="w-full max-w-xl space-y-5 pb-10">
        {li
