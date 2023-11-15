'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        router.push('/user/profile')
    }, [])

    return <h1>Dashboard</h1>
}
