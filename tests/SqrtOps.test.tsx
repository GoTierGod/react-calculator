import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Square root operations', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let sqrtButton: HTMLElement
    let plusButton: HTMLElement
    let multButton: HTMLElement
    let divButton: HTMLElement
    let pointButton: HTMLElement
    let zeroButton: HTMLElement
    let oneButton: HTMLElement
    let twoButton: HTMLElement
    let threeButton: HTMLElement
    let fourButton: HTMLElement
    let fiveButton: HTMLElement
    let sixButton: HTMLElement
    let nineButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        sqrtButton = screen.getByText('√x')
        plusButton = screen.getByText('+')
        multButton = screen.getByText('X')
        divButton = screen.getByText('÷')
        pointButton = screen.getByText('.')
        zeroButton = screen.getByText('0')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
        threeButton = screen.getByText('3')
        fourButton = screen.getByText('4')
        fiveButton = screen.getByText('5')
        sixButton = screen.getByText('6')
        nineButton = screen.getByText('9')
    })

    afterEach(() => cleanup())

    test('√9', () => {
        const clickEvents = [sqrtButton, nineButton, equalToButton]

        consecClickEvents(clickEvents)

        const result = Math.sqrt(9)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('√(10 + 6)', () => {
        const clickEvents = [
            sqrtButton,
            parButton,
            oneButton,
            zeroButton,
            plusButton,
            sixButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.sqrt(10 + 6)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('√(3 x 3) + √25 ÷  √4', () => {
        const clickEvents = [
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

        consecClickEvents(clickEvents)

        const result = Math.sqrt(3 * 3) + Math.sqrt(25) / Math.sqrt(4)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('√4.5', () => {
        const clickEvents = [
            sqrtButton,
            fourButton,
            pointButton,
            fiveButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.sqrt(4.5)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
