import { ReactNode, FC, MouseEvent } from 'react'
import classnames from 'classnames'
import style from './button.module.css'

type ButtonVariant = 'Primary' | 'Secondary'

interface IButtonProps {
    text: string
    onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
    isDisabled?: boolean
    icon?: ReactNode
    variant?: ButtonVariant
}

export const Button: FC<IButtonProps> = (props: IButtonProps) => {
    const { onClick, isDisabled, text, icon, variant = 'Primary' } = props

    const atomicClass = classnames({
        [`${style.main}`]: true,
        [`${style.primary}`]: variant === 'Primary',
    })

    return (
        <button className={atomicClass} onClick={(e) => onClick?.(e)}>
            <div className={style['text-wrapper']}>{text}</div>
        </button>
    )
}
