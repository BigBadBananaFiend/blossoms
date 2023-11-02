import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { isBodyValid } from '@/src/core/utils/api/signBodyValidator'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()

        if (!isBodyValid(body)) {
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

        const token = jwt.sign(
            { email, id: user.id },
            process.env.TOKEN_SECRET!
        )
        cookies().set('token', token, { httpOnly: true })

        return Response.json(
            { userId: user.id },
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
