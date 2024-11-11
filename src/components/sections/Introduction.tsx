"use client"
import React from "react"
import GridPattern from "../magicui/grid-pattern"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Spotlight } from "../ui/spotlight"
import { Highlight } from "../customs/Highlight"
import AnimatedGradientText from "../ui/animated-gradient-text"
import { FadeText } from "../ui/fade-text"
import { motion } from "framer-motion"
import Link from "next/link"
import { RiBardFill } from "react-icons/ri"

export const Introduction: React.FC = () => {
  return (
    <>
      <section
        id="#introduction"
        className="relative w-screen h-screen h-full-svh z-50">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="grey"
        />
        <div className="pt-[104px] absolute w-5/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-8">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}>
            <AnimatedGradientText>
              🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-turquoise/60" />{" "}
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-turquoise via-darkTurquoise to-turquoise bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}>
                มาทำความรู้จักกับ Magic Planner
              </span>
            </AnimatedGradientText>
          </motion.div>
          <motion.h1
            className="mx-auto max-w-7xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl text-center leading-[4rem] sm:leading-[5rem]"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}>
            สร้าง{" "}
            <span className="relative whitespace-nowrap text-turquoise dark:text-darkTurquoise">
              การเดินทาง
              <Highlight />
            </span>{" "}
            <span className="whitespace-nowrap">สำหรับคุณ</span>
          </motion.h1>
          <FadeText
            className="mx-auto max-w-2xl font-normal text-lg tracking-tight text-foreground text-center text-balance text-gray-700 dark:text-gray-300"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.35 } },
            }}
            text="ปลดล็อกโลกแห่งการเดินทางด้วยแผนการท่องเที่ยวที่ออกแบบเฉพาะคุณ ถึงเวลาสร้างทริปที่น่าจดจำของคุณแล้ว"
          />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}>
            <Link href={"/app"}>
              <Button
                variant={"default"}
                size={"lg"}
                className="flex items-center justify-center gap-2">
                <RiBardFill />
                เริ่มต้นใช้งาน
              </Button>
            </Link>
          </motion.div>
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
