import { isGoogleSSOBodyValid } from '@/src/core/utils/api/type-guards/google-sso'
import { PrismaClient, User } from '@prisma/client'
import { createSecretKey } from 'crypto'
import { SignJWT } from 'jose'
import * as jose from 'jose'
import { cookies } from 'next/headers'

/* 
    TODO: I should also verify that the token is actually from google
    but a man can only have so much fun on a friday night... 
*/

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const appSecret = createSecretKey(process.env.TOKEN_SECRET!, 'utf-8')

    try {
        const body = await req.json()

        if (!isGoogleSSOBodyValid(body)) {
            return Response.json({ error: 'Bad request' }, { status: 400 })
        }

        const { token } = body

        // TODO: typeguard
        const payload = jose.decodeJwt(token) as { email: string }
        const { email } = payload

        let user: User | null

        user = await prisma.user.findFirst({
            where: {
                email,
            },
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    onBoard: false,
                },
            })
        }

        const newToken = await new SignJWT({
            onBoard: user.onBoard,
            id: user.id,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .sign(appSecret)

        cookies().set('token', newToken, { httpOnly: true })

        return Response.json({ ok: true }, { status: 200 })
    } catch (e) {
        console.error(e)
    }
}
