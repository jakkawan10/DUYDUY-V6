# DUYDUY App - TikTok-like Video Platform

แอปพลิเคชันแชร์วิดีโอสั้นแบบ TikTok พร้อมระบบ "กด ❤️ = 1 บาท" สำหรับผู้สร้างคอนเทนต์

## 🚀 Features

- 📱 **Video Feed** - ดูวิดีโอแบบเต็มจอแนวตั้ง
- ❤️ **Like System** - ระบบ "กด ❤️ = 1 บาท" 
- 🎬 **Video Upload** - อัปโหลดวิดีโอได้สูงสุด 100MB
- 🆔 **KYC System** - ยืนยันตัวตนด้วยบัตรประชาชน
- 💰 **Wallet** - ระบบกระเป๋าเงินและถอนเงิน
- 🔍 **Discover** - ค้นหาและแนะนำวิดีโอ

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (Supabase)
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/duyduy-app.git
   cd duyduy-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in your Supabase credentials:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   \`\`\`

4. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL script in `scripts/create-tables.sql`
   - Create storage buckets:
     - `duyduy-videos` (public)
     - `duyduy-id-cards` (private)
     - `duyduy-bankbooks` (private)

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open [http://localhost:3000](http://localhost:3000)**

## 🗄️ Database Schema

### Tables
- `videos` - Video metadata and information
- `id_cards` - ID card verification data
- `bankbooks` - Bank account verification data
- `users` - User profiles and KYC status

### Storage Buckets
- `duyduy-videos` - Video files (public)
- `duyduy-id-cards` - ID card images (private)
- `duyduy-bankbooks` - Bank account documents (private)

## 🔐 Security

- **Row Level Security (RLS)** enabled on all tables
- **File validation** for uploads
- **Private storage** for sensitive documents
- **Service role authentication** for API routes

## 📱 API Endpoints

### Upload APIs
- `POST /api/upload-video` - Upload video files
- `POST /api/upload-id` - Upload ID card images
- `POST /api/upload-bankbook` - Upload bank account documents

### File Management
- `GET /api/files/[userId]` - Get user's uploaded files

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your-production-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
\`\`\`

## 📋 File Upload Limits

- **Videos**: 100MB, MP4/WebM/QuickTime/AVI, 60 seconds max
- **ID Cards**: 10MB, JPEG/PNG/WebP
- **Bankbooks**: 10MB, JPEG/PNG/WebP/PDF

## 🔧 Development

### Project Structure
\`\`\`
duyduy-app/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions
├── scripts/              # Database scripts
└── public/               # Static assets
\`\`\`

### Key Components
- `UploadVideo.tsx` - Video upload component
- `ProfilePage.tsx` - User profile with KYC
- `VideoFeed.tsx` - TikTok-like video feed
- `WalletPage.tsx` - Wallet and earnings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@duyduy.app or create an issue on GitHub.
