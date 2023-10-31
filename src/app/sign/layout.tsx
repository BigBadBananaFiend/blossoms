'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'
import style from './layout.module.css'
import { Captions } from '@/src/modules/sign/components/captions/Captions'
import { useAtomValue } from 'jotai'
import { userAtom } from '@/src/core/data/user/user'

export default function SignLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()

    const isIn = useMemo(() => pathname === '/sign/in', [pathname])

    const identity = useAtomValue(userAtom)

    if (identity?.isVerified) {
        return null
    }

    return (
        <div className={style['page-wrapper']}>
            <div className={style['content-wrapper']}>
                <div>
                    <h1 className="text-green">blossoms</h1>
                    <Captions />
                </div>
                <div>
                    <h4>{isIn ? 'sign in' : 'sign up'}</h4>
                    {children}
                </div>
            </div>
        </div>
    )
}
