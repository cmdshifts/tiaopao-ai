import { Introduction } from "@/components/sections/Introduction"
import { ScrollLayout } from "@/components/customs/ScrollLayout"
import { Interesting } from "@/components/sections/Interesting"
import { Landmark } from "@/components/sections/Landmark"
import { Restaurant } from "@/components/sections/Restaurant"

export default function Home() {
  return (
    <>
      <ScrollLayout>
        <Introduction />
        <Interesting />
        <Landmark />
        <Restaurant />
      </ScrollLayout>
    </>
  )
}
