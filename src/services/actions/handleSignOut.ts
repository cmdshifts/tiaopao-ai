import { signOut } from "next-auth/react"

export default async function handleSignOut() {
  signOut()
}
