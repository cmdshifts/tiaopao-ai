"use client"
import React, { useEffect, useState } from "react"
import { Highlight } from "../customs/Highlight"
import TicketEmblaCarousel from "../ticketEmbla/TicketEmblaCarousel"
import { EmblaOptionsType } from "embla-carousel"
import { Skeleton } from "../ui/skeleton"
import Link from "next/link"
import { Button } from "../ui/button"

export const Interesting: React.FC = () => {
  const [api, setApi] = useState([])
  const [tripOwner, setTripOwner] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("api/trip/getAll?maxResults=8", {
        method: "GET",
      })
      const result = await data.json()

      setApi(result.data)
    }

    fetchData()
  }, [])

  const OPTIONS: EmblaOptionsType = {
    dragFree: false,
    loop: true,
  }

  return (
    <>
      <section
        id="interesting"
        className="relative w-screen -mt-[104px] pt-[104px] z-20">
        <div className="flex flex-col items-center w-full gap-4">
          <div className="w-full max-w-[1400px] px-8 py-3 flex flex-col md:flex-row gap-4 md:gap-0 justify-center md:justify-between items-center">
            <div>
              <p className="relative text-heading-md">
                Interesting
                <Highlight className="fill-foreground/30" />
              </p>
              <p className="text-subtitle-lg text-gray-500">
                #แผนเที่ยวที่น่าสนใจ
              </p>
            </div>
            <div>
              <Link href={"/interesting"}>
                <Button
                  variant={"destructive"}
                  className="bg-turquoise/10 text-turquoise hover:bg-turquoise/20">
                  ดูทั้งหมด
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center w-full max-w-[1400px] pb-8">
            {api.length === 0 ? (
              <>
                <Skeleton className="mx-4 w-full h-[400px]" />
              </>
            ) : (
              <>
                <TicketEmblaCarousel
                  slides={api}
                  options={OPTIONS}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
