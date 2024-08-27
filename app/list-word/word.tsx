'use client'

import React, { useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useWordStore } from '@/stores/useListWord'


type word = {
    id: number,
    english_word: string,
    vietnamese_word: string
}

function Word({ props }: { props: word }) {
    const { editWord } = useWordStore()
    const [currentEnglishWord, setCurrentEnglishWord] = useState(props.english_word)
    const [currentVietnameseWord, setCurrentVietnameseWord] = useState(props.vietnamese_word)

    const handleSaveChanges = (id: number) => {
        editWord(currentEnglishWord, currentVietnameseWord, props.id)
        console.log('Updated word:', currentEnglishWord, currentVietnameseWord)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <span className="font-semibold select-none h-full w-full">{props.english_word}</span>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>Edit word</SheetTitle>
                    <SheetDescription>
                        Make changes to your word here. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="english_word" className="text-right">
                            English Word
                        </Label>
                        <Input
                            id="english_word"
                            value={currentEnglishWord}
                            className="col-span-3"
                            onChange={(e) => setCurrentEnglishWord(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="vietnamese_word" className="text-right">
                            VietNam Word
                        </Label>
                        <Input
                            id="vietnamese_word"
                            value={currentVietnameseWord}
                            className="col-span-3"
                            onChange={(e) => setCurrentVietnameseWord(e.target.value)}
                        />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" onClick={() => handleSaveChanges(props.id)}>Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Word