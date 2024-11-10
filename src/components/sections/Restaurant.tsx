"use client"
import React, { useEffect, useState } from "react"
import { type EmblaOptionsType } from "embla-carousel"
import EmblaCarousel from "../embla/EmblaCarousel"
import { type LocationCoords } from "@/types/LocationCoords"
import { Highlight } from "../customs/Highlight"

export const Restaurant: React.FC = () => {
  const [api, setApi] = useState([])
  const [coords, setCoords] = useState<LocationCoords>({
    latitude: 13.7563354,
    longitude: 100.501766,
  })

  const getCoords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCoords({ latitude: latitude, longitude: longitude })
        },
        (err) => {
          console.error(err.message)
        }
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
    }
  }

  useEffect(() => {
    getCoords()
  }, [])

  useEffect(() => {
    const fetchData = async (lat: number, lng: number) => {
      const data = await fetch("api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locationRestriction: {
            circle: {
              center: {
                latitude: lat || 13.7563354,
                longitude: lng || 100.501766,
              },
              radius: 5000.0,
            },
          },
          maxResultCount: 8,
          includedTypes: ["restaurant", "cafe"],
          excludedPrimaryTypes: [
            "lodging",
            "hotel",
            "hostel",
            "school",
            "secondary_school",
            "event_venue",
          ],
        }),
      })
      const result = await data.json()

      setApi(result)
    }

    if (coords.latitude && coords.longitude) {
      fetchData(coords.latitude, coords.longitude)
    }
  }, [coords.latitude, coords.longitude])

  const OPTIONS: EmblaOptionsType = { dragFree: false, loop: true }

  return (
    <>
      <section
        id="restaurant"
        className="relative w-screen -mt-[104px] pt-[104px] z-0">
        <div className="flex flex-col items-center w-full gap-4">
          <div className="w-full max-w-[1400px] px-8 py-3 flex justify-between items-center">
            <div>
              <p className="relative text-heading-md">
                Restaurant
                <Highlight className="fill-foreground/30" />
              </p>
              <p className="text-subtitle-lg text-gray-500">
                #ร้านอาหารที่น่าสนใจ
              </p>
            </div>
          </div>
          <div className="flex items-center w-full max-w-[1400px] pb-8">
            <EmblaCarousel
              slides={api}
              options={OPTIONS}
            />
          </div>
        </div>
      </section>
    </>
  )
}
