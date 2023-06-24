import { describe, it, expect, test, beforeEach, afterEach } from 'vitest'
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

describe('Basic operations tests', () => {
    let expScreen: HTMLElement
    let equalToButton: HTMLElement
    let plusButton: HTMLElement
    let minusButton: HTMLElement
    let multButton: HTMLElement
    let divButton: HTMLElement
    let threeButton: HTMLElement
    let fourButton: HTMLElement

    beforeEach(() => {
        render(<App />)

        expScreen = screen.getByTestId('expression')
        equalToButton = screen.getByText('=')
        plusButton = screen.getByText('+')
        minusButton = screen.getByText('-')
        multButton = screen.getByText('x')
        divButton = screen.getByText('÷')
        threeButton = screen.getByText('3')
        fourButton = screen.getByText('4')
    })

    afterEach(() => cleanup())

    test('Addition: 3 + 4', () => {
        fireEvent.click(threeButton)
        fireEvent.click(plusButton)
        fireEvent.click(fourButton)
        fireEvent.click(equalToButton)

        expect(expScreen.innerHTML).toBe('7')
    })

    test('Subtraction: 4 - 3', () => {
        fireEvent.click(fourButton)
        fireEvent.click(minusButton)
        fireEvent.click(threeButton)
        fireEvent.click(equalToButton)

        expect(expScreen.innerHTML).toBe('1')
    })

    test('Multiplication: 4 x 3', () => {
        fireEvent.click(fourButton)
        fireEvent.click(multButton)
        fireEvent.click(threeButton)
        fireEvent.click(equalToButton)

        expect(expScreen.innerHTML).toBe('12')
    })

    test('Division: 3 ÷ 4', () => {
        fireEvent.click(threeButton)
        fireEvent.click(divButton)
        fireEvent.click(fourButton)
        fireEvent.click(equalToButton)

        expect(expScreen.innerHTML).toBe('0.75')
    })
})
