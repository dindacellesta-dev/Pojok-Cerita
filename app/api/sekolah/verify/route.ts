export async function POST(req: Request) {
  const { kode } = await req.json();

  // Data sekolah sementara
  const sekolahTerdaftar = ["SMP001", "SMAAMB", "SMKN1"];

  const valid = sekolahTerdaftar.includes(kode);

  return Response.json({ valid });
}