import { EmailIcon } from '@/src/libs/icons'
import { Input, Button } from '@/src/libs/ui'
import { Controller, useForm } from 'react-hook-form'
import { InputWrapper, PasswordInput } from '../components'
import { ISignFormData } from '../types'
import { DEFAULT_SIGN_FORM_VALUES } from '../data'
import { useValidatePassword } from '../hooks/useValidatePassword'
import { useCallback } from 'react'
import { useValidateEmail } from '../hooks/useValidateEmail'

export const SignUpForm = () => {
    const {
        handleSubmit,
        control,
        getValues,
        formState: { errors, dirtyFields },
    } = useForm<ISignFormData>({
        defaultValues: DEFAULT_SIGN_FORM_VALUES,
        mode: 'onTouched',
    })

    const passwordValidation = useValidatePassword()
    const emailValidation = useValidateEmail()

    const handleEmailValidation = useCallback(() => {
        if (!dirtyFields.email) {
            return
        }

        const { isValid, message } = emailValidation(getValues('email'))
        return isValid || message
    }, [dirtyFields.email, emailValidation, getValues])

    const handlePasswordValidation = useCallback(() => {
        if (!dirtyFields.password) {
            return
        }

        const { isValid, message } = passwordValidation.validate(
            getValues('password')
        )
        return isValid || message
    }, [dirtyFields.password, getValues, passwordValidation])

    const submit = useCallback(async (data: ISignFormData) => {
        try {
            // TODO: store routes in some object
            const response = await fetch('http://localhost:3000/sign/api/up', {
                method: 'POST',
                body: JSON.stringify(data),
            })

            if (response) {
                console.log(await response.json())
            }
        } catch (e) {
            // handle error
        }
    }, [])

    return (
        <form onSubmit={handleSubmit((data) => submit(data))}>
            <InputWrapper>
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
                            startAndornment={<EmailIcon size={20} />}
                            isCritical={!!errors.email}
                            helperMessage={errors.email?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        validate: {
                            isValid: handlePasswordValidation,
                        },
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
                <Button text="Submit" />
            </InputWrapper>
        </form>
    )
}
