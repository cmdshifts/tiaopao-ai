import { AddressComponents } from "@/types/AddressComponents"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Companion, LikeState, Place, Province, TripPlan } from "./types"

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

export const getLocation = (addressComponents: AddressComponents[]) => {
  const placeComponents: string[] = []

  if (Array.isArray(addressComponents)) {
    for (const component of addressComponents) {
      if (
        component.types.includes("sublocality_level_2") ||
        component.types.includes("sublocality_level_1") ||
        component.types.includes("administrative_area_level_1")
      ) {
        placeComponents.push(component.shortText)
      }
    }
  }

  return placeComponents.join(" ")
}

export const getOpenStatus = (
  currentOpeningHours: { openNow: boolean } | undefined
) => {
  if (currentOpeningHours === undefined) {
    return "ไม่ระบุ"
  } else {
    return currentOpeningHours?.openNow ? "Open now" : "Closed"
  }
}

export const getSortedProvinceList = (
  provinceList: Province[],
  locale: "th" | "en"
) => {
  const sortedList = provinceList.sort((a, b) => {
    if (locale === "th") {
      return a.provinceNameTh.localeCompare(b.provinceNameTh)
    } else {
      return a.provinceNameTh.localeCompare(b.provinceNameTh)
    }
  })
  return sortedList
}

export const calculateDateDifference = (
  startDate: Date,
  endDate: Date,
  unit: "days" | "hours" | "minutes" | "seconds" = "days"
): number => {
  const start = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  )
  const end = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  )

  const msDifference = end.getTime() - start.getTime()

  switch (unit) {
    case "days":
      return msDifference / (1000 * 60 * 60 * 24)
    case "hours":
      return msDifference / (1000 * 60 * 60)
    case "minutes":
      return msDifference / (1000 * 60)
    case "seconds":
      return msDifference / 1000
    default:
      throw new Error(
        "Invalid unit. Choose from days, hours, minutes, or seconds."
      )
  }
}

export const formatDate = (date: Date | string, locale: "th" | "en") => {
  const dateObj = new Date(date)
  return dateObj
    .toLocaleDateString(locale === "th" ? "th-TH" : "en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    })
    .replace(",", "")
}

export const formatTime = (time: string, locale: "th" | "en") => {
  const [hours, minutes] = time.split(":").map(Number)
  const date = new Date()
  date.setHours(hours, minutes)

  return (
    new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "numeric",
      hour12: locale !== "th",
    }).format(date) + (locale === "th" ? " น." : "")
  )
}

export const countLikes = (likes: LikeState | undefined | null): number => {
  if (!likes) {
    return 0
  }
  return Object.values(likes).filter((like) => like).length
}

export const formatCurrency = (
  number: number,
  locale: "th" | "en",
  currency: "THB" | "USD"
) =>
  new Intl.NumberFormat(locale == "th" ? "th-TH" : "en-EN", {
    style: "currency",
    currency,
  }).format(number)

export const getSelectedCompanion = (item: string): Companion => {
  switch (item) {
    case "alone":
      return {
        value: "Alone",
        label: "ไปคนเดียว",
      }
    case "with couple":
      return {
        value: "With couple",
        label: "ไปกับคู่",
      }
    case "with friend":
      return {
        value: "With friend",
        label: "ไปกับเพื่อน",
      }
    case "with family":
      return {
        value: "With family",
        label: "ไปกับครอบครัว",
      }
    default:
      return {
        value: "Alone",
        label: "ไปคนเดียว",
      }
  }
}

export const findNestedErrorMessage = (errorObj: any): string | null => {
  for (const key in errorObj) {
    if (errorObj[key]?.message) return errorObj[key].message
    if (typeof errorObj[key] === "object") {
      const nestedMessage = findNestedErrorMessage(errorObj[key])
      if (nestedMessage) return nestedMessage
    }
  }
  return null
}

export const isProvinceMatch = (
  province: string,
  addressComponents: AddressComponents[]
) => {
  return addressComponents.some(
    (component) =>
      component.longText.includes(province) ||
      component.shortText.includes(province)
  )
}

export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export const calculateRouteDistance = (route: Place[]): number => {
  let totalDistance = 0

  for (let i = 0; i < route.length - 1; i++) {
    totalDistance += calculateDistance(
      route[i].location?.latitude!,
      route[i].location?.longitude!,
      route[i + 1].location?.latitude!,
      route[i + 1].location?.longitude!
    )
  }

  return totalDistance
}

export const findBestRoute = (places: Place[]): Place[] => {
  if (places.length <= 1) return places

  const permute = (arr: Place[]): Place[][] => {
    if (arr.length <= 1) return [arr]
    const result: Place[][] = []
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i]
      const remaining = arr.slice(0, i).concat(arr.slice(i + 1))
      const remainingPermuted = permute(remaining)
      for (const perm of remainingPermuted) {
        result.push([current, ...perm])
      }
    }
    return result
  }

  // Generate all possible permutations of places
  const allPermutations = permute(places)

  // Find the route with the shortest distance
  let bestRoute: Place[] = []
  let shortestDistance = Infinity

  for (const route of allPermutations) {
    const distance = calculateRouteDistance(route)
    if (distance < shortestDistance) {
      shortestDistance = distance
      bestRoute = route
    }
  }

  return bestRoute.map((place, index) => ({
    ...place,
    timeToVisit: places[index].timeToVisit, // Preserve original timeToVisit
  }))
}

export const rearrangeTripPlan = (tripPlan: TripPlan): TripPlan => {
  const updatedData = tripPlan.data.map((dayPlan) => ({
    ...dayPlan,
    places: findBestRoute(dayPlan.places),
  }))

  return {
    ...tripPlan,
    data: updatedData,
  }
}
