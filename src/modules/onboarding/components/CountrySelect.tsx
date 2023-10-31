import { useCitiesQuery } from '@/src/core/api/useCititesQuery'
import { useCountriesQuery } from '@/src/core/api/useCountriesQuery'
import { Select } from '@/src/libs/ui/select/Select'
import { SelectItem } from '@/src/libs/ui/select/SelectItem'
import { FC, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

export const CountrySelect: FC = () => {
    const [country, setCountry] = useState<string>('')
    const [city, setCity] = useState<string>('')

    const { isLoading: areCountriesLoading, data: countries } =
        useCountriesQuery()
    const {
        isLoading: areCitiesLoading,
        data: cities,
        refetch,
    } = useCitiesQuery({
        ios: country,
    })

    if (areCitiesLoading || areCountriesLoading) {
        return <Skeleton count={2} />
    }

    return (
        <>
            <Select
                name="country"
                value={country}
                setValue={setCountry}
                valuePlaceholder={'Select country'}
            >
                {countries?.map((i) => (
                    <SelectItem key={i.id} value={i.iso2} itemText={i.name} />
                ))}
            </Select>
            <Select
                name="city"
                value={city}
                setValue={setCity}
                valuePlaceholder={'Select city'}
            >
                {cities?.map((i) => (
                    <SelectItem value={i.name} itemText={i.name} key={i.id} />
                ))}
            </Select>
        </>
    )
}
