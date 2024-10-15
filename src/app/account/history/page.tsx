import { Separator } from "@/components/ui/separator"
import { auth } from "@/services/auth"
import { getFirestore } from "firebase-admin/firestore"
import { RiErrorWarningLine, RiLoopRightLine } from "react-icons/ri"
import React from "react"

export default async function History() {
  const session = await auth()
  const db = getFirestore()
  const snapshot = db.collection("history").doc(session?.user.id!)

  const result = await snapshot.get()

  return (
    <>
      <div className="flex flex-col select-none">
        <div>
          <h2 className="text-heading-sm mb-2">ประวัติการใช้งาน</h2>
          <p>ตรวจสอบประวัติการใช้งาน</p>
        </div>
        <Separator className="my-2" />
        <div className="mt-2">
          {!result.exists ? (
            <>
              <div className="flex justify-center items-center gap-2 w-full bg-foreground/10 p-4 rounded-md">
                <RiErrorWarningLine />
                <p>ไม่พบประวัติการใช้งาน</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center gap-2 w-full bg-foreground/10 p-4 rounded-md">
                <RiLoopRightLine className="animate-spin" />
                <p>กำลังโหลด...</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
