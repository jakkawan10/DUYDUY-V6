import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const bookbank = await db.bookbank.findFirst({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(bookbank);
}
