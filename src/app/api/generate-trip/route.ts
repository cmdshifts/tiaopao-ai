import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json()

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not defined" },
        { status: 500 }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    })

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    }

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: input,
            },
          ],
        },
      ],
    })

    const result = await chatSession.sendMessage(input)
    return NextResponse.json({ text: result.response.text() })
  } catch (error) {
    console.error("Error in generating itinerary:", error)
    return NextResponse.json(
      { error: "Failed to generate itinerary" },
      { status: 500 }
    )
  }
}
