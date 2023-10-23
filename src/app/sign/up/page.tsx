'use client'

import { usePasswordIcon } from '@/src/modules/sign/hooks/usePasswordIcon'
import { EmailIcon } from '@/src/libs/icons/Email'
import { PasswordIcon } from '@/src/libs/icons/Password'
import { VisibilityIcon, VisibilityOffIcon } from '@/src/libs/icons/Visibility'
import { Button } from '@/src/libs/ui/button/Button'
import { Input } from '@/src/libs/ui/input/Input'
import style from '../style.module.css'

import { useMemo, useRef } from 'react'

export default function Up() {
    const { isVisible, switchVisible, type } = usePasswordIcon()
    const r = useRef<HTMLInputElement>(null)

    const endAndronment = useMemo(() => {
        if (isVisible) {
            return <VisibilityIcon size={20} />
        }

        return <VisibilityOffIcon size={20} />
    }, [isVisible])

    return (
        <div className={style['input-wrapper']}>
            <Input
                label="E-mail"
                ref={r}
                startAndornment={<EmailIcon size={20} />}
                endAndornment={<EmailIcon size={20} />}
            />
            <Input
                label="Password"
                type={type}
                startAndornment={<PasswordIcon size={20} />}
                endAndornment={endAndronment}
                endAndornmentFn={() => switchVisible()}
            />
            <Button text="Submit" />
        </div>
    )
}
