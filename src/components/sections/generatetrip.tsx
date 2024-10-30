"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DateRangePicker } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { FaCalendarAlt } from "react-icons/fa"
import provinces from "./../customs/Province.json"

const GenerateTrip = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tripPlan, setTripPlan] = useState<string | null>(null)

  const [place, setPlace] = useState<any>(null)
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ])
  const [peopleCount, setPeopleCount] = useState<string>("1-2 people")
  const [customPeopleCount, setCustomPeopleCount] = useState<number | null>(
    null
  )
  const [costRange, setCostRange] = useState<number>(4000) // Default budget

  const fetchTripPlan = async () => {
    setLoading(true)
    setError(null)

    const numOfDays = Math.ceil(
      (dateRange[0].endDate.getTime() - dateRange[0].startDate.getTime()) /
        (1000 * 3600 * 24)
    )
    const selectedPeopleCount =
      peopleCount === "custom" ? customPeopleCount : peopleCount

    const query = {
      dateRange: numOfDays,
      traveller: selectedPeopleCount || "No people count selected",
      budget: costRange,
      province_id: place?.id || 58, // Adjust according to your province data structure
      province_code: place?.province_code || "73", // Example province code
      province_name: place?.province_name || "นครปฐม", // Example province name
      geo_id: place?.geo_id || 2, // Example geo ID
    }

    try {
      const response = await fetch("/api/generate-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: `Generate a travel itinerary for ${query.dateRange} days for ${query.traveller} travellers with a budget of ${query.budget} baht in ${query.province_name}, Thailand. They will be traveling by car. Please provide real-world suggestions for hotels, restaurants, and attractions based on data from Google Maps, including practical travel routes. Ensure all locations are reachable by car, and the travel plan is optimized for time and budget.`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate the trip plan.")
      }

      const data = await response.json()
      setTripPlan(data.text)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTripPlan()
  }, [])

  return (
    <div className="pt-20">
      <div className="pt-14"></div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {tripPlan && <p>Generated Trip Plan: {tripPlan}</p>}
    </div>
  )
}

export default GenerateTrip
