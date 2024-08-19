'use client'

import React from 'react'
import { FormattedListWord } from '../../lib/definitions'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { getMoreListWord } from '../../lib/data'

export default function Render({ listWord }: { listWord: FormattedListWord[] }) {
    return (
        <div>
            {listWord.map((word, index) => (
                <ResizablePanelGroup
                    key={word.id}
                    direction="horizontal"
                    className="min-h-full max-w-full border"
                >
                    <ResizablePanel defaultSize={100}>
                        <div className="flex h-full items-center justify-center p-6 whitespace-nowrap">
                            <span className="font-semibold">{word.english_word}</span>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={0}>
                        <div className="flex h-full items-center justify-center p-6 whitespace-nowrap">
                            <span className="font-semibold">{word.vietnamese_word}</span>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            ))}
            <div className='flex'>
                <Button variant="ghost" onClick={()=>getMoreListWord()}>Add more ...</Button>
            </div>
        </div>
    )
}
