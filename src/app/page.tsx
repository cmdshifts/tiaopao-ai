import { Introduction } from "@/components/sections/Introduction"
import { Interesting } from "@/components/sections/Interesting"
import { Landmark } from "@/components/sections/Landmark"
import { Restaurant } from "@/components/sections/Restaurant"
import { Header } from "@/components/customs/Header"

export default function Home() {
  return (
    <>
      <main>
        <Header />
        <div className="flex flex-col justify-center">
          <Introduction />
          <Interesting />
          <Landmark />
          <Restaurant />
        </div>
      </main>
    </>
  )
}
