import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'
import { API_ROUTES } from '../routes/api-routes'

interface IFetchParams {
    ios: string
}

// TODO: create shared types folder and move there
interface ICity {
    id: number
    name: string
}

type IResponse = ICity[]

const fetcher = async ({ ios }: IFetchParams) => {
    const headers = new Headers()
    headers.append(
        'X-CSCAPI-KEY',
        'a3pvQzNlc3dSa1l4RVlzVEhtNGh0U1dUWG5rOGNIazNybjlzVVhtYg=='
    )
    const result = await fetch(API_ROUTES.external.cities(ios), {
        headers,
    })

    return await result.json()
}

export const useCities = (
    params: IFetchParams,
    options?: UseQueryOptions
): UseQueryResult<IResponse, Error> => {
    const queryKey = ['cities/list', params.ios]
    const queryFn = () => fetcher(params)

    return useQuery({
        queryKey,
        queryFn,
        enabled: !!params.ios,
        ...options,
    }) as UseQueryResult<IResponse, Error>
}
