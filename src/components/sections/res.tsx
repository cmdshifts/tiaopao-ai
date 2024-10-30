"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const Res: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [confirmationData, setConfirmationData] = useState<any>(null)

  useEffect(() => {
    const queryData = searchParams.get("data")
    if (queryData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(queryData))
        setConfirmationData(parsedData)
      } catch (error) {
        console.error("Error parsing confirmation data:", error)
      }
    }
  }, [searchParams])

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen select-none">
      <h1 className="text-3xl font-semibold mb-6">ข้อมูลการจอง</h1>
      {confirmationData ? (
        <div className=" rounded-md shadow-md w-full max-w-md">
          <p className="mb-4">
            <strong>จังหวัด:</strong> {confirmationData.place}
          </p>
          <p className="mb-4">
            <strong>ระยะเวลา:</strong> {confirmationData.dateRange}
          </p>
          <p className="mb-4">
            <strong>จำนวนวัน:</strong> {confirmationData.numOfDays} วัน
          </p>
          <p className="mb-4">
            <strong>จำนวนผู้เดินทาง:</strong> {confirmationData.peopleCount}
          </p>
          <p className="mb-4">
            <strong>งบประมาณ:</strong> {confirmationData.budget} บาท
          </p>
          <div className="flex justify-between mt-4">
            {" "}
            {}
            <button
              onClick={() => router.back()}
              className="p-2 bg-blue-500  rounded-md">
              กลับไปยังหน้าค้นหา
            </button>
            <button
              onClick={() => router.push("/generatetrip")}
              className="p-2 bg-green-500  rounded-md">
              สร้างแผนการท่องเที่ยว
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">ไม่มีข้อมูลการจอง</p>
      )}
    </div>
  )
}

export default Res
