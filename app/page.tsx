'use client'

import HomePage from '@/components/home-page'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'
import { auth, db, storage } from "@/lib/firebase/firebaseConfig"; 

export default function MainPage() {
  const router = useRouter()

  const [likes, setLikes] = useState(0)
  const [income, setIncome] = useState(0)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid

        // ✅ รวมยอดไลก์
        const q = query(collection(db, 'videos'), where('userId', '==', uid))
        const snap = await getDocs(q)
        let totalHearts = 0
        snap.forEach((doc) => {
          const data = doc.data()
          totalHearts += data.hearts || 0
        })
        setLikes(totalHearts)

        // ✅ ดึงรายได้จาก wallet
        const walletRef = doc(db, 'wallets', uid)
        const walletSnap = await getDoc(walletRef)
        if (walletSnap.exists()) {
          const wallet = walletSnap.data()
          setIncome(wallet.balance || 0)
        }
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <HomePage
      onNavigate={(page) => {
        if (page === 'discover') router.push('/feed')
        else if (page === 'wallet') router.push('/wallet')
        else if (page === 'profile') router.push('/profile')
        else router.push(`/${page}`)
      }}
      likes={likes}
      income={income}
    />
  )
}
