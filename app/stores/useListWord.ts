import { create } from 'zustand'
import { FormattedListWord } from '../../lib/definitions'
import { editWord, getListWordLimit, insertWord } from '../../lib/data'

type limitWord = {
    words: FormattedListWord[]
    limit: number
    loading: boolean
    error: boolean
    count: number
    addMore: () => Promise<void>
    addWord: (eng: string, vn: string) => Promise<void>
    editWord: (eng: string, vn: string, id: number) => Promise<void>
}

export const useWordStore = create<limitWord>()((set, get) => ({
    words: [],
    limit: 50,
    loading: false,
    error: false,
    count: 0,
    addMore: async () => {
        set({ loading: true, error: false });
        try {
            const limit = get().limit;
            const [listWord, countWords] = await getListWordLimit(limit)
            set({ words: listWord, count: countWords, loading: false, limit: limit + 50 });
        } catch (error) {
            set({ loading: false, error: true });
        }
    },
    addWord: async (eng: string, vn: string) => {
        set({ loading: true, error: false });
        await insertWord(eng, vn)
    },
    editWord: async (eng: string, vn: string, id: number) => {
        await editWord(eng, vn, id)
        const limit = get().limit - 50;
        const [listWord, _] = await getListWordLimit(limit)
        set({ words: listWord });
    }
}))
