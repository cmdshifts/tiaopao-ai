import React, { useEffect, useState } from "react"
import { Input } from "../ui/input"

interface BudgetSliderProps {
  budgetValue?: number
  onSelectBudget?: (budget: number) => void
}

export const BudgetSlider: React.FC<BudgetSliderProps> = ({
  budgetValue,
  onSelectBudget,
}) => {
  const [value, setValue] = useState<number>(10000)
  let appliedSelectedAt = false

  useEffect(() => {
    if (budgetValue && !appliedSelectedAt) {
      setValue(budgetValue)
      if (onSelectBudget) {
        onSelectBudget(budgetValue)
      }
      appliedSelectedAt = true
    }
  }, [])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
    if (onSelectBudget) {
      onSelectBudget(Number(e.target.value))
    }
  }

  return (
    <>
      <div className="relative">
        <label
          htmlFor="labels-range-input"
          className="sr-only">
          งบประมาณ
        </label>
        <input
          id="labels-range-input"
          type="range"
          value={value}
          min="100"
          max="20000"
          step="100"
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-foreground/10"
        />
        <div className="flex flex-row justify-between mt-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ต่ำสุด 100 บาท
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            สูงสุด 20,000 บาท
          </span>
        </div>
        <Input
          className="relative mt-4"
          value={value}
          onChange={handleSliderChange}
          type="number"
        />
      </div>
    </>
  )
}
