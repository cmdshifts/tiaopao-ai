"use client"
import React from "react"
import TestimonialsMarquee from "../ui/marquee"
import { motion } from "framer-motion"

export const LogoMarquee = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 2, delay: 0.1 } }}
        viewport={{
          margin: "-60px",
          once: true,
        }}
        className="flex justify-center items-center">
        <TestimonialsMarquee />
      </motion.div>
    </>
  )
}
