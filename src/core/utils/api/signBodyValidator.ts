import { ISignFormData } from '@/src/modules/sign/types'

export const isBodyValid = (body: any): body is ISignFormData => {
    return 'email' in body && 'password' in body
}
