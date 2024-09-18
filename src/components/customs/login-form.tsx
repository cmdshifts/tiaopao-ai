import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "../ui/card"
import { Mail } from "lucide-react"
import { siteConfig } from "@/configs/site.config"
import { cn } from "@/lib/utils"
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern"


export const Login: React.FC = () => {
  return (
    <>
     <section className="h-screen grid md:grid-cols-2">
      <div className=" p-4 md:p-8 flex flex-col justify-between h-full max-w-2xl mx-auto">
        <div>
        <Link href='/' className="flex justify-left items-center gap-4">
          <Image src='/images/logo.svg' width={45} height={45} alt="logo"/>
          <h3 className="text-heading-sm">{siteConfig.name}</h3>
        </Link>
      </div>
        <Card className=" h-[350px] w-[400px] shadow-md flex justify-center" >
            <form className="mt-10 ">
        <div className="grid gap-6">
          <div className="space-y-2">
           <h1 className="text-3xl font-bold" >Get Started with Tiaopao</h1>
            <p className="text-sm text-gray-500">
              Start using Tiaopao for yourself.
            </p>
          </div>
          <Button className="bordor text-sm font-bold rounded-lg p-2.5 h-9 flex items-center justify-center gap-2">
          <Image src='/images/search.png' width={25} height={25} alt="logo"/>
            Continue with Google
          </Button>
          <div className="relative">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-500 px-3">Or</span>
          </div>
          <div className="grid gap-3">
                <div className="relative">
                    <span className="text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2">
                        <Mail strokeWidth={1.5} size={18} />
                    </span>
                    <input
                        type="email"
                        className="w-full border border-gray-200 p-2.5 pl-10 h-9 rounded-lg placeholder:text-sm"
                        placeholder="Enter your email"
                    /> 
                </div>
                <div>
                <Button className="w-full bordor text-sm font-semibold rounded-lg p-2.5 h-9 ">
                    Continue with email
                </Button>
                </div>
          </div>
        </div>
            </form>
        </Card>
        <p className="text-sm text-gray-500">
            @ 2024 Tiaopao, LongPung Corporation.
        </p>

      </div>
      <div className="hidden md:block bg-background h-full">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_right,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      </div>
    </section>
    </>
  )
}
