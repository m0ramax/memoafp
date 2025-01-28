"use client";

import { useEffect, useState } from "react";
import { useGameContext } from "@/app/context";
import Login from "@/app/components/Login";
import Stats from "@/app/components/Stats";
import CardGrid from "@/app/components/CardGrid";
import SuccessModal from "@/app/components/SuccessModal";

const ConcentrationGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // const [username, setUserName] = useState<string | null>(null);

  const {
    flipped,
    solved,
    wrong,
    match,
    cards,
    setFlipped,
    setSolved,
    setMatch,
    setWrong,
    resetGame,
    setUserName
  } = useGameContext();

  useEffect(() => {
    if (solved.length === cards.length) {
      setShowSuccess(true);
    }
  }, [solved, cards]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [setUserName]);

  // const handleUsernameSet = (username: string) => {
  //   setUserName(username);
  // };

  useEffect(() => {
    const [first, second] = flipped;
    const checkForMatch = () => {
      if (cards[first] === cards[second]) {
        setSolved([...solved, ...flipped]);
        setMatch(match + 1);
      } else {
        setWrong(wrong + 1);
      }
      setFlipped([]);
    };
    if (flipped.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 1000);
    }
  }, [
    flipped,
    solved,
    cards,
    setMatch,
    match,
    setWrong,
    wrong,
    setFlipped,
    setSolved,
  ]);

  const handleClick = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };

  const handleRestart = () => {
    resetGame();
    setShowSuccess(false);
  };
  if (isLoading) {
    return null;
  }
  return (
    <>
      {!isAuthenticated ? (
        <Login
          onUserNameSet={(username) => {
            setUserName(username);
            setIsAuthenticated(true);
          }}
        />
      ) : (
        <>
          <Stats />
          <CardGrid cards={cards} handleCardClick={handleClick} />
        </>
      )}
      <SuccessModal isOpen={showSuccess} onClose={handleRestart} />
    </>
  );
};

export default ConcentrationGame;
