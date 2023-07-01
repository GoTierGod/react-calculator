import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import App from '../src/App'

describe('Operations using decimals', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let powButton: HTMLElement
    let facButton: HTMLElement
    let sqrtButton: HTMLElement
    let plusButton: HTMLElement
    let minusButton: HTMLElement
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
    let sevenButton: HTMLElement
    let eightButton: HTMLElement
    let nineButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        powButton = screen.getByText('^')
        facButton = screen.getByText('!')
        sqrtButton = screen.getByText('√')
        plusButton = screen.getByText('+')
        minusButton = screen.getByText('-')
        multButton = screen.getByText('x')
        divButton = screen.getByText('÷')
        pointButton = screen.getByText('.')
        zeroButton = screen.getByText('0')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
        threeButton = screen.getByText('3')
        fourButton = screen.getByText('4')
        fiveButton = screen.getByText('5')
        sixButton = screen.getByText('6')
        sevenButton = screen.getByText('7')
        eightButton = screen.getByText('8')
        nineButton = screen.getByText('9')
    })

    afterEach(() => cleanup())

    test('0.5 x 1.5 - (5.0 ^ 2)', () => {
        const events = [
            zeroButton,
            pointButton,
            fiveButton,
            multButton,
            oneButton,
            pointButton,
            fiveButton,
            minusButton,
            parButton,
            fiveButton,
            pointButton,
            zeroButton,
            powButton,
            twoButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('-24.25')
    })

    test('5! x 0.5', () => {
        const events = [
            fiveButton,
            facButton,
            multButton,
            zeroButton,
            pointButton,
            fiveButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('60')
    })

    test('(1.0 ÷ 3) + (1 ÷ 3.0)', () => {
        const events = [
            parButton,
            oneButton,
            pointButton,
            zeroButton,
            divButton,
            threeButton,
            parButton,
            plusButton,
            parButton,
            oneButton,
            divButton,
            threeButton,
            pointButton,
            zeroButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('0.667')
    })
})
