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
  const [isError, setIsError] = useState({ error: false, indexEng: -1, indexVie: -1 });
  const [isDisable, setIsDisable] = useState({ disable: false, idEng: -1, idVie: -1 });
  const [isChoice, setIsChoice] = useState({ choice: false, indexEng: -1, indexVie: -1 });
  const [isHandleChoice,setIsHandleChoice] = useState(0);
  const [idEng,setIdEng] = useState(0);
  const [idVie,setIdVie] = useState(0);
  const [indexEng,setIndexEng] = useState(0);
  const [indexVie,setIndexVie] = useState(0);
  const [idCompareEng,setIdCompareEng] = useState(0);
  const [idCompareVie,setIdCompareVie] = useState(0);

  const Eng = 1;
  const Vie = 2;

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
    if (isError.error) {
      setTimeout(() => {
        setIsError({ error: false, indexEng: -1, indexVie: -1 })
      }, 1000);
    }
  }, [isError]);

  useEffect(() => {
    if (isHandleChoice == 2 || isHandleChoice == 4) {
      setIsHandleChoice(0);
    }
  }, [isHandleChoice]);

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
    for (let i = 0; i < 10; i++) {
      const j = Math.floor(Math.random() * shuffledList.length);
      const newElement: FormattedListWord ={
        ...shuffledList[j],
        id: shuffledList[shuffledList.length - 1].id + 1,
      }
      shuffledList.push(newElement);
    }
    return shuffledList;
  }

  async function compareWord(type: number, compare_id: number, index: number, id: number) {
    var countChange = isCountChange;
    var handleChoice = isHandleChoice;
    if(type === Eng){
      handleChoice = handleChoice + 1;
      setIdCompareEng(compare_id);
      setIndexEng(index);
      setIdEng(id);
    }else{
      handleChoice = handleChoice + 2;
      setIdCompareVie(compare_id);
      setIndexVie(index);
      setIdVie(id);
    }
    setIsHandleChoice(handleChoice);
    
    const checkIdCompareEng = type === Eng ? compare_id : idCompareEng;
    const checkIdCompareVie = type === Eng ? idCompareVie : compare_id;
    const checkIndexEng = type === Eng ? index : indexEng;
    const checkIndexVie = type === Eng ? indexVie : index;
    const checkIdEng = type === Eng ? id : idEng;
    const checkIdVie = type === Eng ? idVie : id;
    
    if (handleChoice == 3) {
      setIsHandleChoice(0);
      if (checkIdCompareEng === checkIdCompareVie) {
        setIsCountChange(++countChange);
        setIsError({ error: false, indexEng: -1, indexVie: -1 })
        setIsDisable({ disable: true, idEng: checkIdEng, idVie: checkIdVie });
        if (countChange == 1) {
          localStorage.setItem("cancelPromise", "false")
          let shuffledList = [...listWords];
          let shuffledWordList = [...shuffledWord!];
          setIsChoice({ choice: true, indexEng: checkIndexEng, indexVie: checkIndexVie });
          [shuffledList[checkIndexEng], shuffledList[shuffledList.length - 1]] = [shuffledList[shuffledList.length - 1], shuffledList[checkIndexEng]];
          shuffledList.splice(shuffledList.length - 1, 1);
          shuffledWordList[checkIndexVie] = shuffledList[checkIndexEng];
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (localStorage.getItem("cancelPromise") == "false") {
            setListWords(shuffledList);
            setShuffledWord(shuffledWordList);
            setIsCountChange(0);
          }
        } else if (countChange == 2) {
          localStorage.setItem("cancelPromise", "true")
          const shuffledList = [...listWords];
          const shuffledWordList = [...shuffledWord!];
          [shuffledList[isChoice.indexEng], shuffledList[shuffledList.length - 1]] = [shuffledList[shuffledList.length - 1], shuffledList[isChoice.indexEng]];
          shuffledList.splice(shuffledList.length - 1, 1);
          shuffledWordList[isChoice.indexVie] = shuffledList[isChoice.indexEng];
          setListWords(shuffledList);
          setShuffledWord(shuffledWordList);

          const newShuffledList = [...shuffledList];
          const newShuffledWordList = [...shuffledWordList];
          setIsChoice({ choice: true, indexEng: checkIndexEng, indexVie: checkIndexVie });
          [newShuffledList[checkIndexEng], newShuffledList[newShuffledList.length - 1]] = [newShuffledList[newShuffledList.length - 1], newShuffledList[checkIndexEng]];
          newShuffledList.splice(newShuffledList.length - 1, 1);
          newShuffledWordList[checkIndexVie] = newShuffledList[checkIndexEng];
          await new Promise(resolve => setTimeout(resolve, 700));
          setListWords(newShuffledList);
          setShuffledWord(newShuffledWordList);
        }
      } else {
        setIsError({ error: true, indexEng: checkIndexEng, indexVie: checkIndexVie });
      }
    }
  }

  return (
    <div className="mt-5 lg:mt-2 lg:mx-40 grid grid-cols-2 gap-5">
      <div>
        {listWords?.slice(0, 5).map((word, index) => (
          <div key={word.id + "ENG"} className={clsx({
            'animate-shake': isError.error && isError.indexEng == index,
          })} id={word.compare_id + ""}>
            <button
              onClick={() => compareWord(Eng, word.compare_id, index, word.id)}
              className={clsx(
                "text-center mt-5 text-7xl transition-all border w-full rounded-2xl p-5 cursor-pointer border-black hover:shadow-lg dark:border-white dark:shadow-gray-400 lg:scale-75 lg:mt-0 lg:text-5xl focus:bg-blue-500 focus:text-white hover:bg-blue-500 hover:text-white",
                {
                  'bg-red-700 focus:bg-red-700': isError.error && isError.indexEng == index,
                  'opacity-[1] animate-disable-word': isDisable.idEng == word.id,
                  'opacity-[0] animate-undisable-word': isDisable.idEng !== word.id,
                  'bg-transparent': !isError.error && isError.indexEng !== index,
                })}
              disabled={isDisable.idEng == word.id}
            >
              {word.english_word}
            </button>
          </div>
        ))}
      </div>
      <div>
        {shuffledWord?.map((word, index) => (
          <div key={word.id + "VIE"} className={clsx({
            'animate-shake': isError.error && isError.indexVie == index,
          })} id={word.compare_id + ""}>
            <button
              onClick={() => compareWord(Vie, word.compare_id, index, word.id)}
              className={clsx(
                "text-center mt-5 text-7xl transition-all w-full border rounded-2xl p-5 cursor-pointer border-black hover:shadow-lg dark:border-white dark:shadow-gray-400 lg:scale-75 lg:mt-0 lg:text-5xl focus:bg-blue-500 focus:text-white hover:bg-blue-500 hover:text-white",
                {
                  'bg-red-700 focus:bg-red-700': isError.error && isError.indexVie == index,
                  'opacity-[1] animate-disable-word': isDisable.disable && isDisable.idVie == word.id,
                  'opacity-[0] animate-undisable-word': isDisable.idVie !== word.id,
                  'bg-transparent': !isError.error && isError.indexVie !== index,
                })}
              disabled={isDisable.disable && isDisable.idVie == word.id}
            >
              {word.vietnamese_word}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
