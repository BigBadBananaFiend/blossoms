import {
    Root,
    Trigger,
    Value,
    Icon,
    Content,
    SelectProps,
    Viewport,
} from '@radix-ui/react-select'
import { FC, ReactNode } from 'react'
import { Icons } from '../..'
import style from './style.module.css'

interface ISelectProps extends SelectProps {
    valuePlaceholder: string
    children: ReactNode | ReactNode[]
    setValue: (value: string) => void
}

export const Select: FC<ISelectProps> = ({
    onValueChange,
    children,
    valuePlaceholder,
    value,
    setValue,
    ...props
}: ISelectProps) => {
    return (
        <Root
            value={value}
            onValueChange={(value) => setValue(value)}
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
