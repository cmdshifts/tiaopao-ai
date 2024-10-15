"use server"
import { auth } from "@/services/auth"
import { getFirestore } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest) {
  const session = await auth()
  const data = await req.json()

  try {
    const db = getFirestore()
    const userRef = db.collection("users").doc(session?.user.id!)

    await userRef.update({ ...data })

    return NextResponse.json({ status: 200, message: "Successful!" })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ message: "Failed to update profile" })
  }
}
