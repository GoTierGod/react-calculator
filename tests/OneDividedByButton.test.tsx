import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Fast one divided by', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let plusButton: HTMLElement
    let multButton: HTMLElement
    let oneDividedBy: HTMLElement
    let zeroButton: HTMLElement
    let oneButton: HTMLElement
    let twoButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        plusButton = screen.getByText('+')
        multButton = screen.getByText('X')
        oneDividedBy = screen.getByText('¹/x')
        zeroButton = screen.getByText('0')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
    })

    afterEach(() => cleanup())

    test('1 ÷ 2', () => {
        const clickEvents = [oneDividedBy, twoButton, equalToButton]

        consecClickEvents(clickEvents)

        const result = 1 / 2

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('2 + (1 ÷ 10)', () => {
        const clickEvents = [
            twoButton,
            plusButton,
            parButton,
            oneDividedBy,
            oneButton,
            zeroButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 2 + 1 / 10

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('20 x 10 x (1 ÷ 12)', () => {
        const clickEvents = [
            twoButton,
            zeroButton,
            multButton,
            oneButton,
            zeroButton,
            multButton,
            parButton,
            oneDividedBy,
            oneButton,
            twoButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 20 * 10 * (1 / 12)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
