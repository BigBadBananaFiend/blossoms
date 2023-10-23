import type { Metadata } from 'next'
import './globals.css'
import { inconsolata, karla } from './fonts'
import { QueryProvider } from './QueryProvider'

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
            <QueryProvider>
                <body className={`${karla.variable} ${inconsolata.variable}`}>
                    {children}
                </body>
            </QueryProvider>
        </html>
    )
}
