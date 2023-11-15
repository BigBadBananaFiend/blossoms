import { isOnboardingBodyValid } from '@/src/core/utils/api/type-guards/onboarding'
import { PrismaClient } from '@prisma/client'
import { getTokenPayload } from '@/src/core/utils/api/type-guards/token'
import { cookies } from 'next/headers'
import { createSecretKey } from 'crypto'
import { SignJWT } from 'jose'
import { ResponseHandler } from '@/src/core/utils/api/ResponseHandler'

const prisma = new PrismaClient()
const responseHandler = new ResponseHandler()

export async function POST(req: Request) {
    const token = cookies().get('token')?.value

    if (!token) {
        return responseHandler._403()
    }

    try {
        const body = await req.json()

        if (!isOnboardingBodyValid(body)) {
            return responseHandler._400()
        }

        const tokenPayload = await getTokenPayload(token)

        if (!tokenPayload) {
            return responseHandler._403()
        }

        const { id } = tokenPayload

        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                onBoard: true,
            },
        })

        const detail = await prisma.userDetail.create({
            data: {
                ...body,
                id,
            },
        })

        const secret = createSecretKey(process.env.TOKEN_SECRET!, 'utf-8')
        const newToken = await new SignJWT({
            onBoard: user.onBoard,
            id: user.id,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret)

        cookies().set('token', newToken, { httpOnly: true })

        return responseHandler._200({
            userId: id,
            city: detail.city,
            country: detail.country,
        })
    } catch (e) {
        console.log(e)
        return responseHandler._500()
    }
}
