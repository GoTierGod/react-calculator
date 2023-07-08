import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Button that tranforms the last number into positive or negative', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let plusButton: HTMLElement
    let minusButton: HTMLElement
    let multButton: HTMLElement
    let posNegButton: HTMLElement
    let piButton: HTMLElement
    let eulerButton: HTMLElement
    let zeroButton: HTMLElement
    let oneButton: HTMLElement
    let twoButton: HTMLElement
    let sevenButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        plusButton = screen.getByText('+')
        minusButton = screen.getByText('-')
        multButton = screen.getByText('X')
        posNegButton = screen.getByText('+/-')
        piButton = screen.getByText('π')
        eulerButton = screen.getByText('e')
        zeroButton = screen.getByText('0')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
        sevenButton = screen.getByText('7')
    })

    afterEach(() => cleanup())

    test('Switch between positive and negative: 7 => (-7) => 7', () => {
        const clickEvents = [sevenButton, posNegButton]

        consecClickEvents(clickEvents)

        expect(expScreen.innerHTML).toBe('(-7)')

        consecClickEvents([posNegButton])

        expect(expScreen.innerHTML).toBe('7')
    })

    test('((-12) + (-70))', () => {
        const clickEvents = [
            parButton,
            oneButton,
            twoButton,
            posNegButton,
            plusButton,
            sevenButton,
            zeroButton,
            posNegButton,
            parButton,
        ]

        consecClickEvents(clickEvents)

        expect(expScreen.innerHTML).toBe('((-12) + (-70))')

        consecClickEvents([equalToButton])

        const result = -12 + -70

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('(-10) x 2', () => {
        const clickEvents = [oneButton, zeroButton, posNegButton]

        consecClickEvents(clickEvents)

        expect(expScreen.innerHTML).toBe('(-10)')

        consecClickEvents([multButton, twoButton, equalToButton])

        const result = -10 * 2

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('2 x (10 - (-10)) + 1', () => {
        const clickEvents = [
            twoButton,
            multButton,
            parButton,
            oneButton,
            zeroButton,
            minusButton,
            oneButton,
            zeroButton,
            posNegButton,
            parButton,
            plusButton,
            oneButton,
        ]

        consecClickEvents(clickEvents)

        expect(expScreen.innerHTML).toBe('2 x (10 - (-10)) + 1')

        consecClickEvents([equalToButton])

        const result = 2 * (10 - -10) + 1

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('(-π) + (-e)', () => {
        const clickEvents = [
            piButton,
            posNegButton,
            plusButton,
            eulerButton,
            posNegButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = -Math.PI + -Math.E

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
