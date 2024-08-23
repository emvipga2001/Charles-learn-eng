'use client'

import React from 'react'
import { FormattedListWord } from '../../lib/definitions'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { useWordStore } from '@/stores/useListWord'
import clsx from 'clsx'

export default function Render({ listWord }: { listWord: FormattedListWord[] }) {
    const { addMore, count, words } = useWordStore()
    return (
        <div>
            <div className='lg:grid lg:grid-cols-3 md:grid md:grid-cols-2'>
                {listWord.map((word) => (
                    <ResizablePanelGroup
                        key={word.id}
                        direction="horizontal"
                        className="min-h-full max-w-full border dark:bg-black dark:border-dark-border-button"
                    >
                        <ResizablePanel defaultSize={100}>
                            <div className="flex h-full items-center justify-center p-6 whitespace-nowrap">
                                <span className="font-semibold select-none">{word.english_word}</span>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={0}>
                            <div className="flex h-full items-center justify-center p-6 whitespace-nowrap">
                                <span className="font-semibold select-none">{word.vietnamese_word}</span>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                ))}
            </div>
            <div className={clsx('flex', { 'hidden': count == words.length })}>
                <Button variant="ghost" onClick={addMore}>View more ...</Button>
            </div>
        </div>
    )
}
