"use client"
import React, { useCallback, useEffect, useRef } from "react"
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons"
import { DotButton, useDotButton } from "./EmblaCarouselDotButton"
import Image from "next/image"
import { cn, getLocation, getOpenStatus } from "@/lib/utils"
import Link from "next/link"
import { Button } from "../ui/button"
import { HiStar } from "react-icons/hi2"

const TWEEN_FACTOR_BASE = 0.2

type PropType = {
  slides: any[]
  options?: EmblaOptionsType
  alignText?: "left" | "right"
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, alignText } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__parallax__layer") as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenParallax = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine()
      const scrollProgress = emblaApi.scrollProgress()
      const slidesInView = emblaApi.slidesInView()
      const isScrollEvent = eventName === "scroll"

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress)
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress)
                }
              }
            })
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100
          const tweenNode = tweenNodes.current[slideIndex]
          tweenNode.style.transform = `translateX(${translate}%)`
        })
      })
    },
    []
  )

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenParallax(emblaApi)

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax)
  }, [emblaApi, tweenParallax])

  return (
    <div
      className={cn(
        "flex flex-col px-4 gap-8 w-full",
        `${alignText == "left" ? "lg:flex-row-reverse" : "lg:flex-row"}`
      )}>
      <div className="embla m-auto lg:m-0">
        <div
          className="embla__viewport h-full"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
          }}
          ref={emblaRef}>
          <div className="embla__container">
            {slides?.map((item, index) => (
              <div
                className="embla__slide"
                key={index}>
                <div className="embla__parallax">
                  <div className="embla__parallax__layer">
                    <Image
                      src={`https://places.googleapis.com/v1/${
                        item.photos && item.photos[0]
                          ? item.photos[0].name
                          : undefined
                      }/media?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&maxWidthPx=1200`}
                      alt={item.displayName.text}
                      width={400}
                      height={304}
                      loading="lazy"
                      data-loaded="false"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      onLoad={(event) => {
                        event.currentTarget.setAttribute("data-loaded", "true")
                      }}
                      className="h-full max-h-[304px] embla__slide__img embla__parallax__img data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-900/10"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="embla__controls px-8 items-center justify-center sm:justify-between">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>

          <div className="embla__dots !hidden sm:!flex">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "p-4 flex flex-col justify-between max-h-[304px] flex-1 items-center gap-4"
        )}>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 bg-[#DEB64B]/10 px-3 py-1 rounded-md w-max">
            <HiStar className="fill-[#DEB64B]" />
            <p className="text-subtitle-sm">{slides[selectedIndex]?.rating}</p>
          </div>
          <h3 className="text-heading-sm mt-2 text-center">
            {slides[selectedIndex]?.displayName.text}
          </h3>
          <p className="text-center">
            {getLocation(slides[selectedIndex]?.addressComponents)}
          </p>
          <div className="mt-4">
            {slides[selectedIndex]?.currentOpeningHours === undefined ? (
              <>
                <div className="rounded-md w-max bg-gray-300 dark:bg-gray-300/5 text-foreground py-1 px-3">
                  ไม่ระบุเวลาทำการ
                </div>
              </>
            ) : slides[selectedIndex]?.currentOpeningHours.openNow === false ? (
              <>
                <div className="rounded-md w-max bg-destructive/10 text-destructive py-1 px-3">
                  ปิด
                </div>
              </>
            ) : (
              <>
                <div className="rounded-md w-max bg-[#109E90]/10 text-[#109E90] py-1 px-3">
                  เปิด
                </div>
              </>
            )}
          </div>
        </div>
        <Link
          href={slides[selectedIndex]?.googleMapsUri || "#"}
          target="_blank">
          <Button>ดูแผนที่</Button>
        </Link>
      </div>
    </div>
  )
}

export default EmblaCarousel
