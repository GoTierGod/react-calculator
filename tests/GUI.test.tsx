import { describe, expect, test, beforeEach, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from '../src/App'
import { consecClickEvents } from './helpers/consecClickEvents'
import { correctNumFormat } from './helpers/correctNumFormat'

describe('GUI tests', () => {
    beforeEach(() => {
        render(<App />)
    })

    afterEach(() => cleanup())

    test('Must have a paragraph to show the current expression', () => {
        const expScreen = screen.getByTestId('expression')

        expect(expScreen).toBeDefined()
        expect(expScreen.tagName).toBe('P')
    })

    test('Must have a span to show the last answer', () => {
        const ansScreen = screen.getByTestId('ans')

        expect(ansScreen).toBeDefined()
        expect(ansScreen.tagName).toBe('SPAN')
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

describe('Screen tests', () => {
    beforeEach(() => {
        render(<App />)
    })

    afterEach(() => cleanup())

    test('Correctly showing expression and last answer', () => {
        const expScreen = screen.getByTestId('expression')
        const ansScreen = screen.getByTestId('ans')

        const equalToButton = screen.getByText('=')
        const multButton = screen.getByText('X')
        const threeButton = screen.getByText('3')
        const fourButton = screen.getByText('4')

        const clickEvents = [threeButton, multButton, fourButton, equalToButton]

        consecClickEvents(clickEvents)

        const result = 3 * 4

        expect(ansScreen.innerHTML).toBe(correctNumFormat(result))
        expect(expScreen.innerHTML).toBe(correctNumFormat(result))
    })
})
