import React, { useEffect, useState } from "react";
import { FormattedListWord } from "../../lib/definitions";

export default function RenderWord({
  params,
}: {
  params: FormattedListWord[];
}) {
  const [listWords, setListWords] = useState<FormattedListWord[]>(params);
  const [shuffledWord, setShuffledWord] = useState<FormattedListWord[]>();

  var idEng = 0;
  var idVie = 0;
  var indexEng = 0;
  var indexVie = 0;

  useEffect(() => {
    const finishList = handleShuffledList(duplicateList(listWords));
    setListWords(finishList);
    setShuffledWord(handleShuffledList(finishList.slice(0, 5)));
  }, []);

  function compareWord(type: number, id: number, index: number) {
    type === 1 ? (idEng = id) : (idVie = id);
    type === 1 ? (indexEng = index) : (indexVie = index);

    if (idEng != 0 && idVie != 0) {
      if (idEng === idVie) {
        const shuffledList = [...listWords];
        const shuffledWordList = [...shuffledWord!];
        [shuffledList[indexEng], shuffledList[shuffledList.length - 1]] = [
          shuffledList[shuffledList.length - 1],
          shuffledList[indexEng],
        ];
        shuffledList.splice(shuffledList.length - 1, 1);
        setListWords(shuffledList);
        shuffledWordList[indexVie] = shuffledList[indexEng];
        setShuffledWord(shuffledWordList);
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
    for (let i = 0; i < 10; i++) {
      const j = Math.floor(Math.random() * shuffledList.length);
      shuffledList.push(shuffledList[j]);
    }
    return shuffledList;
  }

  return (
    <div className="mt-5 lg:mt-2 lg:mx-40 grid grid-cols-2 gap-5">
      <div>
        {listWords?.slice(0, 5).map((word, index) => (
          <div key={index + "ENG"}>
            <button
              onClick={() => compareWord(1, word.id, index)}
              className="
              text-center
              mt-5
              text-7xl
              transition-all
              border
              rounded-2xl
              p-5
              cursor-pointer
              border-black
              hover:shadow-lg
              dark:border-white
              dark:shadow-gray-400
              lg:scale-75
              lg:mt-0
              lg:text-5xl
              hover:bg-blue-500
              focus:bg-blue-500
              focus:text-white
              hover:text-white
            "
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
              onClick={() => compareWord(2, word.id, index)}
              className="
              text-center
              mt-5
              text-7xl
              transition-all
              border
              rounded-2xl
              p-5
              cursor-pointer
              border-black
              hover:shadow-lg
              dark:border-white
              dark:shadow-gray-400
              lg:scale-75
              lg:mt-0
              lg:text-5xl
              focus:bg-blue-500
              focus:text-white
              hover:bg-blue-500
              hover:text-white
            "
            >
              {word.vietnamese_word}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
