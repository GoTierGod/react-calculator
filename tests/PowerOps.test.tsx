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
        powButton = screen.getByText('^')
        plusButton = screen.getByText('+')
        multButton = screen.getByText('x')
        threeButton = screen.getByText('3')
        fourButton = screen.getByText('4')
    })

    afterEach(() => cleanup())

    test('4 ^ 3', () => {
        const events = [fourButton, powButton, threeButton, equalToButton]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('64')
    })

    test('3 ^ 4', () => {
        const events = [threeButton, powButton, fourButton, equalToButton]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('81')
    })

    test('3 ^ (4 + 3)', () => {
        const events = [
            threeButton,
            powButton,
            parButton,
            fourButton,
            plusButton,
            threeButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('2187')
    })

    test('3 ^ (3 x 4)', () => {
        const events = [
            threeButton,
            powButton,
            parButton,
            threeButton,
            multButton,
            fourButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('531441')
    })

    test('(3 x 4) ^ 3', () => {
        const events = [
            parButton,
            threeButton,
            multButton,
            fourButton,
            parButton,
            powButton,
            threeButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('1728')
    })

    test('(4 + 3) ^ 3', () => {
        const events = [
            parButton,
            fourButton,
            plusButton,
            threeButton,
            parButton,
            powButton,
            threeButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('343')
    })
})
