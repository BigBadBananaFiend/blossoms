import { Input } from '@/src/libs/ui'
import { ReactNode, useCallback, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Virtuoso } from 'react-virtuoso'
import style from './style.module.css'
import { ILocation } from '../types'

interface ILocationSelectProps<T extends ILocation> {
    name: string
    andornment: ReactNode
    label: string
    isLoading: boolean
    items: T[]
    value: string
    onChange: (value: string) => void
    handleValidation: (value: string) => void
    isDirty?: boolean
    isCritical: boolean
    helperMessage?: string
    isDisabled?: boolean
}

export const LocationSelect = <T extends ILocation>({
    andornment,
    isLoading,
    items,
    value,
    onChange,
    label,
    name,
    handleValidation,
    isCritical,
    helperMessage,
    isDirty,
    isDisabled,
}: ILocationSelectProps<T>) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleBlur = useCallback(() => {
        setIsOpen(false)
        inputRef?.current?.blur()
        handleValidation(inputRef?.current?.value ?? '')
    }, [handleValidation])

    const handleSelectItem = useCallback(
        (value: T) => {
            onChange(value.name)
            setIsOpen(false)
            inputRef.current?.focus()

            if (isDirty) {
                handleValidation(value.name)
            }
        },
        [isDirty, onChange]
    )

    const handleChange = useCallback(
        (value: string) => {
            onChange(value)

            if (isDirty) {
                handleValidation(value)
            }
        },
        [isDirty]
    )

    if (isLoading) {
        return <Skeleton className={style.skeleton} />
    }

    return (
        <div
            style={{ position: 'relative' }}
            onFocus={() => setIsOpen(true)}
            onBlur={handleBlur}
        >
            <Input
                name={name}
                startAndornment={andornment}
                ref={inputRef}
                label={label}
                value={value}
                onChange={(e) => {
                    handleChange(e?.currentTarget.value ?? '')
                }}
                isCritical={isCritical}
                isDisabled={isDisabled}
                helperMessage={helperMessage}
                autoComplete={'none'}
            />
            {isOpen && items.length > 0 && (
                <div
                    className={style['suggestion-wrapper']}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <Virtuoso
                        data={items}
                        itemContent={(_, item) => (
                            <p
                                className={style['suggestion-item']}
                                onClick={() => handleSelectItem(item)}
                            >
                                {item.name}
                            </p>
                        )}
                    />
                </div>
            )}
        </div>
    )
}
