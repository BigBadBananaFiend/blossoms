import { FC } from 'react'
import { IPropsForIcon } from './types'

export const ArrowDown: FC<IPropsForIcon> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={props.size ?? 20}
            width={props.size ?? 20}
            viewBox="0 -960 960 960"
            fill={props.color ?? 'white'}
            className={props.className}
        >
            <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
    )
}
