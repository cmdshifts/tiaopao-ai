"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cropImageToSquare, getInitials } from "@/lib/utils"
import {
  RiArrowUpCircleLine,
  RiCornerDownLeftLine,
  RiSaveFill,
} from "react-icons/ri"
import { AccountFormSchema } from "@/lib/types"
import { redirect } from "next/navigation"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "@/services/firebaseClient"
import handleUpdateProfile from "@/services/actions/handleUpdateProfile"
import { getAuth, signInWithCustomToken } from "firebase/auth"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

export default function Edit() {
  const { data: session } = useSession()
  const auth = getAuth()
  const loggedSession = useSession()
  const { update } = useSession()

  useEffect(() => {
    const fetchFirebaseToken = async () => {
      const response = await fetch("/api/firebase-token", {
        method: "POST",
      })
      const { customToken } = await response.json()

      if (customToken) {
        signInWithCustomToken(auth, customToken).catch((error) => {
          console.error("Error signing in to Firebase:", error)
        })
      }
    }

    if (session) {
      fetchFirebaseToken()
    }
  }, [session, auth])

  if (!loggedSession) {
    redirect("/")
  }

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false)
  const [profileImage, setProfileImage] = useState<string | undefined>(
    loggedSession.data?.user.image || undefined
  )

  let formData: Record<string, any> = {}

  const handleUpdate = async (data: z.infer<typeof AccountFormSchema>) => {
    formData = {
      name: data.name,
      username: data.username,
    }

    if (data.file && data.file !== undefined && auth.currentUser) {
      uploadImageToStorage(
        data.file,
        `images/users/${loggedSession.data?.user.id}/image-${Date.now()}.jpg`
      )
    } else {
      handleUpdateProfile(formData).then(async (result) => {
        if (result.status == 200) {
          await update().then(() => {
            setIsConfirmDialogOpen(false)
          })
        } else {
          setIsConfirmDialogOpen(false)
        }
      })
    }
  }

  const uploadImageToStorage = (file: File, destination: string) => {
    const storageRef = ref(storage, destination)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(
          "Upload progress:",
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
      },
      (error) => {
        console.error("Error uploading file:", error)
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        formData.image = downloadURL
        handleUpdateProfile(formData).then(async (result) => {
          if (result.status == 200) {
            await update().then(() => {
              setIsConfirmDialogOpen(false)
            })
          } else {
            setIsConfirmDialogOpen(false)
          }
        })
      }
    )
  }

  const form = useForm<z.infer<typeof AccountFormSchema>>({
    resolver: zodResolver(AccountFormSchema),
    defaultValues: {
      name: loggedSession.data?.user.name || "",
      username: loggedSession.data?.user.username!,
      email: loggedSession.data?.user.email!,
      file: undefined,
    },
  })

  return (
    <>
      <div className="flex flex-col select-none">
        <div>
          <h2 className="text-heading-sm mb-2">แก้ไขโปรไฟล์</h2>
          <p>แก้ไขโปรไฟล์ของคุณ</p>
        </div>
        <Separator className="my-2" />
        <div className="mt-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="file"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>รูปโปรไฟล์</FormLabel>
                    <FormControl className="mt-5 group w-min">
                      <label>
                        <Avatar className="mt-2 h-20 w-20 rounded-3xl outline outline-primary outline-3 outline-offset-1">
                          <div className="group-hover:bg-background/30 group-hover:backdrop-blur-sm rounded-3xl w-full h-full flex justify-center items-center absolute transition-all duration-200 ease-in-out">
                            <RiArrowUpCircleLine className="text-3xl fill-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out" />
                          </div>
                          <Input
                            id="file"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]

                              if (file) {
                                const reader = new FileReader()
                                reader.onload = () => {
                                  const image = new Image()
                                  image.src = reader.result as string
                                  image.onload = () => {
                                    const croppedImage =
                                      cropImageToSquare(image)
                                    setProfileImage(croppedImage)
                                    field.onChange(file)
                                  }
                                }

                                reader.readAsDataURL(file)
                              }
                            }}
                          />
                          <AvatarImage
                            src={profileImage}
                            alt={loggedSession.data?.user.username!}
                            loading="lazy"
                            className="h-full w-full"
                          />
                          <AvatarFallback className="rounded-3xl">
                            {getInitials(loggedSession.data?.user.username!)}
                          </AvatarFallback>
                        </Avatar>
                      </label>
                    </FormControl>
                    <FormDescription>อัปโหลดรูปภาพของคุณ</FormDescription>
                    {fieldState.error ? (
                      <p className="text-[0.8rem] font-medium text-destructive">
                        {fieldState.error.message}
                      </p>
                    ) : null}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อ - นามสกุล</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ชื่อ - นามสกุล"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      กรุณาใส่ชื่อและนามสกุลของคุณ
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อผู้ใช้</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ชื่อผู้ใช้"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      ความยาวไม่เกิน 8 - 20 ตัวอักษร
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อีเมล</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="อีเมล"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      คุณไม่สามารถเปลี่ยนอีเมลได้
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Dialog
                  open={isConfirmDialogOpen}
                  onOpenChange={setIsConfirmDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setIsConfirmDialogOpen(true)}
                      className="flex items-center gap-2">
                      <RiSaveFill />
                      <span>อัปเดทข้อมูล</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-md"
                    onInteractOutside={(e) => {
                      e.preventDefault()
                    }}>
                    <DialogHeader>
                      <DialogTitle>บันทึกการเปลี่ยนแปลง</DialogTitle>
                      <DialogDescription>
                        คุณแน่ใจหรือไม่ว่าต้องการบันทึกการเปลี่ยนแปลงข้อมูลโปรไฟล์ของคุณ?
                        การเปลี่ยนแปลงนี้จะถูกบันทึกและอัปเดตในระบบ
                      </DialogDescription>
                    </DialogHeader>
                    <div className="h-2"></div>
                    <DialogFooter className="flex gap-2 sm:justify-between">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => {
                            setIsConfirmDialogOpen(false)
                          }}
                          className="flex items-center gap-2">
                          <RiCornerDownLeftLine />
                          ย้อนกลับ
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          type="submit"
                          onClick={form.handleSubmit(handleUpdate)}
                          className="flex items-center gap-2">
                          <RiSaveFill />
                          <span>บันทึก</span>
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
