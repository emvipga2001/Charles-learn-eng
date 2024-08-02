"use client";
import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { FormattedListWord } from '../../lib/definitions';
import HeaderComponent from '../../ui/header-component';

export default function Words({
    params
}: {
    params: FormattedListWord[];
}) {
    const [isSorted, setIsSorted] = useState(false);
    const [sortedParams, setSortedParams] = useState<FormattedListWord[]>(params);

    function toggleSort() {
        if (isSorted) {
            setSortedParams(params);
        } else {
            const sorted = [...params].sort((a, b) =>
                a.english_word.localeCompare(b.english_word)
            );
            setSortedParams(sorted);
        }
        setIsSorted(!isSorted);
    }
    useEffect(() => {
        // let container = document.getElementsByClassName('word-list-container');
        // if (container.length > 0) {
        //     container[0].style.maxHeight = screen.height - 290 + "px";
        // }
    }, [])
    return (
        <div>
            <div className='flex justify-between'>
                <HeaderComponent content='List word' />
                <Button onClick={toggleSort}>
                    <span className='underline'>
                        {isSorted ? 'Sort by date added' : 'Sort by character'}
                    </span>
                </Button>
            </div>
            <div className='word-list-container border rounded-2xl dark:border-[#FFFFFF80] max-h-[790px] overflow-y-auto'>
                <List>
                    {sortedParams.map((word: FormattedListWord, index: number) => (
                        <div key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={
                                        <span className='text-2xl'>{word.english_word}</span>
                                    }
                                    secondary={
                                        <span className='dark:text-white dark:opacity-50 text-sm'>
                                            {word.vietnamese_word}
                                        </span>
                                    }
                                />
                            </ListItem>
                            {index !== params.length - 1 && (
                                <Divider variant="fullWidth" component="li" className='dark:bg-white dark:opacity-50' />
                            )}
                        </div>
                    ))}
                </List>
            </div>
        </div>
    );
}
