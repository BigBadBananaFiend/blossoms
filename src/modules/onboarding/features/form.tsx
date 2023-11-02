'use client'

import { Input } from '@/src/libs/ui'
import { FC, useCallback, useState } from 'react'
import { CountrySelect } from '../components/CountrySelect'

import * as Icons from '@/src/libs/icons'

import style from './style.module.css'
import { useCountries } from '@/src/modules/onboarding/hooks/useCountries'
import { CitySelect } from '../components/CitySelect'
import { useCitites } from '../hooks/useCitites'

export const OnboardingForm: FC = () => {
    const { isLoading, countries, value, setValue, selectedCountry } =
        useCountries()

    const {
        isLoading: _isLoading,
        cities,
        value: _value,
        setValue: _setValue,
    } = useCitites(selectedCountry?.iso2)

    const handleResetCity = useCallback(() => _setValue(''), [])

    return (
        <form className={style.wrapper}>
            <Input label="Name" startAndornment={<Icons.Name />} />
            <CountrySelect
                isLoading={isLoading}
                countries={countries}
                value={value}
                setValue={setValue}
                resetCity={handleResetCity}
            />
            <CitySelect
                isLoading={_isLoading}
                citites={cities}
                value={_value}
                setValue={_setValue}
            />
        </form>
    )
}
