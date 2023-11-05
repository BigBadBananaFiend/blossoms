import Skeleton from 'react-loading-skeleton'
import style from './style.module.css'

export const SignFormSkeleton = () => {
    return (
        <div className={style.wrapper}>
            {[0, 1, 2].map((num) => (
                <Skeleton key={num} className={style['input-skeleton']} />
            ))}
            <Skeleton className={style['headline-skeleton']} />
            <Skeleton className={style['input-skeleton']} />
        </div>
    )
}
