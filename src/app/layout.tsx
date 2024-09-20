import React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/NextThemeProvider"
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
        rel: "icon",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
        url: "/images/logo-dark.svg",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
        url: "/images/logo.svg",
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
      className="h-screen overflow-hidden"
      suppressHydrationWarning>
      <body
        className={cn(
          "font-seedSans",
          "w-screen h-screen overflow-x-hidden overflow-y-auto"
        )}>
          
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem>
          
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
