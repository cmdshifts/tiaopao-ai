import { MagicPlanner } from "@/components/customs/MagicPlanner"
import React from "react"

export default function App() {
  return (
    <>
      <MagicPlanner />
    </>
  )
}

// "use client"
// import { Footer } from "@/components/customs/Footer"
// import { Header } from "@/components/customs/Header"
// import { PromptModal } from "@/components/customs/PromptModal"
// import { TripDetails } from "@/components/customs/TripDetails"
// import { useScroll, useTransform } from "framer-motion"
// import React, { useEffect, useRef, useState } from "react"
// import { RiSparkling2Fill } from "react-icons/ri"

// export default function App() {
//   const [result, setResult] = useState<any>(undefined)
//   const [isGenerating, setIsGenerating] = useState<boolean>(false)
//   const scrollContainerRef = useRef<HTMLDivElement>(null)
//   const [milliseconds, setMilliseconds] = useState<number>(0)

//   const useTimer = (isGenerating: boolean): string => {
//     useEffect(() => {
//       let timer: NodeJS.Timeout | undefined

//       if (isGenerating) {
//         timer = setInterval(() => {
//           setMilliseconds((prevMilliseconds) => prevMilliseconds + 100)
//         }, 100)
//       } else {
//         if (timer) {
//           clearInterval(timer)
//         }
//         setMilliseconds(0)
//       }

//       return () => {
//         if (timer) {
//           clearInterval(timer)
//         }
//       }
//     }, [isGenerating])

//     const seconds = (milliseconds / 1000).toFixed(1)

//     return `${seconds}วิ`
//   }

//   const time = useTimer(isGenerating)

//   const { scrollY } = useScroll({
//     container: scrollContainerRef,
//   })

//   const backgroundColor = useTransform(
//     scrollY,
//     [0, 40],
//     ["hsla(var(--background) / 0)", "hsla(var(--background) / 0.65)"]
//   )

//   const backgroundBlur = useTransform(
//     scrollY,
//     [0, 40],
//     ["blur(0px)", "blur(12px)"]
//   )

//   return (
//     <>
//       <Header
//         isNotification={false}
//         showMenu={false}
//         background={backgroundColor}
//         backdropBlur={backgroundBlur}
//         className="shadow-sm [&>nav]:py-4"
//       />
//       <div
//         ref={scrollContainerRef}
//         className="pt-[64px] w-screen h-screen h-full-svh flex flex-col items-center overflow-x-hidden overflow-y-auto scrollbar-hide scroll-smooth">
//         <div className="w-full h-full p-8">
//           {result ? (
//             <>
//               <div>
//                 <TripDetails tripData={result} />
//                 <Footer />
//               </div>
//             </>
//           ) : isGenerating ? (
//             <>
//               <div className="flex flex-col gap-4 justify-center items-center h-full w-full select-none">
//                 <RiSparkling2Fill className="text-heading-xl animate-pulse" />
//                 <p className="text-subtitle-lg animate-pulse text-center">
//                   กำลังสร้างแผนด้วย Magic Planner
//                 </p>
//                 <p className="text-foreground/60">{time}</p>
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="max-w-[320px] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//                 <PromptModal
//                   onCompleted={(result) => setResult(result)}
//                   onGenerating={(bool) => setIsGenerating(bool)}
//                 />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }
