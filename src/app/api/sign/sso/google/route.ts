import { PrismaClient, User } from '@prisma/client'
import { createSecretKey } from 'crypto'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import * as jose from 'jose'

import { OAuth2Client } from 'google-auth-library'

const prisma = new PrismaClient()
const oAuthClient = new OAuth2Client(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_SECRET!,
    'postmessage'
)

export async function POST(req: Request) {
    const appSecret = createSecretKey(process.env.TOKEN_SECRET!, 'utf-8')

    try {
        const body = await req.json()
        const { tokens } = await oAuthClient.getToken(body.code)
        const { id_token } = tokens

        if (!id_token) {
            return Response.json(
                { ok: false, message: 'Internal service error' },
                { status: 500 }
            )
        }

        const payload = jose.decodeJwt(id_token) as { email: string }
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

        return Response.json(
            { ok: false, message: 'Internal service errror' },
            { status: 500 }
        )
    }
}
