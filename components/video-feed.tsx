"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share, MoreHorizontal, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Video {
  id: string
  username: string
  description: string
  likes: number
  comments: number
  shares: number
  earnings: number
  thumbnail: string
  isLiked: boolean
}

const mockVideos: Video[] = [
  {
    id: "1",
    username: "สมชาย_ครีเอเตอร์",
    description: "วิธีทำอาหารไทยแสนอร่อย 🍜 #อาหารไทย #ทำอาหาร",
    likes: 1250,
    comments: 89,
    shares: 45,
    earnings: 1250,
    thumbnail: "/placeholder.svg?height=800&width=450",
    isLiked: false,
  },
  {
    id: "2",
    username: "มาลี_เที่ยวไทย",
    description: "เที่ยวเชียงใหม่ 3 วัน 2 คืน งบ 3000 บาท! 🏔️ #เที่ยวไทย #เชียงใหม่",
    likes: 2100,
    comments: 156,
    shares: 78,
    earnings: 2100,
    thumbnail: "/placeholder.svg?height=800&width=450",
    isLiked: true,
  },
]

export default function VideoFeed() {
  const [videos, setVideos] = useState(mockVideos)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleLike = (videoId: string) => {
    setVideos((prev) =>
      prev.map((video) => {
        if (video.id === videoId) {
          return {
            ...video,
            isLiked: !video.isLiked,
            likes: video.isLiked ? video.likes - 1 : video.likes + 1,
            earnings: video.isLiked ? video.earnings - 1 : video.earnings + 1,
          }
        }
        return video
      }),
    )
  }

  const currentVideo = videos[currentIndex]

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Video Container */}
      <div className="relative h-full w-full">
        {/* Video Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <Play className="w-16 h-16 text-white/50" />
          </div>
        </div>

        {/* Video Info Overlay */}
        <div className="absolute bottom-20 left-4 right-20 z-10">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{currentVideo.username[0]}</AvatarFallback>
            </Avatar>
            <span className="text-white font-semibold">@{currentVideo.username}</span>
            <Button
              variant="outline"
              size="sm"
              className="border-white text-white bg-transparent hover:bg-white hover:text-black"
            >
              ติดตาม
            </Button>
          </div>

          <p className="text-white text-sm mb-2 leading-relaxed">{currentVideo.description}</p>

          <div className="flex items-center gap-4 text-white/80 text-sm">
            <span>❤️ {currentVideo.likes.toLocaleString()} ไลค์</span>
            <span>💰 {currentVideo.earnings.toLocaleString()} บาท</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-10">
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full ${
              currentVideo.isLiked ? "bg-red-500 text-white" : "bg-black/50 text-white hover:bg-red-500"
            }`}
            onClick={() => handleLike(currentVideo.id)}
          >
            <Heart className={`w-6 h-6 ${currentVideo.isLiked ? "fill-current" : ""}`} />
          </Button>
          <div className="text-white text-xs text-center">{currentVideo.likes.toLocaleString()}</div>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-gray-700"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          <div className="text-white text-xs text-center">{currentVideo.comments}</div>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-gray-700"
          >
            <Share className="w-6 h-6" />
          </Button>
          <div className="text-white text-xs text-center">{currentVideo.shares}</div>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-gray-700"
          >
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>

        {/* Earnings Display */}
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          💰 +{currentVideo.earnings.toLocaleString()} บาท
        </div>
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
    </div>
  )
}
