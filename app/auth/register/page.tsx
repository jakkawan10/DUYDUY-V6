'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db, storage } from "@/lib/firebase/firebaseConfig"; 


export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        username,
        createdAt: new Date(),
      })

      router.push('/profile')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="text" placeholder="Username" className="w-full p-2 border" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" className="w-full p-2 border" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-yellow-500 p-2 text-white">Register</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  )
}
