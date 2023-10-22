import { Ref } from 'react'

export function mergeRefs<T>(refs: Array<Ref<T>>): Ref<T> {
    return (value: T) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(value)
            } else if (ref !== null && typeof ref === 'object') {
                ;(ref as React.MutableRefObject<T>).current = value
            }
        })
    }
}
