import { EmailIcon } from '@/app/libs/icons/Email'
import { Input } from '@/app/libs/ui/input/Input'
import { Fragment } from 'react'

export default function Up() {
    return (
        <Fragment>
            <h1>UP</h1>
            <Input
                label="World"
                placeholder="Hello"
                startAndornment={<EmailIcon size={20} />}
                endAndornment={<EmailIcon size={20} />}
            />
        </Fragment>
    )
}
