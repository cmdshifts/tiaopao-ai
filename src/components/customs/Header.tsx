import React from "react"
import { Logo } from "./Logo"
import { Button } from "../ui/button"
import { siteConfig } from "@/configs/site.config"
import Link from "next/link"

export const Header: React.FC = () => {
  return (
    <>
      <section className="flex justify-center w-full select-none">
        <nav className="flex justify-between items-center w-full max-w-[1200px] px-4 py-3 gap-4">
          <div className="flex justify-center items-center gap-4 cursor-pointer whitespace-nowrap hover:opacity-80 transition-opacity duration-200 ease-in-out">
            <Logo className="w-9 h-9" />
            <h3 className="text-heading-sm">{siteConfig.name}</h3>
          </div>
          <div className="w-full">
            <ul className="flex justify-end items-center gap-4">
              <li>
                <Link href="#">หน้าหลัก</Link>
              </li>
              <li>
                <Link href="#">ร้านอาหาร</Link>
              </li>
              <li>
                <Link href="#">สถานที่ท่องเที่ยว</Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Button
              variant={"default"}
              size={"lg"}>
              เริ่มต้นใช้งาน
            </Button>
            <Button
              variant={"secondary"}
              size={"lg"}>
              ลงชื่อเข้าใช้
            </Button>
          </div>
        </nav>
      </section>
    </>
  )
}
