import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import App from '../src/App'

describe('Operations using the pi number', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    // let powButton: HTMLElement
    // let facButton: HTMLElement
    // let sqrtButton: HTMLElement
    let plusButton: HTMLElement
    // let minusButton: HTMLElement
    let multButton: HTMLElement
    let divButton: HTMLElement
    let piButton: HTMLElement
    // let zeroButton: HTMLElement
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
        divButton = screen.getByText('÷')
        piButton = screen.getByText('π')
        // zeroButton = screen.getByText('0')
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

    test('π + 1', () => {
        const clickEvents = [piButton, plusButton, oneButton, equalToButton]

        consecClickEvents(clickEvents)

        const result = Math.PI + 1

        expect(expScreen.innerHTML).toBe(result.toString())
    })

    test('π x (2 + 1)', () => {
        const clickEvents = [
            piButton,
            multButton,
            parButton,
            twoButton,
            plusButton,
            oneButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.PI * (2 + 1)

        expect(expScreen.innerHTML).toBe(result.toString())
    })

    test('(π + π) ÷ 2', () => {
        const clickEvents = [
            parButton,
            piButton,
            plusButton,
            piButton,
            parButton,
            divButton,
            twoButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = (Math.PI + Math.PI) / 2

        expect(expScreen.innerHTML).toBe(result.toString())
    })
})
