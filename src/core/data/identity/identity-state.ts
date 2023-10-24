import { atom } from 'jotai'

// probably won't be necessary to store in state

export interface IUserIdentity {
    isVerified: boolean
    hasFinishedOnboarding: boolean
}

const DEFAULT_USER_IDENTITY_STATE: IUserIdentity = {
    isVerified: false,
    hasFinishedOnboarding: false,
}

export const identityAtom = atom<IUserIdentity>(DEFAULT_USER_IDENTITY_STATE)
