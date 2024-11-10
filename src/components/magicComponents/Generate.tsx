"use client"
import { ModelState, PromptVariables, TripPlan } from "@/lib/types"
import React, { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { RiSparkling2Fill } from "react-icons/ri"
import axios from "axios"

interface GenerateProps {
  onStateChange: (state: ModelState) => void
  isFinished?: boolean
}

export const Generate: React.FC<GenerateProps> = ({
  onStateChange,
  isFinished,
}) => {
  const [milliseconds, setMilliseconds] = useState(0)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  // useEffect(() => {
  //   if (variables) {
  //     setIsFetching(true)

  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.post(
  //           "/api/generate",
  //           JSON.stringify({
  //             variables,
  //           })
  //         )

  //         if (response.status === 200) {
  //           if (onGeneratedResult) {
  //             onGeneratedResult(response.data)
  //           }
  //         }

  //         onStateChange("response")
  //       } catch (error) {
  //         console.error("Error fetching data:", error)
  //         onStateChange("prompt")
  //         setIsFetching(false)
  //       }
  //     }

  //     fetchData()
  //   }
  // }, [variables, onGeneratedResult, onStateChange])

  if (isFinished) {
    setIsFetching(false)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMilliseconds((prevMilliseconds) => prevMilliseconds + 100)
    }, 100)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (!isFetching) {
      setMilliseconds(0)
    }
  }, [isFetching])

  const handleCancel = () => {
    onStateChange("prompt")
  }

  const secondsDisplay = (milliseconds / 1000).toFixed(1)

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col items-center animate-pulse gap-4">
          <RiSparkling2Fill className="text-heading-xl" />
          <span className="flex flex-col text-center">
            <h3 className="text-subtitle-lg font-semibold">
              กำลังสร้างแผนด้วย Magic Planner
            </h3>
          </span>
        </div>
        <p>{secondsDisplay}วิ</p>
        <Button
          variant={"secondary"}
          onClick={handleCancel}>
          ยกเลิก
        </Button>
      </div>
    </>
  )
}
