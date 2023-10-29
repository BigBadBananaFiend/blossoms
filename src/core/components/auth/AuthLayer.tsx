'use client'

import { ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'

export const AuthLayer = ({ children }: { children: ReactNode }) => {
    const { data, isLoading, isError } = useAuth()

    if (isLoading) {
        return <h1>Loading... </h1>
    }

    if (isError || !data) {
        return <h1>Something went wrong... </h1>
    }

    return children
}
