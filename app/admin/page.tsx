// app/admin/page.tsx
'use client'

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase'
import { collection, doc, getDocs, updateDoc, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const adminUIDs = [
  'duyduy2521_UID', // 🛑 เปลี่ยนเป็น UID จริงของแอดมินที่ต้องการ
];

export default function AdminPage() {
  const [withdraws, setWithdraws] = useState<any[]>([]);
  const [wallets, setWallets] = useState<Record<string, number>>({});
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) return;
    if (!adminUIDs.includes(auth.currentUser.uid)) {
      router.push('/');
    } else {
      fetchWithdraws();
      fetchWallets();
    }
  }, []);

  const fetchWithdraws = async () => {
    const q = query(collection(db, 'withdrawRequests'));
    const snap = await getDocs(q);
    const results: any[] = [];
    snap.forEach(doc => results.push({ id: doc.id, ...doc.data() }));
    setWithdraws(results);
  };

  const fetchWallets = async () => {
    const q = query(collection(db, 'wallets'));
    const snap = await getDocs(q);
    const data: Record<string, number> = {};
    snap.forEach(doc => data[doc.id] = doc.data().balance || 0);
    setWallets(data);
  };

  const handleUpdateStatus = async (id: string, uid: string, status: string, amount: number) => {
    const ref = doc(db, 'withdrawRequests', id);
    await updateDoc(ref, { status });

    // ถ้าอนุมัติ ให้หักเงินใน wallet
    if (status === 'approved') {
      const walletRef = doc(db, 'wallets', uid);
      const newBalance = wallets[uid] - amount;
      await updateDoc(walletRef, { balance: newBalance });
    }

    fetchWithdraws();
    fetchWallets();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📋 คำขอถอนเงิน</h1>
      {withdraws.map((req) => (
        <div key={req.id} className="border p-4 rounded shadow mb-4">
          <p>👤 UID: {req.uid}</p>
          <p>💸 Amount: {req.amount} บาท</p>
          <p>📅 สถานะ: <span className="font-semibold">{req.status}</span></p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => handleUpdateStatus(req.id, req.uid, 'approved', req.amount)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              ✅ อนุมัติ
            </button>
            <button
              onClick={() => handleUpdateStatus(req.id, req.uid, 'rejected', req.amount)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              ❌ ปฏิเสธ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
