'use client'

import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { API_ROUTES } from '../routes/api-routes'
import { IUser } from '../data/user/user'

interface IResponse extends IUser {}

const fetcher = async () =>
    await fetch(API_ROUTES.user, {
        credentials: 'same-origin',
    }).then((data) => data.json())

export const useUserQuery = (
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
