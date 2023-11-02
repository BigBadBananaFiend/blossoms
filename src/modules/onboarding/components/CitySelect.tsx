import { ICity } from '@/src/core/api'
import { Input } from '@/src/libs/ui'
import { FC, useCallback, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Virtuoso } from 'react-virtuoso'
import style from './style.module.css'
import { Icons } from '@/src/libs'

interface ICitySelectProps {
    isLoading: boolean
    citites: ICity[]
    value: string
    setValue: (value: string) => void
}

export const CitySelect: FC<ICitySelectProps> = ({
    isLoading,
    citites,
    value,
    setValue,
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleBlur = useCallback(() => {
        setIsOpen(false)
        inputRef?.current?.blur()
    }, [])

    const handleSelectCountry = useCallback((country: ICity) => {
        setValue(country.name)
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
                startAndornment={<Icons.City />}
                ref={inputRef}
                label={'City'}
                value={value}
                onChange={(e) => {
                    setValue(e?.currentTarget.value ?? '')
                }}
            />
            {isOpen && citites.length > 0 && (
                <div
                    className={style['suggestion-wrapper']}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <Virtuoso
                        data={citites}
                        itemContent={(_, city) => (
                            <p
                                className={style['suggestion-item']}
                                onClick={() => handleSelectCountry(city)}
                            >
                                {city.name}
                            </p>
                        )}
                    />
                </div>
            )}
        </div>
    )
}
