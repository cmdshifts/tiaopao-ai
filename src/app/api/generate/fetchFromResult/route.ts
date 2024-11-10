"use server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    console.log(body)

    if (!GOOGLE_API_KEY) {
      throw new Error("Google API key is not defined")
    }

    if (!body.answer || !Array.isArray(body.answer)) {
      throw new Error("Invalid request body")
    }

    const days = await Promise.all(
      body.answer.map(async (day: any) => {
        const places = await Promise.all(
          day.places.map(async (place: any) => {
            const { name } = place

            const response = await fetch(
              "https://places.googleapis.com/v1/places:searchText",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Goog-Api-Key": GOOGLE_API_KEY,
                  "X-Goog-FieldMask":
                    "places.id,places.types,places.addressComponents,places.rating,places.businessStatus,places.displayName.text,places.photos,places.googleMapsUri,places.currentOpeningHours.openNow",
                },
                body: JSON.stringify({
                  textQuery: name,
                  languageCode: "th",
                  locationBias: {
                    circle: {
                      center: {
                        latitude: body.province.coords.lat,
                        longitude: body.province.coords.lng,
                      },
                      radius: 500.0,
                    },
                  },
                }),
              }
            )

            if (response.status !== 200) {
              return {
                ...place,
              }
            }

            const data = await response.json()
            const placeData = data.places[0]

            return {
              // eslint-disable-next-line no-unused-vars
              ...(({ name, ...rest }) => rest)(place),
              // eslint-disable-next-line no-unused-vars
              ...(({ photos, reviews, ...rest }) => rest)(placeData),
              photos: placeData.photos ? placeData.photos[0] : null,
            }
          })
        )

        return {
          day: day.day,
          places: places,
        }
      })
    )

    return NextResponse.json(days, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
