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
            return Response.json(
                { ok: false, message: 'Bad request' },
                { status: 400 }
            )
        }

        const { email, password } = body

        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        })

        if (!user) {
            return Response.json(
                { ok: false, message: 'User not found' },
                { status: 404 }
            )
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return Response.json(
                { ok: false, message: 'Invalid password' },
                { status: 401 }
            )
        }

        // TODO: Add jwt secret
        const token = jwt.sign({ email, id: user.id }, 'token')

        // TODO: Add refresh token logic
        cookies().set('token', token, { httpOnly: true })
        return Response.json(
            { ok: true, message: 'User signed in' },
            {
                status: 200,
            }
        )
    } catch (e) {
        return Response.json(
            { ok: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
