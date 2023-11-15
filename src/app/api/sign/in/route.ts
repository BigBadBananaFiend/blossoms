import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { SignJWT } from 'jose'
import bcrypt from 'bcrypt'
import { isSignBodyValid } from '@/src/core/utils/api/type-guards/sign'
import { createSecretKey } from 'crypto'
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

        const user = await prisma.user.findFirst({
            where: {
                email,
            },
            include: {
                detail: true,
            },
        })

        if (!user) {
            return responseHandler._404()
        }

        if (!user.password) {
            return responseHandler._500()
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return responseHandler._401()
        }

        const secret = createSecretKey(process.env.TOKEN_SECRET!, 'utf-8')
        const token = await new SignJWT({
            onBoard: user.onBoard,
            id: user.id,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret)

        cookies().set('token', token, { httpOnly: true })

        return responseHandler._200({
            userId: user.id,
            city: user.detail?.city,
            country: user.detail?.country,
        })
    } catch (e) {
        console.log(e)
        return responseHandler._500()
    }
}
