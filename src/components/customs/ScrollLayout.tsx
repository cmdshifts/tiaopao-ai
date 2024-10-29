"use client"
import React, { useRef } from "react"
import { Header } from "./Header"
import { useScroll, useTransform } from "framer-motion"

interface ScrollLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  isHeaderMenu?: boolean
}

export const ScrollLayout: React.FC<ScrollLayoutProps> = ({
  children,
  isHeaderMenu = true,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll({
    container: scrollContainerRef,
  })

  const backgroundColor = useTransform(
    scrollY,
    [0, 40],
    ["hsla(var(--background) / 0)", "hsla(var(--background) / 0.65)"]
  )

  const backgroundBlur = useTransform(
    scrollY,
    [0, 40],
    ["blur(0px)", "blur(12px)"]
  )

  return (
    <>
      <main className="h-screen h-full-svh">
        <Header
          background={backgroundColor}
          backdropBlur={backgroundBlur}
          showMenu={isHeaderMenu}
        />
        <div
          style={{ position: "relative" }}
          ref={scrollContainerRef}
          className="w-screen h-screen h-full-svh overflow-x-hidden overflow-y-auto scrollbar-hide scroll-smooth">
          {children}
        </div>
      </main>
    </>
  )
}
