"use server"

import { signIn } from "../auth"

export default async function handleMagicSignIn(email: String) {
  try {
    await signIn("resend", { email: email, redirect: false })

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
    }
  }
}
