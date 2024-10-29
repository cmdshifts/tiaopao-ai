'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image, { type StaticImageData } from 'next/image'
import { type FC, useMemo, useRef } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

import gsapIcon from '@/assets/logos/gsap.svg'
import nextIcon from '@/assets/logos/next.svg'
import tailwindIcon from '@/assets/logos/tailwind.svg'
import threeIcon from '@/assets/logos/three.svg'
import typescriptIcon from '@/assets/logos/typescript.svg'
import utccIcon from '@/assets/logos/utcc.svg'
import vercelIcon from '@/assets/logos/vercel.svg'
import geminiIcon from '@/assets/logos/gemini.svg'
import googleMapsIcon from '@/assets/logos/googleMaps.svg'

type Props = {
  isReversed?: boolean
  className?: string
}

const ICONS: StaticImageData[] = [gsapIcon, nextIcon, tailwindIcon, threeIcon, typescriptIcon, utccIcon, vercelIcon, geminiIcon, googleMapsIcon]

const ELEMENTS = [...ICONS, ...ICONS]

const TestimonialsMarquee: FC<Props> = ({ isReversed = false, className }) => {

  const movingContainer = useRef<HTMLDivElement>(null)
  const timeline = useRef<ReturnType<typeof gsap.timeline>>()

  useGSAP(
    () => {
      const setupInfiniteMarqueeTimeline = () => {
        gsap.set(movingContainer.current, {
          xPercent: isReversed ? -50 : 0,
        })
        timeline.current = gsap
          .timeline({
            defaults: { ease: 'none', repeat: -1 },
          })
          .to(movingContainer.current, {
            xPercent: isReversed ? 0 : -50,
            duration: 40,
          })
          .set(movingContainer.current, { xPercent: 0 })
      }

      setupInfiniteMarqueeTimeline()
    },
    { dependencies: [isReversed] },
  )

  let timelineTimeScaleTween = useRef<ReturnType<typeof gsap.to>>()

  const onPointerEnter = () => {
    if (!timeline.current) return
    timelineTimeScaleTween.current?.kill()
    timelineTimeScaleTween.current = gsap.to(timeline.current, { timeScale: 0.25, duration: 0.4 })
  }

  const onPointerLeave = () => {
    if (!timeline.current) return
    timelineTimeScaleTween.current?.kill()
    timelineTimeScaleTween.current = gsap.to(timeline.current, { timeScale: 1, duration: 0.2 })
  }

  const list = useMemo(
    () => (
      <div className="flex w-fit items-center gap-10 p-4">
        {ELEMENTS.map((src, index) => {
          const isLast = index === ELEMENTS.length - 1
          return (
            <div
              key={index}
              className={twJoin('relative flex shrink-0 items-center justify-center', isLast && 'mr-10')}
              style={{ height: src.height, width: src.width }}>
              <Image src={src} alt="Technology icon" height={56} className="object-contain invert dark:invert-0 select-none pointer-events-none" />
            </div>
          )
        })}
      </div>
    ),
    [],
  )

  return (
    <div
      className={twMerge('max-w-[1200px] select-none overflow-hidden', className)}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
      }}>
      <div ref={movingContainer} className="flex w-fit">
        {list}
        {list}
      </div>
    </div>
  )
}

export default TestimonialsMarquee