import React, { useEffect, useState } from 'react'
import { FormattedListWord } from '../../lib/definitions'
import { log } from 'util';

export default function RenderWord({ params }: {
  params: FormattedListWord[]
}) {
  const [listWords,setListWords] = useState<FormattedListWord[]>(params);
  var idEng = 0;
  var idVie = 0;

  useEffect(()=>{
    const shuffledList = [...listWords];
    for (let i = shuffledList.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]]; 
    }
    setListWords(shuffledList);
  },[])

  function compareWord(type:number,id:number,index:number){
    type === 1 ? idEng = id : idVie = id;
    
    if(idEng != 0 && idVie != 0){
      const shuffledList = [...listWords];
      if(idEng === idVie){
        var randomNumber = Math.floor(Math.random() * shuffledList.length) % shuffledList.length;
        randomNumber = randomNumber <= 5 ? randomNumber + 5 : randomNumber;
        [shuffledList[index], shuffledList[randomNumber]] = [shuffledList[randomNumber], shuffledList[index]]; 
        setListWords(shuffledList);
      }
      idEng = 0;
      idVie = 0;
    }
  }

  return (
    <div className="mt-10 mx-96">
      {listWords?.slice(0, 5).map((word,index) => (
        <div key={word.id} className="grid grid-cols-2" style={{gap: '60px'}}>
          <button onClick={()=>compareWord(1,word.id,index)} className="text-center mt-5 text-7xl transition-all border rounded-2xl p-5 cursor-pointer border-black hover:shadow-lg dark:border-white dark:shadow-gray-400">
            {word.english_word}
          </button>
          <button onClick={()=>compareWord(2,word.id,index)} className="text-center mt-5 text-7xl transition-all border rounded-2xl p-5 cursor-pointer border-black hover:shadow-lg dark:border-white dark:shadow-gray-400">
            {word.vietnamese_word}
          </button>
        </div>
      ))}
    </div>
  )
}
