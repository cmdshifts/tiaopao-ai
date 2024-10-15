import React from "react"

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center w-full min-h-[60px] h-[60px] select-none">
        <nav className="flex justify-between items-center w-full max-w-[1400px] px-8 gap-6">
          <div className="text-subtitle-sm text-gray-500">
            <p>© 2024 TripTiaoPao.com. All Rights Reserved.</p>
          </div>
        </nav>
      </section>
    </>
  )
}
