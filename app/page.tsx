// app/landing/page.tsx

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-teal-100 to-white px-4">
      {/* โลโก้ */}
      <Image
        src="/duyduy-logo.png"
        alt="DUYDUY Logo"
        width={120}
        height={120}
        className="mb-4"
      />

      {/* ข้อความต้อนรับ */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
        ยินดีต้อนรับสู่ DUYDUY
      </h1>
      <p className="text-center text-gray-600 mb-8 text-base md:text-lg">
        สร้างรายได้ กดใจ 1 บาท!
      </p>

      {/* ปุ่มต่างๆ */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => router.push("/login")}
          className="bg-teal-500 text-white py-3 px-6 rounded-xl shadow hover:bg-teal-600 transition"
        >
          เข้าสู่ระบบ
        </button>
        <button
          onClick={() => router.push("/register")}
          className="bg-yellow-400 text-white py-3 px-6 rounded-xl shadow hover:bg-yellow-500 transition"
        >
          ลงทะเบียน
        </button>
      </div>
    </main>
  );
}
