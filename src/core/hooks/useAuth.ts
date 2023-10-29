import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { useIdentity } from '../api/useIdentityQuery'
import { APP_ROUTES } from '../routes/app-routes'

export const useAuth = () => {
    const { data, isLoading, isError } = useIdentity()

    const router = useRouter()
    const pathname = usePathname()

    const isOnSignRoutes = useMemo(
        () =>
            [APP_ROUTES.sign.in, APP_ROUTES.sign.up].some(
                (path) => path === pathname
            ),
        [pathname]
    )

    useEffect(() => {
        if (!data) {
            return
        }

        const { isVerified, hasFinishedOnboarding } = data

        if (isVerified && !hasFinishedOnboarding) {
            router.push('/onboarding')
        }

        if (!isVerified && !isOnSignRoutes) {
            router.push(APP_ROUTES.sign.up)
        }

        if (isOnSignRoutes) {
            if (isVerified && hasFinishedOnboarding) {
                router.push(APP_ROUTES.root)
            }
        }
    }, [data, isOnSignRoutes, router])

    return useMemo(
        () => ({ data, isLoading, isError }),
        [data, isError, isLoading]
    )
}
