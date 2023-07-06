import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Operations using parenthesis tests', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
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
        parButton = screen.getByText('( )')
        plusButton = screen.getByText('+')
        minusButton = screen.getByText('-')
        multButton = screen.getByText('X')
        divButton = screen.getByText('÷')
        threeButton = screen.getByText('3')
        fourButton = screen.getByText('4')
    })

    afterEach(() => cleanup())

    test('(34 - 3) x 4', () => {
        const clickEvents = [
            parButton,
            threeButton,
            fourButton,
            minusButton,
            threeButton,
            parButton,
            multButton,
            fourButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = (34 - 3) * 4

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('4 x (4 + 4)', () => {
        const clickEvents = [
            fourButton,
            multButton,
            parButton,
            fourButton,
            plusButton,
            fourButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 4 * (4 + 4)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('(3 + 3) ÷ 4', () => {
        const clickEvents = [
            parButton,
            threeButton,
            plusButton,
            threeButton,
            parButton,
            divButton,
            fourButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = (3 + 3) / 4

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('4(3 + 4)', () => {
        const clickEvents = [
            fourButton,
            parButton,
            threeButton,
            plusButton,
            fourButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 4 * (3 + 4)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('(3)3 + 4', () => {
        const clickEvents = [
            parButton,
            threeButton,
            parButton,
            threeButton,
            plusButton,
            fourButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 3 * 3 + 4

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('3 + 3(4)', () => {
        const clickEvents = [
            threeButton,
            plusButton,
            threeButton,
            parButton,
            fourButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 3 + 3 * 4

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
