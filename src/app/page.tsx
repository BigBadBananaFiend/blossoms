'use client'

import { useEffectOnce } from '@/src/hooks/useEffectOnce'
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()

    useEffectOnce(() => {
        router.push('/sign/up')
    })
}
