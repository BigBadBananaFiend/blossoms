import { FC, Fragment } from 'react'
import { SignUpForm } from './form'
import { SSO } from './SSO'

export const SignUp: FC = () => {
    return (
        <Fragment>
            <SignUpForm />
            <SSO />
        </Fragment>
    )
}
