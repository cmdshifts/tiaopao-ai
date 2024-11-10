import { TripWithOwner } from "@/app/api/trip/getAll/route"
import { TripPlan } from "@/lib/types"
import { GetServerSideProps } from "next"
import React from "react"
import { TripTicket } from "./TripTicket"

interface Trip {
  trips: TripWithOwner[]
}

export const InterestingList: React.FC<Trip> = ({ trips }) => {
  return (
    <>
      <ul className="max-w-[1400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full p-4">
        {trips.map((trip) => (
          <TripTicket
            key={trip.planId}
            trip={trip}
          />
        ))}
      </ul>
    </>
  )
}
