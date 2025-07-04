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
  icons: {
    icon: [
      {
        url: "/images/svg/logo-dark.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
        href: "/images/svg/logo-dark.svg",
      },
      {
        url: "/images/svg/logo.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
        href: "/images/svg/logo.svg",
      },
    ],
    apple: [
      {
        url: "/images/png/logo-dark.png",
        sizes: "192x192",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
        href: "/images/png/logo-dark.png",
      },
      {
        url: "/images/png/logo.png",
        sizes: "192x192",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
        href: "/images/png/logo.png",
      },
    ],
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    type: "website",
  },
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
      className="relative w-screen h-screen h-full-svh scrollbar-hide"
      suppressHydrationWarning>
      <body
        className={cn(
          "font-seedSans",
          "w-screen h-screen overflow-x-hidden overflow-y-auto scrollbar-hide h-full-svh"
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
