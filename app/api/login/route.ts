export async function POST(req: Request) {
  try {
    const { schoolCode } = await req.json();

    // daftar kode sekolah yang diizinkan (sementara hardcode supaya simpel)
    const VALID_CODES = ["SMA123", "SMK777", "SMP001"];

    if (!VALID_CODES.includes(schoolCode)) {
      return Response.json(
        { success: false, message: "Kode sekolah tidak ditemukan." },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      message: "Login berhasil!"
    });

  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}