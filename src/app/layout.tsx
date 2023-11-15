import type { Metadata } from 'next'
import { inconsolata, karla } from './fonts'
import { QueryProvider } from '../core/components/providers/query-provider'

import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { GoogleProvider } from '../core/components/providers/google-provider'

export const metadata: Metadata = {
    title: 'Blossoms',
    description: 'Buy, swap, and gift flowers',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${karla.variable} ${inconsolata.variable}`}>
                <GoogleProvider>
                    <QueryProvider>{children}</QueryProvider>
                </GoogleProvider>
            </body>
        </html>
    )
}
