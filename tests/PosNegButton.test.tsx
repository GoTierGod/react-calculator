import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Button that tranforms the last number into positive or negative', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    // let powButton: HTMLElement
    // let facButton: HTMLElement
    // let sqrtButton: HTMLElement
    let plusButton: HTMLElement
    let minusButton: HTMLElement
    let multButton: HTMLElement
    // let divButton: HTMLElement
    // let squaredButton: HTMLElement
    // let expBaseTen: HTMLElement
    let posNegButton: HTMLElement
    let piButton: HTMLElement
    let eulerButton: HTMLElement
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
        minusButton = screen.getByText('-')
        multButton = screen.getByText('X')
        // divButton = screen.getByText('÷')
        // squaredButton = screen.getByText('x²')
        // expBaseTen = screen.getByText('10^')
        posNegButton = screen.getByText('+/-')
        piButton = screen.getByText('π')
        eulerButton = screen.getByText('e')
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
