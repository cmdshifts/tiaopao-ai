import { Timestamp } from "firebase-admin/firestore"
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

export type AgentEvent = {
  event: string
  conversation_id: string
  message_id: string
  created_at: number
  task_id: string
  id: string
  position?: number
  thought?: string
  observation?: string
  tool?: string
  tool_labels?: Record<string, unknown>
  tool_input?: string
  message_files?: unknown[]
  answer?: string
  metadata?: {
    usage: {
      prompt_tokens: number
      prompt_unit_price: string
      prompt_price_unit: string
      prompt_price: string
      completion_tokens: number
      completion_unit_price: string
      completion_price_unit: string
      completion_price: string
      total_tokens: number
      total_price: string
      currency: string
      latency: number
    }
  }
  files?: unknown | null
}

export type PromptVariables = {
  province: Province
  start_date: Date | string
  end_date: Date | string
  num_days: number
  budget: number
  companion: Companion
  lifestyle: Lifestyle
}

export type LikeState = {
  [userId: string]: boolean
}

export type TripPlan = {
  planId: string
  planOwner?: string
  province: string
  totalBudget: number
  totalDays: number
  companion: string
  lifestyle: string
  data: DayPlan[]
  createdDate: string
  createdTime: string
  likes: LikeState
}

export type DayPlan = {
  day: number
  places: Place[]
}

export type Place = {
  name?: string
  timeToVisit: string
  budget: number
  id: string
  types?: string[]
  addressComponents?: AddressComponent[]
  rating?: number
  googleMapsUri?: string
  displayName?: {
    text: string
  }
  businessStatus?: string
  currentOpeningHours?: {
    openNow: boolean
  }
  location?: {
    latitude: number
    longitude: number
  }
  photos?: Photo
}

export type AddressComponent = {
  longText: string
  shortText: string
  types: string[]
  languageCode: string
}

export type Photo = {
  name: string
  widthPx: number
  heightPx: number
  authorAttributions: AuthorAttribution[]
  flagContentUri: string
  googleMapsUri: string
}

export type AuthorAttribution = {
  displayName: string
  uri: string
  photoUri: string
}

export type Province = {
  id: number
  provinceCode: number
  provinceNameTh: string
  provinceNameEn: string
  coords: {
    lat: number
    lng: number
  }
}

export type Companion = {
  value: string
  label: string
}

export type Lifestyle = {
  value: string
  label: string
}

export type User = {
  id: string
  name: string
  username: string
  email: string
  image: string
  role: string
  emailVerified?: Timestamp
}

export type ModelState = "prompt" | "generate" | "response"

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

export const PromptFormSchema = z.object({
  province: z
    .object({
      id: z.number(),
      provinceCode: z.number(),
      provinceNameTh: z.string(),
      provinceNameEn: z.string(),
      coords: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    })
    .optional()
    .superRefine((val, ctx) => {
      if (val === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["date"],
          message: "โปรดเลือกจังหวัด",
        })
      }
    }),
  date: z
    .object({
      from: z
        .date()
        .refine((val: any) => val instanceof Date && !isNaN(val.getTime()), {
          message: "วันที่เริ่มต้นไม่ถูกต้อง",
        })
        .or(
          z.any().refine((val) => val !== undefined, {
            message: "กรุณากรอกวันที่เริ่มต้น",
          })
        ),
      to: z
        .date()
        .refine((val: any) => val instanceof Date && !isNaN(val.getTime()), {
          message: "วันที่สิ้นสุดไม่ถูกต้อง",
        })
        .or(
          z.any().refine((val) => val !== undefined, {
            message: "กรุณากรอกวันที่สิ้นสุด",
          })
        ),
    })
    .optional()
    .superRefine((val, ctx) => {
      if (val === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["date"],
          message: "กรุณากรอกข้อมูลวันที่ให้ครบถ้วน",
        })
      }
    }),
  budget: z.number().min(100, {
    message: "งบประมาณต้องไม่น้อยกว่า 100 บาท",
  }),
  companion: z.object({
    value: z.string().min(1, {
      message: "กรุณาเลือกเพื่อนเดินทาง",
    }),
    label: z.string().min(1, {
      message: "กรุณาเลือกเพื่อนเดินทาง",
    }),
  }),
  lifestyle: z
    .object({
      value: z.string().min(1, {
        message: "กรุณาเลือกสไตล์การเดินทาง",
      }),
      label: z.string().min(1, {
        message: "กรุณาเลือกสไตล์การเดินทาง",
      }),
    })
    .optional()
    .superRefine((val, ctx) => {
      if (val === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["value"],
          message: "กรุณาเลือกสไตล์การเดินทาง",
        })
      }
    }),
})
