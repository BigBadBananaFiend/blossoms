import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { APP_ROUTES } from './core/routes/app-routes'
import {
    getIsOnOnboardingRoute,
    getIsOnSignRoutes,
} from './core/utils/middleware'
import { getTokenPayload } from './core/utils/api/type-guards/token'

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    if (!token) {
        if (!getIsOnSignRoutes(request.url)) {
            return NextResponse.redirect(
                new URL(APP_ROUTES.sign.in.path, request.url)
            )
        }
        return
    }

    try {
        const tokenPayload = await getTokenPayload(token)

        if (!tokenPayload) {
            return NextResponse.redirect(
                new URL(APP_ROUTES.sign.in.path, request.url)
            )
        }

        const { onBoard } = tokenPayload

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
