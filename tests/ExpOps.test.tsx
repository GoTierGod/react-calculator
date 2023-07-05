import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import App from '../src/App'

describe('Exponentiation operations', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let powButton: HTMLElement
    let plusButton: HTMLElement
    let multButton: HTMLElement
    let threeButton: HTMLElement
    let fourButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        powButton = screen.getByText('x^')
        plusButton = screen.getByText('+')
        multButton = screen.getByText('X')
        threeButton = screen.getByText('3')
        fourButton = screen.getByText('4')
    })

    afterEach(() => cleanup())

    test('4 ^ 3', () => {
        const clickEvents = [fourButton, powButton, threeButton, equalToButton]

        consecClickEvents(clickEvents)

        const result = 4 ** 3

        expect(expScreen.innerHTML).toBe(result.toString())
    })

    test('3 ^ 4', () => {
        const clickEvents = [threeButton, powButton, fourButton, equalToButton]

        consecClickEvents(clickEvents)

        const result = 3 ** 4

        expect(expScreen.innerHTML).toBe(result.toString())
    })

    test('3 ^ (4 + 3)', () => {
        const clickEvents = [
            threeButton,
            powButton,
            parButton,
            fourButton,
            plusButton,
            threeButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 3 ** (4 + 3)

        expect(expScreen.innerHTML).toBe(result.toString())
    })

    test('3 ^ (3 x 4)', () => {
        const clickEvents = [
            threeButton,
            powButton,
            parButton,
            threeButton,
            multButton,
            fourButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 3 ** (3 * 4)

        expect(expScreen.innerHTML).toBe(result.toString())
    })

    test('(3 x 4) ^ 3', () => {
        const clickEvents = [
            parButton,
            threeButton,
            multButton,
            fourButton,
            parButton,
            powButton,
            threeButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = (3 * 4) ** 3

        expect(expScreen.innerHTML).toBe(result.toString())
    })

    test('(4 + 3) ^ 3', () => {
        const clickEvents = [
            parButton,
            fourButton,
            plusButton,
            threeButton,
            parButton,
            powButton,
            threeButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = (4 + 3) ** 3

        expect(expScreen.innerHTML).toBe(result.toString())
    })
})
