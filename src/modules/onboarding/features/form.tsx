'use client'

import { useCountriesQuery } from '@/src/core/api/useCountriesQuery'
import { Input } from '@/src/libs/ui'
import { Select } from '@/src/libs/ui/select/Select'
import { SelectGroup } from '@/src/libs/ui/select/SelectGroup'
import { SelectItem } from '@/src/libs/ui/select/SelectItem'
import { SelectSeparator } from '@/src/libs/ui/select/SelectSeparator'
import { FC, useState } from 'react'
import { CountrySelect } from '../components/CountrySelect'
import { CitySelect } from '../components/CitySelect'

export const OnboardingForm: FC = () => {
    return (
        <div>
            <h3>Tell us about yourself</h3>
            <Input label="Name" />
            <CountrySelect />
        </div>
    )
}
