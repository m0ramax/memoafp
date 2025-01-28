import { Card } from "@/app/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
    throw new Error('API_URL environment variable is not defined');
  }
export const getDeck = async (): Promise<Card[]> => {
  try {
    const res = await fetch(API_URL, {
      next: {
        revalidate: 3600,
        tags: ["images"],
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch images");
    }
    const images = await res.json();
    return images;
  } catch (error) {
    console.error("Error fetching deck:", error);
    return [];
  }
};

export const shuffleDeck = (deck: Card[]) => {
  return [...deck].sort(() => Math.random() - 0.5);
};

export const generateDeck = (images: Card[], difficulty: number = 10) => {
  const smallerDeck = images.slice(0, difficulty);
  const deck = [...smallerDeck, ...smallerDeck];
  return shuffleDeck(deck);
};
