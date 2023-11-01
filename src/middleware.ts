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

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')

    const response = await fetch(API_ROUTES.user.auth, {
        headers: {
            Cookie: `${token?.name}=${token?.value}`,
        },
    })

    const user = (await response.json()) as IUserDetailResponse

    if (!user.ok && !getIsOnSignRoutes(request.url)) {
        return NextResponse.redirect(
            new URL(APP_ROUTES.sign.in.path, request.url)
        )
    }

    if (!user.onBoard && !getIsOnOnboardingRoute(request.url)) {
        return NextResponse.redirect(
            new URL(APP_ROUTES.onboarding.path, request.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/sign/in', '/sign/up', '/onboarding', '/'],
}
