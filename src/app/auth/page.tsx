import React from "react"
import { cn } from "@/lib/utils"
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern"
import { Header } from "@/components/customs/Header"
import { Footer } from "@/components/customs/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Auth() {
  return (
    <>
      <main>
        <section className="w-full h-screen flex flex-col flex-1">
          <Header
            isNotification={false}
            showMenu={false}
            showActionButton={false}
            size="lg"
            className="relative"
          />
          <div className="flex justify-center items-center flex-1 h-full w-full">
            <div className="grid grid-cols-2 gap-4 p-4 max-w-[1400px] h-full w-full">
              <div className="flex items-center justify-center">
                <Card className="flex justify-center items-center h-auto w-[420px] shadow-md p-6">
                  <form className="w-full">
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <h1 className="text-heading-lg">เดินทางร่วมกับเรา</h1>
                        <p className="text-sm text-gray-500">
                          เริ่มต้นการเดินทางของคุณด้วยการสร้างบัญชี
                        </p>
                      </div>
                      <Button>ดำเนินการต่อด้วย Google</Button>
                      <div className="relative">
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-500 px-3">
                          หรือ
                        </span>
                      </div>
                      <div className="grid gap-3">
                        <div className="relative">
                          <span className="text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2"></span>
                          <Input
                            type="email"
                            className="w-full border border-gray-200 p-2.5 h-9 rounded-lg placeholder:text-sm"
                            placeholder="username@email.com"
                          />
                        </div>
                        <Button>ดำเนินการต่อด้วยอีเมล</Button>
                      </div>
                    </div>
                  </form>
                </Card>
              </div>
              <div className="flex items-center justify-center text-xl"></div>
            </div>
          </div>
          <Footer />
        </section>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(700px_circle_at_right,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 -z-30"
          )}
        />
      </main>
    </>
  )
}
