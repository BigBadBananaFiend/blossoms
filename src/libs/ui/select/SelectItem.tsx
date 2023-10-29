import {
    Item,
    ItemText,
    ItemIndicator,
    SelectItemProps,
} from '@radix-ui/react-select'
import { ElementRef, FC, forwardRef } from 'react'
import { Icons } from '../..'
import style from './style.module.css'

interface IItemProps extends SelectItemProps {
    itemText: string
}

type SelectItemRef = ElementRef<typeof Item>

export const SelectItem = forwardRef<SelectItemRef, IItemProps>(
    ({ itemText, ...props }: IItemProps, ref) => {
        return (
            <Item {...props} ref={ref} className={style.item}>
                <ItemText asChild>
                    <span>{itemText}</span>
                </ItemText>
                <ItemIndicator>
                    <Icons.Check size={20} />
                </ItemIndicator>
            </Item>
        )
    }
)

SelectItem.displayName = 'option'
