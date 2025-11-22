"use client";
import ChatBox from "./components/ChatBox.tsx";

export default function Home() {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AYO NGOBROL SAMA KUYO</h1>
      <ChatBox />
    </main>
  );
}