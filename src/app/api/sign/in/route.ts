import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { SignJWT } from 'jose'
import bcrypt from 'bcrypt'
import { isSignBodyValid } from '@/src/core/utils/api/type-guards/sign'
import { createSecretKey } from 'crypto'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()

        if (!isSignBodyValid(body)) {
            return Response.json({ error: 'Bad request' }, { status: 400 })
        }

        const { email, password } = body

        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        })

        if (!user) {
            return Response.json({ error: 'User not found' }, { status: 404 })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return Response.json({ error: 'Invalid password' }, { status: 401 })
        }

        const secret = createSecretKey(process.env.TOKEN_SECRET!, 'utf-8')
        const token = await new SignJWT({
            onBoard: user.onBoard,
            id: user.id,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret)

        cookies().set('token', token, { httpOnly: true })

        return Response.json(
            { userId: user.id },
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
