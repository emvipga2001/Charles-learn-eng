"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '../button';
import { SparklesIcon } from '@heroicons/react/20/solid';
import RenderWord from './render-word';
import { FormattedListWord } from '../../lib/definitions';

export default function BodyComponent({ listWord }: {
  listWord: FormattedListWord[]
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown == 0) {
      setIsActive(false);
      setIsStart(true);
    }
    return () => clearTimeout(timer);
  }, [isActive, countdown]);

  function startQuizz() {
    setIsActive(true);
    setCountdown(5);
  }
  return (
    <>
      <Button onClick={startQuizz}>
        Start quizz test word <SparklesIcon className="ml-1 h-5 w-5 text-gray-50" />
      </Button>
      {countdown > 0 && (
        <div className="text-center mt-10 text-9xl">
          {countdown == 1 ? "Good Luck" : countdown}
        </div>
      )}
      {isStart && (
        <RenderWord params={listWord}/>
      )}
    </>
  )
}
