import { FC, ReactNode, useCallback, useRef, useState } from 'react'

import { Virtuoso } from 'react-virtuoso'

import 'react-loading-skeleton/dist/skeleton.css'
import { Input } from '@/src/libs/ui'
import { ICountry } from '@/src/core/api'
import Skeleton from 'react-loading-skeleton'
import { Icons } from '@/src/libs'

import style from './style.module.css'

interface ICountrySelectProps {
    isLoading: boolean
    countries: ICountry[]
    value: string
    setValue: (value: string) => void
    resetCity: () => void
}

export const CountrySelect: FC<ICountrySelectProps> = ({
    isLoading,
    countries,
    value,
    setValue,
    resetCity,
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleBlur = useCallback(() => {
        setIsOpen(false)
        inputRef?.current?.blur()
    }, [])

    const handleSelectCountry = useCallback((country: ICountry) => {
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
                startAndornment={<Icons.Globe />}
                ref={inputRef}
                label={'Country'}
                value={value}
                onChange={(e) => {
                    setValue(e?.currentTarget.value ?? '')
                    resetCity()
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
                                onClick={() => {
                                    handleSelectCountry(country)
                                    resetCity()
                                }}
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
