import { FC } from 'react'
import { ContentWrapper } from '../../components'
import { SignWithGoogle } from '../../components/google/SignWithGoogle'
import { CredentialResponse } from '@react-oauth/google'

export const SSO: FC = () => {
    const onSuccess = async (data: CredentialResponse) => {
        const { credential } = data

        const response = await fetch('http://localhost:3000/api/sign/sso/up', {
            method: 'POST',
            body: JSON.stringify({
                token: credential,
            }),
        })
    }

    return (
        <ContentWrapper>
            <h5 style={{ textAlign: 'center' }}>or</h5>
            <SignWithGoogle locale={'en_US'} onSuccess={onSuccess} />
        </ContentWrapper>
    )
}
