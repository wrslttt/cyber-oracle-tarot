import { TarotCard } from "../constants";

export async function generateTarotInterpretation(question: string, cards: TarotCard[]) {
  const response = await fetch("/api/interpret", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, cards }),
  });
  const data = await response.json();
  return data.text;
}

export async function generateCardImage(cardName: string) {
  const response = await fetch("/api/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardName }),
  });
  const data = await response.json();
  return data.url;
}
