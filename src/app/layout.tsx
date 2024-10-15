import React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/configs/site.config"
import { SessionProvider } from "@/components/providers/SessionProvider"
import { auth } from "@/services/auth"
import { Toaster } from "@/components/ui/toaster"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html
      lang="en"
      className="w-screen h-screen h-full-svh overflow-hidden"
      suppressHydrationWarning>
      <body
        className={cn(
          "font-seedSans",
          "w-screen h-screen overflow-x-hidden overflow-y-hidden scrollbar-hide h-full-svh"
        )}
        suppressHydrationWarning>
        <ThemeProvider>
          <SessionProvider session={session}>
            <SpeedInsights />
            {children}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
