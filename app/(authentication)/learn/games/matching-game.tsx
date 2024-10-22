import React, { useEffect, useState } from "react";
import { FormattedListWord } from "../../../../lib/definitions";
import clsx from "clsx";
import { count } from "console";
import CongratulationPage from "../../../../ui/congratulation";

export default function MatchingGame({
  params,children
}: {
  params: FormattedListWord[];
  children: React.ReactNode
}) {
  const [listWords, setListWords] = useState<FormattedListWord[]>(params);
  const [shuffledWord, setShuffledWord] = useState<FormattedListWord[]>([]);
  const [isError, setIsError] = useState({ error: false, indexEng: -1, indexVie: -1 });
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
  const [maxlengthWord, setMaxlengthWord] = useState(0);
  const [taskBarColor, setTaskBarColor] = useState(0);
  const [isChoiceEng, setIsChoiceEng] = useState(-1);
  const [isChoiceVie, setIsChoiceVie] = useState(-1);

  const Eng = 1;
  const Vie = 2;

  useEffect(() => {
    const finishList = handleShuffledList(listWords);
    setListWords(finishList);
    setShuffledWord(handleShuffledList(finishList.slice(0, 5)));
    setMaxlengthWord(100 / finishList.length)
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
    } else if (countCorrect == 1) {
      setTimeout(() => {
        setCountCorrect(0);
        if (!isShuffled) {
          setIsChoice({ choice: false, indexEng: -1, indexVie: -1 });
        }
      }, 3500)
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

  // function duplicateList(listWord: FormattedListWord[]) {
  //   const shuffledList = [...listWord];
  //   for (let i = 0; i < (shuffledList.length % 2); i++) {
  //     const j = Math.floor(Math.random() * shuffledList.length);
  //     const newElement: FormattedListWord ={
  //       ...shuffledList[j],
  //       id: shuffledList[shuffledList.length - 1].id + 1,
  //     }
  //     shuffledList.push(newElement);
  //   }
  //   return shuffledList;
  // }

  function hanldeDisable(indexEng: number, indexVie: number, isDisable: boolean) {
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
        setIsError({ error: false, indexEng: -1, indexVie: -1 })
        const shuffledList = [...listWords];
        const shuffledWordList = [...shuffledWord];
        setIsChoice({ choice: true, indexEng: checkIndexEng, indexVie: checkIndexVie });
        setCountCorrect(++countChoice);
        hanldeDisable(isChoice.indexEng, isChoice.indexVie, false);
        setTaskBarColor(prev => prev += maxlengthWord)
        if (shuffledList.length <= 5) {
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
        [shuffledList[checkIndexEng], shuffledList[shuffledList.length - 1]] = [shuffledList[shuffledList.length - 1], shuffledList[checkIndexEng]];
        shuffledList.pop();
        if (countChoice == 1) {
          if (isShuffled) {
            shuffledWordList[checkIndexVie] = shuffledList[checkIndexEng];
          } else {
            shuffledWordList[checkIndexVie] = shuffledList[isChoice.indexEng];
            setCountCorrect(0);
            setIsShuffled(true);
          }
        } else {
          const random = Math.floor(Math.random() * 2) == 0;
          setIsShuffled(random);
          if (random) {
            shuffledWordList[checkIndexVie] = shuffledList[isChoice.indexEng];
            shuffledWordList[isChoice.indexVie] = shuffledList[checkIndexEng];
          } else {
            shuffledWordList[isChoice.indexVie] = shuffledList[isChoice.indexEng];
            shuffledWordList[checkIndexVie] = shuffledList[shuffledList.length == 5 ? checkIndexEng : shuffledList.length - 1];
          }
        }
        hanldeDisable(checkIndexEng, checkIndexVie, true);
        setListWords(shuffledList);
        setShuffledWord(shuffledWordList);
      } else {
        setIsError({ error: true, indexEng: checkIndexEng, indexVie: checkIndexVie });
      }
      setIsChoiceEng(-1);
      setIsChoiceVie(-1);
    }
  }
  
  if(taskBarColor >= 99.9){
    return (
      <>
        <CongratulationPage />
        {children}
      </>
    )
  }

  return (
    <div className="!font-mono">
      <div className="relative lg:mx-10 mt-5 mb-5 lg:mt-2 h-8">
        <div className="mt-5 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 absolute transition-all" style={{ width : `${taskBarColor + '%'}`}}></div>
        <div className=" mt-5 h-8 border border-black w-full rounded-full absolute dark:border-white"></div>
      </div>
      <div className="lg:mx-10 grid grid-cols-2 gap-5">
        <div>
          {listWords?.slice(0, 5).map((word, index) => (
            <div key={index + "ENG"} className={clsx({
              'animate-shake': isError.error && isError.indexEng == index,
            })}>
              <button
                key={word.id + "ENG"}
                onClick={() => {setIsChoiceEng(index);compareWord(Eng, word.compare_id, index, word.id)}}
                className={clsx(
                  "whitespace-nowrap flex justify-center items-center overflow-hidden text-autoSizeTextLearn opacity-[0] animate-undisable-word pointer-events-none text-center mt-5 transition-all border w-full rounded-2xl p-5 cursor-pointer border-black hover:shadow-lg dark:border-white dark:shadow-gray-400 lg:mt-4 focus:text-white hover:bg-blue-500 hover:bg-blue-600 hover:text-white",
                  {
                    '!opacity-[1] !pointer-events-auto': !isDisEng[index].isDisable && !isEndEng[index].endDisable,
                    'bg-red-700 focus:bg-red-700': isError.error && isError.indexEng == index,
                    'bg-transparent': !isError.error && isError.indexEng !== index,
                    '!opacity-50 !pointer-events-none': isEndEng[index].endDisable,
                    '!bg-blue-500 hover:bg-blue-600': isChoiceEng == index
                  })}
                disabled={isEndEng[index].endDisable}
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
                key={word.id + "ENG"}
                onClick={() => {setIsChoiceVie(index);compareWord(Vie, word.compare_id, index, word.id)}}
                className={clsx(
                  "whitespace-nowrap flex justify-center items-center overflow-hidden text-autoSizeTextLearn opacity-[0] animate-undisable-word pointer-events-none text-center mt-5 transition-all w-full border rounded-2xl p-5 cursor-pointer border-black hover:shadow-lg dark:border-white dark:shadow-gray-400 lg:mt-4 focus:text-white hover:bg-blue-500 hover:bg-blue-600 hover:text-white",
                  {
                    '!opacity-[1] !pointer-events-auto': !isDisVie[index].isDisable && !isEndVie[index].endDisable,
                    'bg-red-700 focus:bg-red-700': isError.error && isError.indexVie == index,
                    'bg-transparent': !isError.error && isError.indexVie !== index,
                    '!opacity-50 !pointer-events-none': isEndVie[index].endDisable,
                    '!bg-blue-500 hover:bg-blue-600': isChoiceVie == index
                  })}
                disabled={isEndVie[index].endDisable}
              >
                {word.vietnamese_word}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
