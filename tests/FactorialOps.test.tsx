import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Factorial operations', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let powButton: HTMLElement
    let facButton: HTMLElement
    let plusButton: HTMLElement
    let minusButton: HTMLElement
    let multButton: HTMLElement
    let divButton: HTMLElement
    let oneButton: HTMLElement
    let twoButton: HTMLElement
    let threeButton: HTMLElement
    let fourButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        powButton = screen.getByText('x^')
        facButton = screen.getByText('n!')
        plusButton = screen.getByText('+')
        minusButton = screen.getByText('-')
        multButton = screen.getByText('X')
        divButton = screen.getByText('÷')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
        threeButton = screen.getByText('3')
        fourButton = screen.getByText('4')
    })

    afterEach(() => cleanup())

    test('1! + 2!', () => {
        const clickEvents = [
            oneButton,
            facButton,
            plusButton,
            twoButton,
            facButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 1 + 2

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('2! ^ 2!', () => {
        const clickEvents = [
            twoButton,
            facButton,
            powButton,
            twoButton,
            facButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 2 ** 2

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('3! - 4!', () => {
        const clickEvents = [
            threeButton,
            facButton,
            minusButton,
            fourButton,
            facButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 6 - 24

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('(2! + 3!) x 3!', () => {
        const clickEvents = [
            parButton,
            twoButton,
            facButton,
            plusButton,
            threeButton,
            facButton,
            parButton,
            multButton,
            threeButton,
            facButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = (2 + 6) * 6

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('(4! ÷ 3!)', () => {
        const clickEvents = [
            parButton,
            fourButton,
            facButton,
            divButton,
            threeButton,
            facButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 24 / 6

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
