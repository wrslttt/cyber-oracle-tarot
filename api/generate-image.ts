import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { cardName } = req.body;
  try {
    const prompt = `${cardName} tarot card floating in space, high-tech oracle style, glowing neon symbols, intricate futuristic details, floating cherry blossoms in background, cinematic lighting, 8k`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "3:4" } },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return res.status(200).json({ url: `data:image/png;base64,${part.inlineData.data}` });
      }
    }
    res.status(200).json({ url: `https://picsum.photos/seed/${cardName.replace(/\s/g, '')}/300/400` });
  } catch (error) {
    console.error(error);
    res.status(200).json({ url: `https://picsum.photos/seed/${cardName.replace(/\s/g, '')}/300/400` });
  }
}
