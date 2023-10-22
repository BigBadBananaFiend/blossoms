import { useCallback, useMemo, useState } from 'react'

export function usePasswordIcon() {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const switchVisible = useCallback(() => {
        setIsVisible((curr) => !curr)
    }, [])

    const type = useMemo(() => (isVisible ? 'text' : 'password'), [isVisible])

    return useMemo(
        () => ({
            isVisible,
            switchVisible,
            type,
        }),
        [isVisible, switchVisible, type]
    )
}
