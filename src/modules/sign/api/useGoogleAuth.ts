import { API_ROUTES } from '@/src/core/routes/api-routes'
import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query'

export interface IFetchParams {
    code: string
}

export interface IResponse {
    ok: boolean
    message?: string
}

const fetcher = async ({ code }: IFetchParams) => {
    const response = await fetch(API_ROUTES.sign.sso.google, {
        method: 'POST',
        body: JSON.stringify({ code }),
    })

    return await response.json()
}

export const useGoogleAuthMutation = (
    options?: UseMutationOptions<IResponse, Error, IFetchParams>
): UseMutationResult<IResponse, Error, IFetchParams> => {
    const queryFn = (params: IFetchParams) => fetcher(params)

    return useMutation(queryFn, options)
}
