"use client"
import React, { useEffect, useRef } from "react"
import { Highlight } from "../customs/Highlight"
import { ProblemCard } from "../customs/ProblemCard"
import { RiAlarmLine, RiMapPinTimeLine, RiGroupLine } from "react-icons/ri"
import { motion, useAnimation, useInView } from "framer-motion"

export const Problems: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView])

  return (
    <>
      <section className="flex flex-col items-center pt-16 pb-12 bg-gray-500/5">
        <motion.div
          className="flex flex-col items-center"
          ref={ref}
          variants={{
            hidden: { opacity: 0, y: 200 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.05 }}>
          <p className="w-max relative whitespace-nowrap text-subtitle-lg text-center text-darkTurquoise uppercase">
            ปัญหา
            <Highlight />
          </p>
          <h2 className="text-heading-lg text-center px-8">
            การวางแผนท่องเที่ยวเป็นเรื่องยาก
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-[1400px] w-full px-8">
          <ProblemCard
            mainControls={mainControls}
            Icon={<RiAlarmLine className="h-[24px] w-[24px]" />}
            title="เสียเวลาในการค้นหาข้อมูล"
            description="ผู้ใช้มักต้องใช้เวลานานในการค้นหาแหล่งท่องเที่ยว โรงแรม ร้านอาหาร และกิจกรรมต่างๆ ซึ่งอาจไม่ตรงกับความต้องการทั้งหมด"
          />
          <ProblemCard
            mainControls={mainControls}
            Icon={<RiMapPinTimeLine className="h-[24px] w-[24px]" />}
            title="ข้อจำกัดด้านการบริหารเวลา"
            description="การวางแผนวันเวลาในการท่องเที่ยว เช่น การจัดตารางเวลาการเดินทางหรือการเยี่ยมชมแหล่งท่องเที่ยว อาจไม่สอดคล้องกัน ทำให้เกิดปัญหากับเวลาเดินทาง"
          />
          <ProblemCard
            mainControls={mainControls}
            Icon={<RiGroupLine className="h-[24px] w-[24px]" />}
            title="ไม่สอดคล้องกับความสนใจส่วนบุคคล"
            description="บางครั้งการแนะนำแหล่งท่องเที่ยวหรือกิจกรรมทั่วไปไม่ตรงกับความสนใจส่วนบุคคล เช่น บางคนชอบการเดินป่า แต่ได้รับคำแนะนำสำหรับทริปในเมือง"
          />
        </div>
      </section>
    </>
  )
}
