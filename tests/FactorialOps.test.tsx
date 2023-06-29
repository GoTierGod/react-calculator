import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
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
        powButton = screen.getByText('^')
        facButton = screen.getByText('!')
        plusButton = screen.getByText('+')
        minusButton = screen.getByText('-')
        multButton = screen.getByText('x')
        divButton = screen.getByText('÷')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
        threeButton = screen.getByText('3')
        fourButton = screen.getByText('4')
    })

    afterEach(() => cleanup())

    test('1! + 2!', () => {
        const events = [
            oneButton,
            facButton,
            plusButton,
            twoButton,
            facButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('3')
    })

    test('2! ^ 2!', () => {
        const events = [
            twoButton,
            facButton,
            powButton,
            twoButton,
            facButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('4')
    })

    test('3! - 4!', () => {
        const events = [
            threeButton,
            facButton,
            minusButton,
            fourButton,
            facButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('-18')
    })

    test('(2! + 3!) x 3!', () => {
        const events = [
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

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('48')
    })

    test('(4! ÷ 3!)', () => {
        const events = [
            parButton,
            fourButton,
            facButton,
            divButton,
            threeButton,
            facButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(events)

        expect(expScreen.innerHTML).toBe('4')
    })
})
