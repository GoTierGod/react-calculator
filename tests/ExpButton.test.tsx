import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Operations using the EXP button', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    // let parButton: HTMLElement
    // let powButton: HTMLElement
    // let facButton: HTMLElement
    // let sqrtButton: HTMLElement
    let plusButton: HTMLElement
    let minusButton: HTMLElement
    // let multButton: HTMLElement
    // let divButton: HTMLElement
    // let squaredButton: HTMLElement
    // let expBaseTen: HTMLElement
    let expButton: HTMLElement
    // let piButton: HTMLElement
    // let eulerButton: HTMLElement
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
        // parButton = screen.getByText('( )')
        // powButton = screen.getByText('x^')
        // facButton = screen.getByText('n!')
        // sqrtButton = screen.getByText('√x')
        plusButton = screen.getByText('+')
        minusButton = screen.getByText('-')
        // multButton = screen.getByText('X')
        // divButton = screen.getByText('÷')
        // squaredButton = screen.getByText('x²')
        // expBaseTen = screen.getByText('10^')
        expButton = screen.getByText('exp')
        // piButton = screen.getByText('π')
        // eulerButton = screen.getByText('e')
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

    test('1e+10', () => {
        const clickEvents = [
            oneButton,
            expButton,
            oneButton,
            zeroButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 1e10

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('2e+2 + 10', () => {
        const clickEvents = [
            twoButton,
            expButton,
            twoButton,
            plusButton,
            oneButton,
            zeroButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 2e2 + 10

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('20e+20 - 10e+10', () => {
        const clickEvents = [
            twoButton,
            zeroButton,
            expButton,
            twoButton,
            zeroButton,
            minusButton,
            oneButton,
            zeroButton,
            expButton,
            oneButton,
            zeroButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 20e20 - 10e10

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})