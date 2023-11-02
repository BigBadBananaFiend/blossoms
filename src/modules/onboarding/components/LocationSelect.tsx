import { Input } from '@/src/libs/ui'
import { ReactNode, useCallback, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Virtuoso } from 'react-virtuoso'
import style from './style.module.css'
import { ILocation } from '../types'

interface ILocationSelectProps<T extends ILocation> {
    andornment: ReactNode
    label: string
    isLoading: boolean
    items: T[]
    value: string
    onChange: (value: string) => void
}

export const LocationSelect = <T extends ILocation>({
    andornment,
    isLoading,
    items,
    value,
    onChange,
    label,
}: ILocationSelectProps<T>) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleBlur = useCallback(() => {
        setIsOpen(false)
        inputRef?.current?.blur()
    }, [])

    const handleSelectItem = useCallback((value: T) => {
        onChange(value.name)
        handleBlur()
    }, [])

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
                startAndornment={andornment}
                ref={inputRef}
                label={label}
                value={value}
                onChange={(e) => {
                    onChange(e?.currentTarget.value ?? '')
                }}
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
