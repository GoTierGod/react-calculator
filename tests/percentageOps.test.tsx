import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import App from '../src/App'

describe('', () => {
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
    // let piButton: HTMLElement
    let percButton: HTMLElement
    let zeroButton: HTMLElement
    let oneButton: HTMLElement
    let twoButton: HTMLElement
    let threeButton: HTMLElement
    // let fourButton: HTMLElement
    let fiveButton: HTMLElement
    // let sixButton: HTMLElement
    // let sevenButton: HTMLElement
    // let eightButton: HTMLElement
    // let nineButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        // powButton = screen.getByText('^')
        // facButton = screen.getByText('!')
        // sqrtButton = screen.getByText('√')
        plusButton = screen.getByText('+')
        // minusButton = screen.getByText('-')
        multButton = screen.getByText('x')
        // divButton = screen.getByText('÷')
        // piButton = screen.getByText('π')
        percButton = screen.getByText('%')
        zeroButton = screen.getByText('0')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
        threeButton = screen.getByText('3')
        // fourButton = screen.getByText('4')
        fiveButton = screen.getByText('5')
        // sixButton = screen.getByText('6')
        // sevenButton = screen.getByText('7')
        // eightButton = screen.getByText('8')
        // nineButton = screen.getByText('9')
    })

    afterEach(() => cleanup())

    test('50 % 10', () => {
        const events = [
            fiveButton,
            zeroButton,
            percButton,
            oneButton,
            zeroButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('5')
    })

    test('(25 + 25) % 5', () => {
        const events = [
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

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('2.5')
    })

    test('(25 x 2) % (5 x 3)', () => {
        const events = [
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

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('7.5')
    })
})
