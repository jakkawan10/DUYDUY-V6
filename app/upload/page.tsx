"use client";

import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/lib/firebase'
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !userId) return;
    setUploading(true);
    const storageRef = ref(storage, `videos/${userId}/${videoFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        alert("Upload failed: " + error.message);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "videos"), {
          url: downloadURL,
          caption,
          userId,
          createdAt: serverTimestamp(),
          hearts: 0,
        });
        setUploading(false);
        router.push("/"); // กลับไปหน้า Feed
      }
    );
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📤 Upload Video</h1>

      <input
        type="file"
        accept="video/mp4"
        onChange={handleVideoChange}
        className="mb-4"
      />

      {previewUrl && (
        <video controls className="mb-4 w-full rounded shadow">
          <source src={previewUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <textarea
        placeholder="เขียน caption สั้นๆ..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {uploading ? "กำลังอัปโหลด..." : "อัปโหลดวิดีโอ"}
      </button>
    </div>
  );
}
