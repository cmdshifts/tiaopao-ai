import { Introduction } from "@/components/sections/Introduction"
import { ScrollLayout } from "@/components/customs/ScrollLayout"
import { Metadata } from "next"
import { siteConfig } from "@/configs/site.config"

export const metadata: Metadata = {
  title: siteConfig.name,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og`,
        width: 1200,
        height: 600,
        alt: siteConfig.name,
      },
    ],
    type: "website",
  },
}

export default function Home() {
  return (
    <>
      <ScrollLayout>
        <Introduction />
      </ScrollLayout>
    </>
  )
}
