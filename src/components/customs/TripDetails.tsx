import { ModelState, TripPlan } from "@/lib/types"
import React, { useEffect, useState } from "react"
import { TripLikeButton } from "./TripLikeButton"
import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import { HiOutlineCreditCard } from "react-icons/hi2"
import { RiCarLine, RiGroupLine, RiHeart3Line } from "react-icons/ri"
import { TbCampfire } from "react-icons/tb"
import { Tag } from "./Tag"
import { formatCurrency, getLocation } from "@/lib/utils"
import Image from "next/image"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"

interface TripDetailsProps {
  tripData: TripPlan
  userId?: string
  onSetState?: (state: ModelState) => void
}

export const TripDetails: React.FC<TripDetailsProps> = ({
  tripData,
  userId,
  onSetState,
}) => {
  const [likeCount, setLikeCount] = useState<number>(0)
  const [tripOwner, setTripOwner] = useState<any>(null)

  console.log("###TRIPDATA:", tripData)

  useEffect(() => {
    const fetchTripOwner = async () => {
      const owner = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getTripOwner?userId=${tripData.planOwner}`,
        { method: "GET" }
      )

      const ownerData = await owner.json()
      setTripOwner(ownerData.data)
    }

    if (tripData && tripData.planOwner) {
      fetchTripOwner()
    }
  }, [])

  useEffect(() => {
    if (userId) {
      const initialLikeCount = Object.values(tripData.likes).filter(
        Boolean
      ).length
      setLikeCount(initialLikeCount)
    }
  }, [tripData.likes])

  const handleLikeToggle = (newLikeCount: number) => {
    setLikeCount(newLikeCount)
  }

  if (!tripData)
    return (
      <>
        <div className="flex flex-col justify-center items-center h-full gap-2">
          กรุณาลองใหม่อีกครั้ง
          <Button>รีเฟรช</Button>
        </div>
      </>
    )

  return (
    <>
      <section className="flex-1 flex flex-col items-center h-full">
        <Image
          src={`https://places.googleapis.com/v1/${
            tripData?.data[0]?.places[0]?.photos
              ? tripData?.data[0]?.places[0].photos.name!
              : ""
          }/media?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&maxWidthPx=1600`}
          alt={tripData?.data[0]?.places[0]?.displayName?.text!}
          width={1200}
          height={630}
          className="w-full h-[240px] object-cover rounded-lg"
        />
        <div className="flex-1 grid grid-cols-12 gap-4 w-full h-full">
          <div className="h-max col-span-12 md:col-span-4 bg-background border-2 border-gray-500/0 rounded-sm p-2 select-none">
            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-heading-md">{tripData?.province}</h2>
              {tripOwner && userId && (
                <p className="flex items-center gap-2">
                  <span>
                    <Image
                      src={tripOwner?.image || ""}
                      alt={tripOwner?.username}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </span>
                  {tripOwner?.username}
                </p>
              )}
            </div>
            <Separator className="my-1" />
            <div className="p-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Tag
                  prefixIcon={<RiCarLine />}
                  label={"ระยะเวลา " + tripData?.totalDays.toString() + " วัน"}
                />
                <Tag
                  prefixIcon={<HiOutlineCreditCard />}
                  label={
                    "งบประมาณ " +
                    formatCurrency(tripData?.totalBudget!, "th", "THB") +
                    " บาท"
                  }
                />
                <Tag
                  prefixIcon={<RiGroupLine />}
                  label={tripData?.companion!}
                />
                <Tag
                  prefixIcon={<TbCampfire />}
                  label={tripData?.lifestyle!}
                />
                {userId && (
                  <Tag
                    prefixIcon={<RiHeart3Line />}
                    label={likeCount + " คนถูกใจ"}
                  />
                )}
              </div>
              {userId && (
                <TripLikeButton
                  tripId={tripData.planId}
                  userId={userId!}
                  initialLikes={tripData.likes}
                  onLikeToggle={handleLikeToggle}
                />
              )}
              {!userId && (
                <>
                  <Button
                    onClick={() => {
                      if (onSetState) {
                        onSetState("prompt")
                      }
                    }}
                    variant={"secondary"}>
                    ปรับแผนใหม่
                  </Button>
                  <Button
                    onClick={() => {
                      if (onSetState) {
                        onSetState("generate")
                      }
                    }}>
                    สร้างอีกครั้ง
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="col-span-12 [&>ul]:p-0 [&>ul>li>div]:px-2 md:col-span-8 bg-background border-2 border-gray-500/0 rounded-sm p-4">
            <h4 className="text-heading-sm">แผนการท่องเที่ยว</h4>
            {tripData?.data.map((item, index) => (
              <div key={index}>
                <div className="text-subtitle-lg p-2">วันที่ {item.day}</div>
                <Timeline
                  sx={{
                    [`& .${timelineOppositeContentClasses.root}`]: {
                      flex: 0.25,
                    },
                  }}>
                  {item.places.map((place, index) => {
                    if (place) {
                      return (
                        <div key={index}>
                          <TimelineItem>
                            <TimelineOppositeContent
                              sx={{ m: "auto 0" }}
                              align="right"
                              variant="body2"
                              color="text.secondary">
                              <p className="font-seedSans text-foreground text-subtitle-sm">
                                {place?.timeToVisit}
                              </p>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                              <TimelineConnector />
                              <TimelineDot variant="outlined" />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: "12px", px: 2 }}>
                              <div className="font-seedSans flex items-center gap-4 select-none cursor-pointer">
                                <Image
                                  src={`https://places.googleapis.com/v1/${place?.photos?.name}/media?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&maxWidthPx=400`}
                                  alt={place.displayName?.text! || place.name!}
                                  height={60}
                                  width={80}
                                  className="aspect-[4/3] rounded-md pointer-events-none"
                                />
                                <div>
                                  <h6 className="text-subtitle-lg">
                                    {place?.displayName?.text || place?.name}
                                  </h6>
                                  <p>
                                    {getLocation(place?.addressComponents!)}
                                  </p>
                                  <p className="text-subtitle-sm mt-2">
                                    ค่าใช้จ่ายโดยประมาณ {place.budget} บาท
                                  </p>
                                </div>
                              </div>
                            </TimelineContent>
                          </TimelineItem>
                        </div>
                      )
                    }
                  })}
                </Timeline>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
