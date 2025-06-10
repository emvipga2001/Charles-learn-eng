"use client";

import React, { useEffect, useState } from "react";
import MatchingGame from "./games/matching-game";
import Hangman from "./games/hangman-game";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigRightIcon } from "lucide-react";
import { FormattedListWord } from "$root/lib/entities/definitions";

enum typeGame {
  None = 0,
  Hangman = 1,
  MatchingGame = 2,
}

export default function BodyComponent({
  listWord,
  children,
}: {
  listWord: FormattedListWord[];
  children: React.ReactNode;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isGame, setIsGame] = useState<typeGame>(typeGame.None);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (isActive && countdown === 0) {
      setIsStart(true);
    }
    return () => clearTimeout(timer);
  }, [isActive, countdown]);

  function startQuizz(typeGame: typeGame) {
    setIsActive(true);
    setCountdown(5);
    setIsGame(typeGame);
  }

  // Mảng chứa thông tin các game
  const games = [
    {
      id: typeGame.MatchingGame,
      label: "Matching Game",
      component: <MatchingGame params={listWord}>{children}</MatchingGame>,
    },
    {
      id: typeGame.Hangman,
      label: "Hangman",
      component: <Hangman params={listWord}>{children}</Hangman>,
    },
  ];

  return (
    <>
      {countdown === 0 && !isStart && (
        <>
          {children}
          <div className="flex gap-4">
            { games.map((game) => (
              <Card key={game.id}>
                <CardHeader>
                  <CardTitle>{game.label}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button variant={"inCard"} key={game.id} onClick={() => startQuizz(game.id)}>
                      Start <ArrowBigRightIcon className="ml-1 h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
      {countdown > 0 && (
        <div className="text-center mt-10 text-9xl">
          {countdown === 1 ? "Good Luck" : countdown}
        </div>
      )}
      {isStart && <>{games.find((game) => game.id === isGame)?.component}</>}
    </>
  );
}
