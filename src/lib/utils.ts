import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(string: string) {
  if (string) {
    const words = string.trim().split(/\s+/)

    if (words.length >= 2) {
      const firstInitial = words[0].charAt(0).toUpperCase()
      const lastInitial = words[words.length - 1].charAt(0).toUpperCase()
      return firstInitial + lastInitial
    } else if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase()
    } else {
      return "NN"
    }
  } else {
    return "NN"
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailRegex.test(email)
}

export const cropImageToSquare = (image: HTMLImageElement): string => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  const sideLength = Math.min(image.width, image.height)
  canvas.width = sideLength
  canvas.height = sideLength

  const xOffset = (image.width - sideLength) / 2
  const yOffset = (image.height - sideLength) / 2

  ctx?.drawImage(
    image,
    xOffset,
    yOffset,
    sideLength,
    sideLength,
    0,
    0,
    sideLength,
    sideLength
  )

  return canvas.toDataURL("image/jpeg")
}
