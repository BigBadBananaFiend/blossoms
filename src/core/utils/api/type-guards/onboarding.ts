import { IOnboardingFormData } from '@/src/modules/onboarding/types'

export const isOnboardingBodyValid = (
    body: any
): body is IOnboardingFormData => {
    return 'name' in body && 'country' in body && 'city' in body
}
