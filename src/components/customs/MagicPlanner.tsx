"use client"

import { ModelState, PromptVariables, TripPlan } from "@/lib/types"
import React, { useState, useEffect } from "react"
import { Prompt } from "../magicComponents/Prompt"
import { Generate } from "../magicComponents/Generate"
import { cn } from "@/lib/utils"
import { Response } from "../magicComponents/Response"
import axios from "axios"
import { toast } from "@/hooks/use-toast"

interface MagicPlannerProps {}

export const MagicPlanner: React.FC<MagicPlannerProps> = () => {
  const [modelState, setModelState] = useState<ModelState>("prompt")
  const [displayedState, setDisplayedState] = useState<ModelState>("prompt")
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [savedPromptVariables, setSavedPromptVariables] =
    useState<PromptVariables | null>(null)
  const [savedResult, setSavedResult] = useState<TripPlan | null>(null)

  const handleStateChange = (
    state: ModelState,
    promptObject?: PromptVariables
  ) => {
    if (state === "generate" && (promptObject || savedPromptVariables)) {
      if (promptObject) {
        setSavedPromptVariables(promptObject)
      }

      const fetchData = async () => {
        try {
          const response = await axios.post(
            "/api/generate",
            JSON.stringify({
              ...(promptObject || savedPromptVariables),
            })
          )

          if (response.status === 200) {
            setSavedResult(response.data)
            setIsTransitioning(true)
            setTimeout(() => {
              setDisplayedState("response")
              setIsTransitioning(false)
            }, 300)
          }
        } catch (error) {
          console.error("Error fetching data:", error)
          toast({
            variant: "destructive",
            title: "ข้อผิดพลาด: ไม่สามารถใช้งานได้นะขณะนี้",
            description: "โปรดกรอกข้อมูลให้ครบถ้วน",
            duration: 5000,
          })
          setDisplayedState("prompt")
        }
      }

      fetchData()
    }

    setIsTransitioning(true)
    setTimeout(() => {
      setDisplayedState(state)
      setIsTransitioning(false)
    }, 300)
    setModelState(state)
  }

  const renderComponent = () => {
    switch (displayedState) {
      case "prompt":
        return (
          <Prompt
            promptVariables={savedPromptVariables!}
            onStateChange={handleStateChange}
          />
        )
      case "generate":
        return <Generate onStateChange={handleStateChange} />
      case "response":
        return (
          <Response
            tripData={savedResult!}
            onChangeState={handleStateChange}
          />
        )
      default:
        return (
          <Prompt
            promptVariables={savedPromptVariables!}
            onStateChange={handleStateChange}
          />
        )
    }
  }

  return (
    <div
      className={cn(
        "transition-opacity duration-300 transform h-full",
        `${isTransitioning ? "opacity-0" : "opacity-100"}`
      )}>
      {renderComponent()}
    </div>
  )
}
