"use client"
import Link from "next/link"
import React from "react"
import { LogoutModal } from "./LogoutModal"
import { Separator } from "../ui/separator"
import { RiChatHistoryLine, RiEditLine, RiSettingsLine } from "react-icons/ri"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export const AccountSideNav = () => {
  const pathname = usePathname()

  return (
    <>
      <ul className="[&>li]:rounded-sm flex flex-col gap-1 [&>li]:transition-all [&>li]:duration-200 [&>li]:ease-in-out">
        <li
          className={cn(
            "hover:bg-gray-500/15 cursor-pointer flex items-center",
            `${pathname == "/account/edit" ? "bg-gray-500/10" : "bg-transparent"}`
          )}>
          <Link
            href={"/account/edit"}
            className="flex items-center px-4 py-3 gap-2 w-full">
            <RiEditLine />
            <p>แก้ไขโปรไฟล์</p>
          </Link>
        </li>
        <li
          className={cn(
            "hover:bg-gray-500/15 cursor-pointer flex items-center",
            `${pathname == "/account/history" ? "bg-gray-500/10" : "bg-transparent"}`
          )}>
          <Link
            href={"/account/history"}
            className="flex items-center px-4 py-3 gap-2 w-full">
            <RiChatHistoryLine />
            <p>ประวัติการใช้งาน</p>
          </Link>
        </li>
        <li
          className={cn(
            "hover:bg-gray-500/15 cursor-pointer flex items-center",
            `${pathname == "/account/settings" ? "bg-gray-500/10" : "bg-transparent"}`
          )}>
          <Link
            href={"/account/settings"}
            className="flex items-center px-4 py-3 gap-2 w-full">
            <RiSettingsLine />
            <p>การตั้งค่า</p>
          </Link>
        </li>
        <Separator className="my-1" />
        <LogoutModal className="text-destructive bg-destructive/5 hover:bg-destructive/15 cursor-pointer flex items-center px-4 py-3 gap-2 w-full" />
      </ul>
    </>
  )
}
