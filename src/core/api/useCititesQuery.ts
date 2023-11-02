import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'
import { API_ROUTES } from '../routes/api-routes'

interface IFetchParams {
    country?: string
}

// TODO: create shared types folder and move there
export interface ICity {
    id: number
    name: string
}

type IResponse = ICity[]

const fetcher = async ({ country: ios }: IFetchParams) => {
    const headers = new Headers()
    headers.append(
        'X-CSCAPI-KEY',
        'a3pvQzNlc3dSa1l4RVlzVEhtNGh0U1dUWG5rOGNIazNybjlzVVhtYg=='
    )
    const result = await fetch(API_ROUTES.external.cities(ios ?? ''), {
        headers,
    })

    return await result.json()
}

export const useCitiesQuery = (
    params: IFetchParams,
    options?: UseQueryOptions
): UseQueryResult<IResponse, Error> => {
    const queryKey = ['cities/list', params.country]
    const queryFn = () => fetcher(params)

    return useQuery({
        queryKey,
        queryFn,
        enabled: !!params.country,
        ...options,
    }) as UseQueryResult<IResponse, Error>
}
