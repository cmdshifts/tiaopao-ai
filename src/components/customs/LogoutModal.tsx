"use client"
import React, { HTMLAttributes } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { RiCornerDownLeftLine, RiDoorOpenLine } from "react-icons/ri"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"

interface LogoutModalProps extends HTMLAttributes<HTMLElement> {
  isModalOpen?: boolean
  onModalOpenChange?: (isModalOpen: boolean) => void
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isModalOpen = false,
  onModalOpenChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(isModalOpen)

  const { className } = props
  const classNames = cn("", className)

  const handleModalOpenChange = (isModalOpen: boolean) => {
    if (onModalOpenChange) {
      onModalOpenChange(!isModalOpen)
    }
  }

  const handleSignOut = async () => {
    return signOut({ redirectTo: "/" })
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          handleModalOpenChange(isOpen)
          setIsOpen(!isOpen)
        }}>
        <DialogTrigger asChild>
          <li
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            className={classNames}>
            <RiDoorOpenLine />
            <span>ออกจากระบบ</span>
          </li>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-md"
          onInteractOutside={(e) => {
            e.preventDefault()
          }}>
          <DialogHeader>
            <DialogTitle>ออกจากระบบ</DialogTitle>
            <DialogDescription>
              คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?
            </DialogDescription>
          </DialogHeader>
          <div className="h-2"></div>
          <DialogFooter className="flex gap-2 sm:justify-between">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="flex items-center gap-2">
                <RiCornerDownLeftLine />
                ยกเลิก
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                onClick={handleSignOut}
                className="flex items-center gap-2">
                <RiDoorOpenLine />
                <span>ยืนยัน</span>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
