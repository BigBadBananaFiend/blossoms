import { FC } from 'react'
import { IPropsForIcon } from './types'

export const Check: FC<IPropsForIcon> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height={`${props.size}` ?? 20}
        width={`${props.size}` ?? 20}
        viewBox="0 -960 960 960"
        fill={props.color ?? 'white'}
        className={props.className}
    >
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
)
