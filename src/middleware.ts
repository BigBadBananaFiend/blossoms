import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { APP_ROUTES } from './core/routes/app-routes'
import {
    getIsOnOnboardingRoute,
    getIsOnSignRoutes,
} from './core/utils/middleware'
import * as jose from 'jose'

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!)

    const { searchParams } = request.nextUrl
    console.log(searchParams)

    if (!token) {
        if (!getIsOnSignRoutes(request.url)) {
            return NextResponse.redirect(
                new URL(APP_ROUTES.sign.in.path, request.url)
            )
        }

        return
    }

    try {
        const { payload } = await jose.jwtVerify(token, secret)
        const { onBoard } = payload

        if (!onBoard && !getIsOnOnboardingRoute(request.url)) {
            return NextResponse.redirect(
                new URL(APP_ROUTES.onboarding.path, request.url)
            )
        }

        if (onBoard && getIsOnOnboardingRoute(request.url)) {
            return NextResponse.redirect(
                new URL(APP_ROUTES.root.path, request.url)
            )
        }

        return NextResponse.next()
    } catch (e) {
        if (getIsOnSignRoutes(request.url)) {
            const response = NextResponse.next()
            response.cookies.delete('token')
            return response
        }

        const response = NextResponse.redirect(
            new URL(APP_ROUTES.sign.in.path, request.url)
        )

        response.cookies.delete('token')
        return response
    }
}

export const config = {
    matcher: ['/sign/in', '/sign/up', '/onboarding', '/'],
}
