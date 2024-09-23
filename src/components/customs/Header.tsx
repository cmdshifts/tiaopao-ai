"use client"

import React from "react"
import { Logo } from "./Logo"
import { Button } from "../ui/button"
import { siteConfig } from "@/configs/site.config"
import Link from "next/link"
import { NotificationBar } from "./NotificationBar"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isNotification?: boolean
  showMenu?: boolean
  showActionButton?: boolean
  size?: "sm" | "md" | "lg"
}

export const Header: React.FC<HeaderProps> = ({
  isNotification = true,
  showMenu = true,
  showActionButton = true,
  size = "md",
  ...props
}: HeaderProps) => {
  const router = useRouter()
  const { className, ...rest } = props
  const classNames = cn(
    "z-50 fixed flex flex-col items-center justify-center w-full select-none",
    className
  )

  return (
    <>
      <section
        className={classNames}
        {...rest}>
        <NotificationBar isShow={isNotification} />
        <nav
          className={cn(
            "flex justify-between items-center w-full max-w-[1400px] px-4 gap-6",
            `${size === "sm" ? "py-3" : size === "lg" ? "py-8" : "py-3"}`
          )}>
          <div
            className="flex justify-center items-center gap-4 cursor-pointer whitespace-nowrap hover:opacity-90 transition-opacity duration-200 ease-in-out"
            onClick={() => router.push("/")}>
            <Logo className="w-9 h-9" />
            <h3 className="text-heading-sm">{siteConfig.name}</h3>
          </div>
          {showMenu && (
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
          )}
          {showActionButton && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant={"default"}
                size={"lg"}
                onClick={() => router.push("/app")}>
                เริ่มต้นใช้งาน
              </Button>
              <Button
                variant={"secondary"}
                size={"lg"}
                onClick={() => router.push("/auth")}>
                ลงชื่อเข้าใช้
              </Button>
            </div>
          )}
        </nav>
      </section>
    </>
  )
}
