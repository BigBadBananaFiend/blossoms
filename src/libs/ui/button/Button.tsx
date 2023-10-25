import { ReactNode, FC, MouseEvent } from 'react'
import classnames from 'classnames'
import style from './button.module.css'
import { ThreeDots } from '../loaders/ThreeDots'

type ButtonVariant = 'Primary' | 'Secondary'

interface IButtonProps {
    text: string
    onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
    isDisabled?: boolean
    icon?: ReactNode
    variant?: ButtonVariant
    isLoading?: boolean
}

export const Button: FC<IButtonProps> = (props: IButtonProps) => {
    const { onClick, isDisabled, text, isLoading, variant = 'Primary' } = props

    const atomicClass = classnames({
        [`${style.main}`]: true,
        [`${style.primary}`]: variant === 'Primary',
    })

    return (
        <button
            disabled={isDisabled}
            className={atomicClass}
            onClick={(e) => (isDisabled ? null : onClick?.(e))}
        >
            <div className={style['text-wrapper']}>
                {isLoading ? <ThreeDots /> : text}
            </div>
        </button>
    )
}
