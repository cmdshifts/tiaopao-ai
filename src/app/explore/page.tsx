import { Explore } from "@/components/sections/Explore"
import { Header } from "@/components/customs/Header"

export default function explore() {
  return (
    <>
      <main>
        <Header/>
        <div className="flex flex-col justify-center">
        
          <Explore/>
        </div>
      </main>
    </>
  )
}
