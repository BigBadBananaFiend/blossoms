'use client'

import { Input } from '@/src/libs/ui'
import { FC } from 'react'
import { LocationSelect } from '../components/LocationSelect'

import * as Icons from '@/src/libs/icons'

import style from './style.module.css'

export const OnboardingForm: FC = () => {
    return (
        <form className={style.wrapper}>
            <Input label="Name" startAndornment={<Icons.Name />} />
            <LocationSelect />
        </form>
    )
}
