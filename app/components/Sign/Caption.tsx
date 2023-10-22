import { useEffectOnce } from '@/app/hooks/useEffectOnce'
import { FC, Fragment, useState } from 'react'
import style from './caption.module.css'

const CAPTION_CONTENT = {
    0: 'swap. ',
    1: 'buy. ',
    2: 'gift. ',
}

export const Captions: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffectOnce(() => {
        const interval = setInterval(
            () => setActiveIndex((prev) => (prev + 1) % 3),
            2000
        )

        return () => clearInterval(interval)
    })

    console.log(activeIndex)
    const captions = [0, 1, 2].map((indx) => (
        <span
            key={indx}
            className={indx === activeIndex ? style['active-caption'] : ''}
        >
            {CAPTION_CONTENT[indx as keyof typeof CAPTION_CONTENT]}
        </span>
    ))

    return <Fragment>{captions}</Fragment>
}
