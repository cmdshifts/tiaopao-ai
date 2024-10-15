import { z } from "zod"

export type SiteConfig = {
  author: string
  name: string
  description: string
}

export type UploadData = {
  image?: string
  username?: string
  name?: string
}

export const AccountFormSchema = z.object({
  name: z.string().min(1, {
    message: "กรุณาใส่ชื่อและนามสกุลของคุณ",
  }),
  username: z
    .string()
    .min(8, {
      message: "ชื่อผู้ใช้ต้องมีอย่างน้อย 8 ตัวอักษร",
    })
    .max(20, {
      message: "ชื่อผู้ใช้ต้องมีไม่เกิน 20 ตัวอักษร",
    }),
  email: z.string().email({
    message: "กรุณาใส่อีเมลที่ถูกต้อง",
  }),
  file: z
    .instanceof(File, {
      message: "กรุณาเลือกไฟล์รูปภาพของคุณ",
    })
    .optional(),
})
