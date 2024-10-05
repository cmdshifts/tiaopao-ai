"use client"
import React, { useEffect, useRef, useState } from "react"
import { Header } from "./Header"

interface ScrollLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const ScrollLayout: React.FC<ScrollLayoutProps> = ({ children }) => {
  const [headerOpacity, setHeaderOpacity] = useState(0)
  const [headerBlur, setHeaderBlur] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current

    const handleScroll = () => {
      if (!scrollContainer) return

      const scrollTop = scrollContainer.scrollTop
      const maxScroll = 20

      if (scrollTop > maxScroll) {
        setHeaderOpacity(0.75)
        setHeaderBlur(10)
      } else {
        setHeaderOpacity(0)
        setHeaderBlur(0)
      }
    }

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return (
    <>
      <main className="h-screen overflow-hidden">
        <Header
          opacity={headerOpacity}
          blur={headerBlur}
        />
        <div
          ref={scrollContainerRef}
          className="w-screen h-screen overflow-x-hidden overflow-y-auto scrollbar-hide scroll-smooth">
          {children}
        </div>
      </main>
    </>
  )
}
