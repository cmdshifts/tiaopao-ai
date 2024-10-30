import { Introduction } from "@/components/sections/Introduction"
import { ScrollLayout } from "@/components/customs/ScrollLayout"
import { Landmark } from "@/components/sections/Landmark"
import { Restaurant } from "@/components/sections/Restaurant"
import { Metadata } from "next"
import { siteConfig } from "@/configs/site.config"
import { Footer } from "@/components/customs/Footer"
import { LogoMarquee } from "@/components/customs/LogoMarquee"
import { Problems } from "@/components/sections/Problems"
import { Features } from "@/components/sections/Features"

export const metadata: Metadata = {
  title: siteConfig.name,
}

export default function Home() {
  return (
    <>
      <ScrollLayout>
        <Introduction />
        <Landmark />
        <Restaurant />

        <Problems />
        <Features />
        <LogoMarquee />
        <Footer />
      </ScrollLayout>
    </>
  )
}
