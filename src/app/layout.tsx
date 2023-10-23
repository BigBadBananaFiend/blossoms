import type { Metadata } from 'next'
import './globals.css'
import { inconsolata, karla } from './fonts'

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
            <body className={`${karla.variable} ${inconsolata.variable}`}>
                {children}
            </body>
        </html>
    )
}
