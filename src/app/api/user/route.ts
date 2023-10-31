import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'

export async function GET() {
    const token = cookies().get('token')

    if (!token) {
        return Response.json(
            {
                isVerified: false,
                hasFinishedOnboarding: false,
            },
            {
                status: 403,
            }
        )
    }

    try {
        const { value } = token
        verify(value, 'token')

        return Response.json(
            {
                isVerified: true,
                hasFinishedOnboarding: false,
            },
            {
                status: 200,
            }
        )
    } catch (e) {
        return Response.json(
            {
                isVerified: false,
                hasFinishedOnboarding: false,
            },
            {
                status: 403,
            }
        )
    }
}
