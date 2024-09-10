"use client"
import React from "react"
import GridPattern from "../magicui/grid-pattern"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Spotlight } from "../ui/spotlight"

export const Introduction: React.FC = () => {
  return (
    <>
      <section className="relative w-screen h-screen">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="grey"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-6">
          <span className="flex">
            <h1 className="text-[2.5rem] font-semibold text-center">
              ค้นพบการผจญภัยใหม่ด้วยแผนการท่องเที่ยวที่{" "}
              <span>ออกแบบเฉพาะสำหรับคุณ</span>
            </h1>
          </span>
          <Button>เริ่มต้นใช้งาน</Button>
        </div>
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
          )}
        />
      </section>
    </>
  )
}
