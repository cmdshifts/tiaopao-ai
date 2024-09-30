"use client"
import React, { useEffect, useRef, useState } from "react"
import { Logo } from "./Logo"
import { Button } from "../ui/button"
import { siteConfig } from "@/configs/site.config"
import Link from "next/link"
import { NotificationBar } from "./NotificationBar"
import { useRouter } from "next/navigation"
import { cn, getInitials } from "@/lib/utils"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  RiLogoutCircleRLine,
  RiSettingsLine,
  RiUserLine,
  RiChatHistoryLine,
  RiBardFill,
  RiMenu4Fill,
  RiHashtag,
  RiFingerprintFill,
} from "react-icons/ri"
import { toast } from "@/hooks/use-toast"

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isNotification?: boolean
  showMenu?: boolean
  showActionButton?: boolean
  size?: "sm" | "md" | "lg"
  opacity?: number
  blur?: number
}

export const Header: React.FC<HeaderProps> = ({
  isNotification = true,
  showMenu = true,
  showActionButton = true,
  size = "md",
  opacity,
  blur,
  ...props
}: HeaderProps) => {
  const router = useRouter()
  const { className, ...rest } = props
  const classNames = cn(
    "z-50 absolute flex flex-col items-center justify-center w-full select-none transition-all duration-200 ease-in-out",
    className
  )

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false)
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false)
  const profileButtonRef = useRef<HTMLButtonElement>(null)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const navButtonRef = useRef<HTMLButtonElement>(null)
  const navMenuRef = useRef<HTMLDivElement>(null)

  const { data } = useSession()

  useEffect(() => {
    const handleProfileClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false)
      }
    }

    const handleNavClickOutside = (event: MouseEvent) => {
      if (
        navMenuRef.current &&
        !navMenuRef.current.contains(event.target as Node) &&
        navButtonRef.current &&
        !navButtonRef.current.contains(event.target as Node)
      ) {
        setIsNavMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleProfileClickOutside)
    document.addEventListener("mousedown", handleNavClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleProfileClickOutside)
      document.removeEventListener("mousedown", handleNavClickOutside)
    }
  }, [])

  const handleUnavailableAlert = () =>
    toast({
      variant: "destructive",
      title: "ขออภัย! ฟีเจอร์นี้ยังไม่พร้อมใช้งาน",
      description: "กรุณาลองใหม่อีกครั้งในภายหลัง",
      duration: 5000,
    })

  return (
    <>
      <section
        className={classNames}
        style={{
          backgroundColor: `hsl(var(--background) / ${opacity})`,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
        }}
        {...rest}>
        <NotificationBar isShow={isNotification} />
        <nav
          className={cn(
            "flex justify-between items-center w-full max-w-[1400px] px-4 gap-6",
            `${size === "sm" ? "py-3" : size === "lg" ? "py-8 px-8" : "py-3"}`
          )}>
          <div
            className="flex justify-center items-center gap-4 cursor-pointer whitespace-nowrap hover:opacity-90 transition-opacity duration-200 ease-in-out"
            onClick={() => router.push("/")}>
            <Logo className="w-9 h-9" />
            <h3 className="text-heading-sm">{siteConfig.name}</h3>
          </div>
          <div className="flex items-center justify-end gap-4">
            {showMenu && (
              <div className="w-full hidden lg:block">
                <ul className="flex justify-end items-center gap-5">
                  <li>
                    <Link href="#interesting">สำรวจ</Link>
                  </li>
                  <li>
                    <Link href="#landmark">ที่ท่องเที่ยว</Link>
                  </li>
                  <li>
                    <Link href="#restaurant">ร้านอาหาร</Link>
                  </li>
                </ul>
              </div>
            )}
            {showActionButton && (
              <>
                <div className="hidden md:flex justify-center items-center gap-2">
                  <Button
                    variant={"default"}
                    size={"lg"}
                    onClick={handleUnavailableAlert}
                    className="flex items-center justify-center gap-2">
                    <RiBardFill />
                    เริ่มต้นใช้งาน
                  </Button>
                  {data?.user?.email ? (
                    <>
                      <div className="relative group">
                        <Button
                          ref={profileButtonRef}
                          variant={"ghost"}
                          size={"lg"}
                          className="pl-4 pr-0 flex items-center justify-center gap-3 peer"
                          onClick={() =>
                            setIsProfileMenuOpen(!isProfileMenuOpen)
                          }>
                          <p>{data.user.username!}</p>
                          <Avatar className="h-9 w-9 rounded-lg outline outline-primary outline-3 outline-offset-1">
                            <AvatarImage
                              src={data.user.image!}
                              alt={data.user.name! || data.user.username!}
                              className="h-full w-full"
                            />
                            <AvatarFallback>
                              {getInitials(
                                data.user.name! || data.user.username!
                              )}
                            </AvatarFallback>
                          </Avatar>
                        </Button>

                        {isProfileMenuOpen && (
                          <div
                            ref={profileMenuRef}
                            className="absolute right-0 pt-2 w-48 block">
                            <ul className="bg-primary-foreground rounded-lg shadow-sm border border-gray-500/20 p-1 [&>li]:rounded-sm flex flex-col gap-1 [&>li]:transition-all [&>li]:duration-200 [&>li]:ease-in-out">
                              <li
                                className="px-4 py-2 hover:bg-gray-500/15 cursor-pointer flex items-center gap-2"
                                onClick={handleUnavailableAlert}>
                                <RiUserLine />
                                <p>บัญชีของฉัน</p>
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-gray-500/15 cursor-pointer flex items-center gap-2"
                                onClick={handleUnavailableAlert}>
                                <RiChatHistoryLine />
                                <p>ประวัติการใช้งาน</p>
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-gray-500/15 cursor-pointer flex items-center gap-2"
                                onClick={handleUnavailableAlert}>
                                <RiSettingsLine />
                                <p>การตั้งค่า</p>
                              </li>
                              <Separator className="" />
                              <li
                                className="px-4 py-2 hover:bg-destructive/10 text-destructive cursor-pointer flex items-center gap-2"
                                onClick={() => signOut()}>
                                <RiLogoutCircleRLine />
                                <p>ออกจากระบบ</p>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <Button
                      variant={"secondary"}
                      size={"lg"}
                      onClick={() => router.push("/auth")}
                      className="flex items-center justify-center gap-2">
                      <RiFingerprintFill />
                      ลงชื่อเข้าใช้
                    </Button>
                  )}
                </div>
                <div className="relative block lg:hidden">
                  <Button
                    ref={navButtonRef}
                    variant={"secondary"}
                    size={"icon"}
                    className="text-lg h-10 w-10"
                    onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}>
                    <RiMenu4Fill />
                  </Button>

                  {isNavMenuOpen && (
                    <div
                      ref={navMenuRef}
                      className="absolute right-0 pt-2 w-56 block">
                      <ul className="bg-primary-foreground rounded-lg shadow-sm border border-gray-500/20 p-1 [&>li]:rounded-sm flex flex-col gap-1 [&>li]:transition-all [&>li]:duration-200 [&>li]:ease-in-out">
                        <li className="hover:bg-gray-500/15 cursor-pointer flex items-center">
                          <Link
                            href={"#interesting"}
                            className="flex items-center px-4 py-2 gap-2 w-full">
                            <RiHashtag />
                            <p>สำรวจ</p>
                          </Link>
                        </li>
                        <li className="hover:bg-gray-500/15 cursor-pointer flex items-center">
                          <Link
                            href={"#landmark"}
                            className="flex items-center px-4 py-2 gap-2 w-full">
                            <RiHashtag />
                            <p>ที่ท่องเที่ยว</p>
                          </Link>
                        </li>
                        <li className="hover:bg-gray-500/15 cursor-pointer flex items-center">
                          <Link
                            href={"#restaurant"}
                            className="flex items-center px-4 py-2 gap-2 w-full">
                            <RiHashtag />
                            <p>ร้านอาหาร</p>
                          </Link>
                        </li>
                        <div className="md:hidden [&>li]:rounded-sm flex flex-col gap-1 [&>li]:transition-all [&>li]:duration-200 [&>li]:ease-in-out">
                          <Separator />
                          {data?.user.email ? (
                            <>
                              <li className="flex items-center gap-4 px-4 py-2">
                                <Avatar className="h-7 w-7 rounded-lg outline outline-primary outline-3 outline-offset-1">
                                  <AvatarImage
                                    src={data.user.image!}
                                    alt="@shadcn"
                                    className="h-full w-full"
                                  />
                                  <AvatarFallback>
                                    {getInitials(
                                      data.user.name! || data.user.username!
                                    )}
                                  </AvatarFallback>
                                </Avatar>
                                <p className="truncate max-w-[116px] break-all">
                                  {data.user.username}
                                </p>
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-gray-500/15 cursor-pointer flex items-center gap-2"
                                onClick={handleUnavailableAlert}>
                                <RiUserLine />
                                <p>บัญชีของฉัน</p>
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-gray-500/15 cursor-pointer flex items-center gap-2"
                                onClick={handleUnavailableAlert}>
                                <RiChatHistoryLine />
                                <p>ประวัติการใช้งาน</p>
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-gray-500/15 cursor-pointer flex items-center gap-2"
                                onClick={handleUnavailableAlert}>
                                <RiSettingsLine />
                                <p>การตั้งค่า</p>
                              </li>
                              <Separator />
                              <li
                                className="px-4 py-2 hover:bg-destructive/10 text-destructive cursor-pointer flex items-center gap-2"
                                onClick={() => signOut()}>
                                <RiLogoutCircleRLine />
                                <p>ออกจากระบบ</p>
                              </li>
                            </>
                          ) : (
                            <>
                              <li
                                className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer flex items-center gap-2"
                                onClick={handleUnavailableAlert}>
                                <RiBardFill />
                                <p>เริ่มต้นใช้งาน</p>
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-gray-500/15 cursor-pointer flex items-center gap-2"
                                onClick={() => router.push("/auth")}>
                                <RiFingerprintFill />
                                <p>ลงชื่อเข้าใช้</p>
                              </li>
                            </>
                          )}
                        </div>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </nav>
      </section>
    </>
  )
}
