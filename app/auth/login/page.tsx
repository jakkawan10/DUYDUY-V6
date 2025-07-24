'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase' 
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/profile')
    } catch (err: any) {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-cyan-100 to-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <Image src="/duyduy-logo-v4.png" alt="DUYDUY Logo" width={64} height={64} className="mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-700">เข้าสู่ระบบ DUYDUY</h1>
        </div>
        <input
          type="email"
          placeholder="อีเมล"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-xl transition"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  )
}
