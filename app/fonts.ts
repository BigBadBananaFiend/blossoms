import { Lora, Merriweather } from 'next/font/google'

export const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['300', '400', '700', '900'],
    style: ['normal'],
    variable: '--font-family-heading',
})

export const lora = Lora({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    variable: '--font-family-body',
})
