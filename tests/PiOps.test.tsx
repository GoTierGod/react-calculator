import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Operations using the Pi number', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let plusButton: HTMLElement
    let multButton: HTMLElement
    let divButton: HTMLElement
    let piButton: HTMLElement
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
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
    })

    afterEach(() => cleanup())

    test('π + 1', () => {
        const clickEvents = [piButton, plusButton, oneButton, equalToButton]

        consecClickEvents(clickEvents)

        const result = Math.PI + 1

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
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

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
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

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
