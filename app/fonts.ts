import {
    Alfa_Slab_One,
    Chivo,
    Inconsolata,
    Karla,
    Lora,
    Merriweather,
    Pontano_Sans,
    Stint_Ultra_Expanded,
} from 'next/font/google'

export const lora = Inconsolata({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    style: ['normal'],
    variable: '--font-family-body',
})

export const merriweather = Karla({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal'],
    variable: '--font-family-heading',
})
