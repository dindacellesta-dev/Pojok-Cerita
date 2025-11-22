"use client";

import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatBox() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function sendMessage() {
    if (!input.trim()) return;
    setError(null);

    const userMessage: Msg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Response not ok");
      }

      const data = await res.json();
      const assistantReply: Msg = { 
        role: "assistant", 
        content: data.reply ?? "Maaf, tidak ada balasan." 
      };
      setMessages((prev) => [...prev, assistantReply]);
    } catch (err: any) {
      console.error(err);
      setError("Terjadi kesalahan. Cek API atau terminal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto h-screen bg-[#CDE7FF]">
      {/* Header */}
      <div className="px-4 py-3 bg-[#A8D8FF] shadow text-gray-800 font-semibold text-lg text-center">
        Kuyo — Konselor AI
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-600">
            Halo! Coba sapa Kuyo atau ketik masalahmu 😊
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`max-w-[75%] ${msg.role === "user" ? "ml-auto" : "mr-auto"}`}>
            {msg.role === "assistant" && (
              <div className="text-xs text-gray-500 mb-1">Kuyo</div>
            )}

            <div
              className={`px-4 py-2 rounded-2xl text-[15px] leading-relaxed shadow-sm
                ${msg.role === "user" 
                  ? "bg-[#7EC3FF] text-white rounded-br-none" 
                  : "bg-white text-gray-700 rounded-bl-none"}
              `}
            >
              <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="max-w-[55%] mr-auto">
            <div className="text-xs text-gray-500 mb-1">Kuyo</div>
            <div className="bg-white text-gray-400 px-4 py-2 rounded-2xl rounded-bl-none shadow-sm animate-pulse">
              Kuyo sedang mengetik...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 bg-[#A8D8FF]">
        <input
          className="
            flex-1 p-3 rounded-full bg-white shadow-sm border border-gray-200 
            focus:outline-none focus:ring-2 focus:ring-blue-300
            text-black
          "
          placeholder="Tulis pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-full bg-[#5BA8FF] shadow text-white hover:bg-[#4A95E8] transition font-medium"
          disabled={loading}
        >
          {loading ? "Mengirim..." : "Kirim"}
        </button>
      </div>

      {error && <div className="text-center text-sm text-red-600 p-2">{error}</div>}
    </div>
  );
}