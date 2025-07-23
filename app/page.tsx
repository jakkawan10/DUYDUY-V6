'use client'

import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { firestore } from '@/lib/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

export default function Home() {
  const [videos, setVideos] = useState<any[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'videos'))
      const videoList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setVideos(videoList)
    }

    fetchVideos()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#40E0D0] to-white text-gray-800">
      {/* ✅ Navbar อยู่ด้านบน */}
      <Navbar />

      {/* ✅ Section ส่วนหัวโลโก้ */}
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
        <h1 className="text-4xl font-bold text-yellow-500 mb-2">DUYDUY</h1>
        <p className="text-lg text-white mb-4">ส่งหัวใจ 1 บาท สร้างพลังใจให้คนเหงา ❤️</p>
      </div>

      {/* ✅ Section วิดีโอ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 pb-10">
        {videos.map((video) => (
          <div key={video.id} className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <video controls className="w-full h-64 object-cover">
              <source src={video.videoUrl} type="video/mp4" />
              เบราว์เซอร์ของคุณไม่รองรับวิดีโอ
            </video>
            <div className="p-4">
              <p className="font-semibold">{video.description || 'ไม่มีคำอธิบาย'}</p>
              <p className="text-sm text-gray-500">❤️ {video.likes || 0} หัวใจ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
