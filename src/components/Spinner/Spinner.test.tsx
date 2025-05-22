import { render, screen } from '@testing-library/react'

import Spinner from './Spinner'

describe('Spinner', () => {
    it('renders with correct role', () => {
        render(<Spinner />)
        expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('has correct styling classes', () => {
        render(<Spinner />)
        const spinner = screen.getByRole('status')

        expect(spinner).toHaveClass(
            'w-4',
            'h-4',
            'border-4',
            'border-t-transparent',
            'border-b-transparent',
            'border-red-500',
            'rounded-full',
            'animate-spin',
        )
    })
})
