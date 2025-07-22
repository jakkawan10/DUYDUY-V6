"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, TrendingUp, Users, Video } from "lucide-react"
import Image from "next/image"

interface HomePageProps {
  onNavigate: (page: string) => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-[#e5f7f6] pb-20">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center pt-16 pb-8 px-6">
        {/* Logo */}
        <div className="mb-6">
          <Image src="/duyduy-logo.png" alt="DUYDUY Logo" width={120} height={120} className="rounded-full" />
        </div>

        {/* App Name */}
        <h1 className="text-4xl font-bold mb-4 text-[#42d3d1]">DUYDUY</h1>

        {/* Welcome Message */}
        <p className="text-gray-700 text-center text-lg mb-8 max-w-sm leading-relaxed">
          ยินดีต้อนรับสู่ DUYDUY! แตะ "ค้นพบ" เพื่อเริ่มดูวิดีโอคุณภาพสูง
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button
            onClick={() => onNavigate("discover")}
            className="bg-[#42d3d1] hover:bg-[#3bc4c2] text-white py-3 text-lg font-semibold rounded-full"
          >
            เริ่มค้นหาวิดีโอ
          </Button>
          <Button
            onClick={() => onNavigate("profile")}
            variant="outline"
            className="border-[#42d3d1] text-[#42d3d1] hover:bg-[#42d3d1] hover:text-white py-3 text-lg font-semibold rounded-full"
          >
            อัปโหลดคลิปแรก
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">สิ่งที่เกิดขึ้นวันนี้</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/80 border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 text-[#ff6c63] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">1,247</div>
              <div className="text-sm text-gray-600">ไลค์ที่ได้รับ</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">฿1,247</div>
              <div className="text-sm text-gray-600">รายได้วันนี้</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Videos from Following */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">วิดีโอใหม่จากคนที่คุณติดตาม</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-shrink-0">
              <Card className="bg-white/80 border-0 shadow-sm w-32">
                <CardContent className="p-3">
                  <div className="aspect-[9/16] bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                    <Video className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="text-xs text-gray-600 text-center">@creator{index + 1}</div>
                  <div className="text-xs text-[#ff6c63] text-center">❤️ {Math.floor(Math.random() * 100) + 10}</div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Bonus Banner */}
      <div className="px-6 mb-8">
        <Card className="bg-gradient-to-r from-[#42d3d1] to-[#ffd700] border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎁</div>
              <div>
                <h3 className="font-bold text-white">อัปโหลดคลิปแรก</h3>
                <p className="text-sm text-white/90">รับ DUY Coin โบนัส 100 เหรียญ!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Menu */}
      <div className="px-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">เมนูด่วน</h2>
        <div className="grid grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 bg-white/80 border-0"
            onClick={() => onNavigate("wallet")}
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">฿</span>
            </div>
            <span className="text-sm text-gray-700">กระเป๋าเงิน</span>
          </Button>

          <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4 bg-white/80 border-0">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <span className="text-sm text-gray-700">สถิติรายได้</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 bg-white/80 border-0"
            onClick={() => onNavigate("profile")}
          >
            <Users className="w-8 h-8 text-purple-500" />
            <span className="text-sm text-gray-700">ตั้งค่าโปรไฟล์</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
