'use client'

import { Suspense, useEffect, useState } from 'react';
import Render from './render';
import { useWordStore } from '$root/stores/useListWord';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import AddWord from './add-word';
import clsx from 'clsx';

enum listConten {
  LIST_WORD = 'LIST_WORD',
  ADD_WORD = 'ADD_WORD',
}

export default function Page() {
  const { words, init } = useWordStore();
  const [content, setContet] = useState<string>(listConten.LIST_WORD);
  useEffect(() => {
    if (words.length == 0) {
      init();
    }
  }, [words, init])

  return (
    <Tabs defaultValue="list-word" className="w-full">
      <TabsList className="grid w-full h-14 grid-cols-2 bg-secondary dark:bg-dark-hover-button p-2 rounded-xl gap-4">
        <TabsTrigger value="list-word" onClick={() => setContet(listConten.LIST_WORD)} className={clsx('text-[#4e54c8] dark:text-white', { '!text-white bg-[#4e54c8] dark:bg-black rounded-lg': content == listConten.LIST_WORD })}>List Word</TabsTrigger>
        <TabsTrigger value="add-word" onClick={() => setContet(listConten.ADD_WORD)} className={clsx('text-[#4e54c8] dark:text-white', { '!text-white bg-[#4e54c8] dark:bg-black rounded-lg': content == listConten.ADD_WORD })}>Add Word</TabsTrigger>
      </TabsList>
      <TabsContent value="list-word">
        <Render listWord={words} />
      </TabsContent>
      <TabsContent value="add-word">
        <div className='py-5'>
          <AddWord />
        </div>
      </TabsContent>
    </Tabs>
  );
}
