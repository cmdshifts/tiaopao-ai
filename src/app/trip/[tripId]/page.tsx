"use client"
import { TripDetails } from "@/components/customs/TripDetails"
import { TripPlan } from "@/lib/types"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { tripId: string } }) {
  const tripId = params.tripId
  const { data } = useSession()

  const [tripData, setTripData] = useState<TripPlan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrip = async () => {
      if (!tripId) return

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getTripDetails?tripId=${tripId}`,
          {
            method: "GET",
          }
        )

        if (!response.ok) throw new Error("Failed to fetch trip")

        const data = await response.json()
        setTripData(data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(true)
      }
    }

    fetchTrip()
  }, [tripId])

  if (!data || !data.user.id) return null

  if (!tripData) return null

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <TripDetails
            tripData={tripData}
            userId={data.user.id}
          />
        </>
      )}
    </>
  )
}
