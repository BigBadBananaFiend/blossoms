import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'

interface IResponse {}

const fetcher = async () =>
    await fetch('http://localhost:3000/sign/api/identity', {
        credentials: 'include',
    })

export const useIdentity = (
    options?: UseQueryOptions<IResponse, any>
): UseQueryResult<IResponse, any> => {
    const queryKey = ['identity']
    const queryFn = () => fetcher()

    return useQuery({
        queryKey,
        queryFn,
        ...options,
    })
}
