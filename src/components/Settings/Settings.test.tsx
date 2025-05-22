import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import Settings from './Settings'

describe('Settings', () => {
    const defaultProps = {
        apiKey: '',
        isOpen: true,
        onClose: jest.fn(),
        setApiKey: jest.fn(),
        onSave: jest.fn(),
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders nothing when isOpen is false', () => {
        render(<Settings {...defaultProps} isOpen={false} />)
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('renders modal with correct title and form elements when open', () => {
        render(<Settings {...defaultProps} />)

        expect(screen.getByRole('dialog')).toBeInTheDocument()
        expect(screen.getByText('Settings')).toBeInTheDocument()
        expect(screen.getByLabelText('OpenAI API Key')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('sk-...')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })

    it('handles API key input changes', async () => {
        render(<Settings {...defaultProps} />)
        const input = screen.getByLabelText('OpenAI API Key')

        await userEvent.type(input, 'sk-test123')

        expect(defaultProps.setApiKey).toHaveBeenCalledWith('sk-test123')
        expect(input).toHaveValue('sk-test123')
    })

    it('toggles API key visibility', async () => {
        render(<Settings {...defaultProps} apiKey="sk-test123" />)
        const input = screen.getByLabelText('OpenAI API Key')
        const toggleButton = screen.getByRole('button', { name: 'Show API key' })

        expect(input).toHaveAttribute('type', 'password')

        await userEvent.click(toggleButton)
        expect(input).toHaveAttribute('type', 'text')
        expect(toggleButton).toHaveAttribute('aria-label', 'Hide API key')

        await userEvent.click(toggleButton)
        expect(input).toHaveAttribute('type', 'password')
        expect(toggleButton).toHaveAttribute('aria-label', 'Show API key')
    })

    it('disables save button when API key is empty', () => {
        render(<Settings {...defaultProps} />)
        const saveButton = screen.getByRole('button', { name: 'Save' })
        expect(saveButton).toBeDisabled()
    })

    it('disables save button when API key is unchanged', () => {
        render(<Settings {...defaultProps} apiKey="sk-test123" />)
        const saveButton = screen.getByRole('button', { name: 'Save' })
        expect(saveButton).toBeDisabled()
    })

    it('enables save button when API key is changed', async () => {
        render(<Settings {...defaultProps} apiKey="sk-test123" />)
        const input = screen.getByLabelText('OpenAI API Key')
        const saveButton = screen.getByRole('button', { name: 'Save' })

        await userEvent.clear(input)
        await userEvent.type(input, 'sk-newkey')

        expect(saveButton).not.toBeDisabled()
    })

    it('calls onSave with new API key when form is submitted', async () => {
        render(<Settings {...defaultProps} />)
        const input = screen.getByLabelText('OpenAI API Key')

        await userEvent.type(input, 'sk-newkey')
        await userEvent.click(screen.getByRole('button', { name: 'Save' }))

        expect(defaultProps.onSave).toHaveBeenCalledWith('sk-newkey')
    })

    it('calls onClose and resets API key when cancel is clicked', async () => {
        render(<Settings {...defaultProps} apiKey="sk-original" />)
        const input = screen.getByLabelText('OpenAI API Key')
        const cancelButton = screen.getByRole('button', { name: 'Cancel' })

        await userEvent.clear(input)
        await userEvent.type(input, 'sk-modified')
        await userEvent.click(cancelButton)

        expect(defaultProps.onClose).toHaveBeenCalled()
        expect(defaultProps.setApiKey).toHaveBeenCalledWith('sk-original')
    })

    it('calls onClose when close button is clicked', async () => {
        const props = {
            ...defaultProps,
            apiKey: 'sk-test123',
        }
        render(<Settings {...props} />)
        const closeButton = screen.getByRole('button', { name: 'Close settings' })

        await userEvent.click(closeButton)

        expect(props.onClose).toHaveBeenCalled()
    })

    it('displays privacy message about API key storage', () => {
        render(<Settings {...defaultProps} />)
        expect(
            screen.getByText('Your API key is stored locally in your browser and never sent to our servers.'),
        ).toBeInTheDocument()
    })

    it('resets state when modal is opened', () => {
        const { rerender } = render(<Settings {...defaultProps} isOpen={false} />)

        rerender(<Settings {...defaultProps} isOpen={true} apiKey="sk-newkey" />)

        const input = screen.getByLabelText('OpenAI API Key')
        expect(input).toHaveValue('sk-newkey')
        expect(input).toHaveAttribute('type', 'password')
    })

    it('prevents default on mouse down for visibility toggle button', async () => {
        render(<Settings {...defaultProps} />)
        const toggleButton = screen.getByRole('button', { name: 'Show API key' })

        const preventDefaultSpy = jest.spyOn(Event.prototype, 'preventDefault')

        await userEvent.click(toggleButton)

        expect(preventDefaultSpy).toHaveBeenCalled()

        preventDefaultSpy.mockRestore()
    })
})
