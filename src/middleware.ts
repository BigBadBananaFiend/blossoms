import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { IUser } from './core/data/user/user'
import { API_ROUTES } from './core/routes/api-routes'
import { APP_ROUTES } from './core/routes/app-routes'
import {
    getIsOnOnboardingRoute,
    getIsOnSignRoutes,
} from './core/utils/middleware'

export async function middleware(request: NextRequest) {
    const cookie = request.cookies.get('token')
    const url = request.url

    const result = await fetch(API_ROUTES.user, {
        headers: {
            Cookie: `${cookie?.name}=${cookie?.value}`,
        },
    })

    const user = (await result.json()) as IUser

    const isOnSignRoutes = getIsOnSignRoutes(url)
    const isOnOnboardingRoute = getIsOnOnboardingRoute(url)

    if (!user.isVerified && !isOnSignRoutes) {
        return NextResponse.redirect(new URL(APP_ROUTES.sign.in.path, url))
    }

    if (!user.hasFinishedOnboarding && !isOnOnboardingRoute) {
        return NextResponse.redirect(new URL(APP_ROUTES.onboarding.path, url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/sign/in', '/sign/up', '/onboarding', '/'],
}
