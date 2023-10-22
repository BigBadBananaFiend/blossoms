'use client'

import { useEffectOnce } from './hooks/useEffectOnce'
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()

    useEffectOnce(() => {
        router.push('/sign/in')
    })
}
