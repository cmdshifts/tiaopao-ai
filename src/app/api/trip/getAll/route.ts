"use server"
import { TripPlan, User } from "@/lib/types"
import { getFirestore } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"

export interface TripWithOwner extends Omit<TripPlan, "planOwner"> {
  planId: string
  likeCount: number
  planOwner: User | null
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const db = getFirestore()
    const tripsRef = db.collection("trips")

    const hasMaxResults = searchParams.has("maxResults")

    const querySnapshot = await tripsRef
      .orderBy("createdDate", "desc")
      .orderBy("createdTime", "desc")
      .get()

    // Retrieve trips data and replace planOwner with user object
    const tripsWithOwners: TripWithOwner[] = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const tripData = doc.data() as TripPlan

        // Count likes
        const likeCount = Object.values(tripData.likes).filter(
          (liked) => liked === true
        ).length

        // Fetch planOwner user details
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

    // Sort trips by likeCount
    const sortedTrips = tripsWithOwners.sort(
      (a, b) => b.likeCount - a.likeCount
    )

    // Apply maxResults filter if necessary
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
