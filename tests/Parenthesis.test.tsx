import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
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
        multButton = screen.getByText('x')
        divButton = screen.getByText('÷')
        threeButton = screen.getByText('3')
        fourButton = screen.getByText('4')
    })

    afterEach(() => cleanup())

    test('(34 - 3) x 4', () => {
        const events = [
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

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('124')
    })

    test('4 x (4 + 4)', () => {
        const events = [
            fourButton,
            multButton,
            parButton,
            fourButton,
            plusButton,
            fourButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('32')
    })

    test('(3 + 3) ÷ 4', () => {
        const events = [
            parButton,
            threeButton,
            plusButton,
            threeButton,
            parButton,
            divButton,
            fourButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('1.5')
    })
})
