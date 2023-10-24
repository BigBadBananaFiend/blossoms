import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { IUserIdentity } from '@/src/core/data/identity/identity-state'
import { NextRequest, NextResponse } from 'next/server'

export const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS(req: NextRequest) {
    return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET() {
    const token = cookies().get('token')

    console.log(token)

    if (!token) {
        console.log(token)
        return new Response('Access denied', {
            status: 403,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers':
                    'Content-Type, Authorization, Cookie',
            },
        })
    }

    try {
        const { value } = token
        verify(value, 'token')

        const response: IUserIdentity = {
            isVerified: true,
            hasFinishedOnboarding: false,
        }

        return Response.json(response, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers':
                    'Content-Type, Authorization, Cookie',
            },
        })
    } catch (e) {
        return new Response('Access denied', {
            status: 403,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers':
                    'Content-Type, Authorization, Cookie',
            },
        })
    }
}
