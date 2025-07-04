"use client"
import { AccountSideNav } from "@/components/customs/AccountSideNav"
import { Footer } from "@/components/customs/Footer"
import { Header } from "@/components/customs/Header"
import { Separator } from "@/components/ui/separator"
import React from "react"

export default function AccountLayout({
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
          <div className="grid grid-cols-12 gap-4">
            <div className="h-max col-span-12 md:col-span-4 bg-background border-2 border-gray-500/0 rounded-sm p-2 select-none">
              <div className="p-4">
                <h2 className="text-heading-sm mb-2">บัญชีของฉัน</h2>
                <p>จัดการข้อมูลบัญชีของคุณ</p>
              </div>
              <Separator className="my-2" />
              <AccountSideNav />
            </div>
            <div className="col-span-12 md:col-span-8 bg-background border-2 border-gray-500/0 rounded-sm p-4">
              {children}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}
