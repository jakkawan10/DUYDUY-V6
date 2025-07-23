"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth } from '@/lib/firebase'


export default function WalletPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await fetchWallet(user.uid);
        await fetchTransactions(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchWallet = async (uid: string) => {
    const walletRef = doc(db, "wallets", uid);
    const walletSnap = await getDoc(walletRef);
    if (walletSnap.exists()) {
      setBalance(walletSnap.data().balance || 0);
    }
  };

  const fetchTransactions = async (uid: string) => {
    const q = query(collection(db, "transactions"), where("receiverId", "==", uid));
    const querySnapshot = await getDocs(q);
    const txs = querySnapshot.docs.map((doc) => doc.data());
    setTransactions(txs.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">💰 Wallet</h1>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="text-lg">ยอดเงินปัจจุบัน: <span className="font-bold">{balance} บาท</span></p>
      </div>

      <h2 className="text-xl font-semibold mb-2">❤️ ประวัติการได้รับหัวใจ</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีรายการ</p>
      ) : (
        <ul className="bg-white rounded-lg shadow p-4 space-y-3">
          {transactions.map((tx, index) => (
            <li key={index} className="text-sm">
              🧑‍💻 <b>{tx.senderId}</b> ส่งหัวใจให้คุณ - <b>+1 บาท</b><br />
              <span className="text-gray-400 text-xs">
                {new Date(tx.timestamp?.seconds * 1000).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
