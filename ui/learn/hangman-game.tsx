import React, { useEffect, useState } from 'react'
import { FormattedListWord } from '../../lib/definitions';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Hangman({
    params, children
}: {
    params: FormattedListWord[];
    children: React.ReactNode
}) {
    const [listWords, setListWords] = useState<FormattedListWord[]>(params);
    const [listWordsHide, setListWordsHide] = useState<string[]>([]);
    const [word, setWord] = useState<string>();
    
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
    }, []);
    

    useEffect(() => {
        if (listWordsHide.length > 0) {
            setWord(listWordsHide[listWordsHide.length - 1])
        }
    }, [listWordsHide])

    function setCharAt(str: string, index: number, chr: string) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }

    function nextWord() {
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
    }

    function addWord(char: string){
        
    }

    return (
        <div className='transition-all'>
            <Card className="w-full min-h-[80svh]">
                <CardHeader>
                    <CardTitle className='text-6xl w-fit mx-auto'>{word}</CardTitle>
                    <CardDescription className='text-xl py-2'>{listWords[listWords.length - 1].vietnamese_word}</CardDescription>
                </CardHeader>
                <CardContent className='flex'>
                    <Button>A</Button>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={nextWord}>Next</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
