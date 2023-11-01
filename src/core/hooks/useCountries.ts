import { useEffect, useMemo, useState } from 'react'
import { useCountriesQuery } from '../api'

import Fuse from 'fuse.js'
import { useDebounce } from './useDebounce'

export const useCountries = (value: string) => {
    const debouncedTerm = useDebounce(value)
    const [countries, setCountries] = useState<string[]>([])

    const { data, isLoading, isError } = useCountriesQuery()

    useEffect(() => {
        if (!data) {
            return
        }

        if (!debouncedTerm) {
            setCountries([])
            return
        }

        const fuse = new Fuse(data, { keys: ['name'] })

        setCountries(fuse.search(debouncedTerm).map((c) => c.item.name))
    }, [data, debouncedTerm])

    return useMemo(
        () => ({
            data,
            isLoading,
            isError,
            countries,
        }),
        [countries, data, isError, isLoading]
    )
}
