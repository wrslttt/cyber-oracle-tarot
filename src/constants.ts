export interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  keywords: string[];
}

export const MAJOR_ARCANA: TarotCard[] = [
  { id: 0, name: "The Fool", meaning: "New beginnings, innocence, spontaneity, a free spirit.", keywords: ["Beginnings", "Innocence", "Leap of Faith"] },
  { id: 1, name: "The Magician", meaning: "Manifestation, resourcefulness, power, inspired action.", keywords: ["Willpower", "Creation", "Mastery"] },
  { id: 2, name: "The High Priestess", meaning: "Intuition, sacred knowledge, divine feminine, the subconscious mind.", keywords: ["Intuition", "Mystery", "Inner Voice"] },
  { id: 3, name: "The Empress", meaning: "Femininity, beauty, nature, nurturing, abundance.", keywords: ["Fertility", "Abundance", "Nature"] },
  { id: 4, name: "The Emperor", meaning: "Authority, establishment, structure, a father figure.", keywords: ["Structure", "Authority", "Control"] },
  { id: 5, name: "The Hierophant", meaning: "Spiritual wisdom, religious beliefs, conformity, tradition, institutions.", keywords: ["Tradition", "Wisdom", "Beliefs"] },
  { id: 6, name: "The Lovers", meaning: "Love, harmony, relationships, values alignment, choices.", keywords: ["Love", "Harmony", "Choices"] },
  { id: 7, name: "The Chariot", meaning: "Control, willpower, success, action, determination.", keywords: ["Victory", "Determination", "Focus"] },
  { id: 8, name: "Strength", meaning: "Strength, courage, persuasion, influence, compassion.", keywords: ["Courage", "Patience", "Inner Strength"] },
  { id: 9, name: "The Hermit", meaning: "Soul-searching, introspection, being alone, inner guidance.", keywords: ["Solitude", "Introspection", "Guidance"] },
  { id: 10, name: "Wheel of Fortune", meaning: "Good luck, karma, life cycles, destiny, a turning point.", keywords: ["Luck", "Cycles", "Destiny"] },
  { id: 11, name: "Justice", meaning: "Justice, fairness, truth, cause and effect, law.", keywords: ["Fairness", "Truth", "Law"] },
  { id: 12, name: "The Hanged Man", meaning: "Pause, surrender, letting go, new perspectives.", keywords: ["Sacrifice", "Release", "Perspective"] },
  { id: 13, name: "Death", meaning: "Endings, change, transformation, transition.", keywords: ["Endings", "Transition", "Rebirth"] },
  { id: 14, name: "Temperance", meaning: "Balance, moderation, patience, purpose.", keywords: ["Balance", "Moderation", "Patience"] },
  { id: 15, name: "The Devil", meaning: "Shadow self, attachment, addiction, restriction, sexuality.", keywords: ["Bondage", "Materialism", "Shadow"] },
  { id: 16, name: "The Tower", meaning: "Sudden change, upheaval, chaos, revelation, awakening.", keywords: ["Upheaval", "Chaos", "Awakening"] },
  { id: 17, name: "The Star", meaning: "Hope, faith, purpose, renewal, spirituality.", keywords: ["Hope", "Inspiration", "Serenity"] },
  { id: 18, name: "The Moon", meaning: "Illusion, fear, anxiety, subconscious, intuition.", keywords: ["Illusion", "Fear", "Subconscious"] },
  { id: 19, name: "The Sun", meaning: "Positivity, fun, warmth, success, vitality.", keywords: ["Joy", "Success", "Vitality"] },
  { id: 20, name: "Judgement", meaning: "Judgement, rebirth, inner calling, absolution.", keywords: ["Reflection", "Reckoning", "Awakening"] },
  { id: 21, name: "The World", meaning: "Completion, integration, accomplishment, travel.", keywords: ["Completion", "Harmony", "Fulfillment"] }
];
