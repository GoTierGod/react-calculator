import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Basic operations tests', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let plusButton: HTMLElement
    let minusButton: HTMLElement
    let multButton: HTMLElement
    let divButton: HTMLElement
    let threeButton: HTMLElement
    let fourButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        plusButton = screen.getByText('+')
        minusButton = screen.getByText('-')
        multButton = screen.getByText('X')
        divButton = screen.getByText('÷')
        threeButton = screen.getByText('3')
        fourButton = screen.getByText('4')
    })

    afterEach(() => cleanup())

    test('Addition: 3 + 4', () => {
        const clickEvents = [threeButton, plusButton, fourButton, equalToButton]

        consecClickEvents(clickEvents)

        const result = 3 + 4

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('Subtraction: 4 - 3', () => {
        const clickEvents = [
            fourButton,
            minusButton,
            threeButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 4 - 3

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('Multiplication: 4 x 3', () => {
        const clickEvents = [fourButton, multButton, threeButton, equalToButton]

        consecClickEvents(clickEvents)

        const result = 4 * 3

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('Division: 3 ÷ 4', () => {
        const clickEvents = [threeButton, divButton, fourButton, equalToButton]

        consecClickEvents(clickEvents)

        const result = 3 / 4

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
