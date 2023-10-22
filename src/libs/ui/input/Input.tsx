'use client'

import {
    FC,
    ReactNode,
    useMemo,
    useCallback,
    FocusEvent,
    useState,
    ChangeEvent,
    ElementRef,
    useRef,
    useImperativeHandle,
    forwardRef,
    Ref,
} from 'react'
import style from './input.module.css'
import classnames from 'classnames'
import { mergeRefs } from '@/src/utils/ref'

interface IPropsForInput {
    placeholder?: string
    label?: string
    type?: string
    onFocus?: (e?: FocusEvent<HTMLInputElement, Element>) => void
    onBlur?: (e?: FocusEvent<HTMLInputElement, Element>) => void
    onChange?: (e?: ChangeEvent<HTMLInputElement>) => void
    startAndornment?: ReactNode
    startAndornmentFn?: () => void
    endAndornment?: ReactNode
    endAndornmentFn?: () => void
}

type InputRef = ElementRef<'input'>

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
        } = props

        const [isFocused, setIsFocused] = useState<boolean>(false)
        const [value, setValue] = useState<string>()
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
                setValue(e.target.value)
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
            [`${style.focused}`]: isFocused,
        })

        const atomicLabelClass = classnames({
            [`${style.label}`]: true,
            [`${style.elevated}`]: isElevated,
        })

        return (
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
                        ref={_ref}
                        onBlur={(e) => handleBlur(e)}
                        onFocus={(e) => handleFocus(e)}
                        onChange={(e) => handleChange(e)}
                        type={props.type ?? 'text'}
                        placeholder={props.placeholder}
                        className={style.input}
                        value={value}
                    ></input>
                </div>
                {props.endAndornment && EndAndornment}
            </div>
        )
    }
)

Input.displayName = 'input'
