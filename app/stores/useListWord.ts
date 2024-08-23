import { create } from 'zustand'
import { FormattedListWord } from '../../lib/definitions'
import { getListWordLimit, insertWord } from '../../lib/data'

type limitWord = {
    words: FormattedListWord[]
    limit: number
    loading: boolean
    error: boolean
    count: number
    addMore: () => Promise<void>
    addWord: (eng: string, vn: string) => Promise<void>
}

export const useWordStore = create<limitWord>()((set, get) => ({
    words: [],
    limit: 10,
    loading: false,
    error: false,
    count: 0,
    addMore: async () => {
        set({ loading: true, error: false });
        try {
            const limit = get().limit;
            const [listWord, countWords] = await getListWordLimit(limit)
            set({ words: listWord, count: countWords, loading: false, limit: limit + 10 });
        } catch (error) {
            set({ loading: false, error: true });
        }
    },
    addWord: async (eng: string, vn: string) => {
        set({ loading: true, error: false });
        const id = get().count + 1;
        await insertWord(eng, vn, id)
    }
}))
