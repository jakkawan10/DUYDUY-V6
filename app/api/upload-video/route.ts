import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase/auth";
import { db, storage } from "@/firebase/firebaseAuth";

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "upload-video endpoint works!" });
}
