import { describe, it, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('GUI Tests', () => {
    test('Should be a button with a = sign', () => {
        render(<App />)

        const equalToButton = screen.getByText('=')
        expect(equalToButton).toBeDefined()
        expect(equalToButton.tagName).toBe('BUTTON')
    })
})
