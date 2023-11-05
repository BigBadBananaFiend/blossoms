import { FC, useCallback, useMemo } from 'react'
import { CodeResponse, useGoogleLogin } from '@react-oauth/google'

import style from './style.module.css'
import { UseMutateAsyncFunction } from 'react-query'
import { IFetchParams, IResponse } from '../../api/useGoogleAuth'
import { Icons } from '@/src/libs'
import { Button } from '@/src/libs/ui'
import { usePathname } from 'next/navigation'

interface ISignWithGoogleProps {
    mutateAsync: UseMutateAsyncFunction<IResponse, Error, IFetchParams, unknown>
}

export const SignWithGoogle: FC<ISignWithGoogleProps> = ({ mutateAsync }) => {
    const onSuccess = useCallback(
        async (
            codeResponse: Omit<
                CodeResponse,
                'error' | 'error_description' | 'error_uri'
            >
        ) => {
            try {
                await mutateAsync({ code: codeResponse.code })
            } catch (e) {
                console.log(e)
            }
        },
        []
    )

    const login = useGoogleLogin({
        onSuccess: onSuccess,
        flow: 'auth-code',
    })

    const pathname = usePathname()
    const isIn = useMemo(() => pathname === '/sign/in', [pathname])

    return (
        <div className={style.wrapper}>
            <h6>or</h6>
            <Button
                variant={'Secondary'}
                onClick={() => login()}
                text={`Sign ${isIn ? 'in' : 'up'} with Google`}
                icon={<Icons.Google />}
            />
        </div>
    )
}
