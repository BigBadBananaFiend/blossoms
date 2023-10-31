const BASE_URL = 'http://localhost:3000'

export const APP_ROUTES = {
    root: {
        url: BASE_URL,
        path: '/',
    },
    sign: {
        in: {
            url: `${BASE_URL}/sign/in`,
            path: '/sign/in',
        },
        up: {
            url: `${BASE_URL}/sign/up`,
            path: '/sign/up',
        },
    },
    onboarding: {
        url: `${BASE_URL}/onboarding`,
        path: '/onboarding',
    },
}
