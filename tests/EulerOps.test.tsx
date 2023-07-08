import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Operations using the Euler number', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let plusButton: HTMLElement
    let multButton: HTMLElement
    let divButton: HTMLElement
    let piButton: HTMLElement
    let eulerButton: HTMLElement
    let zeroButton: HTMLElement
    let oneButton: HTMLElement
    let twoButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        plusButton = screen.getByText('+')
        multButton = screen.getByText('X')
        divButton = screen.getByText('÷')
        piButton = screen.getByText('π')
        eulerButton = screen.getByText('e')
        zeroButton = screen.getByText('0')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
    })

    afterEach(() => cleanup())

    test('e + 10', () => {
        const clickEvents = [
            eulerButton,
            plusButton,
            oneButton,
            zeroButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.E + 10

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('e x (2 + 1)', () => {
        const clickEvents = [
            eulerButton,
            multButton,
            parButton,
            twoButton,
            plusButton,
            oneButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.E * (2 + 1)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('(e + π) ÷ 2', () => {
        const clickEvents = [
            parButton,
            eulerButton,
            plusButton,
            piButton,
            parButton,
            divButton,
            twoButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = (Math.E + Math.PI) / 2

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
