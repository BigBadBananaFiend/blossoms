import { useCallback } from 'react'
import { ICustomValidationResult } from '../types'

export const useValidateEmail = () => {
    return useCallback(
        (email?: string | undefined): ICustomValidationResult => {
            if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                return {
                    isValid: false,
                    message: 'Please enter a valid email',
                }
            }
            return {
                isValid: true,
            }
        },
        []
    )
}
