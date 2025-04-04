import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { FormattedListWord } from "$root/lib/entities/definitions";
import CongratulationPage from "@/components/ui/congratulation";

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
  const [engEndState, setEngEndState] = useState([
    { endDisable: false },
    { endDisable: false },
    { endDisable: false },
    { endDisable: false },
    { endDisable: false },
    { endDisable: false }
  ]);
  const [vieEndState, setVieEndState] = useState([
    { endDisable: false },
    { endDisable: false },
    { endDisable: false },
    { endDisable: false },
    { endDisable: false },
    { endDisable: false }
  ]);
  const [engDisableState, setEngDisableState] = useState([
    { isDisable: false },
    { isDisable: false },
    { isDisable: false },
    { isDisable: false },
    { isDisable: false }
  ]);
  const [vieDisableState, setVieDisableState] = useState([
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
    setMaxlengthWord(100 / finishList.length);
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
      }, 3500);
    }
  }, [countCorrect, isShuffled]);

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

  function hanldeDisable(indexEng: number, indexVie: number, isDisable: boolean) {
    setEngDisableState(preVal => {
      const updateData = [...preVal];
      updateData[indexEng] = { isDisable: isDisable }
      return updateData;
    });
    setVieDisableState(preVal => {
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
    let updatedHandleChoice = isHandleChoice;
    let updatedIdCompareEng = idCompareEng;
    let updatedIdCompareVie = idCompareVie;
    let updatedIndexEng = indexEng;
    let updatedIndexVie = indexVie;
    let updatedCountCorrect = countCorrect;

    if (type === Eng) {
      setIdCompareEng(compare_id);
      setIndexEng(index);
      updatedIdCompareEng = compare_id;
      updatedHandleChoice += 1;
      updatedIndexEng = index;
    } else {
      setIdCompareVie(compare_id);
      setIndexVie(index);
      updatedIdCompareVie = compare_id;
      updatedHandleChoice += 9;
      updatedIndexVie = index;
    }
    setIsHandleChoice(updatedHandleChoice);

    if (updatedHandleChoice === 10) {
      if (updatedIdCompareEng === updatedIdCompareVie) {
        handleCorrectChoice(updatedIndexEng, updatedIndexVie, updatedCountCorrect);
      } else {
        setIsError({ error: true, indexEng: updatedIndexEng, indexVie: updatedIndexVie });
      }
      resetChoices();
    }
  }

  function handleCorrectChoice(indexEng: number, indexVie: number, countChoice: number) {
    setIsError({ error: false, indexEng: -1, indexVie: -1 });
    const updatedListWords = [...listWords];
    const updatedShuffledWord = [...shuffledWord];
    setIsChoice({ choice: true, indexEng, indexVie });
    setCountCorrect(++countChoice);
    hanldeDisable(isChoice.indexEng, isChoice.indexVie, false);
    setTaskBarColor(prev => prev + maxlengthWord);

    if (updatedListWords.length <= 5) {
      disableEndState(indexEng, indexVie);
      return;
    }

    updatedListWords[indexEng] = updatedListWords[updatedListWords.length - 1];
    updatedListWords.pop();

    if (countChoice === 1) {
      handleFirstCorrectChoice(updatedShuffledWord, updatedListWords, indexVie);
    } else {
      handleSubsequentCorrectChoices(updatedShuffledWord, updatedListWords, indexEng, indexVie);
    }

    hanldeDisable(indexEng, indexVie, true);
    setListWords(updatedListWords);
    setShuffledWord(updatedShuffledWord);
  }

  function handleFirstCorrectChoice(shuffledWordList: FormattedListWord[], listWords: FormattedListWord[], indexVie: number) {
    if (isShuffled) {
      shuffledWordList[indexVie] = listWords[indexEng];
    } else {
      shuffledWordList[indexVie] = listWords[isChoice.indexEng];
      setCountCorrect(0);
      setIsShuffled(true);
    }
  }

  function handleSubsequentCorrectChoices(shuffledWordList: FormattedListWord[], listWords: FormattedListWord[], indexEng: number, indexVie: number) {
    const random = Math.random() < 0.5;
    setIsShuffled(random);

    if (random) {
      shuffledWordList[indexVie] = listWords[isChoice.indexEng];
      shuffledWordList[isChoice.indexVie] = listWords[indexEng];
    } else {
      shuffledWordList[isChoice.indexVie] = listWords[isChoice.indexEng];
      shuffledWordList[indexVie] = listWords[listWords.length === 5 ? indexEng : listWords.length - 1];
    }
  }

  function disableEndState(indexEng: number, indexVie: number) {
    setEngEndState(prevState => {
      const updatedState = [...prevState];
      updatedState[indexEng].endDisable = true;
      return updatedState;
    });

    setVieEndState(prevState => {
      const updatedState = [...prevState];
      updatedState[indexVie].endDisable = true;
      return updatedState;
    });
  }

  function resetChoices() {
    setIsChoiceEng(-1);
    setIsChoiceVie(-1);
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
      <div className="relative lg:mx-10 mt-5 lg:mt-2 h-8">
        <div
          className="mt-5 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 absolute transition-all sparkle-effect"
          style={{ width: `${taskBarColor + '%'}` }}
        ></div>
        <div className="mt-5 h-4 border border-black w-full rounded-full absolute border-white"></div>
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
                  "whitespace-nowrap flex justify-center items-center overflow-hidden text-autoSizeTextLearn opacity-[0] animate-undisable-word pointer-events-none text-center mt-5 transition-all border w-full rounded-2xl p-5 cursor-pointer hover:shadow-lg border-white shadow-gray-400 lg:mt-4 focus:text-white hover:bg-blue-500 text-white",
                  {
                    '!opacity-[1] !pointer-events-auto': !engDisableState[index].isDisable && !engEndState[index].endDisable,
                    'bg-red-700 focus:bg-red-700': isError.error && isError.indexEng == index,
                    'bg-transparent': !isError.error && isError.indexEng !== index,
                    '!opacity-50 !pointer-events-none': engEndState[index].endDisable,
                    '!bg-blue-500 hover:bg-blue-600': isChoiceEng == index
                  })}
                disabled={engEndState[index].endDisable}
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
                  "whitespace-nowrap flex justify-center items-center overflow-hidden text-autoSizeTextLearn opacity-[0] animate-undisable-word pointer-events-none text-center mt-5 transition-all border w-full rounded-2xl p-5 cursor-pointer hover:shadow-lg border-white shadow-gray-400 lg:mt-4 focus:text-white hover:bg-blue-500 text-white",
                  {
                    '!opacity-[1] !pointer-events-auto': !vieDisableState[index].isDisable && !vieEndState[index].endDisable,
                    'bg-red-700 focus:bg-red-700': isError.error && isError.indexVie == index,
                    'bg-transparent': !isError.error && isError.indexVie !== index,
                    '!opacity-50 !pointer-events-none': vieEndState[index].endDisable,
                    '!bg-blue-500 hover:bg-blue-600': isChoiceVie == index
                  })}
                disabled={vieEndState[index].endDisable}
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
