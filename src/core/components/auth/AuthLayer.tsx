'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useIdentity } from '../../api'
import { ReactNode, useMemo } from 'react'
import { APP_ROUTES } from '../../routes/app-routes'

export const AuthLayer = ({ children }: { children: ReactNode }) => {
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

    if (isLoading) {
        return <h1>Loading... </h1>
    }

    if (!data || isError) {
        return <h1>Something went wrong... </h1>
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

    return children
}
