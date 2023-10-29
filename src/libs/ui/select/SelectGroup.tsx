import { Group, Label } from '@radix-ui/react-select'
import { ElementRef, FC, ReactNode, forwardRef } from 'react'
import style from './style.module.css'

interface ISelectGroup {
    label: string
    children: ReactNode | ReactNode[]
}

export const SelectGroup: FC<ISelectGroup> = forwardRef<
    ElementRef<typeof Group>,
    ISelectGroup
>(({ label, children }: ISelectGroup, ref) => {
    return (
        <Group ref={ref}>
            <Label className={style['group-label']}>{label}</Label>
            {children}
        </Group>
    )
})

SelectGroup.displayName = 'div'
