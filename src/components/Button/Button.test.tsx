import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import Button from './Button'

describe('Button', () => {
    const defaultProps = {
        children: 'Click me',
        onClick: jest.fn(),
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders with children', () => {
        render(<Button {...defaultProps} />)
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('calls onClick when clicked', async () => {
        render(<Button {...defaultProps} />)
        const button = screen.getByRole('button')

        await userEvent.click(button)

        expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
        render(<Button {...defaultProps} isDisabled />)
        const button = screen.getByRole('button')

        await userEvent.click(button)

        expect(defaultProps.onClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', async () => {
        render(<Button {...defaultProps} isLoading />)
        const button = screen.getByRole('button')

        await userEvent.click(button)

        expect(defaultProps.onClick).not.toHaveBeenCalled()
    })

    it('shows spinner when loading', () => {
        render(<Button {...defaultProps} isLoading />)
        expect(screen.getByRole('status')).toBeInTheDocument()
        expect(screen.queryByText('Click me')).not.toBeInTheDocument()
    })

    it('is disabled when isDisabled prop is true', () => {
        render(<Button {...defaultProps} isDisabled />)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('is disabled when isLoading prop is true', () => {
        render(<Button {...defaultProps} isLoading />)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('has correct styling classes', () => {
        render(<Button {...defaultProps} />)
        const button = screen.getByRole('button')

        expect(button).toHaveClass(
            'flex',
            'items-center',
            'justify-center',
            'w-full',
            'bg-red-600',
            'hover:bg-red-500',
            'text-white',
            'font-medium',
            'py-2.5',
            'px-4',
            'rounded-md',
            'transition-colors',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-offset-2',
            'focus:ring-offset-gray-900',
            'focus:ring-red-500',
        )
    })

    it('renders with complex children', () => {
        const complexChildren = (
            <div>
                <span>Icon</span>
                <span>Text</span>
            </div>
        )
        render(<Button {...defaultProps} children={complexChildren} />)

        expect(screen.getByText('Icon')).toBeInTheDocument()
        expect(screen.getByText('Text')).toBeInTheDocument()
    })
})
