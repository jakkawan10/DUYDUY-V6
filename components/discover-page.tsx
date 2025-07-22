"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, MoreHorizontal, Play, Search } from "lucide-react"

const mockVideos = [
  {
    id: "1",
    username: "สมชาย_ครีเอเตอร์",
    description: "วิธีทำอาหารไทยแสนอร่อย 🍜 #อาหารไทย #ทำอาหาร #อร่อย",
    likes: 1250,
    comments: 89,
    shares: 45,
    earnings: 1250,
    isLiked: false,
    category: "อาหาร",
  },
  {
    id: "2",
    username: "มาลี_เที่ยวไทย",
    description: "เที่ยวเชียงใหม่ 3 วัน 2 คืน งบ 3000 บาท! 🏔️ #เที่ยวไทย #เชียงใหม่ #ประหยัด",
    likes: 2100,
    comments: 156,
    shares: 78,
    earnings: 2100,
    isLiked: true,
    category: "ท่องเที่ยว",
  },
]

const categories = ["ทั้งหมด", "อาหาร", "ท่องเที่ยว", "เกมส์", "เพลง", "ตลก", "การศึกษา", "กีฬา"]

export default function DiscoverPage() {
  const [videos, setVideos] = useState(mockVideos)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด")
  const [duyCoins, setDuyCoins] = useState(500)

  const handleLike = (videoId: string) => {
    if (duyCoins <= 0) {
      alert("DUY Coin ไม่เพียงพอ! กรุณาเติมเงิน")
      return
    }

    setVideos((prev) =>
      prev.map((video) => {
        if (video.id === videoId) {
          const newLikedState = !video.isLiked
          return {
            ...video,
            isLiked: newLikedState,
            likes: newLikedState ? video.likes + 1 : video.likes - 1,
            earnings: newLikedState ? video.earnings + 1 : video.earnings - 1,
          }
        }
        return video
      }),
    )

    // Update user's DUY Coins
    setDuyCoins((prev) => (videos[currentIndex].isLiked ? prev + 1 : prev - 1))
  }

  const currentVideo = videos[currentIndex]

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-white" />
            <span className="text-white text-sm">ค้นหา</span>
          </div>
          <div className="bg-[#42d3d1] px-3 py-1 rounded-full">
            <span className="text-white text-sm font-semibold">💰 {duyCoins} เหรียญ</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap text-xs ${
                selectedCategory === category
                  ? "bg-[#42d3d1] text-white border-0"
                  : "bg-black/30 border-white/30 text-white hover:bg-white/20"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Video Container */}
      <div className="relative h-full w-full">
        {/* Video Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center">
          <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
            <Play className="w-20 h-20 text-white/30" />

            {/* Simulated video content overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
          </div>
        </div>

        {/* Video Info Overlay */}
        <div className="absolute bottom-24 left-4 right-20 z-10">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-12 h-12 border-2 border-white">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-[#42d3d1] text-white">{currentVideo.username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">@{currentVideo.username}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white bg-transparent hover:bg-white hover:text-black text-xs px-3 py-1"
                >
                  ติดตาม
                </Button>
              </div>
              <div className="text-xs text-white/80 mt-1">{currentVideo.category}</div>
            </div>
          </div>

          <p className="text-white text-sm mb-3 leading-relaxed">{currentVideo.description}</p>

          <div className="flex items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {currentVideo.likes.toLocaleString()} ไลค์
            </span>
            <span className="flex items-center gap-1 text-green-400">
              💰 {currentVideo.earnings.toLocaleString()} บาท
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-10">
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className={`w-14 h-14 rounded-full ${
                currentVideo.isLiked
                  ? "bg-[#ff6c63] text-white hover:bg-[#ff6c63]/80"
                  : "bg-black/50 text-white hover:bg-[#ff6c63]"
              } transition-all duration-200`}
              onClick={() => handleLike(currentVideo.id)}
            >
              <Heart className={`w-7 h-7 ${currentVideo.isLiked ? "fill-current" : ""}`} />
            </Button>
            <div className="text-white text-xs text-center mt-1 font-semibold">
              {currentVideo.likes.toLocaleString()}
            </div>
            <div className="text-[#ffd700] text-xs text-center font-bold">1 บาท</div>
          </div>

          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="w-14 h-14 rounded-full bg-black/50 text-white hover:bg-gray-700"
            >
              <MessageCircle className="w-7 h-7" />
            </Button>
            <div className="text-white text-xs text-center mt-1">{currentVideo.comments}</div>
          </div>

          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="w-14 h-14 rounded-full bg-black/50 text-white hover:bg-gray-700"
            >
              <Share className="w-7 h-7" />
            </Button>
            <div className="text-white text-xs text-center mt-1">{currentVideo.shares}</div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-full bg-black/50 text-white hover:bg-gray-700"
          >
            <MoreHorizontal className="w-7 h-7" />
          </Button>
        </div>

        {/* Earnings Animation */}
        {currentVideo.isLiked && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="animate-bounce">
              <div className="text-6xl">💰</div>
              <div className="text-[#ffd700] text-xl font-bold text-center">+1 บาท</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Dots */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10">
        {videos.map((_, index) => (
          <button
            key={index}
            className={`w-1 h-8 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/30"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Swipe Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-white/60 text-xs text-center">ปัดขึ้น-ลง เพื่อดูวิดีโอถัดไป</div>
      </div>
    </div>
  )
}
