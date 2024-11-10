"use client"
import React, { HTMLAttributes, useEffect, useRef, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { cn, getSortedProvinceList } from "@/lib/utils"
import { provinceList } from "@/data/Province"
import { RiArrowDownSLine, RiCheckFill } from "react-icons/ri"
import { Province } from "@/lib/types"

interface ProvinceComboBoxProps extends HTMLAttributes<HTMLDivElement> {
  selectedAt?: Province
  onValueChange?: (value: Province) => void
}

export const ProvinceComboBox: React.FC<ProvinceComboBoxProps> = ({
  selectedAt,
  onValueChange,
}) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>("")
  const [buttonWidth, setButtonWidth] = useState<number | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  let appliedSelectedAt = false

  useEffect(() => {
    if (selectedAt && !appliedSelectedAt) {
      setValue(selectedAt.provinceNameTh)
      if (onValueChange) {
        handleChange(selectedAt)
      }
      appliedSelectedAt = true
    }
  }, [])

  useEffect(() => {
    if (!buttonRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === buttonRef.current) {
          const newWidth = entry.contentRect.width

          const computedStyle = window.getComputedStyle(buttonRef.current)
          const paddingLeft = parseFloat(computedStyle.paddingLeft)
          const paddingRight = parseFloat(computedStyle.paddingRight)
          const fullWidth = newWidth + paddingLeft + paddingRight

          setButtonWidth(fullWidth)
        }
      }
    })
    resizeObserver.observe(buttonRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  const provinces = getSortedProvinceList(provinceList, "th")

  const handleChange = (province: Province) => {
    if (onValueChange) {
      onValueChange(province)
    }
  }

  return (
    <>
      <Popover
        open={open}
        onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={buttonRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-subtitle-lg font-normal">
            {value
              ? provinces.find((province) => province.provinceNameTh === value)
                  ?.provinceNameTh
              : "เลือกจังหวัด"}
            <RiArrowDownSLine className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          style={{ width: buttonWidth ? `${buttonWidth}px` : "auto" }}>
          <Command>
            <CommandInput
              placeholder="ค้นหาจังหวัด"
              className="text-subtitle-lg font-normal"
            />
            <CommandList>
              <CommandEmpty className="text-subtitle-lg font-normal p-2 text-center text-foreground/50">
                ไม่พบข้อมูล
              </CommandEmpty>
              <CommandGroup>
                {provinces.map((province, index) => (
                  <CommandItem
                    key={index}
                    value={province.provinceNameTh}
                    onSelect={(currentValue) => {
                      setValue(currentValue)
                      setOpen(false)
                      if (onValueChange) {
                        handleChange(province)
                      }
                    }}
                    className="text-subtitle-lg font-normal">
                    <RiCheckFill
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === province.provinceNameTh
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {province.provinceNameTh}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
