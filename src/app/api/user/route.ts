"use server"
import { auth } from "@/services/auth"
import { getFirestore } from "firebase-admin/firestore"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()

  try {
    const db = getFirestore()
    const userRef = db.collection("history").doc(session?.user.id!)

    const data = await userRef.get()

    return NextResponse.json({
      status: 200,
      message: "Successful!",
      data: data,
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ message: "Failed to update profile" })
  }
}
