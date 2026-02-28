import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { question, cards } = req.body;
  try {
    const cardNames = cards.map((c: any) => c.name).join(", ");
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

    res.status(200).json({ text: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interpretation failed" });
  }
}
