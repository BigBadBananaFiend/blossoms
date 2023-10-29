import {
    Root,
    Trigger,
    Value,
    Icon,
    Content,
    SelectProps,
    Viewport,
} from '@radix-ui/react-select'
import { FC, ReactNode, useState } from 'react'
import { Icons } from '../..'
import style from './style.module.css'

interface ISelectProps extends SelectProps {
    valuePlaceholder: string
    children: ReactNode | ReactNode[]
}

export const Select: FC<ISelectProps> = ({
    onValueChange,
    children,
    valuePlaceholder,
    ...props
}: ISelectProps) => {
    const [value, setValue] = useState<string | null>(null)

    console.log(value)
    return (
        <Root
            name="Country"
            value={value ?? ''}
            onValueChange={(e) => setValue(e)}
            {...props}
        >
            <Trigger className={style.trigger}>
                <Value placeholder={valuePlaceholder} />
                <Icon className={style.arrow}>
                    <Icons.ArrowDown />
                </Icon>
            </Trigger>
            <Content
                className={style.content}
                position={'popper'}
                align={'center'}
                side={'bottom'}
                sideOffset={5}
            >
                <Viewport>{children}</Viewport>
            </Content>
        </Root>
    )
}
