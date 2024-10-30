import React from "react"
import { Header } from "@/components/customs/Header"
import Searching from "@/components/sections/Searching"

const Searchingtrip: React.FC = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col justify-center mt-20 pt-12">
        <Searching />
      </div>
    </main>
  )
}

export default Searchingtrip
