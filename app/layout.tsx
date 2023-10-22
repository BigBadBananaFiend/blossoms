import type { Metadata } from 'next'
import './globals.css'
import { lora, merriweather } from './fonts'

export const metadata: Metadata = {
    title: 'Blossoms',
    description: 'Buy, swap, and gift flowers',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${merriweather.variable} ${lora.variable}`}>
                {children}
            </body>
        </html>
    )
}
