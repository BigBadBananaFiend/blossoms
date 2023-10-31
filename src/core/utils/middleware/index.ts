import { APP_ROUTES } from '../../routes/app-routes'

export function getIsOnSignRoutes(url: string) {
    return [APP_ROUTES.sign.in.url, APP_ROUTES.sign.up.url].some(
        (route) => route === url
    )
}

export function getIsOnOnboardingRoute(url: string) {
    return APP_ROUTES.onboarding.url === url
}
