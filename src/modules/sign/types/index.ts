export interface ISignFormData {
    email: string
    password: string
}

export interface ICustomValidationResult {
    isValid: boolean
    message?: string | undefined
}

export interface ISignInUpResponse {
    ok: boolean
    message?: string
}
