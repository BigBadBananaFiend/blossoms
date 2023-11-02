import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'
import { API_ROUTES } from '../../../core/routes/api-routes'
import { ICountry } from '../types'

type IResponse = ICountry[]

const fetcher = async () => {
    const headers = new Headers()
    headers.append(
        'X-CSCAPI-KEY',
        process.env.NEXT_PUBLIC_COUNTRY_CITY_API_KEY!
    )
    const result = await fetch(API_ROUTES.external.countries, {
        headers,
    })

    return await result.json()
}

export const useCountriesQuery = (
    options?: UseQueryOptions
): UseQueryResult<IResponse, Error> => {
    const queryKey = ['countries/list']
    const queryFn = () => fetcher()

    return useQuery({ queryKey, queryFn, ...options }) as UseQueryResult<
        IResponse,
        Error
    >
}
