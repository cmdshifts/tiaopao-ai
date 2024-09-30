import React from "react"
import { SessionProvider as Provider } from "next-auth/react"
import { Session } from "next-auth"

type SessionProviderProps = {
  children: React.ReactNode
  session?: Session | null
}

export const SessionProvider = ({
  children,
  session,
}: SessionProviderProps) => {
  return (
    <>
      <Provider session={session}>{children}</Provider>
    </>
  )
}
