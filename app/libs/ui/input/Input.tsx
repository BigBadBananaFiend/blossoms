'use client'

import {
    FC,
    ReactNode,
    useMemo,
    useCallback,
    FocusEvent,
    useState,
    ChangeEvent,
    ReactElement,
} from 'react'
import style from './input.module.css'
import classnames from 'classnames'

interface IPropsForInput {
    placeholder?: string
    label?: string
    onFocus?: (e?: FocusEvent<HTMLInputElement, Element>) => void
    onBlur?: (e?: FocusEvent<HTMLInputElement, Element>) => void
    onChange?: (e?: ChangeEvent<HTMLInputElement>) => void
    startAndornment?: ReactNode
    startAndornmentFn?: () => void
    endAndornment?: ReactNode
    endAndornmentFn?: () => void
}

export const Input: FC<IPropsForInput> = (props: IPropsForInput) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [value, setValue] = useState<string>()

    const isElevated = useMemo(
        () => Boolean(isFocused) || Boolean(value),
        [isFocused, value]
    )

    const {
        startAndornment,
        startAndornmentFn,
        endAndornment,
        endAndornmentFn,
        onBlur,
        onChange,
        onFocus,
    } = props

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
        if (!Element) {
            return
        }
        return (
            <div
                className={`${style.andornment} ${style['andornment-start']}`}
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

    const EndAndornment = useMemo(
        () => (
            <div
                className={`${style.andornment} ${style['andornment-end']}`}
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
        ),
        [endAndornment, endAndornmentFn]
    )

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
                <label className={atomicLabelClass}>{props.label}</label>
                <input
                    onBlur={(e) => handleBlur(e)}
                    onFocus={(e) => handleFocus(e)}
                    onChange={(e) => handleChange(e)}
                    placeholder={props.placeholder}
                    className={style.input}
                    value={value}
                ></input>
            </div>
            {props.endAndornment && EndAndornment}
        </div>
    )
}
