import React from "react"

interface TagProps {
  prefixIcon?: React.ReactNode
  label?: string
  suffixIcon?: React.ReactNode
}

export const Tag: React.FC<TagProps> = ({ prefixIcon, label, suffixIcon }) => {
  return (
    <>
      <div className="flex flex-row items-center gap-2">
        {prefixIcon}
        <p>{label}</p>
        {suffixIcon}
      </div>
    </>
  )
}
