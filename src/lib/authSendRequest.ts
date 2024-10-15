import VerificationEmail from "@/components/mail/VerificationEmail"
import { Resend } from "resend"

export async function authSendRequest(params: {
  email: string
  url: string
  from: string | undefined
}) {
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)
  const { email, url, from } = params

  const { error } = await resend.emails.send({
    from: from!,
    to: email,
    subject: "✨ ประตูสู่การผจญภัยของคุณเปิดแล้ว!",
    react: VerificationEmail({ url }),
  })

  if (error) {
    return { success: false, error: error }
  }

  return { success: true }
}
