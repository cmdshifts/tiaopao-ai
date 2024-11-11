"use server"
import { TripPlan } from "@/lib/types"
import { db } from "@/services/firebaseAdmin"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.nextUrl)
    const hasUserId = searchParams.has("userId")

    if (hasUserId) {
      const userId = searchParams.get("userId")
      const tripsRef = db.collection("trips")
      const snapshot = await tripsRef.where(`likes.${userId}`, "==", true).get()

      const likedTrips: TripPlan[] = []

      snapshot.forEach((doc) => {
        return likedTrips.push({
          planId: doc.get("planId"),
          province: doc.get("province"),
          totalBudget: doc.get("totalBudget"),
          totalDays: doc.get("totalDays"),
          companion: doc.get("companion"),
          lifestyle: doc.get("lifestyle"),
          data: doc.get("data"),
          createdDate: doc.get("createdDate"),
          createdTime: doc.get("createdTime"),
          likes: doc.get("likes"),
        })
      })

      return NextResponse.json({
        status: 200,
        message: "Successful!",
        data: likedTrips,
      })
    }
  } catch (error) {
    console.error("Error fetching liked trips:", error)
    return NextResponse.json({ message: "Failed to fetch liked trips" })
  }
}
