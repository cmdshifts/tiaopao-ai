"use server"
import { TripPlan, User } from "@/lib/types"
import { db } from "@/services/firebaseAdmin"
import { NextRequest, NextResponse } from "next/server"

export interface TripWithOwner extends Omit<TripPlan, "planOwner"> {
  planId: string
  likeCount: number
  planOwner: User | null
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.nextUrl)
    const tripsRef = db.collection("trips")

    const hasMaxResults = searchParams.has("maxResults")

    const querySnapshot = await tripsRef
      .orderBy("createdDate", "desc")
      .orderBy("createdTime", "desc")
      .get()

    const tripsWithOwners: TripWithOwner[] = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const tripData = doc.data() as TripPlan

        const likeCount = Object.values(tripData.likes).filter(
          (liked) => liked === true
        ).length

        const userRef = db.collection("users").doc(tripData.planOwner!)
        const userDoc = await userRef.get()
        const userData = userDoc.exists ? (userDoc.data() as User) : null

        return {
          ...tripData,
          planId: doc.id,
          likeCount,
          planOwner: userData,
        }
      })
    )

    const sortedTrips = tripsWithOwners.sort(
      (a, b) => b.likeCount - a.likeCount
    )

    const maxResults = hasMaxResults
      ? Number(searchParams.get("maxResults"))
      : null
    const limitedTrips = maxResults
      ? sortedTrips.slice(0, maxResults)
      : sortedTrips

    return NextResponse.json({
      status: 200,
      message: "Successful!",
      data: limitedTrips,
    })
  } catch (error) {
    console.error("Error fetching trips:", error)
    return NextResponse.json({ status: 500, message: "Failed to fetch trips" })
  }
}
