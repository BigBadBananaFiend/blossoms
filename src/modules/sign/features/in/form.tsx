import { EmailIcon } from '@/src/libs/icons'
import { Input, Button } from '@/src/libs/ui'
import { Controller, useForm } from 'react-hook-form'
import { InputWrapper, PasswordInput } from '../../components'
import { ISignFormData } from '../../types'
import { DEFAULT_SIGN_FORM_VALUES } from '../../data'
import { useCallback } from 'react'
import { useValidateEmail } from '../../hooks/useValidateEmail'
import { useIdentity } from '@/src/core/api'
import { API_ROUTES } from '@/src/core/routes/api-routes'

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

    const identity = useIdentity({ enabled: false })

    const emailValidation = useValidateEmail()

    const handleEmailValidation = useCallback(() => {
        if (!dirtyFields.email) {
            return
        }

        const { isValid, message } = emailValidation(getValues('email'))
        return isValid || message
    }, [dirtyFields.email, emailValidation, getValues])

    const submit = useCallback(async (data: ISignFormData) => {
        try {
            // TODO: store routes in some object
            const response = await fetch(API_ROUTES.sign.in, {
                method: 'POST',
                body: JSON.stringify(data),
            })

            // TODO => refetch identity => handle redirect up the tree
            identity.refetch()
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
                <Button text="Submit" />
            </InputWrapper>
        </form>
    )
}
