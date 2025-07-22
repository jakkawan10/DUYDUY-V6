import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase"
import { validateFileType, validateFileSize, generateFileName, sanitizeFileName, compressImage } from "@/lib/file-utils"
import { STORAGE_BUCKETS, FILE_LIMITS } from "@/lib/constants"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const userId = formData.get("userId") as string
    const bankName = (formData.get("bankName") as string) || ""
    const accountNumber = (formData.get("accountNumber") as string) || ""

    // Validate required fields
    if (!file) {
      return NextResponse.json({ error: "ไม่พบไฟล์ที่อัปโหลด" }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json({ error: "ต้องระบุ userId" }, { status: 400 })
    }

    // Validate file type
    const typeValidation = validateFileType(file, FILE_LIMITS.BANKBOOK.allowedTypes)
    if (!typeValidation.isValid) {
      return NextResponse.json({ error: typeValidation.error }, { status: 400 })
    }

    // Validate file size
    const sizeValidation = validateFileSize(file, FILE_LIMITS.BANKBOOK.maxSize)
    if (!sizeValidation.isValid) {
      return NextResponse.json({ error: sizeValidation.error }, { status: 400 })
    }

    // Generate file path
    const sanitizedName = sanitizeFileName(file.name)
    const filePath = generateFileName(sanitizedName, `bankbooks/${userId}`)

    let buffer: Buffer
    let contentType: string

    // Handle different file types
    if (file.type === "application/pdf") {
      buffer = Buffer.from(await file.arrayBuffer())
      contentType = "application/pdf"
    } else {
      // Compress image files
      const originalBuffer = Buffer.from(await file.arrayBuffer())
      buffer = await compressImage(originalBuffer, 85)
      contentType = "image/jpeg"
    }

    // Upload to Supabase Storage
    const { data, error } = await supabaseServer.storage.from(STORAGE_BUCKETS.BANKBOOKS).upload(filePath, buffer, {
      contentType: contentType,
      cacheControl: "3600",
      upsert: true, // Allow overwrite for bankbooks
    })

    if (error) {
      console.error("Supabase upload error:", error)
      return NextResponse.json({ error: "เกิดข้อผิดพลาดในการอัปโหลด" }, { status: 500 })
    }

    // Save bankbook metadata to database
    const bankbookMetadata = {
      id: crypto.randomUUID(),
      user_id: userId,
      bank_name: bankName,
      account_number: accountNumber,
      file_path: filePath,
      file_size: buffer.length,
      file_type: contentType,
      original_name: file.name,
      verification_status: "pending",
      created_at: new Date().toISOString(),
    }

    // Insert metadata into bankbooks table
    const { error: dbError } = await supabaseServer.from("bankbooks").insert(bankbookMetadata)

    if (dbError) {
      console.error("Database insert error:", dbError)
      // Don't fail the upload if DB insert fails
    }

    return NextResponse.json({
      success: true,
      data: {
        id: bankbookMetadata.id,
        filePath: filePath,
        fileName: file.name,
        fileSize: buffer.length,
        fileType: contentType,
        bankName: bankName,
        verificationStatus: "pending",
        message: "สมุดธนาคารอัปโหลดสำเร็จ รอการตรวจสอบ",
      },
    })
  } catch (error) {
    console.error("Upload bankbook error:", error)
    return NextResponse.json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Bankbook Upload API",
    limits: FILE_LIMITS.BANKBOOK,
    bucket: STORAGE_BUCKETS.BANKBOOKS,
  })
}
