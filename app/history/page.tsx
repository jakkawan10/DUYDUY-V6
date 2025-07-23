'use client'

import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

interface HistoryItem {
  id: string
  type: 'heart' | 'topup' | 'withdraw'
  amount?: number
  toUserId?: string
  createdAt: any
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, 'transactions'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        )
        const snapshot = await getDocs(q)
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as HistoryItem),
        }))
        setHistory(items)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">📜 ประวัติการทำรายการ</h1>
      {loading ? (
        <p>กำลังโหลด...</p>
      ) : history.length === 0 ? (
        <p>ยังไม่มีรายการ</p>
      ) : (
        <ul className="space-y-3">
          {history.map((item) => (
            <li key={item.id} className="bg-white rounded p-3 shadow-sm border">
              <p>
                {item.type === 'heart' && (
                  <>
                    ❤️ คุณกดหัวใจให้ <span className="font-semibold">{item.toUserId}</span>{' '}
                    จำนวน 1 บาท
                  </>
                )}
                {item.type === 'topup' && (
                  <>💸 เติมเงินเข้ากระเป๋า {item.amount} บาท</>
                )}
                {item.type === 'withdraw' && (
                  <>📤 ถอนเงิน {item.amount} บาท</>
                )}
              </p>
              <p className="text-xs text-gray-500">
                {item.createdAt?.toDate().toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
