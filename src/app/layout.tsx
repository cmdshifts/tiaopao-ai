import React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/NextThemeProvider"
import { NotificationBar } from "@/components/customs/NotificationBar"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/configs/site.config"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/logo-dark.svg",
        href: "/images/logo-dark.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/logo.svg",
        href: "/images/logo.svg",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body className={cn("font-seedSans", "")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem>
          <NotificationBar isShow />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
