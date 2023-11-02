import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'
import { API_ROUTES } from '../../../core/routes/api-routes'
import { ICity } from '../types'

interface IFetchParams {
    countryIso2?: string
}

type IResponse = ICity[]

const fetcher = async ({ countryIso2 }: IFetchParams) => {
    const headers = new Headers()
    headers.append(
        'X-CSCAPI-KEY',
        process.env.NEXT_PUBLIC_COUNTRY_CITY_API_KEY!
    )
    const result = await fetch(API_ROUTES.external.cities(countryIso2 ?? ''), {
        headers,
    })

    return await result.json()
}

export const useCitiesQuery = (
    params: IFetchParams,
    options?: UseQueryOptions
): UseQueryResult<IResponse, Error> => {
    const queryKey = ['cities/list', params.countryIso2]
    const queryFn = () => fetcher(params)

    return useQuery({
        queryKey,
        queryFn,
        enabled: !!params.countryIso2,
        ...options,
    }) as UseQueryResult<IResponse, Error>
}
