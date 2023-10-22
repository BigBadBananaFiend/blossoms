'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'
import style from './layout.module.css'
import { Captions } from '../components/Sign/Caption'

export default function SignLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()

    const isIn = useMemo(() => pathname === '/sign/in', [pathname])

    console.log('render')

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
