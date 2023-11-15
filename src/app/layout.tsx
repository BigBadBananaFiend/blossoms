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

const getUserInfo = async () => {
    const result = await fetch('http://dog-api.kinduff.com/api/facts')
    return result.json()
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const userinfo = await getUserInfo()
    console.log(userinfo)

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
