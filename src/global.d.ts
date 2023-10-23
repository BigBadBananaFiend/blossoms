/// <reference lib="dom"/>

import { ZXCVBNResult } from '@core/types'
export {}

declare global {
    interface Window {
        zxcvbn?: (value: string, userInputs?: string[]) => ZXCVBNResult
    }
}
