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

  // useEffect(() => {
  //   if (isDisable.disable) {
  //     const timerAsync = async () => {
  //       await new Promise(resolve => setTimeout(resolve, 4000));
  //       setIsDisable({ disable: false, indexEng: -1, indexVie: -1 });
  //     };
  //     timerAsync();
  //   }
  // }, [isDisable]);

  async function compareWord(type: number, id: number, index: number) {
    type === Eng ? (idEng = id) : (idVie = id);
    type === Eng ? (indexEng = index) : (indexVie = index);
    var countChange = isCountChange;
    if (idEng != 0 && idVie != 0) {
      if (idEng === idVie) {
        console.log('click');
        setIsCountChange(++countChange);
        setIsError({ error: false, index: -1, type: 0 })
        setIsDisable({ disable: true, indexEng: idEng, indexVie: idVie });
        if (countChange == 1) {
          localStorage.setItem("cancelPromise","false")
          let shuffledList = [...listWords];
          let shuffledWordList = [...shuffledWord!];
          setIsChoice({ choice: true, indexEng: indexEng, indexVie: indexVie });
          [shuffledList[indexEng], shuffledList[shuffledList.length - 1]] = [shuffledList[shuffledList.length - 1], shuffledList[indexEng]];
          shuffledList.splice(shuffledList.length - 1, 1);
          shuffledWordList[indexVie] = shuffledList[indexEng];
          await new Promise(resolve => setTimeout(resolve, 500));
          if(localStorage.getItem("cancelPromise") == "false"){
            setListWords(shuffledList);
            setShuffledWord(shuffledWordList);
            setIsCountChange(0);
          }
        } else if (countChange == 2){
          localStorage.setItem("cancelPromise","true")
          const shuffledList = [...listWords];
          const shuffledWordList = [...shuffledWord!];
          [shuffledList[isChoice.indexEng], shuffledList[shuffledList.length - 1]] = [shuffledList[shuffledList.length - 1], shuffledList[isChoice.indexEng]];
          shuffledList.splice(shuffledList.length - 1, 1);
          shuffledWordList[isChoice.indexVie] = shuffledList[isChoice.indexEng];
          setListWords(shuffledList);
          setShuffledWord(shuffledWordList);
          const newShuffledList = [...shuffledList];
          const newShuffledWordList = [...shuffledWordList];
          setIsChoice({ choice: true, indexEng: indexEng, indexVie: indexVie });
          [newShuffledList[indexEng], newShuffledList[newShuffledList.length - 1]] = [newShuffledList[newShuffledList.length - 1], newShuffledList[indexEng]];
          newShuffledList.splice(newShuffledList.length - 1, 1);
          newShuffledWordList[indexVie] = newShuffledList[indexEng];
          await new Promise(resolve => setTimeout(resolve, 500));
          setListWords(newShuffledList);
          setShuffledWord(newShuffledWordList);
        }
      } else {
        setIsError({ error: true, index: type === Eng ? indexEng : indexVie, type: type });
      }
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
                  'opacity-[1] animate-disable-word': isDisable.indexEng == word.id,
                  'opacity-[0] animate-undisable-word': isDisable.indexEng !== word.id,
                })}
              disabled={isDisable.indexEng == word.id}
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
                  'opacity-[1] animate-disable-word': isDisable.disable && isDisable.indexVie == word.id,
                  'opacity-[0] animate-undisable-word': isDisable.indexVie !== word.id,
                })}
              disabled={isDisable.disable && isDisable.indexVie == word.id}
            >
              {word.vietnamese_word}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
