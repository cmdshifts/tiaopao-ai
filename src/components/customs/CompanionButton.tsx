import React, { useEffect, useState } from "react"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import {
  RiGroupLine,
  RiHeart2Line,
  RiHome5Line,
  RiUser3Line,
} from "react-icons/ri"
import { Companion } from "@/lib/types"
import { getSelectedCompanion } from "@/lib/utils"

interface CompanionButtonProps {
  selectedCompanion?: Companion
  onSelectCompanion: (companion: Companion) => void
}

export const CompanionButton: React.FC<CompanionButtonProps> = ({
  selectedCompanion,
  onSelectCompanion,
}) => {
  const [selected, setSelected] = useState<Companion>({
    value: "Alone",
    label: "ไปคนเดียว",
  })
  let appliedSelectedAt = false

  useEffect(() => {
    if (selectedCompanion && !appliedSelectedAt) {
      handleSelectCompanion(selectedCompanion.value)
      appliedSelectedAt = true
    }
  }, [])

  const handleSelectCompanion = (value: string) => {
    const companion = getSelectedCompanion(value.toLocaleLowerCase())
    console.log("Selected: ", companion)
    setSelected(companion)
    if (onSelectCompanion) {
      onSelectCompanion(companion)
    }
  }

  return (
    <>
      <RadioGroup
        value={selected.value.toLowerCase()}
        defaultValue={"alone"}
        onValueChange={(v) => handleSelectCompanion(v)}
        className="grid grid-cols-2 gap-2 h-full [&>label]:transition-all [&>label]:duration-100 [&>label]:ease-in-out">
        <Label
          htmlFor="r1"
          className="flex flex-col justify-center items-start space-x-2 rounded-md p-2 pl-4 border border-gray-500/20 gap-3 has-[:checked]:bg-turquoise/10 has-[:checked]:border-turquoise">
          <RadioGroupItem
            value="alone"
            id="r1"
            className="sr-only"
          />
          <RiUser3Line className="!m-0" />
          ไปคนเดียว
        </Label>
        <Label
          htmlFor="r2"
          className="flex flex-col justify-center items-start space-x-2 rounded-md p-2 pl-4 border border-gray-500/20 gap-3 has-[:checked]:bg-turquoise/10 has-[:checked]:border-turquoise">
          <RadioGroupItem
            value="with couple"
            id="r2"
            className="sr-only"
          />
          <RiHeart2Line className="!m-0" />
          ไปกับคู่
        </Label>
        <Label
          htmlFor="r3"
          className="flex flex-col justify-center items-start space-x-2 rounded-md p-2 pl-4 border border-gray-500/20 gap-3 has-[:checked]:bg-turquoise/10 has-[:checked]:border-turquoise">
          <RadioGroupItem
            value="with friend"
            id="r3"
            className="sr-only"
          />
          <RiGroupLine className="!m-0" />
          ไปกับเพื่อน
        </Label>
        <Label
          htmlFor="r4"
          className="flex flex-col justify-center items-start space-x-2 rounded-md p-2 pl-4 border border-gray-500/20 gap-3 has-[:checked]:bg-turquoise/10 has-[:checked]:border-turquoise">
          <RadioGroupItem
            value="with family"
            id="r4"
            className="sr-only"
          />
          <RiHome5Line className="!m-0" />
          ไปกับครอบครัว
        </Label>
      </RadioGroup>
    </>
  )
}
