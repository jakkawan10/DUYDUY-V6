'use client';

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setUsername(data.username || "");
          setCaption(data.caption || "");
        }
        setLoading(false);
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, "users", user.uid), { username, caption }, { merge: true });
      alert("บันทึกแล้ว");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">โปรไฟล์ของคุณ</h1>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ชื่อผู้ใช้" className="w-full mb-3 p-2 border rounded" />
      <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="คำบรรยายใต้โปรไฟล์" className="w-full mb-3 p-2 border rounded" />
      <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">บันทึก</button>
    </div>
  );
}
