import { create } from 'zustand'
import { FormattedListWord } from '../../lib/definitions'
import { editWord, getListWordLimit, insertWord } from '../../lib/data'

type limitWord = {
    words: FormattedListWord[]
    limit: number
    loading: boolean
    loadingMore: boolean
    loadingInsert: boolean
    error: boolean
    count: number
    init: () => Promise<void>
    addMore: () => Promise<void>
    addWord: (eng: string, vn: string) => Promise<void>
    editWord: (eng: string, vn: string, id: number) => Promise<void>
}

export const useWordStore = create<limitWord>()((set, get) => ({
    words: [],
    limit: 50,
    loading: false,
    loadingMore: false,
    loadingInsert: false,
    error: false,
    count: 0,
    init: async () => {
        set({ loading: true, error: false });
        try {
            const limit = get().limit;
            const [listWord, countWords] = await getListWordLimit(limit)
            set({ words: listWord, count: countWords, loading: false, limit: limit + 50 });
        } catch (error) {
            set({ loading: false, error: true });
        }
    },
    addMore: async () => {
        set({ loadingMore: true, error: false });
        try {
            const limit = get().limit;
            const [listWord, countWords] = await getListWordLimit(limit)
            set({ words: listWord, count: countWords, loadingMore: false, limit: limit + 50 });
        } catch (error) {
            set({ loadingMore: false, error: true });
        }
    },
    addWord: async (eng: string, vn: string) => {
        set({ loadingInsert: true });
        await insertWord(eng, vn)
        set({ loadingInsert: false });
    },
    editWord: async (eng: string, vn: string, id: number) => {
        await editWord(eng, vn, id)
        const limit = get().limit - 50;
        const [listWord, _] = await getListWordLimit(limit)
        set({ words: listWord });
    }
}))
