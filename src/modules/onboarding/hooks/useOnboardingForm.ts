import { useCallback, useMemo, useState } from 'react'
import { ICity, ICountry } from '../types'
import { useOnboardingMutation } from '../api/useOnboardingMutation'

const userNameRegEx = /^[A-Za-z0-9\s.-]+$/

interface IOnboardingFormField {
    valid: boolean
    dirty: boolean
    message?: string
}

interface IOnboardingFormState {
    name: IOnboardingFormField
    country: IOnboardingFormField
    city: IOnboardingFormField
}

const DEFAULT_ONBOARDING_FORM_FIELD: IOnboardingFormField = {
    valid: true,
    dirty: false,
}

export const DEFAULT_ONBOARDING_FORM_STATE: IOnboardingFormState = {
    name: DEFAULT_ONBOARDING_FORM_FIELD,
    country: DEFAULT_ONBOARDING_FORM_FIELD,
    city: DEFAULT_ONBOARDING_FORM_FIELD,
}

interface IUseOnboardingFormProps {
    countries: Map<string, ICountry> | undefined
    cities: Map<string, ICity> | undefined
}

export const useOnboardingForm = (props: IUseOnboardingFormProps) => {
    const [formState, setFormState] = useState<IOnboardingFormState>(
        DEFAULT_ONBOARDING_FORM_STATE
    )

    const mutation = useOnboardingMutation()

    const handleValidateName = useCallback((userName: string) => {
        if (!userNameRegEx.test(userName)) {
            setFormState((prev) => ({
                ...prev,
                name: {
                    valid: false,
                    dirty: true,
                    message: 'Please enter a valid username',
                },
            }))

            return false
        }

        setFormState((prev) => ({
            ...prev,
            name: {
                dirty: true,
                valid: true,
            },
        }))

        return true
    }, [])

    const handleValidateCountry = useCallback(
        (country: string) => {
            if (!props.countries) {
                return
            }

            if (!props.countries.has(country)) {
                setFormState((prev) => ({
                    ...prev,
                    country: {
                        valid: false,
                        dirty: true,
                        message: 'Enter a valid country',
                    },
                }))

                return false
            }

            setFormState((prev) => ({
                ...prev,
                country: {
                    valid: true,
                    dirty: true,
                },
            }))

            return true
        },
        [props.countries]
    )

    const handleValidateCity = useCallback(
        (city: string) => {
            if (!props.cities) {
                return
            }

            if (!props.cities.has(city)) {
                setFormState((prev) => ({
                    ...prev,
                    city: {
                        valid: false,
                        dirty: true,
                        message: 'Enter a valid city',
                    },
                }))

                return false
            }

            setFormState((prev) => ({
                ...prev,
                city: {
                    valid: true,
                    dirty: true,
                },
            }))

            return true
        },
        [props.cities]
    )

    return useMemo(
        () => ({
            formState,
            handleValidateCity,
            handleValidateCountry,
            handleValidateName,
            mutation,
        }),
        [
            formState,
            handleValidateCity,
            handleValidateCountry,
            handleValidateName,
            mutation,
        ]
    )
}
