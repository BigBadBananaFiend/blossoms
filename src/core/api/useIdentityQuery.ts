'use client'

import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { API_ROUTES } from '../routes/api-routes'
import { IUserIdentity } from '../data/identity/identity-state'

interface IResponse extends IUserIdentity {}

const fetcher = async () =>
    await fetch(API_ROUTES.identity, {
        credentials: 'same-origin',
    }).then((data) => data.json())

export const useIdentity = (
    options?: UseQueryOptions
): UseQueryResult<IResponse, Error> => {
    const queryKey = ['user/identity']
    const queryFn = () => fetcher()

    return useQuery({
        queryKey,
        queryFn,
        staleTime: 60 * 60,
        ...options,
    }) as UseQueryResult<IResponse, Error>
}
