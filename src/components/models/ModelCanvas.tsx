"use client"
import React from "react"
import { Canvas, CanvasProps } from "@react-three/fiber"

interface ModelCanvasProps extends CanvasProps {
  children: React.ReactNode
}

export const ModelCanvas: React.FC<ModelCanvasProps> = ({
  children,
  ...props
}) => {
  return (
    <>
      <Canvas {...props}>{children}</Canvas>
    </>
  )
}
