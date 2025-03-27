import React from 'react';
import { Button } from "@/components/ui/button";

const Keyboard = ({ addWord }: { addWord: (char: string) => void }) => {
    const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
    letters.push('Del')

    return (
        <div className='flex flex-wrap justify-center lg:w-[300px] lg:block'>
            {letters.map((letter) => (
                <Button
                    key={letter}
                    onClick={() => addWord(letter.toLowerCase())}
                    variant={letter == "Del" ? "destructive" : "default"}
                    className={'m-1'}
                >
                    {letter}
                </Button>
            ))}
        </div>
    );
};

export default Keyboard;
