'use client'

import {
    ReactNode,
    useMemo,
    useCallback,
    FocusEvent,
    useState,
    ChangeEvent,
    ElementRef,
    useRef,
    forwardRef,
} from 'react'
import style from './input.module.css'
import classnames from 'classnames'
import { mergeRefs } from '@/src/core/utils/client/ref'

export interface IPropsForInput {
    placeholder?: string
    value?: string | number
    name?: string
    label?: string
    type?: string
    onFocus?: (e?: FocusEvent<HTMLInputElement, Element>) => void
    onBlur?: (e?: FocusEvent<HTMLInputElement, Element>) => void
    onChange?: (e?: ChangeEvent<HTMLInputElement>) => void
    startAndornment?: ReactNode
    startAndornmentFn?: () => void
    endAndornment?: ReactNode
    endAndornmentFn?: () => void
    isCritical?: boolean
    isDisabled?: boolean
    helperMessage?: string
    autoComplete?: 'on' | 'none'
}

export type InputRef = ElementRef<'input'>

export const Input = forwardRef<InputRef, IPropsForInput>(
    (props: IPropsForInput, ref) => {
        const {
            startAndornment,
            startAndornmentFn,
            endAndornment,
            endAndornmentFn,
            onBlur,
            onChange,
            onFocus,
            name,
            value,
            isCritical,
            isDisabled,
            helperMessage,
            autoComplete = 'on',
        } = props

        const [isFocused, setIsFocused] = useState<boolean>(false)
        const innerRef = useRef<InputRef>(null)

        const _ref = mergeRefs([ref, innerRef])

        const isElevated = useMemo(
            () => Boolean(isFocused) || Boolean(value),
            [isFocused, value]
        )

        const handleBlur = useCallback(
            (e: FocusEvent<HTMLInputElement, Element>) => {
                setIsFocused(false)
                onBlur?.(e)
            },
            [onBlur]
        )

        const handleFocus = useCallback(
            (e: FocusEvent<HTMLInputElement, Element>) => {
                setIsFocused(true)
                onFocus?.(e)
            },
            [onFocus]
        )

        const handleChange = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                onChange?.(e)
            },
            [onChange]
        )

        const StartAndornment = useMemo(() => {
            const atomicClass = classnames({
                [`${style.andornment}`]: true,
                [`${style['andornment-start']}`]: true,
                [`${style['andornment-interactive']}`]:
                    Boolean(startAndornmentFn),
            })

            return (
                <div
                    className={atomicClass}
                    onClick={
                        startAndornmentFn
                            ? (e) => {
                                  e.stopPropagation()
                                  startAndornmentFn?.()
                              }
                            : undefined
                    }
                >
                    {startAndornment}
                </div>
            )
        }, [startAndornment, startAndornmentFn])

        const EndAndornment = useMemo(() => {
            const atomicClass = classnames({
                [`${style.andornment}`]: true,
                [`${style['andornment-start']}`]: true,
                [`${style['andornment-interactive']}`]:
                    Boolean(endAndornmentFn),
            })
            return (
                <div
                    className={atomicClass}
                    onClick={
                        endAndornmentFn
                            ? (e) => {
                                  e.stopPropagation()
                                  endAndornmentFn?.()
                              }
                            : undefined
                    }
                >
                    {endAndornment}
                </div>
            )
        }, [endAndornment, endAndornmentFn])

        const atomicWrapperClass = classnames({
            [`${style.wrapper}`]: true,
            [`${style.focused}`]: isFocused && !isCritical,
            [`${style.critical}`]: isCritical,
        })

        const atomicLabelClass = classnames({
            [`${style.label}`]: true,
            [`${style.elevated}`]: isElevated,
        })

        return (
            <div className={style['component-wrapper']}>
                <div className={atomicWrapperClass}>
                    {props.startAndornment && StartAndornment}
                    <div className={style.inner}>
                        <label
                            onClick={() => innerRef.current?.focus()}
                            className={atomicLabelClass}
                        >
                            {props.label}
                        </label>
                        <input
                            disabled={isDisabled}
                            autoComplete={autoComplete}
                            ref={_ref}
                            onBlur={(e) => handleBlur(e)}
                            onFocus={(e) => handleFocus(e)}
                            onChange={(e) => handleChange(e)}
                            type={props.type ?? 'text'}
                            name={name}
                            placeholder={props.placeholder}
                            className={style.input}
                            value={value}
                        ></input>
                    </div>
                    {props.endAndornment && EndAndornment}
                </div>
                <div className={style['message-wrapper']}>
                    <span className={style['message-content']}>
                        {helperMessage}
                    </span>
                </div>
            </div>
        )
    }
)

Input.displayName = 'input'
