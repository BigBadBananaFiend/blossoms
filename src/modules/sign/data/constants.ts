import { ISignFormData } from '../types'

export const DEFAULT_SIGN_FORM_VALUES: ISignFormData = {
    email: '',
    password: '',
}

export const PASSWORD_ERROR_MESSAGES = {
    general: 'Entar a valid password',
    length: 'Min. 8 characters required',
    number: 'A number is required',
    uppercase: 'An uppercase letter is required',
    strength: 'Password is not strong enough',
}
