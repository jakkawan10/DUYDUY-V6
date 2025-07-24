// app/page.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlayCircle, FaHeart, FaChartLine } from "react-icons/fa";

export default function LandingPage() {
  const router = useRouter();

  // ✅ Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service Worker registered: ", registration);
          })
          .catch((error) => {
            console.error("Service Worker registration failed: ", error);
          });
      });
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#d1f7f0] to-white px-4">
      <Image
        src="/duyduy-logo-v4.png"
        alt="DUYDUY Logo"
        width={100}
        height={100}
        className="mb-4"
      />
      <h1 className="text-3xl font-bold text-[#40E0D0]">DUYDUY</h1>
      <h2 className="text-xl font-semibold mt-2 mb-1 text-gray-800">
        ยินดีต้อนรับ
      </h2>
      <p className="text-sm text-center mt-2 leading-snug">
        สร้างวิดีโอในแบบคุณ <br />
        สร้างรายได้จากใจ 💖
      </p>
      <p className="text-xs text-center text-gray-500 mt-1">(1 💖 = 1 บาท)</p>

      <button
        onClick={() => router.push("/auth/register")}
        className="w-64 py-2 mb-3 bg-[#40E0D0] text-white font-semibold text-lg rounded-full hover:scale-105 transition"
      >
        เริ่มต้นใช้งาน
      </button>
      <button
        onClick={() => router.push("/auth/login")}
        className="w-64 py-2 mb-6 border-2 border-[#40E0D0] text-[#40E0D0] font-semibold text-lg rounded-full hover:bg-[#40E0D0]/10 transition"
      >
        เข้าสู่ระบบ
      </button>

      <div className="space-y-2 text-gray-700 text-sm text-center">
        <div className="flex items-center justify-center gap-2">
          <FaHeart className="text-red-500" />
          <span>ทุกการกดใจ มีมูลค่า</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <FaChartLine />
          <span>เริ่มต้นสร้างรายได้ตั้งแต่คลิปแรก</span>
        </div>
      </div>
    </main>
  );
}
