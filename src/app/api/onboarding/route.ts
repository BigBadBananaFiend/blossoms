import { isOnboardingBodyValid } from '@/src/core/utils/api/onboardingBodyValidator'
import { PrismaClient } from '@prisma/client'
import { getTokenPayload } from '@/src/core/utils/api/token'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export default async function POST(req: Request) {
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

        await prisma.user.update({
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

        return Response.json(
            { userId: id },
            {
                status: 200,
            }
        )
    } catch (e) {
        return Response.json(
            { error: 'Internal service error' },
            { status: 500 }
        )
    }
}
