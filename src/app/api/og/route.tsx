/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// @ts-nocheck
import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

const seedSansBold = fetch(
  new URL("../../../assets/fonts/LINESeedSansTH_W_XBd.woff", import.meta.url)
).then((res) => res.arrayBuffer())

const image = fetch(
  new URL("../../../assets/images/background.png", import.meta.url)
).then((res) => res.arrayBuffer())

const logo = fetch(
  new URL("../../../assets/images/logo.png", import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(req: NextRequest) {
  try {
    const fontBold = await seedSansBold
    const backgroundImage = await image
    const logoImage = await logo

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
              src={backgroundImage}
              tw="absolute w-full h-full object-contain"
            />
            <div tw="w-full h-full flex flex-col flex-1 p-24 justify-between">
              <img
                src={logoImage}
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
            data: fontBold,
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
