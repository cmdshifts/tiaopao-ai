"use client"
import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RiAtLine } from "react-icons/ri"
import { FcGoogle } from "react-icons/fc"
import handleGoogleSignIn from "@/services/actions/handleGoogleSignIn"
import handleMagicSignIn from "@/services/actions/handleMagicSignIn"
import { useToast } from "@/hooks/use-toast"
import { isValidEmail } from "@/lib/utils"

export const AuthModal = () => {
  const { toast } = useToast()
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState<boolean>(true)

  const handleResendSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitBtnDisabled(true)
    e.preventDefault()

    const email = e.currentTarget.email.value

    if (isValidEmail(email)) {
      const result = await handleMagicSignIn(email)

      if (result.success) {
        toast({
          title: "ส่งลิงก์เข้าสู่ระบบไปที่อีเมลของคุณเรียบร้อยแล้ว",
          description: "กรุณาตรวจสอบอีเมลของท่านเพื่อเข้าสู่ระบบ",
          duration: 5000,
        })
      } else {
        toast({
          variant: "destructive",
          title: "เกิดข้อผิดพลาด",
          description: "กรุณาลองใหม่อีกครั้ง",
          duration: 5000,
        })
      }
    } else {
      toast({
        variant: "destructive",
        title: "อีเมลไม่ถูกต้อง",
        description: "กรุณาตรวจสอบอีเมล",
        duration: 5000,
      })
    }
  }

  return (
    <>
      <Card className="flex justify-center items-center h-auto w-[420px] shadow-sm p-6 select-none">
        <div className="w-full grid gap-6">
          <div className="space-y-2">
            <h1 className="text-heading-lg">เดินทางร่วมกับเรา</h1>
            <p className="text-subtitle-lg text-gray-500">
              เริ่มต้นการเดินทางของคุณด้วยการสร้างบัญชี
            </p>
          </div>
          <form
            className="w-full"
            action={handleGoogleSignIn}>
            <Button
              className="flex justify-center items-center gap-2 w-full"
              variant={"default"}
              size={"lg"}>
              <FcGoogle />
              <span>ดำเนินการต่อด้วย Google</span>
            </Button>
          </form>
          <div className="relative">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-500 px-3">
              หรือ
            </span>
          </div>
          <div>
            <form
              className="grid gap-3"
              onSubmit={handleResendSubmit}
              noValidate>
              <div className="relative">
                <span className="text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2"></span>
                <Input
                  id="email"
                  type="email"
                  placeholder="username@email.com"
                  onChange={() => setIsSubmitBtnDisabled(false)}
                />
              </div>
              <Button
                className="flex justify-center items-center gap-2"
                variant={"secondary"}
                size={"lg"}
                disabled={isSubmitBtnDisabled}>
                <RiAtLine />
                ดำเนินการต่อด้วยอีเมล
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </>
  )
}
