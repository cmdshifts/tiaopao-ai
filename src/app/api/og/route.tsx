/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// @ts-nocheck
import { ImageResponse } from "next/og"
import { promises as fs } from "fs"
import path from "path"

export async function GET() {
  try {
    const logoImagePath = path.resolve(
      process.cwd(),
      "public/images/png/logo-large-underline.png"
    )
    const backgroundImagePath = path.resolve(
      process.cwd(),
      "public/images/png/background.png"
    )
    const fontPath = path.resolve(
      process.cwd(),
      "public/fonts/LINESeedSansTH_W_XBd.woff"
    )

    const logoImage = await fs.readFile(logoImagePath)
    const backgroundImage = await fs.readFile(backgroundImagePath)
    const fontData = await fs.readFile(fontPath)

    const logoBase64 = `data:image/png;base64,${logoImage.toString("base64")}`
    const backgroundBase64 = `data:image/png;base64,${backgroundImage.toString(
      "base64"
    )}`

    return new ImageResponse(
      (
        <>
          <div tw="flex flex-col w-full h-full min-h-full bg-white">
            <img
              src={backgroundBase64}
              tw="absolute w-full h-full"
            />
            <div tw="mt-[55px] w-full h-full flex flex-col flex-1 p-24 items-center justify-center">
              <img
                src={logoBase64}
                tw="h-[185px]"
              />
            </div>
          </div>
        </>
      ),
      {
        width: 1200,
        height: 630,
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
