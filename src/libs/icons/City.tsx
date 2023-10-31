import { FC } from 'react'
import { IPropsForIcon } from './types'

export const City: FC<IPropsForIcon> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height={props.size ?? 20}
        width={props.size ?? 20}
        viewBox="0 -960 960 960"
        fill={props.color ?? 'white'}
        className={props.className}
    >
        <path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
    </svg>
)
