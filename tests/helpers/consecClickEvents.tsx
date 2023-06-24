import { fireEvent } from '@testing-library/react'

export const consecClickEvents = (arr: HTMLElement[]) => {
    for (const element of arr) {
        fireEvent.click(element)
    }

    return null
}
