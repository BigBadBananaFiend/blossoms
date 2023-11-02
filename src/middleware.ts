import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { APP_ROUTES } from './core/routes/app-routes'
import {
    getIsOnOnboardingRoute,
    getIsOnSignRoutes,
} from './core/utils/middleware'
import { API_ROUTES } from './core/routes/api-routes'

interface IUserDetailResponse {
    ok: boolean
    onBoard: boolean
}

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')

    const result = await fetch(API_ROUTES.user.auth, {
        headers: {
            Cookie: `${token?.name}=${token?.value}`,
        },
    })

    console.log(process.env.TOKEN_SECRET + 'middle')

    const user = (await result.json()) as IUserDetailResponse
    const isOnSignRoutes = getIsOnSignRoutes(request.url)

    if (!user.ok && !isOnSignRoutes) {
        const response = NextResponse.redirect(
            new URL(APP_ROUTES.sign.in.path, request.url)
        )

        if (token) {
            response.cookies.delete('token')
        }

        return response
    }

    if (!user.ok && isOnSignRoutes && token) {
        const response = NextResponse.next()
        response.cookies.delete('token')

        return response
    }

    if (user.ok && !user.onBoard && !getIsOnOnboardingRoute(request.url)) {
        return NextResponse.redirect(
            new URL(APP_ROUTES.onboarding.path, request.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/sign/in', '/sign/up', '/onboarding', '/'],
}
