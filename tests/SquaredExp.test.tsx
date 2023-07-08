import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Fast squared exponentiation', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let sqrtButton: HTMLElement
    let plusButton: HTMLElement
    let squaredButton: HTMLElement
    let piButton: HTMLElement
    let eulerButton: HTMLElement
    let nineButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        sqrtButton = screen.getByText('√x')
        plusButton = screen.getByText('+')
        squaredButton = screen.getByText('x²')
        piButton = screen.getByText('π')
        eulerButton = screen.getByText('e')
        nineButton = screen.getByText('9')
    })

    afterEach(() => cleanup())

    test('π ^ 2', () => {
        const clickEvents = [piButton, squaredButton, equalToButton]

        consecClickEvents(clickEvents)

        const result = Math.PI ** 2

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('π + (e ^ 2)', () => {
        const clickEvents = [
            piButton,
            plusButton,
            parButton,
            eulerButton,
            squaredButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.PI + Math.E ** 2

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('√(9 ^ 2)', () => {
        const clickEvents = [
            sqrtButton,
            parButton,
            nineButton,
            squaredButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = Math.sqrt(9 ** 2)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
