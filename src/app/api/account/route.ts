"use server"
import { auth } from "@/services/auth"
import { db } from "@/services/firebaseAdmin"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest) {
  const session = await auth()
  const data = await req.json()

  try {
    const userRef = db.collection("users").doc(session?.user.id!)

    await userRef.update({ ...data })

    return NextResponse.json({ status: 200, message: "Successful!" })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ message: "Failed to update profile" })
  }
}
