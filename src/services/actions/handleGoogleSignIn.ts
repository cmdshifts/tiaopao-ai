"use server"

import { signIn } from "../auth"

export default async function handleGoogleSignIn() {
  await signIn("google", { redirectTo: "/" })
}
