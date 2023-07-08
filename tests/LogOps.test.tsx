import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Operations using log (logarithm with base 10)', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let plusButton: HTMLElement
    let minusButton: HTMLElement
    let multButton: HTMLElement
    let logButton: HTMLElement
    let piButton: HTMLElement
    let eulerButton: HTMLElement
    let zeroButton: HTMLElement
    let oneButton: HTMLElement
    let twoButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        plusButton = screen.getByText('+')
        minusButton = screen.getByText('-')
        multButton = screen.getByText('X')
        logButton = screen.getByText('log')
        piButton = screen.getByText('π')
        eulerButton = screen.getByText('e')
        zeroButton = screen.getByText('0')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
    })

    afterEach(() => cleanup())

    test('log(10) + 20', () => {
        const clickEvents = [
            oneButton,
            zeroButton,
            logButton,
            plusButton,
            twoButton,
            zeroButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.log10(10) + 20

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('2 x (log(10) + 11)', () => {
        const clickEvents = [
            twoButton,
            multButton,
            parButton,
            oneButton,
            zeroButton,
            logButton,
            plusButton,
            oneButton,
            oneButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 2 * (Math.log10(10) + 11)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('log(210) - 1', () => {
        const clickEvents = [
            twoButton,
            oneButton,
            zeroButton,
            logButton,
            minusButton,
            oneButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.log10(210) - 1

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('log(π) + log(e)', () => {
        const clickEvents = [
            piButton,
            logButton,
            plusButton,
            eulerButton,
            logButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.log10(Math.PI) + Math.log10(Math.E)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
