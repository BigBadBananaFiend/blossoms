import { useState } from 'react'
import { useDebounce } from '../useDebounce'

interface IFieldState {
    isDirty: boolean
    isValid: boolean | null
    isError: boolean
    error: string | null
}

interface IFormState {
    email: IFieldState
    password: IFieldState
}

const DEFAULT_FORM_STATE: IFormState = {
    email: {
        isDirty: false,
        isValid: null,
        isError: false,
        error: null,
    },
    password: {
        isDirty: false,
        isValid: null,
        isError: false,
        error: null,
    },
}

export function useSignUp(value: string) {
    const [formState, setFormState] = useState<IFormState>(DEFAULT_FORM_STATE)
    const debouncedValue = useDebounce(value)
}
