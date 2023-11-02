import { cookies } from 'next/headers'
import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function GET() {
    const token = cookies().get('token')?.value

    if (!token) {
        return Response.json(
            { ok: false, error: 'Access denied' },
            { status: 403 }
        )
    }

    try {
        jwt.verify(token, process.env.TOKEN_SECRET!)
    } catch {
        return Response.json(
            { ok: false, error: 'Access denied' },
            { status: 403 }
        )
    }

    const decoded = jwt.decode(token) as { email: string; id: string }

    const { id } = decoded

    if (!id) {
        return Response.json(
            { ok: false, error: 'Internal service error' },
            { status: 500 }
        )
    }

    const user = await prisma.user.findFirst({
        where: {
            id,
        },
    })

    if (!user) {
        return Response.json(
            { ok: false, error: 'User not found' },
            { status: 404 }
        )
    }

    return Response.json({
        ok: true,
        onBoard: user.onBoard,
    })
}
