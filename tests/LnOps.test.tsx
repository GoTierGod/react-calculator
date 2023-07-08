import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Operations using ln (natural logarithm)', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let plusButton: HTMLElement
    let minusButton: HTMLElement
    let multButton: HTMLElement
    let lnButton: HTMLElement
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
        lnButton = screen.getByText('ln')
        piButton = screen.getByText('π')
        eulerButton = screen.getByText('e')
        zeroButton = screen.getByText('0')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
    })

    afterEach(() => cleanup())

    test('ln(11) x 2', () => {
        const clickEvents = [
            oneButton,
            oneButton,
            lnButton,
            multButton,
            twoButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.log(11) * 2

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('22 x (ln(12) + ln(21))', () => {
        const clickEvents = [
            twoButton,
            twoButton,
            multButton,
            parButton,
            oneButton,
            twoButton,
            lnButton,
            plusButton,
            twoButton,
            oneButton,
            lnButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 22 * (Math.log(12) + Math.log(21))

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('ln(222) - 10', () => {
        const clickEvents = [
            twoButton,
            twoButton,
            twoButton,
            lnButton,
            minusButton,
            oneButton,
            zeroButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.log(222) - 10

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('ln(π) + ln(e)', () => {
        const clickEvents = [
            piButton,
            lnButton,
            plusButton,
            eulerButton,
            lnButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.log(Math.PI) + Math.log(Math.E)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
