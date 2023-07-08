import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Fast exponentiation with base 10', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let sqrtButton: HTMLElement
    let plusButton: HTMLElement
    let expBaseTen: HTMLElement
    let piButton: HTMLElement
    let oneButton: HTMLElement
    let twoButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        sqrtButton = screen.getByText('√x')
        plusButton = screen.getByText('+')
        expBaseTen = screen.getByText('10^')
        piButton = screen.getByText('π')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
    })

    afterEach(() => cleanup())

    test('10 ^ 2', () => {
        const clickEvents = [expBaseTen, twoButton, equalToButton]

        consecClickEvents(clickEvents)

        const result = 10 ** 2

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('√(10 ^ 2)', () => {
        const clickEvents = [
            sqrtButton,
            parButton,
            expBaseTen,
            twoButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.sqrt(10 ** 2)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('π + 10 ^ 1', () => {
        const clickEvents = [
            piButton,
            plusButton,
            expBaseTen,
            oneButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.PI + 10 ** 1

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
