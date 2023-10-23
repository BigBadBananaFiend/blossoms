import { Inconsolata, Karla } from 'next/font/google'

export const inconsolata = Inconsolata({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    style: ['normal'],
    variable: '--font-family-body',
    preload: true,
})

export const karla = Karla({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal'],
    variable: '--font-family-heading',
    preload: true,
})
