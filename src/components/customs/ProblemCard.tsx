"use client"
import { motion, useAnimation, useInView } from "framer-motion"
import React, { useEffect, useRef } from "react"

interface ProblemCardProps extends React.HTMLAttributes<HTMLDivElement> {
  Icon: React.ReactElement
  title: string
  description: string
  mainControls?: ReturnType<typeof useAnimation>
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  Icon,
  title,
  description,
  mainControls,
}) => {
  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 200 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.05 }}
        style={{
          filter: "blur(0px)",
          willChange: "auto",
          transform: "translateY(-6px)",
        }}>
        <div className="rounded-lg border text-card-foreground bg-background border-none shadow-none h-full">
          <div className="p-6 space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              {Icon}
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </motion.div>
    </>
  )
}
