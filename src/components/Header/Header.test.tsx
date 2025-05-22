import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import Header from './Header'

describe('Header', () => {
    const defaultProps = {
        onOpenSettings: jest.fn(),
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders the logo and title', () => {
        render(<Header {...defaultProps} />)

        expect(screen.getByText('🚀')).toBeInTheDocument()
        expect(screen.getByText('∆stro')).toBeInTheDocument()
        expect(screen.getByText('Text')).toBeInTheDocument()
    })

    it('renders settings button', () => {
        render(<Header {...defaultProps} />)

        const settingsButton = screen.getByRole('button', { name: /settings/i })
        expect(settingsButton).toBeInTheDocument()
    })

    it('calls onOpenSettings when settings button is clicked', async () => {
        render(<Header {...defaultProps} />)

        const settingsButton = screen.getByRole('button', { name: /settings/i })
        await userEvent.click(settingsButton)

        expect(defaultProps.onOpenSettings).toHaveBeenCalledTimes(1)
    })

    it('has correct styling for the logo container', () => {
        render(<Header {...defaultProps} />)

        const logoContainer = screen.getByTestId('logo-container')
        const parentContainer = logoContainer.parentElement

        expect(logoContainer).toHaveClass(
            'bg-red-800/10',
            'text-white',
            'w-8',
            'h-8',
            'rounded-md',
            'flex',
            'items-center',
            'justify-center',
            'backdrop-blur-sm',
            'ring-1',
            'ring-red-500',
        )

        expect(parentContainer).toHaveClass('flex', 'justify-between', 'items-center', 'gap-2')
    })

    it('has correct styling for the title', () => {
        render(<Header {...defaultProps} />)

        const title = screen.getByText('∆stro')
        expect(title).toHaveClass('text-2xl', 'font-light', 'text-white', 'tracking-widest')

        const titleHighlight = screen.getByText('Text')
        expect(titleHighlight).toHaveClass('text-red-500', 'font-bold')
    })

    it('has correct styling for the settings button', () => {
        render(<Header {...defaultProps} />)

        const settingsButton = screen.getByRole('button', { name: /settings/i })
        expect(settingsButton).toHaveClass('p-2', 'hover:bg-gray-800', 'rounded-full', 'transition-colors')

        const icon = settingsButton.querySelector('svg')
        expect(icon).toHaveClass('text-gray-400')
    })

    it('maintains proper layout structure', () => {
        render(<Header {...defaultProps} />)

        const header = screen.getByRole('banner')
        expect(header).toHaveClass('flex', 'justify-between', 'items-center')

        const logoTitleContainer = screen.getByText('🚀').closest('div')?.parentElement
        expect(logoTitleContainer).toHaveClass('flex', 'items-center', 'gap-2')
    })
})
