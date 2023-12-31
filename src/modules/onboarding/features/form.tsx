'use client'

import { Button, Input } from '@/src/libs/ui'
import { FC, FormEvent, useCallback, useState } from 'react'

import * as Icons from '@/src/libs/icons'

import style from './style.module.css'
import { useCountries } from '@/src/modules/onboarding/hooks/useCountries'
import { LocationSelect } from '../components/LocationSelect'
import { useCitites } from '../hooks/useCitites'
import { useOnboardingForm } from '../hooks/useOnboardingForm'
import { redirect, useRouter } from 'next/navigation'

export const OnboardingForm: FC = () => {
    const [name, setName] = useState<string>('')

    const {
        isLoading: areCountriesLoading,
        countries,
        value: country,
        setValue: setCountry,
        selectedCountry,
        uniqueData: uniqueCountries,
    } = useCountries()

    const {
        isLoading: areCitiesLoading,
        cities,
        value: city,
        setValue: setCity,
        uniqueData: uniqueCities,
    } = useCitites(selectedCountry?.iso2)

    const handleCountryChange = useCallback((value: string) => {
        setCountry(value)
        setCity('')
    }, [])

    const {
        formState,
        handleValidateCity,
        handleValidateCountry,
        handleValidateName,
        mutation,
    } = useOnboardingForm({ countries: uniqueCountries, cities: uniqueCities })

    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const isValid =
            handleValidateCity(city) &&
            handleValidateCountry(country) &&
            handleValidateName(name)

        if (isValid) {
            try {
                await mutation.mutateAsync({
                    name,
                    country,
                    city,
                })
                router.push('/')
            } catch (e) {
                console.error(e)
            }
        }
    }

    return (
        <form
            autoComplete="off"
            className={style.wrapper}
            onSubmit={(e) => handleSubmit(e)}
        >
            <Input
                label={'Username'}
                value={name}
                onChange={(e) => setName(e?.currentTarget.value ?? '')}
                startAndornment={<Icons.Name />}
                onBlur={() => handleValidateName(name)}
                isCritical={!formState.name.valid}
            />
            <LocationSelect
                name={'country'}
                andornment={<Icons.Globe />}
                label={'Countries'}
                isLoading={areCountriesLoading}
                items={countries}
                value={country}
                onChange={handleCountryChange}
                handleValidation={handleValidateCountry}
                isCritical={!formState.country.valid}
                isDirty={formState.country.dirty}
            />
            <LocationSelect
                name={'city'}
                andornment={<Icons.City />}
                label={'Cities'}
                isLoading={areCitiesLoading}
                items={cities}
                value={city}
                onChange={setCity}
                handleValidation={handleValidateCity}
                isCritical={!formState.city.valid}
                isDirty={formState.city.dirty}
                isDisabled={
                    areCountriesLoading || !country || !formState.country.valid
                }
            />
            <Button
                type={'submit'}
                text="Submit"
                isLoading={mutation.isLoading && !mutation.isError}
            />
        </form>
    )
}
