'use client'

import { useState } from 'react'
import { doc, increment, updateDoc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth } from '@/lib/firebase'
import { Heart } from 'lucide-react'

export default function VideoCard({ video }: { video: any }) {
  const [hearts, setHearts] = useState(video.heartCount || 0)
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = async () => {
    if (isLiking || !auth.currentUser) return

    const userId = auth.currentUser.uid
    const videoRef = doc(db, 'videos', video.id)
    const userWalletRef = doc(db, 'wallets', userId)
    const ownerWalletRef = doc(db, 'wallets', video.uploaderId)
    const transactionRef = doc(db, 'transactions', `${Date.now()}-${userId}`)

    setIsLiking(true)

    try {
      const walletSnap = await getDoc(userWalletRef)
      const balance = walletSnap.exists() ? walletSnap.data().balance || 0 : 0

      if (balance < 1) {
        alert('ยอดเงินของคุณไม่เพียงพอในการส่งหัวใจ')
        return
      }

      // ✅ Update heart count
      await updateDoc(videoRef, {
        heartCount: increment(1),
      })

      // ✅ Update wallet balances
      await updateDoc(userWalletRef, {
        balance: increment(-1),
      })

      await setDoc(ownerWalletRef, {
        balance: increment(1),
      }, { merge: true })

      // ✅ Add transaction
      await setDoc(transactionRef, {
        from: userId,
        to: video.uploaderId,
        amount: 1,
        videoId: video.id,
        timestamp: serverTimestamp(),
        type: 'heart',
      })

      setHearts(hearts + 1)
    } catch (error) {
      console.error('Error liking video:', error)
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <div className="w-full h-[500px] bg-black mb-4 relative">
      <video
        src={video.videoUrl}
        controls
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-sm">{video.caption}</p>
        <button
          onClick={handleLike}
          disabled={isLiking}
          className="flex items-center gap-2 mt-2 bg-pink-500 hover:bg-pink-600 px-4 py-1 rounded text-white"
        >
          ❤️ {hearts}
        </button>
      </div>
    </div>
  )
}
