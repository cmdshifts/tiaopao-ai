import VerificationEmail from "@/components/mail/VerificationEmail"
import { Resend } from "resend"

export async function authSendRequest(params: {
  email: string
  url: string
  from: string | undefined
}) {
  const resend = new Resend(process.env.AUTH_RESEND_API_KEY)
  const { email, url, from } = params
  const { host } = new URL(url)

  const { error } = await resend.emails.send({
    from: from!,
    to: email,
    subject: "🎉 เตรียมตัวให้พร้อม! ประตูสู่การผจญภัยของคุณเปิดแล้ว!",
    react: VerificationEmail({ email, url, host }),
  })

  if (error) {
    return { success: false, error: error }
  }

  return { success: true }
}
