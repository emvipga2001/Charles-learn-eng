import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Keyboard from '@/components/key-board';
import clsx from 'clsx';
import { FormattedListWord } from '$root/lib/entities/definitions';

export default function Hangman({
    params, children
}: {
    params: FormattedListWord[];
    children: React.ReactNode
}) {
    const [listWords, setListWords] = useState<FormattedListWord[]>(params);
    const [listWordsHide, setListWordsHide] = useState<string[]>([]);
    const [word, setWord] = useState<string[]>([]);
    const [indexHide, setIndexHide] = useState<number[]>([]);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const updateData = [...listWords].map((val, i) => {
            let newWord = { ...val };
            for (let i = 1; i < 3; i++) {
                let rand = Math.floor(Math.random() * val.english_word.length - 1 + i)
                newWord.english_word = setCharAt(newWord.english_word, rand, "_");
            }
            return newWord.english_word;
        });
        setListWordsHide(updateData);
    }, [listWords]);

    useEffect(() => {
      if(error){
        setTimeout(() => {
            setError(false);
        }, 1000);
      }
    }, [error])
    
    useEffect(() => {
        if (listWordsHide.length > 0) {
            setWord(listWordsHide[listWordsHide.length - 1].split(""))
            let tempArr: number[] = [];
            listWordsHide[listWordsHide.length - 1].split("").forEach((val, index) => {
                if (val == "_") {
                    tempArr.push(index)
                }
            })
            setIndexHide(tempArr);
        }
    }, [listWordsHide])

    function setCharAt(str: string, index: number, chr: string) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }

    function nextWord() {
        if (word.join("").toLocaleLowerCase() == listWords[listWords.length - 1].english_word.toLocaleLowerCase()) {
            setListWordsHide(preVal => {
                const updateData = [...preVal];
                updateData.pop();
                return updateData;
            })
            setListWords(preVal => {
                const updateData = [...preVal];
                updateData.pop();
                return updateData;
            })
        } else {
            setError(true);
        }
    }

    function addWord(char: string) {
        if (char == 'del') {
            setWord(preVal => {
                const updateData = [...preVal];
                for (let i = updateData.length - 1; i >= 0; i--) {
                    if (indexHide.includes(i) && updateData[i] != "_") {
                        updateData[i] = "_";
                        return updateData;
                    }
                }
                return updateData;
            })
        } else {
            setWord(preVal => {
                const updateData = [...preVal];
                for (let i = 0; i < updateData.length; i++) {
                    if (updateData[i] == "_") {
                        updateData[i] = char;
                        return updateData;
                    }
                }
                return updateData;
            })
        }

    }

    return (
        <div className='transition-all'>
            <Card className="lg:mx-auto lg:w-[40%] bg-transparent">
                <CardHeader>
                    <CardTitle className={clsx(
                        'text-5xl w-fit mx-auto',
                        error && 'animate-shake text-red-600'
                    )}>
                        {word?.map((val: string, index: number) => {
                            if (val !== "_" && !indexHide.includes(index)) {
                                return (
                                    <span key={index}>{val}</span>
                                )
                            } else {
                                return (
                                    <span key={index} className='mx-1 underline'>{val}</span>
                                )
                            }
                        })}
                    </CardTitle>
                    <CardDescription className='text-xl py-2 text-slate-700 dark:text-slate-300'>{listWords[listWords.length - 1].vietnamese_word}</CardDescription>
                </CardHeader>
                <CardContent className='flex justify-center mt-[10svh]'>
                    <Keyboard addWord={addWord} />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={nextWord}>Next</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
