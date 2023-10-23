const path = 'https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js'

export const ZXCVBN = () => {
    const script = document.createElement('script')

    script.src = path
    script.type = 'text/javascript'
    script.async = true

    const promise = new Promise<void>((resolve, reject) => {
        script.onload = () => resolve()
        script.onerror = (errorEvent) => reject(errorEvent)
    })

    document.head.appendChild(script)

    return promise
}
