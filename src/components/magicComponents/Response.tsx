import React from "react"
import { TripDetails } from "../customs/TripDetails"
import { ModelState, TripPlan } from "@/lib/types"

interface ResponseProps {
  tripData: TripPlan
  onChangeState?: (state: ModelState) => void
}

export const Response: React.FC<ResponseProps> = ({
  tripData,
  onChangeState,
}) => {
  return (
    <>
      <TripDetails
        tripData={tripData!}
        onSetState={onChangeState}
      />
    </>
  )
}
