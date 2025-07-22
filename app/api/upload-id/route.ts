import nextConnect from "next-connect"
import multer from "multer"
import path from "path"
import { supabaseServer } from "@/lib/supabase"
import { validateFileType, validateFileSize, generateFileName, sanitizeFileName, compressImage } from "@/lib/file-utils"
import { STORAGE_BUCKETS, FILE_LIMITS } from "@/lib/constants"
import crypto from "crypto"

export const config = {
  api: { bodyParser: false },
}

export const runtime = "nodejs"

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), "public/uploads/ids"),
    filename: (_, file, cb) => {
      const unique = `${Date.now()}-${file.originalname}`
      cb(null, unique)
    },
  }),
})

const apiRoute = nextConnect()
apiRoute.use(upload.single("file"))

apiRoute.post(async (req: any, res) => {
  try {
    const formData = await req.body
    const file = formData.get("file") as File
    const userId = formData.get("userId") as string
    const side = formData.get("side") as string // 'front' or 'back'

    // Validate required fields
    if (!file) {
      return res.status(400).json({ error: "ไม่พบไฟล์ที่อัปโหลด" })
    }

    if (!userId) {
      return res.status(400).json({ error: "ต้องระบุ userId" })
    }

    if (!side || !["front", "back"].includes(side)) {
      return res.status(400).json({ error: "ต้องระบุด้านของบัตร (front หรือ back)" })
    }

    // Validate file type
    const typeValidation = validateFileType(file, FILE_LIMITS.ID_CARD.allowedTypes)
    if (!typeValidation.isValid) {
      return res.status(400).json({ error: typeValidation.error })
    }

    // Validate file size
    const sizeValidation = validateFileSize(file, FILE_LIMITS.ID_CARD.maxSize)
    if (!sizeValidation.isValid) {
      return res.status(400).json({ error: sizeValidation.error })
    }

    // Generate file path
    const sanitizedName = sanitizeFileName(file.name)
    const filePath = generateFileName(sanitizedName, `id-cards/${userId}/${side}`)

    // Convert file to buffer and compress
    const originalBuffer = Buffer.from(await file.arrayBuffer())
    const compressedBuffer = await compressImage(originalBuffer, 85)

    // Upload to Supabase Storage
    const { data, error } = await supabaseServer.storage
      .from(STORAGE_BUCKETS.ID_CARDS)
      .upload(filePath, compressedBuffer, {
        contentType: "image/jpeg",
        cacheControl: "3600",
        upsert: true, // Allow overwrite for ID cards
      })

    if (error) {
      console.error("Supabase upload error:", error)
      return res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปโหลด" })
    }

    // Save ID card metadata to database
    const idCardMetadata = {
      id: crypto.randomUUID(),
      user_id: userId,
      side: side,
      file_path: filePath,
      file_size: compressedBuffer.length,
      file_type: "image/jpeg",
      original_name: file.name,
      verification_status: "pending",
      created_at: new Date().toISOString(),
    }

    // Insert or update metadata in id_cards table
    const { error: dbError } = await supabaseServer.from("id_cards").upsert(idCardMetadata, {
      onConflict: "user_id,side",
    })

    if (dbError) {
      console.error("Database upsert error:", dbError)
      // Don't fail the upload if DB insert fails
    }

    return res.status(200).json({
      success: true,
      data: {
        id: idCardMetadata.id,
        side: side,
        filePath: filePath,
        fileName: file.name,
        fileSize: compressedBuffer.length,
        verificationStatus: "pending",
        message: "บัตรประชาชนอัปโหลดสำเร็จ รอการตรวจสอบ",
      },
    })
  } catch (error) {
    console.error("Upload ID card error:", error)
    return res.status(500).json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" })
  }
})

apiRoute.get((req: any, res) => {
  return res.status(200).json({
    message: "ID Card Upload API",
    limits: FILE_LIMITS.ID_CARD,
    bucket: STORAGE_BUCKETS.ID_CARDS,
    sides: ["front", "back"],
  })
})

export default apiRoute
