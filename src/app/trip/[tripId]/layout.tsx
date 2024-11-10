"use client"
import { Footer } from "@/components/customs/Footer"
import { Header } from "@/components/customs/Header"
import React from "react"

export default function TripLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header
        showCTAButton={false}
        isNotification={false}
        showMenu={false}
        className="shadow-sm bg-background/65 backdrop-blur-[12px]"
      />
      <div className="pt-[64px] w-screen h-screen h-full-svh flex flex-col items-center overflow-x-hidden overflow-y-auto scrollbar-hide scroll-smooth">
        <section className="max-w-[1400px] w-screen p-4 flex-1">
          {children}
        </section>
        <Footer />
      </div>
    </>
  )
}
