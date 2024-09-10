import Link from "next/link"
import React from "react"

export const Landmark: React.FC = () => {
  return (
    <>
      <section
        id="landmark"
        className="h-screen">
        <div>
          <Link href="/interesting">
            <div className="flex justify-between items-center cursor-pointer p-4 pl-10 pr-10 shadow-lg transition transform hover:scale-105 hover:shadow-xl">
              <div>
                <p className="text-xl">Landmark</p>
                <p className="text-sm">ที่เที่ยวน่าไปด้วยเที่ยวป่าว</p>
              </div>
              <div className="flex items-center">
                <p className="text-xl text-right mr-2">more</p>
                <span className="text-xl">→</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}
