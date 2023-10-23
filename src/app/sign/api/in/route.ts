import { PrismaClient } from '@prisma/client'
import { isBodyValid } from '../utils'
import cookie from 'cookie'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()

        if (!isBodyValid(body)) {
            return new Response('Bad request', { status: 400 })
        }

        const { email, password } = body

        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        })

        if (!user) {
            return new Response('User not found', { status: 404 })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return new Response('Invalid password', { status: 401 })
        }

        // TODO: Add jwt secret
        const token = jwt.sign({ email, id: user.id }, 'token')

        // TODO: Secure can not be false on prod
        // TODO: Add refresh token logic
        return new Response('Signed in', {
            status: 200,
            headers: {
                'Set-Cookie': cookie.serialize('token', token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 60 * 60,
                    sameSite: 'strict',
                }),
            },
        })
    } catch (e) {
        return new Response('Internal server error', { status: 500 })
    }
}
