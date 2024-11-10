"use server"

import { getFirestore } from "firebase-admin/firestore"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()

    const db = getFirestore()
    const tripRef = db.collection("trips").doc(body.tripId)
    const data = (await tripRef.get()).data()

    if (data?.planOwner !== body.userId) {
      return NextResponse.json({
        status: 403,
        message: "Unauthorized",
      })
    }

    const response = await tripRef.delete()

    return NextResponse.json({
      status: 200,
      message: "Done!",
      response: response,
    })
  } catch (error) {
    console.error("Error deleting trip: ", error)
    return NextResponse.json({
      status: 500,
      message: "Failed to delete a trip",
    })
  }
}
