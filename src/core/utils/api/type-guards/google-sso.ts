export const isGoogleSSOBodyValid = (body: any): body is { token: string } => {
    return 'token' in body
}
