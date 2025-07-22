import sharp from "sharp"

// Validate file type
export function validateFileType(file: File, allowedTypes: string[]) {
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `ประเภทไฟล์ไม่ถูกต้อง อนุญาตเฉพาะ: ${allowedTypes.join(", ")}`,
    }
  }
  return { isValid: true, error: null }
}

// Validate file size
export function validateFileSize(file: File, maxSize: number) {
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024))
    return {
      isValid: false,
      error: `ไฟล์ใหญ่เกินไป ขนาดสูงสุด ${maxSizeMB}MB`,
    }
  }
  return { isValid: true, error: null }
}

// Generate unique filename
export function generateFileName(originalName: string, folder: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split(".").pop()
  return `${folder}/${timestamp}_${randomString}.${extension}`
}

// Sanitize filename
export function sanitizeFileName(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .replace(/_{2,}/g, "_")
    .toLowerCase()
}

// Compress image using Sharp
export async function compressImage(buffer: Buffer, quality = 85): Promise<Buffer> {
  try {
    return await sharp(buffer)
      .jpeg({ quality, progressive: true })
      .resize(1920, 1080, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toBuffer()
  } catch (error) {
    console.error("Image compression error:", error)
    return buffer // Return original if compression fails
  }
}

// Get file extension
export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || ""
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
