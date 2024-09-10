import Link from "next/link"
import React from "react"
import Marquee from "../magicui/marquee"

export const Interesting: React.FC = () => {
  return (
    <>
      <section
        id="interesting"
        className="h-screen">
        <div>
          <Link href="/interesting">
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
            <Marquee />
            <Marquee reverse />
          </div>
        </div>
      </section>
    </>
  )
}
