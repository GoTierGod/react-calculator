import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { consecClickEvents } from './helpers/consecClickEvents'
import App from '../src/App'

describe('Avoid syntax errors', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let parButton: HTMLElement
    let fiveButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        parButton = screen.getByText('( )')
        fiveButton = screen.getByText('5')
    })

    afterEach(() => cleanup())

    test('Return a "Non-closed parenthesis" error', () => {
        const clickEvents = [parButton, fiveButton, equalToButton]

        consecClickEvents(clickEvents)

        expect(expScreen.innerHTML).toBe('Non-closed parenthesis')
    })

    test('Avoid empty parenthesis', () => {
        const clickEvents = [parButton, parButton]

        consecClickEvents(clickEvents)

        expect(expScreen.innerHTML).not.toBe('()')
    })
})
