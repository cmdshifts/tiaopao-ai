"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { MarqueeDemo } from "@/components/magicui/marquee"

export default function Home() {
  /*ฟังชันเลื่อนสวยๆเกร๋ๆ*/
  const [scrolling, setScrolling] = useState(false)

  const handleScroll = () => {
    setScrolling(true)
    const section = document.getElementById("interestingpage")
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScrollEvent = () => {
      if (window.scrollY === 0) {
        setScrolling(false)
      }
    }
    window.addEventListener("scroll", handleScrollEvent)
    return () => {
      window.removeEventListener("scroll", handleScrollEvent)
    }
  }, [])

  return (
    <div className="flex-1">
      <div className={`relative h-screen shadow-sm`}>
        <div
          className={`relative z-10 flex flex-col items-center justify-center h-full w-full lg:absolute text-center transition-transform transition-opacity duration-500 ${scrolling ? "transform scale-90 opacity-50" : ""}`}>
          <h1
            className={`text-7xl font-bold mt-8 px-8 py-4 transition-transform transition-opacity duration-500 ${scrolling ? "transform scale-150 opacity-50" : ""}`}>
            Tiaopao
          </h1>
          <p
            className={`text-xl transition-opacity duration-500 ${scrolling ? "opacity-50" : ""}`}>
            Personal Ai Trip Planner
          </p>
          <Button
            className={`mt-2 bg-black text-white text-sm transition-transform duration-500 ${scrolling ? "transform scale-90" : ""}`}
            onClick={handleScroll}>
            begin
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-white z-0" />
      </div>

      <div
        id="interestingpage"
        className="mb-8">
        <div>
          <Link href="/pageinteresting">
            <div className="flex justify-between items-center cursor-pointer p-4 pl-10 pr-10 shadow-lg transition transform hover:scale-105 hover:shadow-xl">
              <div>
                <p className="text-xl">Interesting</p>
                <p className="text-sm">สิ่งที่น่าสนใจ</p>
              </div>
              <div className="flex items-center">
                <p className="text-xl text-right mr-2">more</p>
                <span className="text-xl">→</span>
              </div>
            </div>
          </Link>
          <div className="mt-2 ">
            <MarqueeDemo />
            <MarqueeDemo reverse />
          </div>
        </div>
      </div>

      <div className="h-screen">
        <div>
          <Link href="/pagelandmark">
            <div className="flex justify-between items-center cursor-pointer p-4 pl-10 pr-10 shadow-lg transition transform hover:scale-105 hover:shadow-xl">
              <div>
                <p className="text-xl">Landmark</p>
                <p className="text-sm">ที่เที่ยวน่าไปท่องโลกด้วยเที่ยวป่าว</p>
              </div>
              <div className="flex items-center">
                <p className="text-xl text-right mr-2">more</p>
                <span className="text-xl">→</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="h-screen">
        <div>
          <Link href="/pagerestaurant">
            <div className="flex justify-between items-center cursor-pointer p-4 pl-10 pr-10 shadow-lg transition transform hover:scale-105 hover:shadow-xl">
              <div>
                <p className="text-xl">Restaurant</p>
                <p className="text-sm">อิ่มท้องไปกับเที่ยวป่าว</p>
              </div>
              <div className="flex items-center">
                <p className="text-xl text-right mr-2">more</p>
                <span className="text-xl">→</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
