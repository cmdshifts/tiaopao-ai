import Link from "next/link"
import React from "react"
import Marquee from "../magicui/marquee"
import GridPattern from "../magicui/grid-pattern"
import TypingAnimation from "../magicui/typing-animation"
import { cn } from "@/lib/utils"

export const Explore: React.FC = () => {
  return (
    <>
      <section
        id="explore"
        className="h-screen">
        <div className="text-center mt-40 ">
          <h1 className="text-[40px] font-bold " >
            สำรวจ <br></br><span>แผนการท่องเที่ยวชาว Tiaopao</span></h1>
            
          <h2 className="mt-3">แอบส่องดูสิ้เพื่อนๆชาว Tiaopao มีแพลนอะไรน่าสนใจบ้าง</h2>
          <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
          )}
        />
        </div>
      </section>
    </>
  )
}
