import { describe, expect, test, beforeEach, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from '../src/App'

describe('GUI tests', () => {
    beforeEach(() => {
        render(<App />)
    })

    afterEach(() => cleanup())

    test('Must have a screen (paragraph) showing the current expression', () => {
        const expScreen = screen.getByTestId('expression')

        expect(expScreen).toBeDefined()
        expect(expScreen.tagName).toBe('P')
    })

    test('Must have a button with an = sign', () => {
        const equalToButton = screen.getByText('=')

        expect(equalToButton).toBeDefined()
        expect(equalToButton.tagName).toBe('BUTTON')
    })

    test('Must have buttons for numbers from 0 to 9', () => {
        for (let i = 0; i <= 9; i++) {
            const numButton = screen.getByText(i.toString())

            expect(numButton).toBeDefined()
            expect(numButton.tagName).toBe('BUTTON')
        }
    })
})

describe('Typing tests', () => {
    beforeEach(() => {
        render(<App />)
    })

    afterEach(() => cleanup())

    test('When a number button is clicked, the value must appear in the screen', () => {
        const expScreen = screen.getByTestId('expression')

        for (let i = 0; i <= 9; i++) {
            const numButton = screen.getByText(i.toString())

            fireEvent.click(numButton)

            const regex = new RegExp(`${i}`)
            expect(expScreen.innerHTML).toMatch(regex)
        }
    })
})
