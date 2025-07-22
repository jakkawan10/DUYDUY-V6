"use client"

import { useState, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Video, CheckCircle, AlertCircle } from "lucide-react"

interface UploadResponse {
  success: boolean
  data?: {
    id: string
    url: string
    filePath: string
    fileName: string
    fileSize: number
    fileType: string
    title: string
    description: string
  }
  error?: string
}

export async function uploadVideo(
  file: File,
  userId: string,
  title: string,
  description: string,
): Promise<UploadResponse> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("userId", userId)
  formData.append("title", title)
  formData.append("description", description)

  const response = await fetch("/api/upload-video", {
    method: "POST",
    body: formData,
  })

  return response.json()
}

export default function UploadVideo() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const [uploadedVideo, setUploadedVideo] = useState<UploadResponse["data"] | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setVideoFile(file)
    setMessage("")
    setUploadedVideo(null)
  }

  const handleUpload = async () => {
    if (!videoFile) {
      setMessage("กรุณาเลือกไฟล์วิดีโอก่อนอัปโหลด")
      setMessageType("error")
      return
    }

    if (!title.trim()) {
      setMessage("กรุณาใส่ชื่อวิดีโอ")
      setMessageType("error")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setMessage("")

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      // Mock user ID - in real app, get from auth context
      const userId = "user_" + Math.random().toString(36).substring(2, 9)

      const result = await uploadVideo(videoFile, userId, title, description)

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (result.success && result.data) {
        setMessage(`วิดีโออัปโหลดสำเร็จ: ${result.data.fileName}`)
        setMessageType("success")
        setUploadedVideo(result.data)

        // Reset form
        setVideoFile(null)
        setTitle("")
        setDescription("")

        // Reset file input
        const fileInput = document.getElementById("video-file") as HTMLInputElement
        if (fileInput) fileInput.value = ""
      } else {
        setMessage(`เกิดข้อผิดพลาด: ${result.error}`)
        setMessageType("error")
      }
    } catch (error) {
      clearInterval(progressInterval)
      setMessage("เกิดข้อผิดพลาดในการอัปโหลด")
      setMessageType("error")
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
      setTimeout(() => setUploadProgress(0), 2000)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          อัปโหลดวิดีโอ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Input */}
        <div className="space-y-2">
          <label htmlFor="video-file" className="text-sm font-medium">
            เลือกไฟล์วิดีโอ
          </label>
          <Input
            id="video-file"
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          {videoFile && (
            <p className="text-sm text-gray-600">
              ไฟล์: {videoFile.name} ({formatFileSize(videoFile.size)})
            </p>
          )}
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            ชื่อวิดีโอ *
          </label>
          <Input
            id="title"
            type="text"
            placeholder="ใส่ชื่อวิดีโอ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isUploading}
            maxLength={100}
          />
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            คำอธิบาย
          </label>
          <Textarea
            id="description"
            placeholder="เขียนคำอธิบายวิดีโอ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isUploading}
            maxLength={500}
            rows={3}
          />
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>กำลังอัปโหลด...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}

        {/* Upload Button */}
        <Button onClick={handleUpload} disabled={!videoFile || !title.trim() || isUploading} className="w-full">
          {isUploading ? (
            <>
              <Upload className="mr-2 h-4 w-4 animate-spin" />
              กำลังอัปโหลด...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              อัปโหลดวิดีโอ
            </>
          )}
        </Button>

        {/* Message */}
        {message && (
          <Alert className={messageType === "error" ? "border-red-500" : "border-green-500"}>
            {messageType === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {/* Uploaded Video Preview */}
        {uploadedVideo && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-4">
              <h4 className="font-medium text-green-800 mb-2">วิดีโอที่อัปโหลดแล้ว</h4>
              <div className="space-y-1 text-sm text-green-700">
                <p>
                  <strong>ชื่อ:</strong> {uploadedVideo.title}
                </p>
                <p>
                  <strong>ไฟล์:</strong> {uploadedVideo.fileName}
                </p>
                <p>
                  <strong>ขนาด:</strong> {formatFileSize(uploadedVideo.fileSize)}
                </p>
                <p>
                  <strong>URL:</strong>
                  <a
                    href={uploadedVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    ดูวิดีโอ
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* File Limits Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• ขนาดไฟล์สูงสุด: 100MB</p>
          <p>• ประเภทไฟล์ที่รองรับ: MP4, WebM, QuickTime, AVI</p>
          <p>• ความยาววิดีโอสูงสุด: 60 วินาที</p>
        </div>
      </CardContent>
    </Card>
  )
}
