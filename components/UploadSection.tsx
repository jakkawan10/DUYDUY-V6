'use client';
import { useState, ChangeEvent } from 'react';

export default function UploadSection() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [msg, setMsg] = useState('');

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setVideoFile(f);
  };

  const upload = async (url: string, file: File | null) => {
    if (!file) {
      setMsg('กรุณาเลือกไฟล์ก่อนอัปโหลด');
      return;
    }
    const form = new FormData();
    form.append('file', file);

    const res = await fetch(url, { method: 'POST', body: form });
    const data = await res.json();
    if (res.ok) setMsg(`อัปโหลดสำเร็จ: ${data.filename}`);
    else setMsg(`Error: ${data.error}`);
  };

  return (
    <section className="border p-4 rounded space-y-4">
      <div>
        <label>อัปโหลดคลิป</label>
        <input type="file" accept="video/*" onChange={onFileChange} />
        <button
          onClick={() => upload('/api/upload-video', videoFile)}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          อัปโหลดคลิป
        </button>
      </div>
      <div>{msg}</div>
      {/* ซ้ำบล็อกบนสำหรับบัตรประชาชน */}
    </section>
  );
}
