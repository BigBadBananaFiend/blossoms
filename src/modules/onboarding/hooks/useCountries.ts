import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCountriesQuery } from '../api'

import Fuse from 'fuse.js'
import { useDebounce } from '../../../core/hooks/useDebounce'
import { ICountry } from '../types'

export const useCountries = () => {
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce(value)
    const [countries, setCountries] = useState<ICountry[]>([])

    const { data, isLoading, isError } = useCountriesQuery()

    const filteredData = useMemo(() => {
        if (!data) {
            return
        }
        const filteredData = new Map<string, ICountry>()
        data.forEach((c) => filteredData.set(c.name, c))

        return filteredData
    }, [data])

    const selectedCountry = useMemo(
        () => filteredData?.get(value),
        [filteredData, value]
    )

    useEffect(() => {
        if (!filteredData) {
            return
        }

        if (!debouncedValue) {
            setCountries([])
            return
        }

        if (filteredData.has(debouncedValue)) {
            return
        }

        const fuse = new Fuse(Array.from(filteredData.values()), {
            keys: ['name'],
        })

        setCountries(fuse.search(debouncedValue).map((c) => c.item))
    }, [debouncedValue, filteredData])

    const validateCountry = useCallback(() => {
        if (debouncedValue && !filteredData?.has(debouncedValue)) {
            return false
        }
        return true
    }, [debouncedValue, filteredData])

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
        }),
        [
            countries,
            data,
            isError,
            isLoading,
            value,
            validateCountry,
            selectedCountry,
        ]
    )
}
