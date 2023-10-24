import { isBodyValid } from '@/src/core/utils/api/signBodyValidator'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import * as jwt from 'jsonwebtoken'

// TODO: Should probably re-use one instance for all endpoints
const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()

        if (!isBodyValid(body)) {
            return new Response('Bad request', { status: 400 })
        }

        const { email, password } = body

        if (
            await prisma.user.findFirst({
                where: {
                    email,
                },
            })
        ) {
            return new Response('User already exists', { status: 400 })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await prisma.user.create({
            data: {
                email,
                password: hash,
            },
        })

        // TODO: Add jwt secret
        const token = jwt.sign({ email, id: user.id }, 'token')
        cookies().set('token', token, { httpOnly: true })

        // TODO: Secure can not be false on prod
        return new Response('User created', {
            status: 200,
        })
    } catch (e) {
        // TODO: Do not log on prod
        console.error(e)
        return new Response('Internal server error', { status: 500 })
    }
}
