-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  public_url TEXT NOT NULL,
  status TEXT DEFAULT 'uploaded',
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create id_cards table
CREATE TABLE IF NOT EXISTS id_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('front', 'back')),
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  original_name TEXT NOT NULL,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, side)
);

-- Create bankbooks table
CREATE TABLE IF NOT EXISTS bankbooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  bank_name TEXT,
  account_number TEXT,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  original_name TEXT NOT NULL,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (for user management)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  videos_count INTEGER DEFAULT 0,
  total_likes INTEGER DEFAULT 0,
  wallet_balance DECIMAL(10,2) DEFAULT 0.00,
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'approved', 'rejected')),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_videos_user_id ON videos(user_id);
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);

CREATE INDEX IF NOT EXISTS idx_id_cards_user_id ON id_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_id_cards_verification_status ON id_cards(verification_status);

CREATE INDEX IF NOT EXISTS idx_bankbooks_user_id ON bankbooks(user_id);
CREATE INDEX IF NOT EXISTS idx_bankbooks_verification_status ON bankbooks(verification_status);

CREATE INDEX IF NOT EXISTS idx_users_user_id ON users(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Enable Row Level Security (RLS)
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE id_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE bankbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for videos table
CREATE POLICY "Public read videos" ON videos FOR SELECT USING (true);
CREATE POLICY "Users can insert own videos" ON videos FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can update own videos" ON videos FOR UPDATE USING (auth.uid()::text = user_id);
CREATE POLICY "Users can delete own videos" ON videos FOR DELETE USING (auth.uid()::text = user_id);

-- RLS Policies for id_cards table (private)
CREATE POLICY "Users can read own id_cards" ON id_cards FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own id_cards" ON id_cards FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can update own id_cards" ON id_cards FOR UPDATE USING (auth.uid()::text = user_id);

-- RLS Policies for bankbooks table (private)
CREATE POLICY "Users can read own bankbooks" ON bankbooks FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own bankbooks" ON bankbooks FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can update own bankbooks" ON bankbooks FOR UPDATE USING (auth.uid()::text = user_id);

-- RLS Policies for users table
CREATE POLICY "Public read users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Create storage buckets (run this in Supabase Dashboard > Storage)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('duyduy-videos', 'duyduy-videos', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('duyduy-id-cards', 'duyduy-id-cards', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('duyduy-bankbooks', 'duyduy-bankbooks', false);
