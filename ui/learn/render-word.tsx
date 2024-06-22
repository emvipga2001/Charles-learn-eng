import React, { useEffect, useState } from "react";
import { FormattedListWord } from "../../lib/definitions";
import clsx from "clsx";
import { count } from "console";

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
  const [isHandleChoice, setIsHandleChoice] = useState(0);
  const [indexEng, setIndexEng] = useState(0);
  const [indexVie, setIndexVie] = useState(0);
  const [idCompareEng, setIdCompareEng] = useState(0);
  const [idCompareVie, setIdCompareVie] = useState(0);
  const [countCorrect, setCountCorrect] = useState(0);
  const [isShuffled, setIsShuffled] = useState(true);
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
  const [isDisEng, setIsDisEng] = useState([
    { isDisable: false },
    { isDisable: false },
    { isDisable: false },
    { isDisable: false },
    { isDisable: false }
  ]);
  const [isDisVie, setIsDisVie] = useState([
    { isDisable: false },
    { isDisable: false },
    { isDisable: false },
    { isDisable: false },
    { isDisable: false }
  ]);

  const Eng = 1;
  const Vie = 2;

  useEffect(() => {
    const finishList = handleShuffledList(duplicateList(listWords));
    setListWords(finishList);
    setShuffledWord(handleShuffledList(finishList.slice(0, 5)));
  }, []);

  useEffect(() => {
    if (isError.error) {
      setTimeout(() => {
        setIsError({ error: false, indexEng: -1, indexVie: -1 })
      }, 1000);
    }
  }, [isError]);

  useEffect(() => {
    if (countCorrect == 2) {
      setCountCorrect(0);
    }else if(countCorrect == 1){
      setTimeout(()=>{
        setCountCorrect(0);
        if(!isShuffled){
          setIsChoice({ choice: false, indexEng: -1, indexVie: -1 });
          console.log("--------------------2-------------------");
        }
      },4000)
    }
  }, [countCorrect]);

  useEffect(() => {
    if (isHandleChoice == 10) {
      setIsHandleChoice(0);
    } else if (isHandleChoice == 18) {
      setIsHandleChoice(9);
    } else if (isHandleChoice == 2) {
      setIsHandleChoice(1);
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

  function hanldeDisable(indexEng:number, indexVie:number, isDisable:boolean){
    setIsDisEng(preVal => {
      const updateData = [...preVal];
      updateData[indexEng] = { isDisable: isDisable }
      return updateData;
    });
    setIsDisVie(preVal => {
      const updateData = [...preVal];
      updateData[indexVie] = { isDisable: isDisable }
      return updateData;
    });
  }

  /**
   * 2 TH:
   * 1. Đảo nghĩa của lần chọn thứ 1 và 2
   * 2. Không đảo lần thứ 1 chỉ đảo lần 2 và 3
   * 
   * 2 CSS:
   * 1. Khi chọn đúng ẩn dần từ và nghĩa từ chọn đúng
   * 2. Khi hiển thị từ mới hiện dần từ và nghĩa của từ tiếp theo
   *  
   * Flow
   * - Khi chọn lần thứ nhất đúng trong khoảng thời gian 4s nếu họ không chọn từ 
   *   tiếp theo thì sẽ không đảo vị trí
   * - Khi chọn lần thứ nhất và lần thứ hai đúng thì xảy ra 2 trường hợp ngẫu nhiên:
   * + Đảo vị trí của lần 1 và 2
   * + Không đảo vị trí của lần 1 sẽ tiến hành đảo vị trí của lần 2 và 3
   * 
   */
  async function compareWord(type: number, compare_id: number, index: number, id: number) {
    var handleChoice = isHandleChoice;
    var checkIdCompareEng = idCompareEng;
    var checkIdCompareVie = idCompareVie;
    var checkIndexEng = indexEng;
    var checkIndexVie = indexVie;
    var countChoice = countCorrect;

    if (type === Eng) {
      setIdCompareEng(compare_id);
      setIndexEng(index);
      checkIdCompareEng = compare_id;
      handleChoice = handleChoice + 1;
      checkIndexEng = index;
    } else {
      setIdCompareVie(compare_id);
      setIndexVie(index);
      checkIdCompareVie = compare_id;
      handleChoice = handleChoice + 9;
      checkIndexVie = index;
    }
    setIsHandleChoice(handleChoice);

    if (handleChoice === 10) {
      if (checkIdCompareEng === checkIdCompareVie) {
        const shuffledList = [...listWords];
        const shuffledWordList = [...shuffledWord!];
        setIsChoice({ choice: true, indexEng: checkIndexEng, indexVie: checkIndexVie });
        setCountCorrect(++countChoice);
        hanldeDisable(isChoice.indexEng, isChoice.indexVie, false);
        [shuffledList[checkIndexEng], shuffledList[shuffledList.length - 1]] = [shuffledList[shuffledList.length - 1], shuffledList[checkIndexEng]];
        shuffledList.pop();
        if(countChoice == 1){
          if(isShuffled){
            shuffledWordList[checkIndexVie] = shuffledList[checkIndexEng];
          }else{
            shuffledWordList[checkIndexVie] = shuffledList[isChoice.indexEng];
            setIsChoice({ choice: false, indexEng: -1, indexVie: -1 });
            console.log("--------------------1-------------------");
            setCountCorrect(0);
            setIsShuffled(true);
          }
        }else{
          const random = Math.floor(Math.random() * 2) == 0;
          setIsShuffled(random);
          if(random){
            shuffledWordList[checkIndexVie] = shuffledList[isChoice.indexEng];
            shuffledWordList[isChoice.indexVie] = shuffledList[checkIndexEng];
          }else{
            shuffledWordList[isChoice.indexVie] = shuffledList[isChoice.indexEng];
            shuffledWordList[checkIndexVie] = shuffledList[shuffledList.length - 1];
          }
        }
        hanldeDisable(checkIndexEng, checkIndexVie, true);
        setListWords(shuffledList);
        setShuffledWord(shuffledWordList);
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
                  'opacity-[1]': !isDisEng[index].isDisable,
                  'opacity-[0] animate-undisable-word pointer-events-none': isDisEng[index].isDisable,
                  'bg-transparent': !isError.error && isError.indexEng !== index,
                  '!opacity-50': isEndEng[index].endDisable,
                })}
              disabled={isDisEng[index].isDisable || isEndEng[index].endDisable}
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
                  'opacity-[1]': !isDisVie[index].isDisable,
                  'opacity-[0] animate-undisable-word': isDisVie[index].isDisable,
                  'bg-transparent': !isError.error && isError.indexVie !== index,
                  '!opacity-50': isEndVie[index].endDisable
                })}
              disabled={isDisVie[index].isDisable || isEndVie[index].endDisable}
            >
              {word.vietnamese_word}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
