import { Password } from '@/src/libs/icons/Password'
import { VisibilityOn, VisibilityOff } from '@/src/libs/icons/Visibility'
import { IPropsForInput, Input, InputRef } from '@/src/libs/ui/input/Input'
import { forwardRef, useCallback, useMemo, useState } from 'react'

export const PasswordInput = forwardRef<InputRef, IPropsForInput>(
    (props: IPropsForInput, ref) => {
        const [isVisible, setIsVisible] = useState<boolean>(false)

        const switchVisible = useCallback(() => {
            setIsVisible((curr) => !curr)
        }, [])

        const type = useMemo(
            () => (isVisible ? 'text' : 'password'),
            [isVisible]
        )

        const endAndornment = useMemo(() => {
            if (isVisible) {
                return <VisibilityOn size={20} />
            }

            return <VisibilityOff size={20} />
        }, [isVisible])

        return (
            <Input
                label="Password"
                type={type}
                startAndornment={<Password size={20} />}
                endAndornment={endAndornment}
                endAndornmentFn={() => switchVisible()}
                ref={ref}
                {...props}
            />
        )
    }
)

PasswordInput.displayName = 'input'
