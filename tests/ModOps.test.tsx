import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'
import App from '../src/App'

describe('Operations using the modulus operator', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let multButton: HTMLElement
    let modButton: HTMLElement
    let zeroButton: HTMLElement
    let oneButton: HTMLElement
    let twoButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        multButton = screen.getByText('X')
        modButton = screen.getByText('mod')
        zeroButton = screen.getByText('0')
        oneButton = screen.getByText('1')
        twoButton = screen.getByText('2')
    })

    afterEach(() => cleanup())

    test('20 mod 10', () => {
        const clickEvents = [
            twoButton,
            zeroButton,
            modButton,
            oneButton,
            zeroButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 20 % 10

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('2 x (10 mod 20)', () => {
        const clickEvents = [
            twoButton,
            multButton,
            parButton,
            oneButton,
            zeroButton,
            modButton,
            twoButton,
            zeroButton,
            parButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = 2 * (10 % 20)

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })

    test('22 x 22 mod 10', () => {
        const clickEvents = [
            twoButton,
            twoButton,
            multButton,
            twoButton,
            twoButton,
            modButton,
            oneButton,
            zeroButton,
            equalToButton,
        ]

        consecClickEvents(clickEvents)

        const result = (22 * 22) % 10

        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
