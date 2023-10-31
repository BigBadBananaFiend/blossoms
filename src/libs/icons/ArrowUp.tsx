import { FC } from 'react'
import { IPropsForIcon } from './types'

export const ArrowUp: FC<IPropsForIcon> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={props.size ?? 20}
            width={props.size ?? 20}
            viewBox="0 -960 960 960"
            fill={props.color ?? 'white'}
            className={props.className}
        >
            <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
        </svg>
    )
}
