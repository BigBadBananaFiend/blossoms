import { ISignFormData, ISignInUpResponse } from '../types'
import { API_ROUTES } from '@/src/core/routes/api-routes'
import {
    UseMutationOptions,
    UseMutationResult,
    useMutation,
    useQueryClient,
} from 'react-query'

interface IFetchParams extends ISignFormData {}
interface IResponse extends ISignInUpResponse {}

const fetcher = async (params: IFetchParams) => {
    const response = await fetch(API_ROUTES.sign.up, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(params),
    })
    return response.json()
}

export const useSignUpMutation = (
    options?: UseMutationOptions<IResponse, Error, IFetchParams>
): UseMutationResult<IResponse, Error, IFetchParams, unknown> => {
    const mutationFn = (params: IFetchParams) => fetcher(params)

    return useMutation(mutationFn, {
        ...options,
    })
}
