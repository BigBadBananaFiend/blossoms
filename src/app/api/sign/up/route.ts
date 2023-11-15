import { isSignBodyValid } from '@/src/core/utils/api/type-guards/sign'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import { createSecretKey } from 'crypto'
import { SignJWT } from 'jose'
import { ResponseHandler } from '@/src/core/utils/api/ResponseHandler'

const prisma = new PrismaClient()
const responseHandler = new ResponseHandler()

export async function POST(req: Request) {
    try {
        const body = await req.json()

        if (!isSignBodyValid(body)) {
            return responseHandler._400()
        }

        const { email, password } = body

        if (
            await prisma.user.findFirst({
                where: {
                    email,
                },
            })
        ) {
            return responseHandler._400('User already exists')
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

        return responseHandler._200({ userId: user.id })
    } catch (e) {
        console.error(e)
        return responseHandler._500()
    }
}
