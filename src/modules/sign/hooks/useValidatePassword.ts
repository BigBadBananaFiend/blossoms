import { ZXCVBN } from '@/src/core/services'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { PASSWORD_ERROR_MESSAGES } from '../data'
import { ICustomValidationResult } from '../types'

export const useValidatePassword = () => {
    const [isZxcvbnLoaded, setIsZxcvbnLoaded] = useState<boolean>(false)

    useEffect(() => {
        ZXCVBN().then(() => setIsZxcvbnLoaded(true))
    }, [])

    const validate = useCallback(
        (password?: string | undefined): ICustomValidationResult => {
            if (!password) {
                return {
                    isValid: false,
                    message: PASSWORD_ERROR_MESSAGES.general,
                }
            }

            if (!window.zxcvbn) {
                console.warn('ZXCVBN not injected')
                return { isValid: false }
            }

            if (password.length < 8) {
                return {
                    isValid: false,
                    message: PASSWORD_ERROR_MESSAGES.length,
                }
            }

            if (!password.match(/([0-9])/)) {
                return { isValid: false, message: 'A number is required' }
            }

            if (!password.match(/([A-Z])/)) {
                return {
                    isValid: false,
                    message: PASSWORD_ERROR_MESSAGES.uppercase,
                }
            }

            if (window.zxcvbn(password).score < 2) {
                console.log(window.zxcvbn(password).score)
                return {
                    isValid: false,
                    message: PASSWORD_ERROR_MESSAGES.strength,
                }
            }

            return {
                isValid: true,
            }
        },
        []
    )

    return useMemo(() => ({ isZxcvbnLoaded, validate }), [isZxcvbnLoaded])
}
