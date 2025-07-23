'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/firebase'
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore'

export default function WithdrawPage() {
  const [wallet, setWallet] = useState(0)
  const [accountName, setAccountName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [bank, setBank] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchWallet = async () => {
      const uid = auth.currentUser?.uid
      if (!uid) return

      const docRef = doc(db, 'wallets', uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setWallet(docSnap.data().balance || 0)
      }
    }

    fetchWallet()
  }, [])

  const handleWithdraw = async () => {
    const uid = auth.currentUser?.uid
    if (!uid) return alert('กรุณาเข้าสู่ระบบก่อน')

    if (!accountName || !accountNumber || !bank) {
      return alert('กรุณากรอกข้อมูลให้ครบ')
    }

    if (wallet < 50) {
      return alert('ยอดเงินขั้นต่ำในการถอนคือ 50 บาท')
    }

    setLoading(true)

    try {
      // เพิ่มเอกสารลงใน withdrawRequests
      await addDoc(collection(db, 'withdrawRequests'), {
        uid,
        accountName,
        accountNumber,
        bank,
        amount: wallet,
        status: 'pending',
        createdAt: serverTimestamp()
      })

      // ตั้งยอดเงินเหลือ 0
      await updateDoc(doc(db, 'wallets', uid), {
        balance: 0
      })

      alert('ส่งคำขอถอนเงินเรียบร้อยแล้ว')
      setWallet(0)
      setAccountName('')
      setAccountNumber('')
      setBank('')
    } catch (error) {
      console.error(error)
      alert('เกิดข้อผิดพลาดในการถอนเงิน')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">ถอนเงิน</h1>
      <p className="mb-2">ยอดเงินคงเหลือ: <span className="font-semibold">{wallet} บาท</span></p>

      <input
        type="text"
        placeholder="ชื่อบัญชี"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />

      <input
        type="text"
        placeholder="เลขที่บัญชี"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />

      <input
        type="text"
        placeholder="ธนาคาร"
        value={bank}
        onChange={(e) => setBank(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />

      <button
        onClick={handleWithdraw}
        disabled={loading}
        className="bg-red-500 text-white py-2 px-4 rounded w-full hover:bg-red-600 disabled:opacity-50"
      >
        {loading ? 'กำลังส่งคำขอ...' : 'ยืนยันถอนเงิน'}
      </button>
    </div>
  )
}
