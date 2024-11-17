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
import { cn, formatCurrency } from "@/lib/utils"
import { TripWithOwner } from "@/app/api/trip/getAll/route"
import Link from "next/link"

const TWEEN_FACTOR_BASE = 0.2

type PropType = {
  slides: TripWithOwner[]
  options?: EmblaOptionsType
}

const TicketEmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
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
      className={
        "grid grid-cols-1 lg:grid-cols-2 px-4 gap-8 w-full lg:flex-row"
      }>
      <div className="embla m-auto lg:m-0 grid grid-cols-1">
        <div
          className="embla__viewport h-[304px] m-auto"
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
                        item.data[0].places[0].photos
                          ? item.data[0].places[0].photos.name
                          : undefined
                      }/media?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&maxWidthPx=1200`}
                      alt={item.data[0]?.places[0]?.photos?.name!}
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

        <div className="embla__controls px-8 items-center justify-center sm:justify-between max-w-[600px] m-auto w-full">
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
          "px-4 flex flex-col justify-between max-h-[304px] flex-1 items-center gap-4"
        )}>
        <Link
          href={`/trip/${slides[selectedIndex].planId}`}
          className="w-full">
          <article className="ticket !w-full">
            <header className="ticket__wrapper">
              <div className="ticket__header bg-background !text-foreground !font-semibold !items-center !text-heading-sm !py-2 !px-4">
                <p className="font-semibold">
                  {slides[selectedIndex]?.province}
                </p>
                <p className="font-normal text-subtitle-lg items-center">
                  {slides[selectedIndex]?.lifestyle}
                </p>
              </div>
            </header>
            <div className="ticket__divider bg-background">
              <div className="ticket__notch"></div>
              <div className="ticket__notch ticket__notch--right"></div>
            </div>
            <div className="ticket__body bg-background">
              <section className="ticket__section grid grid-cols-2">
                <span className="font-medium">
                  <h6 className="text-subtitle-md">จำนวนวัน</h6>
                  <p className="text-body-lg">
                    {slides[selectedIndex]?.totalDays} วัน
                  </p>
                </span>
                <span className="font-medium">
                  <h6 className="text-subtitle-md">ผู้ร่วมเดินทาง</h6>
                  <p className="text-body-lg">
                    {slides[selectedIndex]?.companion}
                  </p>
                </span>
                <span className="font-medium">
                  <h6 className="text-subtitle-md">ถูกใจ</h6>
                  <p className="text-body-lg">
                    {slides[selectedIndex]?.likeCount} คน
                  </p>
                </span>
                <span className="font-medium">
                  <h6 className="text-subtitle-md">สร้างโดย</h6>
                  <p className="text-body-lg">
                    {slides[selectedIndex]?.planOwner?.username}
                  </p>
                </span>
              </section>
            </div>
            <footer className="ticket__footer bg-background !font-semibold !text-subtitle-lg">
              <span className="!font-normal">งบประมาณ</span>
              <span className="font-medium">
                {formatCurrency(
                  slides[selectedIndex]?.totalBudget,
                  "th",
                  "THB"
                )}{" "}
                บาท
              </span>
            </footer>
          </article>
        </Link>
      </div>
    </div>
  )
}

export default TicketEmblaCarousel
