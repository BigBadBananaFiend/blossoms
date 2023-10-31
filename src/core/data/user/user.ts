import { atom } from 'jotai'

export interface IUser {
    isVerified: boolean
    hasFinishedOnboarding: boolean
}

export const userAtom = atom<IUser | null>(null)
