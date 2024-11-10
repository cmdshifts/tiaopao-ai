"use server"
import { db } from "@/services/firebaseAdmin"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.nextUrl)

    const hasTripId = searchParams.has("tripId")

    if (!hasTripId) {
      return NextResponse.json({
        status: 400,
        message: "Trip ID is required",
      })
    }

    const tripId = searchParams.get("tripId")

    if (tripId) {
      const tripRef = db.collection("trips").doc(tripId)

      return NextResponse.json({
        status: 200,
        message: "Successful!",
        data: (await tripRef.get()).data(),
      })
    }
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ message: "Failed to update profile" })
  }
}
