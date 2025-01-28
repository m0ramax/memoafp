"use client";

import { createContext, useState, ReactNode, useContext } from "react";
import { Card } from "@/app/types";
import { shuffleDeck } from "@/app/utils";

interface GameContextProps {
  cards: Card[];
  flipped: number[];
  solved: number[];
  username: string;
  wrong: number;
  match: number;
  setCards: (cards: Card[]) => void;
  setFlipped: React.Dispatch<React.SetStateAction<number[]>>;
  setSolved: React.Dispatch<React.SetStateAction<number[]>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setWrong: React.Dispatch<React.SetStateAction<number>>;
  setMatch: React.Dispatch<React.SetStateAction<number>>;
  resetGame: () => void;
  regenerateDeck: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({
  children,
  initialCards,
}: {
  children: ReactNode;
  initialCards: Card[];
}) => {
  const [cards, setCards] = useState(initialCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [username, setUserName] = useState("");
  const [wrong, setWrong] = useState(0);
  const [match, setMatch] = useState(0);

  const regenerateDeck = () => {
    const shuffled = shuffleDeck(initialCards);
    setCards(shuffled);
  };
  const resetGame = () => {
    setFlipped([]);
    setSolved([]);
    setWrong(0);
    setMatch(0);
    regenerateDeck();
  };
  return (
    <GameContext.Provider
      value={{
        flipped,
        solved,
        username,
        wrong,
        match,
        cards,
        setCards,
        setFlipped,
        setSolved,
        setUserName,
        setWrong,
        setMatch,
        resetGame,
        regenerateDeck,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("Context Error");
  }
  return context;
};
