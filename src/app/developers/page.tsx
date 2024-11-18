import { Header } from "@/components/customs/Header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"
import { TbMail } from "react-icons/tb"
import { LuGlobe2 } from "react-icons/lu"
import { FiGithub } from "react-icons/fi"
import { RiLinkedinBoxLine } from "react-icons/ri"
import { Separator } from "@/components/ui/separator"

export default function Developers() {
  return (
    <>
      <Header
        isNotification={false}
        showMenu={false}
        className="shadow-sm bg-background/65 backdrop-blur-[12px]"
      />
      <section className="pt-[64px] flex flex-col justify-center items-center h-full select-none">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-start justify-center gap-4 [&>div>span]:h-[64px] [&>div>span]:w-[64px] min-w-[250px]">
          <div className="col-span-1 lg:col-span-3 items-center gap-2">
            <div>
              <p className="text-sm text-center">อาจารย์ที่ปรึกษาโครงงาน</p>
              <h2 className="text-lg font-medium text-center">
                ผศ. ดร.อิทธิพงษ์ เขมะเพชร
              </h2>
              <Separator className="my-4" />
            </div>
          </div>
          <div className="col-span-1 flex flex-col items-center gap-2 w-full">
            <Avatar>
              <AvatarImage
                src="/images/developers/akkharawit.jpeg"
                alt="@akk.somwong"
                className="pointer-events-none"
              />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <p className="text-sm text-center">2110511101011</p>
              <h2 className="text-lg font-medium text-center">
                อัครวิชญ์ สมวงศ์
              </h2>
              <div className="flex flex-col mt-2">
                <span className="flex flex-row gap-2 items-center">
                  <TbMail />
                  <Link href={"mailto:me@akkharawit.com"}>
                    <Button
                      variant={"link"}
                      className="p-0 h-auto">
                      me@akkharawit.com
                    </Button>
                  </Link>
                </span>
                <span className="flex flex-row gap-2 items-center">
                  <LuGlobe2 />
                  <Link
                    href={"https://akkharawit.com"}
                    target="_blank">
                    <Button
                      variant={"link"}
                      className="p-0 h-auto">
                      akkharawit.com
                    </Button>
                  </Link>
                </span>
                <span className="flex flex-row gap-2 items-center">
                  <FiGithub />
                  <Link
                    href={"https://github.com/cmdshifts"}
                    target="_blank">
                    <Button
                      variant={"link"}
                      className="p-0 h-auto">
                      @cmdshifts
                    </Button>
                  </Link>
                </span>
                <span className="flex flex-row gap-2 items-center">
                  <RiLinkedinBoxLine />
                  <Link
                    href={"https://www.linkedin.com/in/akkharawit-somwong/"}
                    target="_blank">
                    <Button
                      variant={"link"}
                      className="p-0 h-auto">
                      Akkharawit Somwong
                    </Button>
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar>
              <AvatarImage
                src="/images/developers/arin.jpg"
                alt="@willbeliv3"
                className="pointer-events-none object-cover"
              />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <p className="text-sm text-center">2110511101020</p>
              <h2 className="text-lg font-medium text-center">
                อริญชย์ นิลชาติ
              </h2>
              <div className="flex flex-col mt-2">
                <span className="flex flex-row gap-2 items-center">
                  <TbMail />
                  <Link href={"mailto:nillacharta@gmail.com"}>
                    <Button
                      variant={"link"}
                      className="p-0 h-auto">
                      nillacharta@gmail.com
                    </Button>
                  </Link>
                </span>
                <span className="flex flex-row gap-2 items-center">
                  <FiGithub />
                  <Link
                    href={"https://github.com/oliveolan"}
                    target="_blank">
                    <Button
                      variant={"link"}
                      className="p-0 h-auto">
                      @Oliveolan
                    </Button>
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar>
              <AvatarImage
                src="/images/developers/apichart.jpg"
                alt="@shadcn"
                className="pointer-events-none object-cover"
              />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-center">2110511101032</p>
              <h2 className="text-lg font-medium text-center">
                อภิชาติ ศรีอำพร
              </h2>
              <div className="flex flex-col mt-2">
                <span className="flex flex-row gap-2 items-center">
                  <TbMail />
                  <Link href={"mailto:apichartsriamporn@gmail.com"}>
                    <Button
                      variant={"link"}
                      className="p-0 h-auto">
                      apichartsriamporn@gmail.com
                    </Button>
                  </Link>
                </span>
                <span className="flex flex-row gap-2 items-center">
                  <FiGithub />
                  <Link
                    href={"https://github.com/Sylvyl"}
                    target="_blank">
                    <Button
                      variant={"link"}
                      className="p-0 h-auto">
                      @Sylvyl
                    </Button>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
