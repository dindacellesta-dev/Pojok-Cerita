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
  const [openId, setOpenId] = useState<string | null>(null); // buka/tutup cerita
  const router = useRouter();

  // ref untuk scroll ke cerita yang dibuka
  const scrollRef = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const q = query(collection(db, "cerita"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
