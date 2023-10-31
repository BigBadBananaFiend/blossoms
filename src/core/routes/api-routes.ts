import { BASE_URL } from '../utils/constants'

const BASE_API_URL = `${BASE_URL}/api`

export const API_ROUTES = {
    user: `${BASE_API_URL}/user`,
    sign: {
        in: `${BASE_API_URL}/sign/in`,
        up: `${BASE_API_URL}/sign/up`,
    },
    external: {
        countries: 'https://api.countrystatecity.in/v1/countries',
        cities: (ios: string) =>
            `https://api.countrystatecity.in/v1/countries/${ios}/cities`,
    },
}
