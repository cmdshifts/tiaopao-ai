"use client"
import { TripWithOwner } from "@/app/api/trip/getAll/route"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface TripTicketProps {
  trip: TripWithOwner
}

export const TripTicket: React.FC<TripTicketProps> = ({ trip }) => {
  return (
    <>
      <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/trip/${trip.planId}`}>
        <article className="ticket !w-full select-none cursor-pointer">
          <header className="ticket__wrapper">
            <Image
              src={`https://places.googleapis.com/v1/${
                trip.data[0]?.places[0]?.photos
                  ? trip.data[0]?.places[0]?.photos?.name
                  : undefined
              }/media?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&maxWidthPx=1200`}
              alt={trip.data[0]?.places[0]?.photos?.name!}
              width={400}
              height={304}
              loading="lazy"
              data-loaded="false"
              style={{
                width: "100%",
                height: "auto",
              }}
              onLoad={(event) => {
                event.currentTarget.setAttribute("data-loaded", "true")
              }}
              className="min-h-[240px] h-full aspect-auto max-h-[240px] data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-900/10 rounded-t-sm rounded-b-none"
            />
            <div className="ticket__header bg-background !text-foreground !font-semibold !items-center !text-heading-sm !py-2 !px-4">
              <p className="font-semibold">{trip.province}</p>
              <p className="font-normal text-subtitle-lg items-center">
                {trip.lifestyle}
              </p>
            </div>
          </header>
          <div className="ticket__divider bg-background">
            <div className="ticket__notch"></div>
            <div className="ticket__notch ticket__notch--right"></div>
          </div>
          <div className="ticket__body bg-background">
            <section className="ticket__section grid grid-cols-2">
              <span className="font-medium">
                <h6 className="text-subtitle-md">จำนวนวัน</h6>
                <p className="text-body-lg">{trip.totalDays} วัน</p>
              </span>
              <span className="font-medium">
                <h6 className="text-subtitle-md">ผู้ร่วมเดินทาง</h6>
                <p className="text-body-lg">{trip.companion}</p>
              </span>
              <span className="font-medium">
                <h6 className="text-subtitle-md">ถูกใจ</h6>
                <p className="text-body-lg">{trip.likeCount} คน</p>
              </span>
              <span className="font-medium">
                <h6 className="text-subtitle-md">สร้างโดย</h6>
                <p className="text-body-lg">{trip.planOwner?.username}</p>
              </span>
            </section>
          </div>
          <footer className="ticket__footer bg-background !font-semibold !text-subtitle-lg">
            <span className="!font-normal">งบประมาณ</span>
            <span className="font-medium">
              {formatCurrency(trip.totalBudget, "th", "THB")} บาท
            </span>
          </footer>
        </article>
      </Link>
    </>
  )
}
