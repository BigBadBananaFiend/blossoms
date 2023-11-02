import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCountriesQuery } from '../api'

import Fuse from 'fuse.js'
import { ICountry } from '../types'

export const useCountries = () => {
    const [value, setValue] = useState<string>('')
    const [countries, setCountries] = useState<ICountry[]>([])

    const { data, isLoading, isError } = useCountriesQuery({
        refetchOnWindowFocus: false,
        staleTime: 100 * 10000,
    })

    const uniqueData = useMemo(() => {
        if (!data) {
            return
        }
        const filteredData = new Map<string, ICountry>()
        data.forEach((c) => filteredData.set(c.name, c))

        return filteredData
    }, [data])

    const selectedCountry = useMemo(
        () => uniqueData?.get(value),
        [uniqueData, value]
    )

    useEffect(() => {
        if (!uniqueData) {
            return
        }

        if (!value) {
            setCountries([])
            return
        }

        if (uniqueData.has(value)) {
            return
        }

        const fuse = new Fuse(Array.from(uniqueData.values()), {
            keys: ['name'],
        })

        setCountries(fuse.search(value).map((c) => c.item))
    }, [value, uniqueData])

    const validateCountry = useCallback(() => {
        if (value && !uniqueData?.has(value)) {
            return false
        }
        return true
    }, [value, uniqueData])

    return useMemo(
        () => ({
            data,
            isLoading,
            isError,
            countries,
            value,
            setValue,
            validateCountry,
            selectedCountry,
            uniqueData,
        }),
        [
            countries,
            data,
            isError,
            isLoading,
            value,
            validateCountry,
            selectedCountry,
            uniqueData,
        ]
    )
}
