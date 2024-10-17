import { Introduction } from "@/components/sections/Introduction"
import { ScrollLayout } from "@/components/customs/ScrollLayout"
import Head from "next/head"

export default function Home() {
  const imageUrl = process.env.NEXT_PUBLIC_BASE_URL + "/api/og"

  return (
    <>
      <Head>
        <meta
          property="og:image"
          content={imageUrl}
        />
        <meta
          property="twitter:image"
          content={imageUrl}
        />
      </Head>
      <ScrollLayout>
        <Introduction />
      </ScrollLayout>
    </>
  )
}
