import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"

export const ConfirmTripModal: React.FC = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>สร้างแผนการท่องเที่ยว</Button>
        </DialogTrigger>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault()
          }}
          className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>ยืนยันการสร้าง</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div>test</div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
