import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Operations using the EXP button', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let plusButton: HTMLElement
    let minusButton: HTMLElement
    let expButton: HTMLElement
    let zeroButton: HTMLElement
    let oneButton: HTMLElement
    let twoButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        plusButton = screen.getByText('+')
        minusButton = screen.getByText('-')
        expButton = screen.getByText('exp')
        zeroButton = screen.getByText('0')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
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
