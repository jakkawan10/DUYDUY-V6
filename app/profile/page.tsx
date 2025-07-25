// app/profile/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function ProfilePage() {
  const router = useRouter()
  const auth = getAuth()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [initialUsername, setInitialUsername] = useState('')
  const [initialBio, setInitialBio] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          setUsername(data.username || '')
          setBio(data.bio || '')
          setInitialUsername(data.username || '')
          setInitialBio(data.bio || '')
        }
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleSave = async () => {
    if (!user) return

    const docRef = doc(db, 'users', user.uid)
    await updateDoc(docRef, {
      username,
      bio,
    })

    setInitialUsername(username)
    setInitialBio(bio)
    alert('ข้อมูลถูกบันทึกแล้ว!')
  }

  if (loading) return <p>กำลังโหลดข้อมูล...</p>

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">โปรไฟล์ของคุณ</h1>

      <label className="block mb-2 font-medium">ชื่อผู้ใช้</label>
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label className="block mb-2 font-medium">คำอธิบายตัวเอง</label>
      <textarea
        className="w-full p-2 mb-4 border rounded"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSave}
        disabled={username === initialUsername && bio === initialBio}
      >
        บันทึกข้อมูล
      </button>
    </div>
  )
}
