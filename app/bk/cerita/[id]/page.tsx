"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function DetailCeritaBK({ params }) {
  const { id } = params;
  const [cerita, setCerita] = useState(null);
  const [balasan, setBalasan] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "cerita", id));
      if (snap.exists()) {
        setCerita(snap.data());
        setBalasan(snap.data().balasan || "");
      }
    };
    fetch();
  }, [id]);

  const kirimBalasan = async () => {
    await updateDoc(doc(db, "cerita", id), { balasan });
    alert("Balasan terkirim!");
  };

  if (!cerita) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#CDE7FF] p-6">
      <h1 className="text-xl font-bold mb-4">{cerita.judul}</h1>

      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <p>{cerita.isi}</p>
      </div>

      <h2 className="font-semibold mb-2">Balasan Guru BK:</h2>
      <textarea
        className="w-full p-3 rounded-xl border"
        rows={5}
        value={balasan}
        onChange={(e) => setBalasan(e.target.value)}
      />

      <button
        onClick={kirimBalasan}
        className="mt-3 bg-blue-700 text-white px-5 py-3 rounded-xl shadow-lg"
      >
        Kirim Balasan
      </button>
    </div>
  );
}