import { ThemeSelect } from "@/components/customs/ThemeSelect"
import { Separator } from "@/components/ui/separator"
import React from "react"

export default function Settings() {
  return (
    <>
      <div className="flex flex-col select-none">
        <div>
          <h2 className="text-heading-sm mb-2">การตั้งค่า</h2>
          <p>ตั้งค่าบัญชีของคุณ</p>
        </div>
        <Separator className="my-2" />
        <div className="mt-2">
          <div className="grid grid-cols-12 gap-2">
            <div className="h-max col-span-12 md:col-span-5 p-2 select-none">
              <h2 className="text-subtitle-lg">ตั้งค่าธีม</h2>
              <p>ปรับแต่งธีมเว็บไซต์</p>
            </div>
            <div className="col-span-12 md:col-span-7 bg-background border-2 border-gray-500/0 flex items-center">
              <ThemeSelect />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
