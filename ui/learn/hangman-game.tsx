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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Hangman({
    params, children
}: {
    params: FormattedListWord[];
    children: React.ReactNode
}) {
    const [listWords, setListWords] = useState<FormattedListWord[]>(params);
    const [word, setWord] = useState<string>(listWords[listWords.length - 1].english_word);
    const [compareWord, setCompareWord] = useState<string>(listWords[listWords.length - 1].english_word);
    
    useEffect(() => {
        setListWords(preVal => {
            const updateData = [...preVal].map((val, i) => {
                let rand = Math.floor(Math.random() * val.english_word.length - 1 + i)
                return setCharAt(val.english_word, rand, "_")
            });

            return [...preVal];
        })
    }, [listWords])

    useEffect(() => {
        for (let i = 0; i < 2; i++) {
            if (word.length > 0) {
                let rand = Math.floor(Math.random() * word.length - 1 + i)
                setWord(setCharAt(word, rand, "_"))
            }
        }
    }, [listWords, word])

    function setCharAt(str: string, index: number, chr: string) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }

    function nextWord() {
        setListWords(preVal => {
            const updateData = [...preVal];
            updateData.pop();
            setWord(updateData[updateData.length - 1].english_word)
            setCompareWord(updateData[updateData.length - 1].english_word)
            return updateData;
        })
    }

    return (
        <div className='transition-all'>
            <Card className="w-full min-h-[80svh]">
                <CardHeader>
                    <CardTitle className='text-6xl'>{word}</CardTitle>
                </CardHeader>
                <CardContent>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={nextWord}>Next</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
