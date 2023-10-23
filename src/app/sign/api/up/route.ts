import { ISignFormData } from '@/src/modules/sign/types'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import * as jwt from 'jsonwebtoken'

const isValid = (body: any): body is ISignFormData => {
    return 'email' in body && 'password' in body
}

// TODO: Should probably re-use one instance for all endpoints
const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()

        console.log('THIS', body)

        if (!isValid(body)) {
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

        // TODO: CAN NOT BE SET TO FALSE ON PROD
        return new Response('User created', {
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
        // TODO: Only from dev
        console.error(e)
        return new Response('Something went wrong', { status: 500 })
    }
}
