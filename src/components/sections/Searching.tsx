"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DateRangePicker } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { FaCalendarAlt } from "react-icons/fa"
import provinces from "./../customs/Province.json"

const Searching: React.FC = () => {
  const router = useRouter()
  const [place, setPlace] = useState<any>(null)
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ])
  const [showCalendar, setShowCalendar] = useState(false)
  const [peopleCount, setPeopleCount] = useState<string>("1-2 people")
  const [customPeopleCount, setCustomPeopleCount] = useState<number | null>(
    null
  )
  const [costRange, setCostRange] = useState<number>(1000)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [suggestions, setSuggestions] = useState<any[]>([])

  const handleSelect = (ranges: any) => {
    setDateRange([ranges.selection])
    setShowCalendar(false)
  }

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev)
  }

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (showCalendar && !target.closest(".calendar-container")) {
      setShowCalendar(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [showCalendar])

  const handleCostInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(Number(e.target.value), 0), 100000)
    setCostRange(value)
  }

  const handleConfirm = () => {
    const selectedPeopleCount =
      peopleCount === "custom" ? customPeopleCount : peopleCount
    const startDate = dateRange[0].startDate
    const endDate = dateRange[0].endDate
    const timeDiff = endDate.getTime() - startDate.getTime()
    const numOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

    const confirmationData = {
      place: place ? place.province_name : "No place selected",
      dateRange: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
      numOfDays,
      peopleCount: selectedPeopleCount || "No people count selected",
      budget: costRange,
    }

    router.push(
      `/Searchres?data=${encodeURIComponent(JSON.stringify(confirmationData))}`
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setSearchTerm(input)

    if (input) {
      const filteredSuggestions = provinces.provinces.filter((province: any) =>
        province.province_name.includes(input)
      )
      setSuggestions(filteredSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion: any) => {
    setPlace(suggestion)
    setSearchTerm(suggestion.province_name)
    setSuggestions([])
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  return (
    <div className="z-100 flex-col items-center justify-center w-full min-h-screen select-none">
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-3xl font-semibold mt-10 mb-6">
          ให้เที่ยวป่าวแนะนำให้คุณ
        </p>
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              className="border p-3 rounded-md w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="พิมพ์ชื่อจังหวัด"
            />

            {suggestions.length > 0 && (
              <ul className="absolute border mt-2 rounded-md shadow-lg w-full max-h-60 overflow-auto z-50">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion.province_name}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex space-x-4 mt-4">
              <div
                onClick={toggleCalendar}
                className="flex items-center justify-between border p-2 cursor-pointer rounded-md shadow-md w-1/2">
                <span>Start Date: {formatDate(dateRange[0].startDate)}</span>
                <FaCalendarAlt className="ml-2" />
              </div>
              <div
                onClick={toggleCalendar}
                className="flex items-center justify-between border p-2 cursor-pointer rounded-md shadow-md w-1/2">
                <span>End Date: {formatDate(dateRange[0].endDate)}</span>
                <FaCalendarAlt className="ml-2" />
              </div>
            </div>
            {showCalendar && (
              <div className="absolute z-50 mt-2 calendar-container rounded-md p-2 shadow-lg">
                <DateRangePicker
                  ranges={dateRange}
                  onChange={handleSelect}
                  moveRangeOnFirstSelection={false}
                  months={1}
                  direction="vertical"
                  rangeColors={["#4A90E2"]}
                  className="text-sm"
                />
              </div>
            )}

            <div className="mt-6">
              <label
                htmlFor="peopleCount"
                className="block mb-2 text-sm font-medium"></label>
              <select
                id="peopleCount"
                value={peopleCount}
                onChange={(e) => setPeopleCount(e.target.value)}
                className="border p-3 rounded-md w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="1 people">ไปคนเดียว</option>
                <option value="2 people">ไปเป็นคู่</option>
                <option value="4 people">ไปไม่เกิน 4 คน</option>
                <option value="custom">อื่นๆ</option>
              </select>

              {peopleCount === "custom" && (
                <input
                  type="number"
                  min={1}
                  placeholder="ระบุจำนวน"
                  value={customPeopleCount || ""}
                  className="border mt-2 p-3 rounded-md w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setCustomPeopleCount(Number(e.target.value))}
                />
              )}
            </div>

            <div className="mt-6">
              <label
                htmlFor="costRange"
                className="block mb-2 text-sm font-medium">
                งบประมาณ (บาท)
              </label>
              <input
                id="costRange"
                type="range"
                min="0"
                max="100000"
                step="100"
                value={costRange}
                onChange={(e) => setCostRange(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-sm mt-1">
                <span>0 บาท</span>
                <span>{costRange} บาท</span>
                <span>100,000+ บาท</span>
              </div>
              <div className="mt-4">
                <input
                  type="number"
                  min="0"
                  max="100000"
                  step="100"
                  value={costRange}
                  onChange={handleCostInputChange}
                  className="border p-3 rounded-md w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleConfirm}
                className="p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-500 text-white">
                ยืนยันการเลือก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Searching
