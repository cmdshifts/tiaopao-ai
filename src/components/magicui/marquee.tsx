import { cn } from "@/lib/utils"
import React from "react"

interface MarqueeProps {
  className?: string
  reverse?: boolean
  children?: React.ReactNode
  vertical?: boolean
  repeat?: number
  [key: string]: any
}

// ฟังก์ชัน Marquee ที่มีอยู่
export default function Marquee({
  className,
  reverse = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "relative overflow-hidden p-2",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
        className
      )}>
      <div
        className={cn("flex", {
          "flex-row": !vertical,
          "flex-col": vertical,
        })}>
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="flex">
              {children}
            </div>
          ))}
      </div>
    </div>
  )
}

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "Amazing! I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
]

interface ReviewCardProps {
  img: string
  name: string
  username: string
  body: string
}

const ReviewCard = ({ img, name, username, body }: ReviewCardProps) => (
  <figure className="w-64 p-2 bg-white border shadow-lg rounded-lg mr-3">
    <div className="flex items-center gap-3">
      <img
        className="rounded-full"
        width="32"
        height="32"
        alt=""
        src={img}
      />
      <div>
        <figcaption>{name}</figcaption>
        <p>{username}</p>
      </div>
    </div>
    <blockquote>{body}</blockquote>
  </figure>
)

export function MarqueeDemo({ reverse = false }: { reverse?: boolean }) {
  return (
    <Marquee
      reverse={reverse}
      pauseOnHover>
      {reviews.map((review) => (
        <ReviewCard
          key={review.username}
          {...review}
        />
      ))}
    </Marquee>
  )
}
