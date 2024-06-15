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
  const [isDisable, setIsDisable] = useState({ disable: false, indexEng: -1, indexVie: -1 });
  const [isChoice, setIsChoice] = useState({ choice: false, indexEng: -1, indexVie: -1 });
  const [isHandleChoice,setIsHandleChoice] = useState(0);
  const [indexEng,setIndexEng] = useState(0);
  const [indexVie,setIndexVie] = useState(0);
  const [idCompareEng,setIdCompareEng] = useState(0);
  const [idCompareVie,setIdCompareVie] = useState(0);
  const [cancelPromise, setCancelPromise] = useState(0);
  const [isEndEng, setIsEndEng] = useState([
    { endDisable: false },
    { endDisable: false },
    { endDisable: false },
    { endDisable: false },
    { endDisable: false },
    { endDisable: false }
  ]);
  const [isEndVie, setIsEndVie] = useState([
    { endDisable: false },
    { endDisable: false },
    { endDisable: false },
    { endDisable: false },
    { endDisable: false },
    { endDisable: false }
  ]);

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
    if (isError.error) {
      setTimeout(() => {
        setIsError({ error: false, indexEng: -1, indexVie: -1 })
      }, 1000);
    }
  }, [isError]);

  // useEffect(() => {
  //   console.log(cancelPromise);
  // }, [cancelPromise]);
  
  useEffect(() => {
    if (isHandleChoice == 10 || isHandleChoice == 2 || isHandleChoice == 18) {
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
    var checkIdCompareEng = idCompareEng;
    var checkIdCompareVie = idCompareVie;

    if(type === Eng){
      setIdCompareEng(compare_id);
      setIndexEng(index);
      checkIdCompareEng = compare_id;
      handleChoice = handleChoice + 1;
    }else{
      setIdCompareVie(compare_id);
      setIndexVie(index);
      checkIdCompareVie = compare_id;
      handleChoice = handleChoice + 9;
    }
    setIsHandleChoice(handleChoice);
    const checkIndexEng = type === Eng ? index : indexEng;
    const checkIndexVie = type === Eng ? indexVie : index;
    
    if (handleChoice === 10) {
      setIdCompareEng(0);
      setIdCompareVie(0);
      if (checkIdCompareEng === checkIdCompareVie) {
        setIsCountChange(++countChange);
        setIsError({ error: false, indexEng: -1, indexVie: -1 })
        if(listWords.length <= 6){
          setIsEndEng(preVal => {
            const updateData = preVal;
            updateData[checkIndexEng].endDisable = true;
            return updateData;
          });
          setIsEndVie(preVal => {
            const updateData = preVal;
            updateData[checkIndexVie].endDisable = true;
            return updateData;
          });
          return;
        }
        setIsDisable({ disable: true, indexEng: checkIndexEng, indexVie: checkIndexVie });
        if (countChange == 1) {
          localStorage.setItem("cancelPromise", "false");
          setCancelPromise(1);
          let shuffledList = [...listWords];
          let shuffledWordList = [...shuffledWord!];
          setIsChoice({ choice: true, indexEng: checkIndexEng, indexVie: checkIndexVie });
          [shuffledList[checkIndexEng], shuffledList[shuffledList.length - 1]] = [shuffledList[shuffledList.length - 1], shuffledList[checkIndexEng]];
          shuffledList.splice(shuffledList.length - 1, 1);
          shuffledWordList[checkIndexVie] = shuffledList[checkIndexEng];
          await new Promise(resolve => setTimeout(resolve, 1000));
          const isCountChange = cancelPromise == 1;
          if (isCountChange) {
            setListWords(shuffledList);
            setShuffledWord(shuffledWordList);
            setIsCountChange(0);
            setIsDisable({ disable: false, indexEng: -1, indexVie: -1 })
          }
        } else if (countChange == 2) {
          localStorage.setItem("cancelPromise", "true");
          setCancelPromise(2);
          const shuffledList = [...listWords];
          [shuffledList[isChoice.indexEng], shuffledList[shuffledList.length - 1]] = [shuffledList[shuffledList.length - 1], shuffledList[isChoice.indexEng]];
          shuffledList.splice(shuffledList.length - 1, 1);
          setListWords(shuffledList);
          
          const newShuffledList = [...shuffledList];
          const shuffledWordList = [...shuffledWord!];
          [newShuffledList[checkIndexEng], newShuffledList[newShuffledList.length - 1]] = [newShuffledList[newShuffledList.length - 1], newShuffledList[checkIndexEng]];
          newShuffledList.splice(newShuffledList.length - 1, 1);
          shuffledWordList[isChoice.indexVie] = newShuffledList[checkIndexEng];
          setShuffledWord(shuffledWordList);

          const newShuffledWordList = [...shuffledWordList];
          newShuffledWordList[checkIndexVie] = newShuffledList[isChoice.indexEng];
          setIsChoice({ choice: true, indexEng: checkIndexEng, indexVie: checkIndexVie });

          await new Promise(resolve => setTimeout(resolve, 1000));
          setListWords(newShuffledList);
          setShuffledWord(newShuffledWordList);
          setIsDisable({ disable: false, indexEng: -1, indexVie: -1 })
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
          <div key={index + "ENG"} className={clsx({
            'animate-shake': isError.error && isError.indexEng == index,
          })}>
            <button
              onClick={() => compareWord(Eng, word.compare_id, index, word.id)}
              className={clsx(
                "text-center mt-5 text-7xl transition-all border w-full rounded-2xl p-5 cursor-pointer border-black hover:shadow-lg dark:border-white dark:shadow-gray-400 lg:scale-75 lg:mt-0 lg:text-5xl focus:bg-blue-500 focus:text-white hover:bg-blue-500 hover:text-white",
                {
                  'bg-red-700 focus:bg-red-700': isError.error && isError.indexEng == index,
                  'opacity-[1] animate-disable-word': isDisable.indexEng == index,
                  'opacity-[0] animate-undisable-word': isDisable.indexEng !== index,
                  'bg-transparent': !isError.error && isError.indexEng !== index,
                  '!opacity-50': isEndEng[index].endDisable,
                })}
              disabled={isDisable.indexEng == index || isEndEng[index].endDisable}
            >
              {word.english_word}
            </button>
          </div>
        ))}
      </div>
      <div>
        {shuffledWord?.slice(0, 5).map((word, index) => (
          <div key={index + "VIE"} className={clsx({
            'animate-shake': isError.error && isError.indexVie == index,
          })}>
            <button
              onClick={() => compareWord(Vie, word.compare_id, index, word.id)}
              className={clsx(
                "text-center mt-5 text-7xl transition-all w-full border rounded-2xl p-5 cursor-pointer border-black hover:shadow-lg dark:border-white dark:shadow-gray-400 lg:scale-75 lg:mt-0 lg:text-5xl focus:bg-blue-500 focus:text-white hover:bg-blue-500 hover:text-white",
                {
                  'bg-red-700 focus:bg-red-700': isError.error && isError.indexVie == index,
                  'opacity-[1] animate-disable-word': isDisable.indexVie == index,
                  'opacity-[0] animate-undisable-word': isDisable.indexVie !== index,
                  'bg-transparent': !isError.error && isError.indexVie !== index,
                  '!opacity-50': isEndVie[index].endDisable
                })}
              disabled={isDisable.disable && isDisable.indexVie == index || isEndVie[index].endDisable}
            >
              {word.vietnamese_word}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
