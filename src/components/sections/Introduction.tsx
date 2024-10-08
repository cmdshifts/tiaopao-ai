"use client"
import React from "react"
import GridPattern from "../magicui/grid-pattern"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Spotlight } from "../ui/spotlight"
import { Highlight } from "../customs/Highlight"
import AnimatedGradientText from "../ui/animated-gradient-text"
import WordPullUp from "../ui/word-pull-up"

export const Introduction: React.FC = () => {
  return (
    <>
      <section className="relative w-screen h-screen h-full-svh">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="grey"
        />
        <div className="pt-[104px] absolute w-5/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-8">
          <AnimatedGradientText>
            🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-turquoise/60" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-turquoise via-darkTurquoise to-turquoise bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}>
              มาทำความรู้จักกับ Magic Planner
            </span>
          </AnimatedGradientText>
          <h1 className="mx-auto max-w-7xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl text-center leading-[4rem] sm:leading-[5rem]">
            สร้าง{" "}
            <span className="relative whitespace-nowrap text-urquoise dark:text-darkTurquoise">
              การเดินทาง
              <Highlight />
            </span>{" "}
            <span className="whitespace-nowrap">สำหรับคุณ</span>
          </h1>
          <WordPullUp
            className="mx-auto max-w-2xl font-normal text-lg tracking-tight text-foreground text-center text-balance"
            words="ปลดล็อกโลกแห่งการเดินทางด้วยแผนการเดินทางเฉพาะคุณ รับแรงบันดาลใจจากแผนทริปสุดพิเศษและออกแบบการผจญภัยที่สมบูรณ์แบบ ถึงเวลาสร้างทริปที่น่าจดจำของคุณแล้ว"
          />
          <Button size={"lg"}>เร็ว ๆ นี้</Button>
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
