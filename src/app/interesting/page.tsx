import { Header } from "@/components/customs/Header"
import { Highlight } from "@/components/customs/Highlight"
import { InterestingList } from "@/components/customs/InterestingList"
import { Metadata } from "next/types"

export const metadata: Metadata = {
  title: "แผนการเดินทาง",
}

const getTrips = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/trip/getAll`,
    {
      // Cache the result on the server
      cache: "no-store", // or 'force-cache' if you want to cache
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch trips")
  }

  return res.json()
}

export default async function Interesting() {
  const trips = await getTrips()

  return (
    <>
      <Header
        isNotification={true}
        showMenu={false}
        className="shadow-sm bg-background/65 backdrop-blur-[12px]"
      />
      <section className="pt-[104px] w-full flex flex-col items-center">
        <div className="max-w-[1400px] flex flex-col items-center p-2">
          <p className="relative text-heading-md">
            Interesting
            <Highlight className="fill-foreground/30" />
          </p>
          <p className="text-subtitle-lg text-gray-500">#แผนเที่ยวที่น่าสนใจ</p>
        </div>
        <InterestingList trips={trips.data} />
      </section>
    </>
  )
}
