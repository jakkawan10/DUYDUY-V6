'use client'

import { useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { doc, updateDoc, increment, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function TopUpPage() {
  const [amount, setAmount] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleTopUp = async () => {
    if (!auth.currentUser) {
      alert('กรุณาเข้าสู่ระบบก่อนเติมเงิน')
      return
    }

    if (amount <= 0) {
      alert('กรุณาใส่จำนวนเงินที่ต้องการเติม')
      return
    }

    setLoading(true)
    try {
      const uid = auth.currentUser.uid
      const walletRef = doc(db, 'wallets', uid)

      await updateDoc(walletRef, {
        balance: increment(amount),
      })

      await addDoc(collection(db, 'transactions'), {
        uid,
        type: 'topup',
        amount,
        createdAt: serverTimestamp(),
      })

      alert(`เติมเงินสำเร็จ ${amount} บาท!`)
      router.push('/wallet')
    } catch (err) {
      console.error(err)
      alert('เกิดข้อผิดพลาดในการเติมเงิน')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">💸 เติมเงินเข้ากระเป๋า</h1>

      <input
        type="number"
        className="w-full border p-2 rounded mb-4"
        placeholder="จำนวนเงิน (บาท)"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />

      <button
        onClick={handleTopUp}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full"
      >
        {loading ? 'กำลังเติมเงิน...' : 'เติมเงิน'}
      </button>
    </div>
  )
}
