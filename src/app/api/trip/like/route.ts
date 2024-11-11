"use server"
import { db } from "@/services/firebaseAdmin"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const tripsRef = db.collection("trips")
    const body = await req.json()

    const { tripId, userId } = body

    if (!tripId || !userId) {
      return NextResponse.json({
        status: 400,
        message: "Missing tripId or userId",
      })
    }

    const tripDocRef = tripsRef.doc(tripId)

    const tripDoc = await tripDocRef.get()

    if (!tripDoc.exists) {
      return NextResponse.json({
        status: 404,
        message: "Trip not found",
      })
    }

    const tripData = tripDoc.data()
    const currentLikes: { [userId: string]: boolean } = tripData?.likes || {}

    const newLikeState = !currentLikes[userId]

    await tripDocRef.update({
      [`likes.${userId}`]: newLikeState,
    })

    const updatedLikes = { ...currentLikes, [userId]: newLikeState }
    const likeCount = Object.values(updatedLikes).filter(
      (liked) => liked
    ).length

    return NextResponse.json({
      status: 200,
      message: newLikeState ? "Trip liked!" : "Trip unliked!",
      likeCount,
    })
  } catch (error) {
    console.error("Error updating like state:", error)
    return NextResponse.json({
      status: 500,
      message: "Failed to update like state",
    })
  }
}
