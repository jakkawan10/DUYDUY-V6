"use client"

import { useState } from "react"
import { Camera, Video, Upload, Music, Palette, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default function CreatePage() {
  const [description, setDescription] = useState("")
  const [hashtags, setHashtags] = useState("")

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 p-4 z-10">
        <h1 className="text-xl font-bold text-center">สร้างวิดีโอ</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Upload Options */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Camera className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">ถ่ายวิดีโอ</h3>
              <p className="text-sm text-gray-400">ถ่ายวิดีโอใหม่ด้วยกล้อง</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Upload className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">อัปโหลด</h3>
              <p className="text-sm text-gray-400">เลือกวิดีโอจากแกลเลอรี่</p>
            </CardContent>
          </Card>
        </div>

        {/* Video Preview Placeholder */}
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="aspect-[9/16] bg-gray-800 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <Video className="w-16 h-16 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400">ตัวอย่างวิดีโอจะแสดงที่นี่</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Details */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">รายละเอียดวิดีโอ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">คำอธิบาย</label>
              <Textarea
                placeholder="เล่าเรื่องราวของวิดีโอของคุณ..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">แฮชแท็ก</label>
              <Input
                placeholder="#อาหารไทย #ทำอาหาร #อร่อย"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Creative Tools */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">เครื่องมือสร้างสรรค์</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 border-gray-600 hover:bg-gray-800 bg-transparent"
              >
                <Music className="w-6 h-6 text-purple-500" />
                <span className="text-sm">เพลง</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 border-gray-600 hover:bg-gray-800 bg-transparent"
              >
                <Palette className="w-6 h-6 text-orange-500" />
                <span className="text-sm">ฟิลเตอร์</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-4 border-gray-600 hover:bg-gray-800 bg-transparent"
              >
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <span className="text-sm">เอฟเฟกต์</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Publish Button */}
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg font-semibold">
          เผยแพร่วิดีโอ
        </Button>

        {/* Earnings Info */}
        <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">💰</div>
              <div>
                <h3 className="font-semibold text-green-400">หารายได้จากวิดีโอ</h3>
                <p className="text-sm text-gray-300">ทุกครั้งที่มีคนกด ❤️ คุณจะได้รับ 1 บาท!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
