import { FC } from 'react'
import { SignUpForm } from './form'
import { SignWithGoogle } from '../../components/google/SignWithGoogle'

import style from '../style.module.css'
import { useGoogleAuthMutation } from '../../api/useGoogleAuth'
import { SignFormSkeleton } from '../../components/skeleton/Skeleton'

export const SignUp: FC = () => {
    const { isLoading, mutateAsync } = useGoogleAuthMutation()

    if (isLoading) {
        return <SignFormSkeleton />
    }

    return (
        <div className={style.wrapper}>
            <SignUpForm />
            <SignWithGoogle mutateAsync={mutateAsync} />
        </div>
    )
}
