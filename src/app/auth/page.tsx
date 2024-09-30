import React from "react"
import { cn } from "@/lib/utils"
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern"
import { Header } from "@/components/customs/Header"
import { Footer } from "@/components/customs/Footer"
import { AuthModal } from "@/components/customs/AuthModal"
import { Backpack } from "@/components/models/Backpack"
import { ModelCanvas } from "@/components/models/ModelCanvas"
import { auth } from "@/services/auth"
import { redirect } from "next/navigation"

export default async function Auth() {
  const session = await auth()
  if (session) {
    redirect("/")
  }

  return (
    <>
      <main className="h-screen max-h-screen overflow-hidden">
        <section className="w-full h-screen flex flex-col flex-1">
          <Header
            isNotification={false}
            showMenu={false}
            showActionButton={false}
            size="lg"
            className="relative"
          />
          <div className="flex justify-center items-center flex-1 h-full w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 max-w-[1400px] h-full w-full">
              <div className="flex items-center justify-center">
                <AuthModal />
              </div>
              <div className="hidden items-center justify-center text-xl lg:block">
                <ModelCanvas className="absolute top-0 left-0 w-full h-full">
                  <Backpack />
                </ModelCanvas>
              </div>
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
            "inset-x-0 h-full skew-y-12 -z-30",
            "sm:inset-y-0 sm:h-full",
            "md:inset-y-[-10%] md:h-full",
            "lg:inset-y-[-20%] lg:h-full"
          )}
        />
      </main>
    </>
  )
}
