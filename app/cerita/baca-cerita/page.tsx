"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function BacaCeritaPage() {
  const [listCerita, setListCerita] = useState([]);
  const [openId, setOpenId] = useState(null); // buat buka tutup cerita
  const router = useRouter();

  const scrollRef = useRef({});

  useEffect(() => {
    const q = query(collection(db, "cerita"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListCerita(data);
    });

    return () => unsub();
  }, []);

  const toggleOpen = (id) => {
    setOpenId((prev) => (prev === id ? null : id));

    // scroll smooth ketika cerita dibuka
    setTimeout(() => {
      if (scrollRef.current[id]) {
        scrollRef.current[id].scrollIntoView({
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

        {listCerita.map((c) => (
          <div
            key={c.id}
            ref={(el) => (scrollRef.current[c.id] = el)}
            className="bg-white border border-[#DDE7FF] rounded-3xl shadow-md p-5"
          >
            {/* Judul */}
            <button
              onClick={() => toggleOpen(c.id)}
              className="w-full text-left flex justify-between items-center"
            >
              <h2 className="text-lg font-semibold text-gray-900">{c.judul}</h2>
              <span className="text-gray-600">
                {openId === c.id ? "▲" : "▼"}
              </span>
            </button>

            {/* Isi cerita (expandable) */}
            {openId === c.id && (
              <p className="text-gray-700 mt-3 whitespace-pre-line leading-relaxed">
                {c.isi}
              </p>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}