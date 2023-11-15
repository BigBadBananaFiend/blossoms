import { atom } from 'jotai'

export interface IUserInfo {
    name: string
    id: boolean
    city: string
    country: string
}

export const userAtom = atom<IUserInfo | null>(null)
