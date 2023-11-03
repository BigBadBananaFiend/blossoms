import { isOnboardingBodyValid } from '@/src/core/utils/api/type-guards/onboarding'
import { PrismaClient } from '@prisma/client'
import { getTokenPayload } from '@/src/core/utils/api/type-guards/token'
import { cookies } from 'next/headers'
import { createSecretKey } from 'crypto'
import { SignJWT } from 'jose'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const token = cookies().get('token')?.value

    if (!token) {
        return Response.json(
            { ok: false, error: 'Access denied' },
            { status: 403 }
        )
    }

    try {
        const body = await req.json()

        if (!isOnboardingBodyValid(body)) {
            return Response.json({ error: 'Bad request' }, { status: 400 })
        }

        const tokenPayload = await getTokenPayload(token)

        if (!tokenPayload) {
            return Response.json(
                { ok: false, error: 'Access denied' },
                { status: 403 }
            )
        }

        const { id } = tokenPayload

        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                onBoard: true,
            },
        })

        await prisma.userDetail.create({
            data: {
                ...body,
                id,
            },
        })

        const secret = createSecretKey(process.env.TOKEN_SECRET!, 'utf-8')
        const newToken = await new SignJWT({
            onBoard: user.onBoard,
            id: user.id,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret)

        cookies().set('token', newToken, { httpOnly: true })

        return Response.json(
            { userId: id },
            {
                status: 200,
            }
        )
    } catch (e) {
        console.log(e)
        return Response.json(
            { error: 'Internal service error' },
            { status: 500 }
        )
    }
}
