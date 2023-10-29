import { useCities } from '@/src/core/api/useCititesQuery'
import { Select } from '@/src/libs/ui/select/Select'
import { SelectItem } from '@/src/libs/ui/select/SelectItem'
import { FC, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

interface ICitySelect {
    country: string
}

export const CitySelect: FC<ICitySelect> = ({ country }: ICitySelect) => {
    const [city, setCity] = useState('')

    const { isLoading, data, refetch } = useCities({ ios: country })

    useEffect(() => {
        if (!country) {
            return
        }

        refetch()
    }, [country])

    console.log(country)

    if (isLoading) {
        return <Skeleton />
    }

    return (
        <Select
            name="city"
            value={city}
            setValue={setCity}
            valuePlaceholder={'Select city'}
        >
            {data?.map((i) => (
                <SelectItem value={i.name} itemText={i.name} key={i.id} />
            ))}
        </Select>
    )
}
