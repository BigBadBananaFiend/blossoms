'use client'

import { EmailIcon } from '@/app/libs/icons/Email'
import { Input } from '@/app/libs/ui/input/Input'
import style from '../style.module.css'
import { PasswordIcon } from '@/app/libs/icons/Password'
import { VisibilityIcon, VisibilityOffIcon } from '@/app/libs/icons/Visibility'

import { useMemo } from 'react'
import { usePasswordIcon } from '@/app/hooks/sign/usePasswordIcons'
import { Button } from '@/app/libs/ui/button/Button'

export default function Up() {
    const { isVisible, switchVisible, type } = usePasswordIcon()

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
