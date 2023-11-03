import { API_ROUTES } from '@/src/core/routes/api-routes'
import { IOnboardingFormData } from '../types'

interface IFetchParams extends IOnboardingFormData {}

interface IResponse {
    userId: string
}

const fetcher = async (params: IFetchParams) => {
    const response = await fetch(API_ROUTES.onboarding)
}
