"use client"
import { TripDetails } from "@/components/customs/TripDetails"
import { TripPlan } from "@/lib/types"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { RiLoaderLine } from "react-icons/ri"

export default function Page({ params }: { params: { tripId: string } }) {
  const tripId = params.tripId
  const { data } = useSession()
  const router = useRouter()

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
        setLoading(false)
      }
    }

    fetchTrip()
  }, [tripId])

  if (!data || !data.user.id) return router.push("/")

  if (!tripData) return null

  return (
    <>
      {loading ? (
        <>
          <div className="w-full h-full flex items-center justify-center gap-4">
            <RiLoaderLine className="text-2xl animate-spin" />
            กำลังโหลดข้อมูล...
          </div>
        </>
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
