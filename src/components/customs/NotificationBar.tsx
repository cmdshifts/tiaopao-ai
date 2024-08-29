import React from "react"
import { FaAngleRight } from "react-icons/fa"

interface NotificationBarProps {
  isShow?: boolean
}

export const NotificationBar: React.FC<NotificationBarProps> = ({
  isShow = true,
}: NotificationBarProps) => {
  return (
    <>
      {isShow && (
        <div className="flex justify-center items-center w-full bg-main text-subtitle-md p-2 select-none cursor-pointer">
          <span className="flex justify-center items-center w-full max-w-[1200px] gap-2">
            <div className="flex justify-center items-center gap-2 transition-all duration-200 ease-in-out">
              <div className="flex justify-center items-center gap-2">
                <h6>🎉</h6>
                <h6 className="text-background">
                  ทริปเที่ยวป่าว? ให้เราช่วยวางแผนการท่องเที่ยวให้คุณ
                </h6>
              </div>
              <FaAngleRight className="text-background" />
            </div>
          </span>
        </div>
      )}
    </>
  )
}
