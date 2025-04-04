import { create } from 'zustand'
import { deleteWord, editWord, getAllWords, getListWordLimit, insertWord, reloadGetAllWords } from '$root/lib/usecases/word.usecase'
import { FormattedListWord } from '$root/lib/entities/definitions'

type listWordStates = {
    words: FormattedListWord[]
    limit: number
    loading: boolean
    loadingMore: boolean
    loadingInsert: boolean
    error: boolean
    count: number
    isEnd: boolean
    isReload: boolean
}

type listWordActions = {
    init: () => Promise<void>
    addMore: () => Promise<void>
    addWord: (eng: string, vn: string) => Promise<void>
    editWord: (eng: string, vn: string, id: number) => Promise<void>
    deleteWord: (id: number) => Promise<void>
    setWords: (listWords: FormattedListWord[]) => Promise<void>
    getAll: () => Promise<void>
    reloadGetAll: () => Promise<void>
}

type ListWord = listWordStates & listWordActions

const defaultInitState: listWordStates = {
    words: [],
    limit: 50,
    loading: false,
    loadingMore: false,
    loadingInsert: false,
    error: false,
    count: 0,
    isEnd: false,
    isReload: false
}

export const useWordStore = create<ListWord>()((set, get) => ({
    ...defaultInitState,
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
        await get().reloadGetAll();
    },
    deleteWord: async (id: number) => {
        await deleteWord(id)
        await get().reloadGetAll();
    },
    setWords: async (listWords: FormattedListWord[]) => {
        set({ words: listWords });
    },
    getAll: async () => {
        set({ loading: true, error: false });
        try {
            const listWord = await getAllWords()
            set({ loading: false, words: listWord, isReload: true});
        } catch (error) {
            set({ loading: false, error: true });
        }
    },
    reloadGetAll: async () => {
        set({ isReload: false });
        await reloadGetAllWords();
        await get().getAll();
    },
}))
