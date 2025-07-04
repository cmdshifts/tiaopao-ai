import { motion } from "framer-motion"
import React from "react"
import { PiCaretDoubleRightBold } from "react-icons/pi"

interface NotificationBarProps {
  isShow?: boolean
}

export const NotificationBar: React.FC<NotificationBarProps> = ({
  isShow = true,
}: NotificationBarProps) => {
  return (
    <>
      {isShow && (
        <motion.div
          className="z-50 flex justify-center items-center w-full bg-turquoise text-subtitle-md p-2 select-none cursor-pointer"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween" }}>
          <span className="flex justify-center items-center w-full max-w-[1200px] gap-2">
            <div className="flex justify-center items-center gap-2 transition-all duration-200 ease-in-out">
              <div className="flex justify-center items-center gap-2">
                <h6>🎉</h6>
                <h6 className="text-background text-subtitle-md truncate max-w-[310px] break-all">
                  ทริปเที่ยวป่าว? ให้เราช่วยวางแผนการท่องเที่ยวให้คุณ
                </h6>
              </div>
              <PiCaretDoubleRightBold className="text-background" />
            </div>
          </span>
        </motion.div>
      )}
    </>
  )
}
