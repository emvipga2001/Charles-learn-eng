"use client"

import React, { useEffect, useState } from 'react'
import { PuzzlePieceIcon, SparklesIcon } from '@heroicons/react/20/solid';
import MatchingGame from './matching-game';
import { FormattedListWord } from '../../lib/definitions';
import { Button } from '@/components/ui/button';
import Hangman from './hangman-game';

enum typeGame {
  None = 0,
  Hangman = 1,
  MatchingGame = 2
}
export default function BodyComponent({ listWord, children }: {
  listWord: FormattedListWord[],
  children: React.ReactNode
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isGame, setIsGame] = useState<typeGame>(typeGame.Hangman);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (isActive && countdown == 0) {
      setIsStart(true);
    }
    return () => clearTimeout(timer);
  }, [isActive, countdown]);

  function startQuizz(typeGame: typeGame) {
    setIsActive(true);
    setCountdown(5);
    setIsGame(typeGame)
  }
  return (
    <>
      {!isStart && (
        <>
          {children}
          <div className='flex gap-4'>
            <Button onClick={() => startQuizz(typeGame.MatchingGame)}>
              Start quizz test <SparklesIcon className="ml-1 h-5 w-5 " />
            </Button>
            <Button onClick={() => startQuizz(typeGame.Hangman)}>
              Hangman <PuzzlePieceIcon className="ml-1 h-5 w-5 " />
            </Button>
          </div>
        </>
      )}
      {countdown > 0 && (
        <div className="text-center mt-10 text-9xl">
          {countdown == 1 ? "Good Luck" : countdown}
        </div>
      )}
      {isStart && (
        isGame === typeGame.MatchingGame ? (
          <div className=''>
            <MatchingGame params={listWord}>
              {children}
            </MatchingGame>
          </div>
        ) : isGame === typeGame.Hangman ? (
          <div className=''>
            <Hangman params={listWord}>
              {children}
            </Hangman>
          </div>
        ) : null
      )}
    </>
  )
}
