import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import TextEditor from './TextEditor'

describe('TextEditor', () => {
    const defaultProps = {
        inputText: '',
        outputText: '',
        setInputText: jest.fn(),
    }

    beforeEach(() => {
        jest.clearAllMocks()
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn(),
            },
        })
    })

    const getButtonByLabel = (label: string) => {
        return screen.getByRole('button', { name: label })
    }

    it('renders with empty text and placeholder', () => {
        render(<TextEditor {...defaultProps} />)

        const textarea = screen.getByPlaceholderText('Enter your text here...')
        expect(textarea).toBeInTheDocument()
        expect(textarea).toHaveValue('')
    })

    it('handles text input correctly', async () => {
        render(<TextEditor {...defaultProps} />)
        const textarea = screen.getByPlaceholderText('Enter your text here...')

        await userEvent.click(textarea)
        await userEvent.paste('Hello, world!')

        expect(defaultProps.setInputText).toHaveBeenCalledWith('Hello, world!')
    })

    it('displays input text', () => {
        const props = {
            ...defaultProps,
            inputText: 'Test input',
        }
        render(<TextEditor {...props} />)

        expect(screen.getByPlaceholderText('Enter your text here...')).toHaveValue('Test input')
    })

    it('displays output text when available', () => {
        const props = {
            ...defaultProps,
            inputText: 'Original text',
            outputText: 'Generated text',
        }
        render(<TextEditor {...props} />)

        expect(screen.getByPlaceholderText('Enter your text here...')).toHaveValue('Generated text')
    })

    it('copies input text to clipboard when no output', async () => {
        const props = {
            ...defaultProps,
            inputText: 'Test text',
        }
        render(<TextEditor {...props} />)

        const copyButton = getButtonByLabel('Copy text')
        await userEvent.click(copyButton)

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Test text')
    })

    it('copies output text to clipboard when available', async () => {
        const props = {
            ...defaultProps,
            inputText: 'Original text',
            outputText: 'Generated text',
        }
        render(<TextEditor {...props} />)

        const copyButton = getButtonByLabel('Copy text')
        await userEvent.click(copyButton)

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Generated text')
    })

    it('clears text and resets state when clear button is clicked', async () => {
        const props = {
            ...defaultProps,
            inputText: 'Test text',
            outputText: 'Generated text',
        }
        render(<TextEditor {...props} />)

        const clearButton = getButtonByLabel('Clear text')
        await userEvent.click(clearButton)

        expect(defaultProps.setInputText).toHaveBeenCalledWith('')
    })

    it('toggles between original and generated text in compare mode', async () => {
        const props = {
            ...defaultProps,
            inputText: 'Original text',
            outputText: 'Generated text',
        }
        render(<TextEditor {...props} />)

        const compareButton = getButtonByLabel('Compare texts')
        const textarea = screen.getByPlaceholderText('Enter your text here...')

        expect(textarea).toHaveValue('Generated text')

        await userEvent.click(compareButton)
        expect(textarea).toHaveValue('Original text')
        expect(compareButton).toHaveClass('bg-gray-800', 'text-red-500')
        expect(compareButton).toHaveAttribute('aria-label', 'Show Generated')

        await userEvent.click(compareButton)
        expect(textarea).toHaveValue('Generated text')
        expect(compareButton).toHaveClass('bg-gray-800', 'text-red-500')
        expect(compareButton).toHaveAttribute('aria-label', 'Show Original')

        await userEvent.click(compareButton)
        expect(textarea).toHaveValue('Original text')
        expect(compareButton).toHaveClass('bg-gray-800', 'text-red-500')
        expect(compareButton).toHaveAttribute('aria-label', 'Show Generated')
    })

    it('disables buttons appropriately', () => {
        render(<TextEditor {...defaultProps} />)

        const clearButton = getButtonByLabel('Clear text')
        const copyButton = getButtonByLabel('Copy text')
        const compareButton = getButtonByLabel('Compare texts')

        expect(clearButton).toBeDisabled()
        expect(copyButton).toBeDisabled()
        expect(compareButton).toBeDisabled()
    })

    it('enables buttons when text is present', () => {
        const props = {
            ...defaultProps,
            inputText: 'Test text',
        }
        render(<TextEditor {...props} />)

        const clearButton = getButtonByLabel('Clear text')
        const copyButton = getButtonByLabel('Copy text')

        expect(clearButton).not.toBeDisabled()
        expect(copyButton).not.toBeDisabled()
    })

    it('enables compare button only when output text is present', () => {
        const props = {
            ...defaultProps,
            inputText: 'Test text',
            outputText: 'Generated text',
        }
        render(<TextEditor {...props} />)

        const compareButton = getButtonByLabel('Compare texts')
        expect(compareButton).not.toBeDisabled()
    })

    it('makes textarea readonly in compare mode', async () => {
        const props = {
            ...defaultProps,
            inputText: 'Original text',
            outputText: 'Generated text',
        }
        render(<TextEditor {...props} />)

        const textarea = screen.getByPlaceholderText('Enter your text here...')
        const compareButton = getButtonByLabel('Compare texts')

        expect(textarea).not.toHaveAttribute('readonly')

        await userEvent.click(compareButton)
        expect(textarea).toHaveAttribute('readonly')
    })

    it('updates button aria-label based on compare mode', async () => {
        const props = {
            ...defaultProps,
            inputText: 'Original text',
            outputText: 'Generated text',
        }
        render(<TextEditor {...props} />)

        const compareButton = getButtonByLabel('Compare texts')

        expect(compareButton).toHaveAttribute('aria-label', 'Compare texts')

        await userEvent.click(compareButton)
        expect(compareButton).toHaveAttribute('aria-label', 'Show Generated')

        await userEvent.click(compareButton)
        expect(compareButton).toHaveAttribute('aria-label', 'Show Original')
    })

    it('resets state when new input is entered after having output', async () => {
        const props = {
            ...defaultProps,
            inputText: 'Original text',
            outputText: 'Generated text',
        }
        render(<TextEditor {...props} />)

        const textarea = screen.getByPlaceholderText('Enter your text here...')
        const compareButton = getButtonByLabel('Compare texts')

        await userEvent.click(compareButton)
        expect(textarea).toHaveValue('Original text')
        expect(textarea).toHaveAttribute('readonly')
    })

    it('applies correct styles to buttons', () => {
        const props = {
            ...defaultProps,
            inputText: 'Test text',
            outputText: 'Generated text',
        }
        render(<TextEditor {...props} />)

        const buttons = [
            getButtonByLabel('Clear text'),
            getButtonByLabel('Copy text'),
            getButtonByLabel('Compare texts'),
        ]

        buttons.forEach(button => {
            expect(button).toHaveClass('p-1.5', 'rounded-md', 'transition-colors')
        })

        const compareButton = buttons[2]
        expect(compareButton).toHaveClass('hover:bg-gray-800', 'text-gray-400')
    })
})
