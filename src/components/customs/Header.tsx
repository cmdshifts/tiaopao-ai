"use client"
import React, { useEffect, useRef, useState } from "react"
import { Logo } from "./Logo"
import { Button } from "../ui/button"
import { siteConfig } from "@/configs/site.config"
import Link from "next/link"
import { NotificationBar } from "./NotificationBar"
import { cn, getInitials } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  RiSettingsLine,
  RiChatHistoryLine,
  RiBardFill,
  RiMenu4Fill,
  RiHashtag,
  RiFingerprintFill,
  RiVerifiedBadgeFill,
  RiVipCrownFill,
  RiEditLine,
} from "react-icons/ri"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import { LogoutModal } from "./LogoutModal"
import { usePathname } from "next/navigation"
import { motion, MotionValue } from "framer-motion"

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isNotification?: boolean
  showMenu?: boolean
  showActionButton?: boolean
  showCTAButton?: boolean
  size?: "sm" | "md" | "lg"
  background?: MotionValue
  backdropBlur?: MotionValue
}

export const Header: React.FC<HeaderProps> = ({
  isNotification = true,
  showMenu = true,
  showActionButton = true,
  showCTAButton = true,
  size = "md",
  background,
  backdropBlur,
  ...props
}: HeaderProps) => {
  const { className, ...rest } = props
  const classNames = cn(
    "z-50 fixed flex flex-col items-center justify-center w-full select-none transition-all duration-200 ease-in-out",
    className
  )

  const [isModal, setIsModal] = useState<boolean>(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false)
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false)
  const profileButtonRef = useRef<HTMLButtonElement>(null)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const navButtonRef = useRef<HTMLButtonElement>(null)
  const navMenuRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const { data } = useSession()
  const pathname = usePathname()

  useEffect(() => {
    const handleProfileClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node) &&
        (!isModal ||
          !(
            modalRef.current && !modalRef.current.contains(event.target as Node)
          ))
      ) {
        setIsProfileMenuOpen(false)
      }
    }

    const handleNavClickOutside = (event: MouseEvent) => {
      if (
        navMenuRef.current &&
        !navMenuRef.current.contains(event.target as Node) &&
        navButtonRef.current &&
        !navButtonRef.current.contains(event.target as Node) &&
        !isModal &&
        !(modalRef.current && !modalRef.current.contains(event.target as Node))
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
  }, [isModal])

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
        {...rest}>
        <NotificationBar isShow={isNotification} />
        <motion.div
          className="w-full flex justify-center items-center"
          style={{
            backgroundColor: background,
            backdropFilter: backdropBlur,
          }}>
          <nav
            className={cn(
              "flex justify-between items-center w-full max-w-[1400px] px-4 gap-6",
              `${size === "sm" ? "py-3" : size === "lg" ? "py-8 px-8" : "py-3"}`
            )}>
            <motion.div
              className="flex justify-center items-center gap-4 cursor-pointer whitespace-nowrap hover:opacity-90 transition-opacity duration-200 ease-in-out"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}>
              <Link
                href={"/"}
                className="flex justify-center items-center gap-4 w-full h-full">
                <Logo className="w-9 h-9" />
                <h3 className="text-heading-sm">{siteConfig.name}</h3>
              </Link>
            </motion.div>
            <div className="flex items-center justify-end gap-4">
              {showMenu && (
                <div className="w-full hidden lg:block">
                  <ul className="flex justify-end items-center gap-5">
                    <motion.li
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}>
                      <Link href="#interesting">สำรวจ</Link>
                    </motion.li>
                    <motion.li
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}>
                      <Link href="#landmark">ที่ท่องเที่ยว</Link>
                    </motion.li>
                    <motion.li
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}>
                      <Link href="#restaurant">ร้านอาหาร</Link>
                    </motion.li>
                  </ul>
                </div>
              )}
              {showActionButton && (
                <>
                  <div className="hidden md:flex justify-center items-center gap-2">
                    {showCTAButton && (
                      <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}>
                        <Link href={"/app"}>
                          <Button
                            variant={"default"}
                            size={"lg"}
                            className="flex items-center justify-center gap-2">
                            <RiBardFill />
                            เริ่มต้นใช้งาน
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                    {data?.user?.email ? (
                      <>
                        <div className="relative group">
                          <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}>
                            <Button
                              ref={profileButtonRef}
                              variant={"ghost"}
                              size={"lg"}
                              className="pl-4 pr-0 flex items-center justify-center gap-3 peer"
                              onClick={() =>
                                setIsProfileMenuOpen(!isProfileMenuOpen)
                              }>
                              <span className="flex items-center gap-2">
                                {data.user.username}
                                {data.user.role === "admin" ? (
                                  <RiVerifiedBadgeFill className="fill-turquoise" />
                                ) : data.user.role === "developer" ? (
                                  <RiVipCrownFill className="fill-[#DEB64B]" />
                                ) : null}
                              </span>
                              <Avatar className="h-9 w-9 rounded-lg outline outline-primary outline-3 outline-offset-1">
                                <Image
                                  src={data.user.image!}
                                  alt={data.user.username!}
                                  className="h-full w-full"
                                  height={36}
                                  width={36}
                                  loading="lazy"
                                />
                                <AvatarFallback>
                                  {getInitials(data.user.username!)}
                                </AvatarFallback>
                              </Avatar>
                            </Button>
                          </motion.div>

                          {isProfileMenuOpen && (
                            <div
                              ref={profileMenuRef}
                              className="absolute right-0 pt-2 w-48 block z-50">
                              <ul className="bg-background rounded-lg shadow-sm border border-gray-500/20 p-1 [&>li]:rounded-sm flex flex-col gap-1 [&>li]:transition-all [&>li]:duration-200 [&>li]:ease-in-out">
                                <li
                                  className={cn(
                                    "hover:bg-gray-500/15 cursor-pointer",
                                    `${pathname == "/account/edit" ? "bg-gray-500/10" : "bg-transparent"}`
                                  )}>
                                  <Link
                                    href={"/account/edit"}
                                    className="px-4 py-2 flex items-center gap-2">
                                    <RiEditLine />
                                    <p>แก้ไขโปรไฟล์</p>
                                  </Link>
                                </li>
                                <li
                                  className={cn(
                                    "hover:bg-gray-500/15 cursor-pointer",
                                    `${pathname == "/account/history" ? "bg-gray-500/10" : "bg-transparent"}`
                                  )}>
                                  <Link
                                    href={"/account/history"}
                                    className="px-4 py-2 flex items-center gap-2">
                                    <RiChatHistoryLine />
                                    <p>ประวัติการใช้งาน</p>
                                  </Link>
                                </li>
                                <li
                                  className={cn(
                                    "hover:bg-gray-500/15 cursor-pointer",
                                    `${pathname == "/account/settings" ? "bg-gray-500/10" : "bg-transparent"}`
                                  )}>
                                  <Link
                                    href={"/account/settings"}
                                    className="px-4 py-2 flex items-center gap-2">
                                    <RiSettingsLine />
                                    <p>การตั้งค่า</p>
                                  </Link>
                                </li>
                                <Separator />
                                <div
                                  ref={modalRef}
                                  className="[&>li]:rounded-sm flex flex-col gap-1 [&>li]:transition-all [&>li]:duration-200 [&>li]:ease-in-out">
                                  <LogoutModal
                                    isModalOpen={isModal}
                                    onModalOpenChange={setIsModal}
                                    className="px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive cursor-pointer flex items-center gap-2"
                                  />
                                </div>
                              </ul>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}>
                        <Link
                          href={"/auth"}
                          className="flex justify-center items-center gap-2">
                          <Button
                            variant={"secondary"}
                            size={"lg"}
                            className="flex items-center justify-center gap-2">
                            <RiFingerprintFill />
                            <p>ลงชื่อเข้าใช้</p>
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                  <div className="relative block md:hidden">
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
                        className="absolute right-0 pt-2 w-56 block bg-background">
                        <ul className="bg-background rounded-lg shadow-sm border border-gray-500/20 p-1 [&>li]:rounded-sm flex flex-col gap-1 [&>li]:transition-all [&>li]:duration-200 [&>li]:ease-in-out">
                          {showMenu && (
                            <>
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
                            </>
                          )}
                          <div className="md:hidden [&>li]:rounded-sm flex flex-col gap-1 [&>li]:transition-all [&>li]:duration-200 [&>li]:ease-in-out">
                            {showMenu && <Separator />}
                            {data?.user.email ? (
                              <>
                                <li className="flex items-center gap-4 px-2 py-2">
                                  <Avatar className="h-7 w-7 rounded-lg outline outline-primary outline-3 outline-offset-1">
                                    <AvatarImage
                                      src={data.user.image!}
                                      alt={data.user.username!}
                                      className="h-full w-full"
                                    />
                                    <AvatarFallback>
                                      {getInitials(
                                        data.user.name! || data.user.username!
                                      )}
                                    </AvatarFallback>
                                  </Avatar>
                                  <p className="text-sm font-medium flex items-center gap-2">
                                    <span className="truncate max-w-[116px] break-all">
                                      {data.user.username}
                                    </span>
                                    {data.user.role === "admin" ? (
                                      <RiVerifiedBadgeFill className="fill-turquoise" />
                                    ) : data.user.role === "developer" ? (
                                      <RiVipCrownFill className="fill-[#DEB64B]" />
                                    ) : null}
                                  </p>
                                </li>
                                <li className="hover:bg-gray-500/15 cursor-pointer">
                                  <Link
                                    href={"/account/edit"}
                                    className="flex items-center px-4 py-2 gap-2 w-full">
                                    <RiEditLine />
                                    <p>แก้ไขโปรไฟล์</p>
                                  </Link>
                                </li>
                                <li className="hover:bg-gray-500/15 cursor-pointer">
                                  <Link
                                    href={"/account/history"}
                                    className="flex items-center px-4 py-2 gap-2 w-full">
                                    <RiChatHistoryLine />
                                    <p>ประวัติการใช้งาน</p>
                                  </Link>
                                </li>
                                <li className="hover:bg-gray-500/15 cursor-pointer">
                                  <Link
                                    href={"/account/settings"}
                                    className="flex items-center px-4 py-2 gap-2 w-full">
                                    <RiSettingsLine />
                                    <p>การตั้งค่า</p>
                                  </Link>
                                </li>
                                <Separator />
                                <LogoutModal
                                  isModalOpen={isModal}
                                  onModalOpenChange={setIsModal}
                                  className="px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive cursor-pointer flex items-center gap-2"
                                />
                              </>
                            ) : (
                              <>
                                {showCTAButton && (
                                  <li
                                    className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer flex items-center gap-2"
                                    onClick={handleUnavailableAlert}>
                                    <RiBardFill />
                                    <p>เริ่มต้นใช้งาน</p>
                                  </li>
                                )}
                                <li className="px-4 py-2 hover:bg-gray-500/15 cursor-pointer flex items-center gap-2">
                                  <Link
                                    href={"/auth"}
                                    className="flex items-center gap-2 w-full h-full">
                                    <RiFingerprintFill />
                                    <p>ลงชื่อเข้าใช้</p>
                                  </Link>
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
        </motion.div>
      </section>
    </>
  )
}
