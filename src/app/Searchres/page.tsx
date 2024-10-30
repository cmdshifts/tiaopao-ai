import React from "react"
import { Header } from "@/components/customs/Header"
import Genres from "@/components/sections/res"

const Searchresult: React.FC = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col justify-center mt-20 pt-12">
        <Genres />
      </div>
    </main>
  )
}

export default Searchresult
