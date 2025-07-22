// Storage Buckets
export const STORAGE_BUCKETS = {
  VIDEOS: "duyduy-videos",
  ID_CARDS: "duyduy-id-cards",
  BANKBOOKS: "duyduy-bankbooks",
} as const

// File Limits
export const FILE_LIMITS = {
  VIDEO: {
    maxSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"],
    maxDuration: 60, // 60 seconds
  },
  ID_CARD: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  },
  BANKBOOK: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"],
  },
} as const

// Upload Paths
export const UPLOAD_PATHS = {
  VIDEOS: "videos",
  ID_CARDS: "id-cards",
  BANKBOOKS: "bankbooks",
} as const
