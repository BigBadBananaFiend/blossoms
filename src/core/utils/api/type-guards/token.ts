import * as jose from 'jose'

export const isPayloadValid = (
    value: string | jose.JWTPayload | null
): value is { onBoard: boolean; id: string } => {
    if (!value || value instanceof String) {
        return false
    }

    if (value instanceof Object && 'onBoard' in value && 'id' in value) {
        return true
    }

    return false
}

export const getTokenPayload = async (token: string) => {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!)

    try {
        const { payload } = await jose.jwtVerify(token, secret)

        if (!isPayloadValid(payload)) {
            return null
        }

        return payload
    } catch (e) {
        return null
    }
}
