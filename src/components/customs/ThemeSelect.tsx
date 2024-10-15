"use client"
import React, { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { RiMacbookLine, RiMoonLine, RiSunLine } from "react-icons/ri"
import { useTheme } from "next-themes"

export const ThemeSelect = () => {
  const { resolvedTheme, setTheme } = useTheme()

  const [selectedTheme, setSelectedTheme] = useState<string>(
    resolvedTheme || "system"
  )
  const [mounted, setMounted] = useState<boolean>(false)

  const handleSelectChange = (value: string) => {
    setTheme(value)
    setSelectedTheme(value)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Select
        value={selectedTheme}
        onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="เลือกธีม" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">
            <div className="flex items-center gap-2">
              <RiSunLine />
              <span>สว่าง</span>
            </div>
          </SelectItem>
          <SelectItem value="dark">
            <div className="flex items-center gap-2">
              <RiMoonLine />
              <span>มืด</span>
            </div>
          </SelectItem>
          <SelectItem value="system">
            <div className="flex items-center gap-2">
              <RiMacbookLine />
              <span>ระบบ</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}
