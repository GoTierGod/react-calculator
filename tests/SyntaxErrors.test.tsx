import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import App from '../src/App'

describe('Avoid syntax errors', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let powButton: HTMLElement
    let plusButton: HTMLElement
    let minusButton: HTMLElement
    let multButton: HTMLElement
    let divButton: HTMLElement
    let piButton: HTMLElement
    let pointButton: HTMLElement
    let threeButton: HTMLElement
    let fourButton: HTMLElement
    let fiveButton: HTMLElement
    let sevenButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        powButton = screen.getByText('x^')
        plusButton = screen.getByText('+')
        minusButton = screen.getByText('-')
        multButton = screen.getByText('X')
        divButton = screen.getByText('÷')
        piButton = screen.getByText('π')
        pointButton = screen.getByText('.')
        threeButton = screen.getByText('3')
        fourButton = screen.getByText('4')
        fiveButton = screen.getByText('5')
        sevenButton = screen.getByText('7')
    })

    afterEach(() => cleanup())

    test('Return a "Syntax" error', () => {
        const events = [fiveButton, plusButton, equalToButton]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('Syntax error')
    })

    test('Avoid consecutive operators', () => {
        const events = [
            fourButton,
            plusButton,
            minusButton,
            multButton,
            divButton,
            powButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('4 + ')
    })

    test('Avoid PI being used as a decimal', () => {
        const events = [sevenButton, pointButton, piButton]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('7.')
    })

    test('Avoid PI being used as an integer', () => {
        const events = [piButton, threeButton, pointButton, threeButton]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('π')
    })

    test('Avoid consecutive PI', () => {
        const events = [piButton, piButton]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('π')
    })
})
