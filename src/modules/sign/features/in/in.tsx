import { FC } from 'react'
import { SignInForm } from './form'

import style from '../style.module.css'
import { useGoogleAuthMutation } from '../../api/useGoogleAuth'
import { SignWithGoogle } from '../../components'
import { SignFormSkeleton } from '../../components/skeleton/Skeleton'

export const SignIn: FC = () => {
    const { isLoading, mutateAsync } = useGoogleAuthMutation()

    if (isLoading) {
        ;<SignFormSkeleton />
    }

    return (
        <div className={style.wrapper}>
            <SignInForm />
            <SignWithGoogle mutateAsync={mutateAsync} />
        </div>
    )
}
