'use client'

import { Input } from '@/src/libs/ui'
import { FC, useState } from 'react'
import { LocationSelect } from '../components/LocationSelect'

import * as Icons from '@/src/libs/icons'

import style from './style.module.css'
import { ICity } from '@/src/core/api'

export const OnboardingForm: FC = () => {
    const [country, setCountry] = useState<ICity>()

    return (
        <form className={style.wrapper}>
            <Input label="Name" startAndornment={<Icons.Name />} />
            <LocationSelect setCountry={setCountry} />
        </form>
    )
}
