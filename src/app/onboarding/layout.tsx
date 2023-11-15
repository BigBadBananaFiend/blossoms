import { ReactNode } from 'react'
import style from './layout.module.css'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className={style['page-wrapper']}>
            <div className={style['content-wrapper']}>
                <div>
                    <h3 className="text-green">Tell us about yourself</h3>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}
