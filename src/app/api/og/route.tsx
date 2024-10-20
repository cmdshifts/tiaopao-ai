/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// @ts-nocheck
import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"
import { promises as fs } from "fs"
import path from "path"

// const seedSansBold = fetch(
//   new URL("../../../assets/fonts/LINESeedSansTH_W_XBd.woff", import.meta.url)
// ).then((res) => res.arrayBuffer())

// const image = fetch(
//   new URL("../../../assets/images/background.png", import.meta.url)
// ).then((res) => res.arrayBuffer())

// const logo = fetch(
//   new URL("../../../assets/images/logo.png", import.meta.url)
// ).then((res) => res.arrayBuffer())

export async function GET(req: NextRequest) {
  try {
    // Resolve image and font paths
    const logoImagePath = path.resolve(
      process.cwd(),
      "public/images/png/logo-large.png"
    )
    const backgroundImagePath = path.resolve(
      process.cwd(),
      "public/images/png/background.png"
    )
    const fontPath = path.resolve(
      process.cwd(),
      "public/fonts/LINESeedSansTH_W_XBd.woff"
    )

    // Read images and font as base64 strings
    const logoImage = await fs.readFile(logoImagePath)
    const backgroundImage = await fs.readFile(backgroundImagePath)
    const fontData = await fs.readFile(fontPath)

    const logoBase64 = `data:image/png;base64,${logoImage.toString("base64")}`
    const backgroundBase64 = `data:image/png;base64,${backgroundImage.toString(
      "base64"
    )}`

    const { searchParams } = new URL(req.url)
    const hasTitle = searchParams.has("title")
    const hasDescription = searchParams.has("description")
    const title = hasTitle ? searchParams.get("title") : "พร้อมออกเดินทาง?"
    const description = hasDescription
      ? searchParams.get("description")
      : "ผจญภัยไปกับเราได้เลย"

    return new ImageResponse(
      (
        <>
          <div tw="flex flex-col w-full h-full min-h-full bg-white">
            <img
              src={backgroundBase64}
              tw="absolute w-full h-full"
            />
            <div tw="w-full h-full flex flex-col flex-1 p-24 justify-between">
              <img
                src={logoBase64}
                tw="h-[64px]"
              />
              <h2 tw="flex flex-col text-7xl">
                <span tw="text-[#08080B]">{title}</span>
                <span tw="text-[#374151] text-5xl">{description}</span>
              </h2>
            </div>
          </div>
        </>
      ),
      {
        width: 1200,
        height: 600,
        fonts: [
          {
            name: "LINE Seed Sans TH",
            data: fontData,
            weight: 800,
            style: "normal",
          },
        ],
      }
    )
  } catch (error) {
    return new Response("Failed to generate OG Image", { status: 500 })
  }
}
