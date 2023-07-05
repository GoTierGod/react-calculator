import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import App from '../src/App'

describe('Square root operations', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    // let powButton: HTMLElement
    // let facButton: HTMLElement
    let sqrtButton: HTMLElement
    let plusButton: HTMLElement
    // let minusButton: HTMLElement
    let multButton: HTMLElement
    let divButton: HTMLElement
    let zeroButton: HTMLElement
    let oneButton: HTMLElement
    let twoButton: HTMLElement
    let threeButton: HTMLElement
    let fourButton: HTMLElement
    let fiveButton: HTMLElement
    let sixButton: HTMLElement
    // let sevenButton: HTMLElement
    // let eightButton: HTMLElement
    let nineButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        // powButton = screen.getByText('x^')
        // facButton = screen.getByText('n!')
        sqrtButton = screen.getByText('√x')
        plusButton = screen.getByText('+')
        // minusButton = screen.getByText('-')
        multButton = screen.getByText('X')
        divButton = screen.getByText('÷')
        zeroButton = screen.getByText('0')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
        threeButton = screen.getByText('3')
        fourButton = screen.getByText('4')
        fiveButton = screen.getByText('5')
        sixButton = screen.getByText('6')
        // sevenButton = screen.getByText('7')
        // eightButton = screen.getByText('8')
        nineButton = screen.getByText('9')
    })

    afterEach(() => cleanup())

    test('√9', () => {
        const events = [sqrtButton, nineButton, equalToButton]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('3')
    })

    test('√(10 + 6)', () => {
        const events = [
            sqrtButton,
            parButton,
            oneButton,
            zeroButton,
            plusButton,
            sixButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('4')
    })

    test('√(3 x 3) + √25 ÷  √4', () => {
        const events = [
            sqrtButton,
            parButton,
            threeButton,
            multButton,
            threeButton,
            parButton,
            plusButton,
            sqrtButton,
            twoButton,
            fiveButton,
            divButton,
            sqrtButton,
            fourButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('5.5')
    })
})
