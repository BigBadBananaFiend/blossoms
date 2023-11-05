import { BASE_URL } from '../utils/constants'

const BASE_API_URL = `${BASE_URL}/api`

export const API_ROUTES = {
    user: {
        auth: `${BASE_API_URL}/user/auth`,
    },
    sign: {
        in: `${BASE_API_URL}/sign/in`,
        up: `${BASE_API_URL}/sign/up`,
        sso: {
            google: `${BASE_API_URL}/sign/sso/google`
        }
    },
    onboarding: `${BASE_API_URL}/onboarding`,
    external: {
        countries: 'https://api.countrystatecity.in/v1/countries',
        cities: (ios: string) =>
            `https://api.countrystatecity.in/v1/countries/${ios}/cities`,
    },
}
