import { API_ROUTES } from '@/src/core/routes/api-routes'
import { IOnboardingFormData } from '../types'
import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query'

interface IFetchParams extends IOnboardingFormData {}

interface IResponse {
    userId: string
}

const fetcher = async (params: IFetchParams) => {
    const response = await fetch(API_ROUTES.onboarding, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(params),
    })
    return response.json()
}

export const useOnboardingMutation = (
    options?: UseMutationOptions<IResponse, Error, IFetchParams>
): UseMutationResult<IResponse, Error, IFetchParams, unknown> => {
    const mutationFn = (params: IFetchParams) => fetcher(params)

    return useMutation(mutationFn, {
        ...options,
    })
}
