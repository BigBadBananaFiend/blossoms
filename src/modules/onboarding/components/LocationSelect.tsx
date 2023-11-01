import { FC, ReactNode, useCallback, useRef, useState } from 'react'

import { Virtuoso } from 'react-virtuoso'

import 'react-loading-skeleton/dist/skeleton.css'
import { useCountries } from '@/src/core/hooks/useCountries'
import { Input } from '@/src/libs/ui'
import { ICountry } from '@/src/core/api'
import Skeleton from 'react-loading-skeleton'

import style from './style.module.css'

interface ICountrySelectProps {
    setCountry: (country: ICountry) => void
}

export const LocationSelect: FC<ICountrySelectProps> = ({ setCountry }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { isLoading, countries, value, setValue } = useCountries()
    const [isOpen, setIsOpen] = useState(false)

    const handleBlur = useCallback(() => {
        setIsOpen(false)
        inputRef?.current?.blur()
    }, [])

    const handleSelectCountry = useCallback((country: ICountry) => {
        setValue(country.name)
        setCountry(country)
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
                ref={inputRef}
                label={'Country'}
                value={value}
                onChange={(e) => {
                    setValue(e?.currentTarget.value)
                }}
            />
            {isOpen && countries.length > 0 && (
                <div
                    className={style['suggestion-wrapper']}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <Virtuoso
                        data={countries}
                        itemContent={(_, country) => (
                            <p
                                className={style['suggestion-item']}
                                onClick={() => handleSelectCountry(country)}
                            >
                                {country.name}
                            </p>
                        )}
                    />
                </div>
            )}
        </div>
    )
}
