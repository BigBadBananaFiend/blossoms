import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'

export async function GET() {
    const token = cookies().get('token')

    if (!token) {
        return new Response('Access denied', { status: 403 })
    }

    try {
        const { value } = token
        console.log(value)
        verify(value, 'token')

        return new Response('Identity verified', { status: 200 })
    } catch (e) {
        return new Response('Access denied', { status: 403 })
    }
}
