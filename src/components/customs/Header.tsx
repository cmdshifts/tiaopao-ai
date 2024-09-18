import React from "react"
import { Logo } from "./Logo"
import { Button } from "../ui/button"
import { siteConfig } from "@/configs/site.config"
import Link from "next/link"
import { NotificationBar } from "./NotificationBar"

export const Header: React.FC = () => {
  return (
    <>
      <section className="z-50 fixed flex flex-col items-center justify-center w-full select-none ">
        <NotificationBar isShow />
        <nav className="flex justify-between items-center w-full max-w-[1200px] px-4 py-3 gap-6">
          <div className="flex justify-center items-center gap-4 cursor-pointer whitespace-nowrap hover:opacity-90 transition-opacity duration-200 ease-in-out">
            <Link
              href="#"
              className="flex justify-center items-center gap-4">
              <Logo className="w-9 h-9" />
              <h3 className="text-heading-sm">{siteConfig.name}</h3>
            </Link>
          </div>
          <div className="w-full">
            <ul className="flex justify-end items-center gap-5">
              <li>
                <Link href="#interesting">สำรวจ</Link>
              </li>
              <li>
                <Link href="#landmark">ที่ท่องเที่ยว</Link>
              </li>
              <li>
                <Link href="#restaurant">ร้านอาหาร</Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Button
              variant={"default"}
              size={"lg"}>
              เริ่มต้นใช้งาน
            </Button>
            <Link href="/auth">
            <Button
              variant={"secondary"}
              size={"lg"}>
              ลงชื่อเข้าใช้
            </Button>
            </Link>
          </div>
        </nav>
      </section>
    </>
  )
}
