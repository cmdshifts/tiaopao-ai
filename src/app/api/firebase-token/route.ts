import { NextResponse } from "next/server"
import { cert, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { auth } from "@/services/auth"

if (!initializeApp.length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY!.replace(
        /\\n/g,
        "\n"
      ),
    }),
  })
}

export const runtime = "nodejs"

export async function POST() {
  try {
    const token = await auth()
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const customToken = await getAuth().createCustomToken(token.user.id!)

    return NextResponse.json({ customToken })
  } catch (error) {
    console.error("Error generating Firebase token:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
