import type { Metadata } from 'next'
import { inconsolata, karla } from './fonts'
import { QueryProvider } from '../core/components/providers/query-provider'
import { AuthLayer } from '../core/components/auth/AuthLayer'

import './globals.css'

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
                <QueryProvider>
                    <AuthLayer>{children}</AuthLayer>
                </QueryProvider>
            </body>
        </html>
    )
}
