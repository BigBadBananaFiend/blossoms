'use client'

import { Input } from '@/src/libs/ui'
import { FC, useCallback } from 'react'

import * as Icons from '@/src/libs/icons'

import style from './style.module.css'
import { useCountries } from '@/src/modules/onboarding/hooks/useCountries'
import { LocationSelect } from '../components/LocationSelect'
import { useCitites } from '../hooks/useCitites'
import Skeleton from 'react-loading-skeleton'

export const OnboardingForm: FC = () => {
    const { isLoading, countries, value, setValue, selectedCountry } =
        useCountries()

    const {
        isLoading: _isLoading,
        cities,
        value: _value,
        setValue: _setValue,
    } = useCitites(selectedCountry?.iso2)

    const handleCountryChange = useCallback((value: string) => {
        setValue(value)
        _setValue('')
    }, [])

    return (
        <form className={style.wrapper}>
            <Input label="Name" startAndornment={<Icons.Name />} />
            <LocationSelect
                andornment={<Icons.Globe />}
                label={'Countries'}
                isLoading={isLoading}
                items={countries}
                value={value}
                onChange={handleCountryChange}
            />
            <LocationSelect
                andornment={<Icons.City />}
                label={'Cities'}
                isLoading={_isLoading}
                items={cities}
                value={_value}
                onChange={_setValue}
            />
        </form>
    )
}
