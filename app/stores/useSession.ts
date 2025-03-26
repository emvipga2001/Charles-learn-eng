import { create } from 'zustand'
type sesion = {
    user: user,
    setUser: (user: user) => void
}

type user = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
}

export const useSesion = create<sesion>()((set) => ({
    user: {
        email: ''
    },
    setUser: (userParam: user) => {
        set({ user: userParam })
    }
}))
