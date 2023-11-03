import { ISignFormData } from '@/src/modules/sign/types'

export const isSignBodyValid = (body: any): body is ISignFormData => {
    return 'email' in body && 'password' in body
}
