"use server"
import { auth } from "@/services/auth"
import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { AgentEvent } from "@/lib/types"
import { format } from "date-fns"
import { db } from "@/services/firebaseAdmin"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    const body = await req.json()
    const AI_AGENT_TOKEN = process.env.NEXT_PUBLIC_AI_AGENT_TOKEN

    if (!AI_AGENT_TOKEN) {
      throw new Error("Agent token key is not defined")
    }

    console.log(body)

    const response = await axios.post(
      "https://api.dify.ai/v1/chat-messages",
      {
        inputs: {
          province: body.province.provinceNameEn,
          start_date: body.end_date,
          end_date: body.start_date,
          num_days: body.num_days,
          budget: body.budget,
          companion: body.companion.value,
          lifestyle: body.lifestyle.value,
        },
        query: "Plan a trip",
        response_mode: "streaming",
        user: session?.user.id,
      },
      {
        headers: {
          Authorization: `Bearer ${AI_AGENT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.data) {
      return NextResponse.json({ message: "Error response" }, { status: 500 })
    }

    const processedData = response.data
      .split("\n")
      .filter((line: string) => line.trim() !== "")
      .map((line: string) => line.replace(/^data:\s*/, ""))
      .map((line: string) => JSON.parse(line))

    const agentMessage = processedData.find(
      (item: AgentEvent) =>
        item.event === "agent_message" &&
        item.answer &&
        item.answer.trim() !== ""
    )

    if (!agentMessage || !agentMessage.answer) {
      throw new Error("Agent message with answer not found")
    }

    const answer = JSON.parse(
      agentMessage.answer.replace(/^```json\n/, "").replace(/\n```$/, "")
    )

    console.log("fetch by filter province", body.province)

    const tripDetails = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate/fetchFromResult`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer: answer, province: body.province }),
      }
    )

    const tripData = await tripDetails.json()

    const planId =
      Date.now().toString(36) + Math.random().toString(36).slice(2, 11)

    const tripResult = {
      planId: planId,
      planOwner: session?.user.id,
      province: body.province.provinceNameTh,
      totalBudget: body.budget,
      totalDays: body.num_days,
      companion: body.companion.label,
      lifestyle: body.lifestyle.label,
      data: tripData,
      createdDate: format(new Date(), "yyyy-MM-dd"),
      createdTime: format(new Date(), "HH:mm:ss"),
      likes: {},
    }

    if (session && tripDetails.status === 200) {
      const tripRef = db.collection("trips").doc(planId)

      await tripRef
        .create(tripResult)
        .then(() => {
          console.log("Trip created successfully")
        })
        .catch((error) => {
          console.error("Error creating trip:", error)
          return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
          )
        })
    }

    return NextResponse.json(tripResult, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
