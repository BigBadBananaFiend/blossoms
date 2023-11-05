import { ReactNode, FC, MouseEvent, useMemo } from 'react'
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
    type?: 'button' | 'submit' | 'reset'
}

export const Button: FC<IButtonProps> = (props: IButtonProps) => {
    const {
        onClick,
        isDisabled,
        text,
        isLoading,
        variant = 'Primary',
        type,
        icon,
    } = props

    const atomicClass = classnames({
        [`${style.main}`]: true,
        [`${style.primary}`]: variant === 'Primary',
        [`${style.secondary}`]: variant === 'Secondary',
    })

    const innerContent = useMemo(() => {
        if (!icon) {
            return text
        }

        return (
            <div className={style['inner-content']}>
                {icon}
                {text}
            </div>
        )
    }, [icon, text])

    return (
        <button
            disabled={isDisabled}
            className={atomicClass}
            onClick={(e) => (isDisabled ? null : onClick?.(e))}
            type={type}
        >
            <div className={style['text-wrapper']}>
                {isLoading ? <ThreeDots /> : innerContent}
            </div>
        </button>
    )
}
