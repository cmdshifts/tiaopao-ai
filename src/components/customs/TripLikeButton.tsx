"use client"
import React from "react"
import { LikeState } from "@/lib/types"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri"

interface LikeButtonProps {
  tripId: string
  userId: string
  initialLikes: LikeState
  onLikeToggle: (count: number) => void
}

export const TripLikeButton: React.FC<LikeButtonProps> = ({
  tripId,
  userId,
  initialLikes,
  onLikeToggle,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(!!initialLikes?.[userId])

  useEffect(() => {
    setIsLiked(!!initialLikes?.[userId])
  }, [initialLikes, userId])

  const handleLikeToggle = async () => {
    try {
      const response = await fetch(`/api/trip/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tripId, userId }),
      })

      if (!response.ok) {
        throw new Error("Failed to like the trip")
      }

      const data = await response.json()
      const updatedLikeCount = data.likeCount
      // setLikes(data.likes)
      setIsLiked(!isLiked)
      onLikeToggle(updatedLikeCount)
    } catch (error) {
      console.error(error)
      // setIsLiked(previousIsLiked)
    }
  }

  return (
    <>
      <Button
        variant={isLiked ? "secondary" : "default"}
        onClick={handleLikeToggle}
        className="gap-2">
        {isLiked ? (
          <>
            <RiHeart3Fill className="fill-destructive" />
          </>
        ) : (
          <>
            <RiHeart3Line className="fill-background" />
          </>
        )}
        ถูกใจ
      </Button>
    </>
  )
}
