import { isSignBodyValid } from '@/src/core/utils/api/signBodyValidator'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import { createSecretKey } from 'crypto'
import { SignJWT } from 'jose'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()

        if (!isSignBodyValid(body)) {
            return Response.json({ error: 'Bad request' }, { status: 400 })
        }

        const { email, password } = body

        if (
            await prisma.user.findFirst({
                where: {
                    email,
                },
            })
        ) {
            return Response.json(
                { error: 'User already exists' },
                { status: 400 }
            )
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await prisma.user.create({
            data: {
                email,
                password: hash,
                onBoard: false,
            },
        })

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
        console.error(e)
        return Response.json(
            { error: 'Internal service error' },
            { status: 500 }
        )
    }
}
