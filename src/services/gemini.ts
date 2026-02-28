import { GoogleGenAI } from "@google/genai";
import { TarotCard } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateTarotInterpretation(question: string, cards: TarotCard[]) {
  const cardNames = cards.map(c => c.name).join(", ");
  const prompt = `User question: "${question}". Selected Tarot cards: ${cardNames}. 
  Please provide a straightforward, direct, and insightful interpretation in Chinese. 
  Combine the meanings of the cards with the user's question. 
  Keep the language "straightforward" (直白) as requested. 
  Structure the response with:
  1. Overview of the situation.
  2. Meaning of each card in this context.
  3. Final advice.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
}

export async function generateCardImage(cardName: string) {
  const prompt = `${cardName} tarot card floating in space, high-tech oracle style, glowing neon symbols, intricate futuristic details, floating cherry blossoms in background, cinematic lighting, 8k`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Error generating image for", cardName, error);
    return `https://picsum.photos/seed/${cardName.replace(/\s/g, '')}/300/400`;
  }
  return `https://picsum.photos/seed/${cardName.replace(/\s/g, '')}/300/400`;
}
