import { Introduction } from "@/components/sections/Introduction"
import { ScrollLayout } from "@/components/customs/ScrollLayout"
import { Landmark } from "@/components/sections/Landmark"
import { Restaurant } from "@/components/sections/Restaurant"
import { siteConfig } from "@/configs/site.config"
import { Footer } from "@/components/customs/Footer"
import { LogoMarquee } from "@/components/customs/LogoMarquee"
import { Problems } from "@/components/sections/Problems"
import { Features } from "@/components/sections/Features"
import type { Metadata } from "next"
import { Interesting } from "@/components/sections/Interesting"
import { Bubble } from "@typebot.io/nextjs"

export const metadata: Metadata = {
  title: siteConfig.name,
}

export default function Home() {
  return (
    <>
      <ScrollLayout>
        <Introduction />
        <Interesting />
        <Landmark />
        <Restaurant />
        <Problems />
        <Features />
        <LogoMarquee />
        <Footer />
        <Bubble
          typebot="my-typebot-0bnhu0j"
          theme={{ button: { backgroundColor: "#2E9CC9" } }}
        />
      </ScrollLayout>
    </>
  )
}
