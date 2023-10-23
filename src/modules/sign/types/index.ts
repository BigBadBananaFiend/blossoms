export interface ISignFormData {
    email: string
    password: string
}

export interface ICustomValidationResult {
    isValid: boolean
    message?: string | undefined
}
