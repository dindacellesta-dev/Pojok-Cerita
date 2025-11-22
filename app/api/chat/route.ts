import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];

    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: "OPENAI_API_KEY not set" }), { status: 500 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // instruksi system: Kuyo, bahasa Indonesia, gaya santai, ramah, tidak memberi diagnosa
    const systemMessage = {
      role: "system",
      content:
        "Kamu adalah Kuyo, konselor AI ramah untuk murid sekolah. Jawab selalu dalam bahasa Indonesia dengan gaya santai, hangat, dan seperti teman ngobrol. Jangan memberikan diagnosa medis atau saran obat. Jika ada indikasi bahaya (self-harm, bahaya pada orang lain), berikan instruksi untuk segera menghubungi Guru BK atau layanan darurat dan sertakan ajakan agar pengguna tetap bersama orang yang dipercaya."
    };

    const chatMessages = [systemMessage, ...messages];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // bisa ganti sesuai akunmu
      messages: chatMessages,
      max_tokens: 500,
    });

    const reply = completion.choices?.[0]?.message?.content ?? "Maaf, Kuyo belum bisa menjawab sekarang.";
    return new Response(JSON.stringify({ reply }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err: any) {
    console.error("API ERROR:", err);
    return new Response(JSON.stringify({ reply: "Terjadi kesalahan pada server." }), { status: 500 });
  }
}