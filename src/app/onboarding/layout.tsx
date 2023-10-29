'use client'

import { ReactNode } from 'react'
import style from './layout.module.css'

export default function OnboardingLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <div className={style['page-wrapper']}>
            <div className={style['content-wrapper']}>{children}</div>
        </div>
    )
}
