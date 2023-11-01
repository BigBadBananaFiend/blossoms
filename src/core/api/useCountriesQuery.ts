import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'
import { API_ROUTES } from '../routes/api-routes'

// TODO: create shared types folder and move there
export interface ICountry {
    id: number
    name: string
    iso2: string
}

type IResponse = ICountry[]

const fetcher = async () => {
    const headers = new Headers()
    headers.append(
        'X-CSCAPI-KEY',
        'a3pvQzNlc3dSa1l4RVlzVEhtNGh0U1dUWG5rOGNIazNybjlzVVhtYg=='
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
