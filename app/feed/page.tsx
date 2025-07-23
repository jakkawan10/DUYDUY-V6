'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { auth } from '@/lib/firebase'
import VideoCard from '@/components/VideoCard'

interface VideoData {
  id: string
  videoUrl: string
  caption: string
  uploaderId: string
  heartCount: number
}

export default function FeedPage() {
  const [videos, setVideos] = useState<VideoData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'))
        const videoList: VideoData[] = []
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data()
          videoList.push({
            id: docSnap.id,
            videoUrl: data.videoUrl,
            caption: data.caption,
            uploaderId: data.uploaderId,
            heartCount: data.heartCount || 0,
          })
        })
        setVideos(videoList)
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการโหลดวิดีโอ:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">DUYDUY Feed</h1>

      {loading ? (
        <p className="text-center text-gray-500">กำลังโหลดวิดีโอ...</p>
      ) : videos.length === 0 ? (
        <p className="text-center text-gray-500">ยังไม่มีวิดีโอ</p>
      ) : (
        videos.map((video) => (
          <VideoCard
            key={video.id}
            videoId={video.id}
            videoUrl={video.videoUrl}
            caption={video.caption}
            uploaderId={video.uploaderId}
            heartCount={video.heartCount}
          />
        ))
      )}
    </main>
  )
}
