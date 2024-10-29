/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// @ts-nocheck
import { ImageResponse } from "next/og"

export const runtime = "edge"

const logoImage = fetch(
  new URL("../../../assets/images/logo-large-underline.png", import.meta.url)
).then((res) => res.arrayBuffer())

const backgroundImage = fetch(
  new URL("../../../assets/images/background.png", import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET() {
  try {
    const logo = await logoImage
    const background = await backgroundImage

    return new ImageResponse(
      (
        <>
          <div tw="flex flex-col w-full h-full min-h-full bg-white">
            <img
              src={background}
              tw="absolute w-full h-full"
            />
            <div tw="mt-[55px] w-full h-full flex flex-col flex-1 p-24 items-center justify-center">
              <img
                src={logo}
                tw="h-[185px]"
              />
            </div>
          </div>
        </>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    return new Response("Failed to generate OG Image", { status: 500 })
  }
}
