import { useCitiesQuery } from '@/src/core/api/useCititesQuery'
import { useCountriesQuery } from '@/src/core/api/useCountriesQuery'
import { Select } from '@/src/libs/ui/select/Select'
import { SelectItem } from '@/src/libs/ui/select/SelectItem'
import { FC, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import * as Icons from '@/src/libs/icons'

import 'react-loading-skeleton/dist/skeleton.css'
import style from './style.module.css'

export const LocationSelect: FC = () => {
    const [country, setCountry] = useState<string>('')
    const [city, setCity] = useState<string>('')

    const { isLoading: areCountriesLoading, data: countries } =
        useCountriesQuery()
    const { isLoading: areCitiesLoading, data: cities } = useCitiesQuery({
        ios: country,
    })

    if (areCitiesLoading || areCountriesLoading) {
        return [country, city].map((_, index) => (
            <Skeleton key={index} className={style.skeleton} />
        ))
    }

    return (
        <>
            <Select
                name="country"
                value={country}
                startAndorment={<Icons.Globe />}
                setValue={setCountry}
                valuePlaceholder={'Select country'}
                onValueChange={() => setCity('')}
            >
                {countries?.map((i) => (
                    <SelectItem key={i.id} value={i.iso2} itemText={i.name} />
                ))}
            </Select>
            <Select
                name="city"
                value={city}
                startAndorment={<Icons.City />}
                setValue={setCity}
                valuePlaceholder={'Select city'}
            >
                {cities?.map((i, index) => (
                    <SelectItem value={i.name} itemText={i.name} key={index} />
                ))}
            </Select>
        </>
    )
}
