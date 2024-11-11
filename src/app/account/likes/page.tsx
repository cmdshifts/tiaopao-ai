"use client"
import { Separator } from "@/components/ui/separator"
import { TripPlan } from "@/lib/types"
import { countLikes, formatDate, formatTime } from "@/lib/utils"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { RiHeart3Fill } from "react-icons/ri"
import { TbReload } from "react-icons/tb"

export default function Likes() {
  const { data } = useSession()
  const [result, setResult] = useState<TripPlan[] | null>(null)
  const [buttonClicked, setButtonClicked] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(true)

  const fetchTrips = async (userId: string) => {
    setIsFetching(true)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getLikedTrip?userId=${userId}`,
      {
        method: "GET",
      }
    )

    const result = await response.json()
    setResult(result.data)
    setIsFetching(false)
  }

  useEffect(() => {
    fetchTrips(data?.user.id!)
  }, [data?.user.id])

  return (
    <>
      <div className="flex flex-col select-none">
        <div className="flex flex-row">
          <span className="flex-1">
            <h2 className="text-heading-sm mb-2">การถูกใจ</h2>
            <p>แผนการท่องเที่ยวที่ถูกใจ</p>
          </span>
          {/* <div className="flex items-center">
            <Button
              variant={"destructive"}
              className="bg-destructive/10 hover:bg-destructive/20 text-destructive">
              ล้างประวัติการใช้งาน
            </Button>
          </div> */}
        </div>
        <Separator className="my-2" />
        <div className="mt-2 flex flex-col gap-2">
          {result !== null ? (
            result.map((trip: TripPlan, index: number) => (
              <Link
                key={index}
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/trip/${trip.planId}`}
                onClick={(e) => {
                  if (buttonClicked) {
                    e.preventDefault()
                    setButtonClicked(false)
                  }
                }}>
                <div className="flex flex-row p-4 bg-foreground/5 hover:bg-foreground/10 transition-all duration-100 ease-in-out rounded-3xl gap-4">
                  <Image
                    src={`https://places.googleapis.com/v1/${
                      trip?.data[0].places[0]?.photos
                        ? trip?.data[0].places[0].photos.name!
                        : ""
                    }/media?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&maxWidthPx=1600`}
                    alt={trip?.data[0].places[0]?.displayName?.text!}
                    width={1200}
                    height={630}
                    className="h-[84px] w-[84px] object-cover rounded-sm"
                  />
                  <div className="flex flex-row flex-1">
                    <div className="flex flex-col flex-1">
                      <h6 className="font-semibold">{trip.province}</h6>
                      <div className="flex items-center gap-1">
                        <RiHeart3Fill className="fill-foreground" />
                        <span className="text-subtitle-sm font-normal">
                          {countLikes(trip.likes)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-end text-subtitle-md font-normal text-right text-foreground/50 gap-2">
                      <span>
                        <p>{formatDate(trip.createdDate, "th")}</p>
                        <p>{formatTime(trip.createdTime, "th")}</p>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <>
              <div className="flex justify-center items-center gap-2 py-4 px-2 bg-foreground/5 rounded-sm">
                {isFetching ? (
                  <>
                    <TbReload className="animate-spin" />
                    กำลังโหลดข้อมูล
                  </>
                ) : (
                  <>ไม่พบข้อมูล</>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
