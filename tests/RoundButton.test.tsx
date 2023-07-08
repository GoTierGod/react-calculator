import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Round the last number', () => {
    let expScreen: HTMLElement
    let roundButton: HTMLElement
    let pointButton: HTMLElement
    let fourButton: HTMLElement
    let fiveButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        roundButton = screen.getByText('rou')
        pointButton = screen.getByText('.')
        fourButton = screen.getByText('4')
        fiveButton = screen.getByText('5')
    })

    afterEach(() => cleanup())

    test('4.4', () => {
        const clickEvents = [fourButton, pointButton, fourButton, roundButton]

        consecClickEvents(clickEvents)

        const result = Math.round(4.4)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('4.5', () => {
        const clickEvents = [fourButton, pointButton, fiveButton, roundButton]

        consecClickEvents(clickEvents)

        const result = Math.round(4.5)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
