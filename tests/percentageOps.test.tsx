import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let plusButton: HTMLElement
    let multButton: HTMLElement
    let percButton: HTMLElement
    let zeroButton: HTMLElement
    let oneButton: HTMLElement
    let twoButton: HTMLElement
    let threeButton: HTMLElement
    let fiveButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        plusButton = screen.getByText('+')
        multButton = screen.getByText('X')
        percButton = screen.getByText('%')
        zeroButton = screen.getByText('0')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
        threeButton = screen.getByText('3')
        fiveButton = screen.getByText('5')
    })

    afterEach(() => cleanup())

    test('50 % 10', () => {
        const clickEvents = [
            fiveButton,
            zeroButton,
            percButton,
            oneButton,
            zeroButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = (50 / 100) * 10

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('(25 + 25) % 5', () => {
        const clickEvents = [
            parButton,
            twoButton,
            fiveButton,
            plusButton,
            twoButton,
            fiveButton,
            parButton,
            percButton,
            fiveButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = ((25 + 25) / 100) * 5

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('(25 x 2) % (5 x 3)', () => {
        const clickEvents = [
            parButton,
            twoButton,
            fiveButton,
            multButton,
            twoButton,
            parButton,
            percButton,
            parButton,
            fiveButton,
            multButton,
            threeButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = ((25 * 2) / 100) * (5 * 3)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
