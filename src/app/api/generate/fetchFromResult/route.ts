"use server"
import { isProvinceMatch } from "@/lib/utils"
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
                    "places.id,places.types,places.addressComponents,places.rating,places.businessStatus,places.displayName.text,places.photos,places.googleMapsUri,places.currentOpeningHours.openNow,places.location",
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
                      radius: 5000.0,
                    },
                  },
                  pageSize: 20,
                }),
              }
            )

            if (response.status !== 200) {
              return {
                ...place,
              }
            }

            const data = await response.json()

            for (const placeData of data.places) {
              if (
                isProvinceMatch(
                  body.province.provinceNameTh,
                  placeData.addressComponents
                )
              ) {
                console.log("DEFAULT!", placeData)

                return {
                  // eslint-disable-next-line no-unused-vars
                  ...(({ name, ...rest }) => rest)(place),
                  // eslint-disable-next-line no-unused-vars
                  ...(({ photos, reviews, ...rest }) => rest)(placeData),
                  photos: placeData.photos ? placeData.photos[0] : null,
                }
              } else {
                try {
                  const response = await fetch(
                    "https://places.googleapis.com/v1/places:searchNearby",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "X-Goog-Api-Key": GOOGLE_API_KEY,
                        "X-Goog-FieldMask":
                          "places.id,places.types,places.addressComponents,places.rating,places.businessStatus,places.displayName.text,places.photos,places.googleMapsUri,places.currentOpeningHours.openNow,places.location",
                      },
                      body: JSON.stringify({
                        maxResultCount: 20,
                        locationRestriction: {
                          circle: {
                            center: {
                              latitude: body.province.coords.lat,
                              longitude: body.province.coords.lng,
                            },
                            radius: 5000.0,
                          },
                        },
                        languageCode: "th",
                        includedTypes: [
                          "tourist_attraction",
                          "restaurant",
                          "cafe",
                        ],
                        excludedPrimaryTypes: [
                          "lodging",
                          "hotel",
                          "hostel",
                          "school",
                          "secondary_school",
                          "event_venue",
                        ],
                      }),
                    }
                  )

                  const placesResult = (await response.json()).places
                  console.log("NEARBY!", placesResult)
                  if (placesResult.length === 0) {
                    throw new Error(
                      "No places found in the specified location."
                    )
                  }

                  const randomPlace =
                    placesResult[
                      Math.floor(Math.random() * placesResult.length)
                    ]

                  console.log("RANDOMED!", randomPlace)

                  return {
                    // eslint-disable-next-line no-unused-vars
                    ...(({ name, ...rest }) => rest)(place),
                    // eslint-disable-next-line no-unused-vars
                    ...(({ photos, reviews, ...rest }) => rest)(randomPlace),
                    photos: randomPlace.photos ? randomPlace.photos[0] : null,
                  }
                } catch (error) {
                  console.error("Error fetching places:", error)
                  throw error
                }
              }
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
