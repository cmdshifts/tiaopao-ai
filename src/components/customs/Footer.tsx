import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center w-full min-h-[80px] h-auto py-4 select-none">
        <nav className="flex justify-between items-center w-full max-w-[1400px] px-8 gap-6">
          <div className="text-subtitle-sm text-gray-500">
            <p>© 2024 TripTiaoPao.com. All Rights Reserved.</p>
          </div>
          <Link href="/developers">
            <Button
              variant={"link"}
              className="text-subtitle-sm text-gray-500">
              เกี่ยวกับเรา
            </Button>
          </Link>
        </nav>
      </section>
    </>
  )
}
