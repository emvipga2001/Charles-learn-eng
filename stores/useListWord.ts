import { create } from 'zustand'
import { deleteWord, editWord, getListWordLimit, insertWord } from '$root/lib/usecases/word.usecase'
import { FormattedListWord } from '$root/lib/entities/definitions'

type limitWord = {
    words: FormattedListWord[]
    limit: number
    loading: boolean
    loadingMore: boolean
    loadingInsert: boolean
    error: boolean
    count: number
    type: number
    init: () => Promise<void>
    addMore: () => Promise<void>
    addWord: (eng: string, vn: string) => Promise<void>
    editWord: (eng: string, vn: string, id: number) => Promise<void>
    deleteWord: (id: number) => Promise<void>
    setWords: (listWords: FormattedListWord[]) => Promise<void>
    setType: (typeId: number) => Promise<void>
}

export const useWordStore = create<limitWord>()((set, get) => ({
    words: [],
    limit: 50,
    loading: false,
    loadingMore: false,
    loadingInsert: false,
    error: false,
    count: 0,
    type: 1, // Default type, will be updated on client-side
    init: async () => {
        set({ loading: true, error: false });
        try {
            const limit = get().limit;
            const [listWord, countWords] = await getListWordLimit(limit, get().type)
            set({ words: listWord, count: countWords, loading: false, limit: limit + 50 });
        } catch (error) {
            set({ loading: false, error: true });
        }
    },
    addMore: async () => {
        set({ loadingMore: true, error: false });
        try {
            const limit = get().limit;
            const [listWord, countWords] = await getListWordLimit(limit, get().type)
            set({ words: listWord, count: countWords, loadingMore: false, limit: limit + 50 });
        } catch (error) {
            set({ loadingMore: false, error: true });
        }
    },
    addWord: async (eng: string, vn: string) => {
        set({ loadingInsert: true });
        await insertWord(eng, vn, get().type)
        set({ loadingInsert: false });
    },
    editWord: async (eng: string, vn: string, id: number) => {
        await editWord(eng, vn, id, get().type)
        const limit = get().limit - 50;
        const [listWord, _] = await getListWordLimit(limit, get().type)
        set({ words: listWord });
    },
    deleteWord: async (id: number) => {
        const limit = get().limit;
        await deleteWord(id, get().type)
        const [listWord, _] = await getListWordLimit(limit, get().type)
        set({ words: listWord });
    },
    setWords: async (listWords: FormattedListWord[]) => {
        set({ words: listWords });
    },
    setType: async (typeId: number) => {
        set({ type: typeId });
        if (typeof document !== 'undefined') {
            document.cookie = `wordType=${typeId}; path=/; max-age=31536000`;
        }
        await get().init();
    },
}))
