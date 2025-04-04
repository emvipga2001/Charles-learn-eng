"use client";

import React, { useState, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { useWordStore } from "$root/stores/useListWord";
import clsx from "clsx";
import Word from "./word";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loading from "@/loading";
import { FormattedListWord } from "$root/lib/entities/definitions";

export default function Render({
  listWord,
}: {
  listWord: FormattedListWord[];
}) {
  const { reloadGetAll, count, words, loading, loadingMore } = useWordStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWords, setFilteredWords] = useState(listWord);

  useEffect(() => {
    setFilteredWords(
      listWord.filter((word) =>
        word.vietnamese_word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.english_word.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, listWord]);

  return (
    <div className="py-5">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md dark:border-white"
        />
      </div>
      <div className="rounded-md border border-white h-[70svh]">
        {loading ? (
          <Loading />
        ) : (
          <ScrollArea className=" h-[70svh] w-full">
            <div className="lg:grid lg:grid-cols-3 md:grid md:grid-cols-2">
              {filteredWords.map((word) => (
                <ResizablePanelGroup
                  key={word.id}
                  direction="horizontal"
                  className="min-h-full max-w-full border bg-transparent dark:border-dark-border-button"
                >
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6 whitespace-nowrap">
                      <Word props={word} />
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6 whitespace-nowrap">
                      <span className="font-semibold select-none text-white">
                        {word.vietnamese_word}
                      </span>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              ))}
            </div>
            {loadingMore ? (
              <Loading />
            ) : (
              <div className={clsx("flex", { hidden: count == words.length })}>
                <Button
                  variant="ghost"
                  onClick={reloadGetAll}
                  className="text-white hover:bg-transparent hover:text-white"
                >
                  View more ...
                </Button>
              </div>
            )}
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
