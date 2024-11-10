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
import { RiArrowDownSLine, RiCheckFill } from "react-icons/ri"
import { cn } from "@/lib/utils"
import { Lifestyle } from "@/lib/types"

interface TravelStyleComboBoxProps extends HTMLAttributes<HTMLDivElement> {
  selectedValue?: Lifestyle
  onValueChange?: (value: Lifestyle) => void
}

export const TravelStyleComboBox: React.FC<TravelStyleComboBoxProps> = ({
  selectedValue,
  onValueChange,
}) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [buttonWidth, setButtonWidth] = useState<number | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  let appliedSelectedAt = false

  useEffect(() => {
    if (selectedValue && !appliedSelectedAt) {
      setValue(selectedValue.value)
      handleChange(selectedValue)
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

  const lifestyle: Lifestyle[] = [
    { label: "การท่องเที่ยวเชิงวัฒนธรรม", value: "Cultural Tourism" },
    { label: "การท่องเที่ยวทางธรรมชาติ", value: "Nature Tourism" },
    { label: "การท่องเที่ยวทางทะเล", value: "Beach Tourism" },
    { label: "การท่องเที่ยวเชิงอาหาร", value: "Culinary Tourism" },
    { label: "การท่องเที่ยวเชิงสุขภาพ", value: "Wellness Tourism" },
    { label: "การท่องเที่ยวผจญภัย", value: "Adventure Tourism" },
    { label: "การท่องเที่ยวชุมชน", value: "Community-based Tourism" },
    { label: "การท่องเที่ยวเชิงช้อปปิ้ง", value: "Shopping Tourism" },
    { label: "การท่องเที่ยวเชิงเกษตร", value: "Agro Tourism" },
    { label: "การท่องเที่ยวเชิงศาสนา", value: "Religious Tourism" },
  ]

  const handleChange = (val: Lifestyle) => {
    if (onValueChange) {
      onValueChange(val)
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
              ? lifestyle.find((style) => style.value === value)?.label
              : "เลือกสไตล์การท่องเที่ยว"}
            <RiArrowDownSLine className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          style={{ width: buttonWidth ? `${buttonWidth}px` : "auto" }}>
          <Command>
            <CommandInput
              placeholder="ค้นหาตัวเลือก"
              className="text-subtitle-lg font-normal"
            />
            <CommandList>
              <CommandEmpty className="text-subtitle-lg font-normal p-2 text-center text-foreground/50">
                ไม่พบข้อมูล
              </CommandEmpty>
              <CommandGroup>
                {lifestyle.map((style, index) => (
                  <CommandItem
                    key={index}
                    value={style.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                      if (onValueChange) {
                        handleChange(style)
                      }
                    }}
                    className="text-subtitle-lg font-normal">
                    <RiCheckFill
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === style.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {style.label}
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
