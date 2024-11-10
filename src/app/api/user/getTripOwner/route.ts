"use server"
import { getFirestore } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const hasUserId = searchParams.has("userId")

    if (!hasUserId) {
      return NextResponse.json({
        status: 400,
        message: "User ID is required",
      })
    }

    const userId = searchParams.get("userId")

    const db = getFirestore()
    const userRef = db.collection("users").doc(userId!)

    const user = (await userRef.get()).data()

    return NextResponse.json({
      status: 200,
      message: "Successful!",
      data: {
        ...(user
          ? // eslint-disable-next-line no-unused-vars
            (({ email, role, emailVerified, ...rest }) => rest)(user)
          : undefined),
      },
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ message: "Failed to update profile" })
  }
}
