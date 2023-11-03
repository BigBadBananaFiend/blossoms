import { GoogleLogin, GoogleLoginProps } from '@react-oauth/google'
import style from './style.module.css'

interface ISignWithGoogleProps
    extends Omit<GoogleLoginProps, 'text' | 'size'> {}

export const SignWithGoogle = (props: ISignWithGoogleProps) => {
    return (
        <div className={style.wrapper}>
            <GoogleLogin text="signup_with" size={'large'} {...props} />
        </div>
    )
}
