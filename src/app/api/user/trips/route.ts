"use server"
import { db } from "@/services/firebaseAdmin"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const tripsRef = db.collection("trips")
    const body = await req.json()

    const querySnapshot = await tripsRef
      .where("planOwner", "==", body.planOwner)
      .orderBy("createdDate", "desc")
      .orderBy("createdTime", "desc")
      .get()

    console.log("querySnapshot", querySnapshot)

    const trips = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      status: 200,
      message: "Successful!",
      data: trips,
    })
  } catch (error) {
    console.error("Error fetching trips:", error)
    return NextResponse.json({ message: "Failed to fetch trips" })
  }
}
