import { cookies } from 'next/headers'
import { PrismaClient } from '@prisma/client'
import * as jose from 'jose'
import { ResponseHandler } from '@/src/core/utils/api/ResponseHandler'

const prisma = new PrismaClient()
const responseHandler = new ResponseHandler()

export async function GET() {
    const token = cookies().get('token')?.value
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!)

    if (!token) {
        return responseHandler._403()
    }

    try {
        const { payload } = await jose.jwtVerify(token, secret)
        const { id } = payload

        if (typeof id !== 'string') {
            return responseHandler._500()
        }

        const info = await prisma.userDetail.findFirst({
            where: {
                id,
            },
            include: {
                user: true,
            },
        })

        if (!info) {
            return responseHandler._500()
        }

        const { name, city, country } = info

        return responseHandler._200({
            id,
            name,
            city,
            country,
        })
    } catch {
        return responseHandler._500()
    }
}
