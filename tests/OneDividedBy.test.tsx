import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import App from '../src/App'

describe('Fast one divided by', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    // let powButton: HTMLElement
    // let facButton: HTMLElement
    // let sqrtButton: HTMLElement
    let plusButton: HTMLElement
    // let minusButton: HTMLElement
    let multButton: HTMLElement
    // let divButton: HTMLElement
    // let squaredButton: HTMLElement
    // let expBaseTen: HTMLElement
    // let piButton: HTMLElement
    // let eulerButton: HTMLElement
    let oneDividedBy: HTMLElement
    let zeroButton: HTMLElement
    let oneButton: HTMLElement
    let twoButton: HTMLElement
    // let threeButton: HTMLElement
    // let fourButton: HTMLElement
    // let fiveButton: HTMLElement
    // let sixButton: HTMLElement
    // let sevenButton: HTMLElement
    // let eightButton: HTMLElement
    // let nineButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        // powButton = screen.getByText('x^')
        // facButton = screen.getByText('n!')
        // sqrtButton = screen.getByText('√x')
        plusButton = screen.getByText('+')
        // minusButton = screen.getByText('-')
        multButton = screen.getByText('X')
        // divButton = screen.getByText('÷')
        // squaredButton = screen.getByText('x²')
        // expBaseTen = screen.getByText('10^')
        // piButton = screen.getByText('π')
        // eulerButton = screen.getByText('e')
        oneDividedBy = screen.getByText('¹/x')
        zeroButton = screen.getByText('0')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
        // threeButton = screen.getByText('3')
        // fourButton = screen.getByText('4')
        // fiveButton = screen.getByText('5')
        // sixButton = screen.getByText('6')
        // sevenButton = screen.getByText('7')
        // eightButton = screen.getByText('8')
        // nineButton = screen.getByText('9')
    })

    afterEach(() => cleanup())

    test('1 ÷ 2', () => {
        const clickEvents = [oneDividedBy, twoButton, equalToButton]

        consecClickEvents(clickEvents)

        const result = 1 / 2

        expect(expScreen.innerHTML).toBe(result.toString())
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

        expect(expScreen.innerHTML).toBe(result.toString())
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

        expect(expScreen.innerHTML).toBe(result.toString())
    })
})
