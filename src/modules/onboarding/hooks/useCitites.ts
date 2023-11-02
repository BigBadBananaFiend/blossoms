import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCitiesQuery, } from '../api'

import Fuse from 'fuse.js'
import { useDebounce } from '../../../core/hooks/useDebounce'
import { ICity } from '../types'

export const useCitites = (countryIso2?: string) => {
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce(value)
    const [cities, setCities] = useState<ICity[]>([])

    const { data, isLoading, isError } = useCitiesQuery({
        countryIso2,
    })

    const filteredData = useMemo(() => {
        if (!data) {
            return
        }
        const filteredData = new Map<string, ICity>()
        data?.forEach((c) => filteredData.set(c.name, c))

        return filteredData
    }, [data])

    useEffect(() => {
        if (!filteredData) {
            return
        }

        if (!debouncedValue) {
            setCities([])
            return
        }

        if (filteredData.has(debouncedValue)) {
            return
        }

        const fuse = new Fuse(Array.from(filteredData.values()), {
            keys: ['name'],
        })

        setCities(fuse.search(debouncedValue).map((c) => c.item))
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
            cities,
            value,
            setValue,
            validateCountry,
        }),
        [data, isLoading, isError, cities, value, validateCountry]
    )
}
