import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic'; // ✅ ใช้แทน config แบบใหม่

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const { downloadURL, thumbnailURL } = body;

  const newVideo = await db.video.create({
    data: {
      userId: session.user.id,
      downloadURL,
      thumbnailURL,
    },
  });

  return NextResponse.json(newVideo);
}
