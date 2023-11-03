import { Email } from '@/src/libs/icons'
import { Input, Button } from '@/src/libs/ui'
import { Controller, useForm } from 'react-hook-form'
import { ContentWrapper, PasswordInput } from '../../components'
import { ISignFormData } from '../../types'
import { DEFAULT_SIGN_FORM_VALUES } from '../../data'
import { useCallback } from 'react'
import { useValidateEmail } from '../../hooks/useValidateEmail'
import { useSignInMutation } from '../../api/useSignIn'
import { redirect, useRouter } from 'next/navigation'

export const SignInForm = () => {
    const {
        handleSubmit,
        control,
        getValues,
        formState: { errors, dirtyFields },
    } = useForm<ISignFormData>({
        defaultValues: DEFAULT_SIGN_FORM_VALUES,
        mode: 'onTouched',
    })

    const emailValidation = useValidateEmail()
    const { isLoading, isError, isSuccess, mutateAsync } = useSignInMutation()

    const router = useRouter()

    const handleEmailValidation = useCallback(() => {
        if (!dirtyFields.email) {
            return
        }

        const { isValid, message } = emailValidation(getValues('email'))
        return isValid || message
    }, [dirtyFields.email, emailValidation, getValues])

    const submit = useCallback(
        async (data: ISignFormData) => {
            try {
                await mutateAsync(data)
                router.push('/')
            } catch (e) {
                console.log(e)
            }
        },
        [mutateAsync]
    )

    return (
        <form onSubmit={handleSubmit((data) => submit(data))}>
            <ContentWrapper>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        validate: {
                            isValid: handleEmailValidation,
                        },
                    }}
                    name="email"
                    render={({
                        field: { onChange, onBlur, value, ref, name },
                    }) => (
                        <Input
                            name={name}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            ref={ref}
                            label={'E-mail'}
                            startAndornment={<Email size={20} />}
                            isCritical={!!errors.email}
                            helperMessage={errors.email?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    rules={{
                        required: true || 'Required field',
                    }}
                    name="password"
                    render={({
                        field: { onChange, onBlur, value, ref, name },
                    }) => (
                        <PasswordInput
                            name={name}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            ref={ref}
                            isCritical={!!errors.password}
                            helperMessage={errors.password?.message}
                        />
                    )}
                />
                <Button isLoading={isLoading && !isError} text="Submit" />
            </ContentWrapper>
        </form>
    )
}
