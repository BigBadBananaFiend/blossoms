import { ReactElement } from 'react'
import style from './style.module.css'

export const InputWrapper = ({ children }: { children: ReactElement[] }) => {
    return <div className={style['input-wrapper']}>{children}</div>
}
