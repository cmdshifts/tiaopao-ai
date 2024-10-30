"use server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

    if (!GOOGLE_API_KEY) {
      throw new Error("Google API key is not defined")
    }

    const data = await fetch(
      "https://places.googleapis.com/v1/places:searchNearby",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "places.id,places.types,places.addressComponents,places.rating,places.businessStatus,places.displayName.text,places.photos,places.googleMapsUri,places.currentOpeningHours.openNow",
        },
        body: JSON.stringify({
          locationRestriction: {
            circle: {
              center: {
                latitude: 13.7563354,
                longitude: 100.501766,
              },
              radius: 500.0,
            },
          },
          languageCode: "th",
          ...body,
        }),
      }
    )

    const result = await data.json()
    return NextResponse.json(result.places)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Something went wrong" })
  }
}
