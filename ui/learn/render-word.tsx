import React, { useEffect, useState } from "react";
import { FormattedListWord } from "../../lib/definitions";
import clsx from "clsx";

export default function RenderWord({
  params,
}: {
  params: FormattedListWord[];
}) {
  const [listWords, setListWords] = useState<FormattedListWord[]>(params);
  const [shuffledWord, setShuffledWord] = useState<FormattedListWord[]>();
  const [isCountChange, setIsCountChange] = useState<number>(0);
  const [isError, setIsError] = useState({ error: false, index: -1, type: 0 });
  const [isDisable, setIsDisable] = useState({ disable: false, indexEng: -1, indexVie: -1 });
  const [isChoice, setIsChoice] = useState({ choice: false, indexEng: -1, indexVie: -1 });

  const Eng = 1;
  const Vie = 2;
  var idEng = 0;
  var idVie = 0;
  var indexEng = 0;
  var indexVie = 0;

  useEffect(() => {
    const finishList = handleShuffledList(duplicateList(listWords));
    setListWords(finishList);
    setShuffledWord(handleShuffledList(finishList.slice(0, 5)));
  }, []);

  useEffect(() => {
    if (isCountChange === 2) {
      setIsCountChange(0);
      setIsChoice({ choice: false, indexEng: -1, indexVie: -1 });
    }
  }, [isCountChange]);

  useEffect(() => {
    if (isChoice.choice) {
      setTimeout(() => {
        setIsChoice({ choice: false, indexEng: -1, indexVie: -1 });
      }, 2500);
    }
  }, [isChoice]);

  useEffect(() => {
    if (isDisable.disable) {
      const timerAsync = async () => {
        await new Promise(resolve => setTimeout(resolve, 4000));
        setIsDisable({ disable: false, indexEng: -1, indexVie: -1 });
      };
      timerAsync();
    }
  }, [isDisable]);

  function compareWord(type: number, id: number, index: number) {
    type === Eng ? (idEng = id) : (idVie = id);
    type === Eng ? (indexEng = index) : (indexVie = index);
    var countChange = isCountChange;
    if (idEng != 0 && idVie != 0) {
      if (idEng === idVie) {
        setIsCountChange(++countChange);
        if (countChange == 1) {
          setIsChoice({ choice: true, indexEng: indexEng, indexVie: indexVie });
        }
        const shuffledList = [...listWords];
        const shuffledWordList = [...shuffledWord!];
        [shuffledList[indexEng], shuffledList[shuffledList.length - 1]] = [shuffledList[shuffledList.length - 1], shuffledList[indexEng]];
        shuffledList.splice(shuffledList.length - 1, 1);
        // if(isChoice.choice){
        //   [shuffledList[isChoice.indexEng], shuffledList[shuffledList.length - 1]] = [shuffledList[shuffledList.length - 1], shuffledList[isChoice.indexEng]];
        //   shuffledList.splice(shuffledList.length - 1, 1);
        // }
        if (isChoice.choice) {
          shuffledWordList[indexVie] = shuffledList[indexEng];

          // shuffledWordList[indexVie] = shuffledList[isChoice.indexEng];
          // shuffledWordList[isChoice.indexVie] = shuffledList[indexEng];
          // if ((Math.floor(Math.random() * 2) + 1) > 1) {
          //   shuffledWordList[indexVie] = shuffledList[isChoice.indexEng];
          //   shuffledWordList[isChoice.indexVie] = shuffledList[indexEng];
          // } else {
          //   shuffledWordList[indexVie] = shuffledList[indexEng];
          //   shuffledWordList[isChoice.indexVie] = shuffledList[isChoice.indexEng];
          // }
        } else {
          shuffledWordList[indexVie] = shuffledList[indexEng];
        }
        setListWords(shuffledList);
        setShuffledWord(shuffledWordList);
        setIsError({ error: false, index: -1, type: 0 })
        setIsDisable({ disable: true, indexEng: indexEng, indexVie: indexVie });
      } else {
        setIsError({ error: true, index: type === Eng ? indexEng : indexVie, type: type });
      }
      idEng = 0;
      idVie = 0;
      indexEng = 0;
      indexVie = 0;
    }
  }

  function handleShuffledList(listWord: FormattedListWord[]) {
    const shuffledList = [...listWord];
    for (let i = shuffledList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }
    return shuffledList;
  }

  function duplicateList(listWord: FormattedListWord[]) {
    const shuffledList = [...listWord];
    for (let i = 0; i < 0; i++) {
      const j = Math.floor(Math.random() * shuffledList.length);
      shuffledList.push(shuffledList[j]);
    }
    return shuffledList;
  }

  return (
    <div className="mt-5 lg:mt-2 lg:mx-40 grid grid-cols-2 gap-5">
      <div> 
        {listWords?.slice(0, 5).map((word, index) => (
          <div key={index + "ENG"} id={isDisable.disable + "" + isDisable.indexEng}>
            <button
              onClick={() => compareWord(Eng, word.id, index)}
              className={clsx(
                "text-center mt-5 text-7xl transition-all border w-full rounded-2xl p-5 cursor-pointer border-black hover:shadow-lg dark:border-white dark:shadow-gray-400 lg:scale-75 lg:mt-0 lg:text-5xl focus:bg-blue-500 focus:text-white hover:bg-blue-500 hover:text-white",
                {
                  'bg-red-700 focus:bg-red-700 animate-shake': isError.error && isError.index == index && isError.type == Eng,
                  'opacity-[0] animate-disable-word': isDisable.disable && isDisable.indexEng == index
                })}
              disabled={isDisable.disable && isDisable.indexEng == index}
            >
              {word.english_word}
            </button>
          </div>
        ))}
      </div>
      <div>
        {shuffledWord?.map((word, index) => (
          <div key={index + "VIE"}>
            <button
              onClick={() => compareWord(Vie, word.id, index)}
              className={clsx(
                "text-center mt-5 text-7xl transition-all w-full border rounded-2xl p-5 cursor-pointer border-black hover:shadow-lg dark:border-white dark:shadow-gray-400 lg:scale-75 lg:mt-0 lg:text-5xl focus:bg-blue-500 focus:text-white hover:bg-blue-500 hover:text-white",
                {
                  'bg-red-700 focus:bg-red-700 animate-shake': isError.error && isError.index == index && isError.type == Vie,
                  'opacity-[0] animate-disable-word': isDisable.disable && isDisable.indexVie == index
                })}
              disabled={isDisable.disable && isDisable.indexVie == index}
            >
              {word.vietnamese_word}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
