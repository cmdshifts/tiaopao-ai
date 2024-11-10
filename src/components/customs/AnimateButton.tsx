import React from "react"
import { Button } from "../ui/button"
import { RiRestartLine } from "react-icons/ri"

interface AnimateButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export const AnimateButton: React.FC<AnimateButtonProps> = ({
  isLoading,
  children,
}) => {
  return (
    <>
      <Button className="group">
        {isLoading ? (
          <RiRestartLine className="group-hover:rotate-180 transition-all duration-200 ease-in-out" />
        ) : null}
        {isLoading}
        <div>{children}</div>
      </Button>
    </>
  )
}
