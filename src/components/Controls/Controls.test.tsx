import type { Tone } from '../../interfaces/openAI.interface'

import { render, screen } from '@testing-library/react'
import { TONES } from '../../constants/tones'

import userEvent from '@testing-library/user-event'

import Controls from './Controls'

describe('Controls', () => {
    const defaultProps = {
        tone: TONES[0] as Tone,
        setTone: jest.fn(),
        improveReadability: false,
        setImproveReadability: jest.fn(),
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders tone selector with all options', () => {
        render(<Controls {...defaultProps} />)

        const select = screen.getByRole('combobox', { name: /tone/i })
        expect(select).toBeInTheDocument()

        TONES.forEach(tone => {
            expect(screen.getByRole('option', { name: new RegExp(tone, 'i') })).toBeInTheDocument()
        })
    })

    it('renders readability checkbox', () => {
        render(<Controls {...defaultProps} />)

        const checkbox = screen.getByRole('checkbox', { name: /improve readability/i })
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).not.toBeChecked()
    })

    it('calls setTone when selecting a different tone', async () => {
        render(<Controls {...defaultProps} />)

        const select = screen.getByRole('combobox', { name: /tone/i })
        const newTone = TONES[1] as Tone
        await userEvent.selectOptions(select, newTone)

        expect(defaultProps.setTone).toHaveBeenCalledWith(newTone)
    })

    it('calls setImproveReadability when toggling checkbox', async () => {
        render(<Controls {...defaultProps} />)

        const checkbox = screen.getByRole('checkbox', { name: /improve readability/i })
        await userEvent.click(checkbox)

        expect(defaultProps.setImproveReadability).toHaveBeenCalledWith(true)
    })

    it('displays current tone value', () => {
        render(<Controls {...defaultProps} />)

        const select = screen.getByRole('combobox', { name: /tone/i })
        expect(select).toHaveValue(defaultProps.tone)
    })

    it('displays current readability value', () => {
        render(<Controls {...defaultProps} improveReadability />)

        const checkbox = screen.getByRole('checkbox', { name: /improve readability/i })
        expect(checkbox).toBeChecked()
    })

    it('capitalizes tone options in the select', () => {
        render(<Controls {...defaultProps} />)

        TONES.forEach(tone => {
            const option = screen.getByRole('option', { name: new RegExp(tone, 'i') })
            expect(option).toHaveTextContent(tone.charAt(0).toUpperCase() + tone.slice(1))
        })
    })

    it('has correct styling classes', () => {
        render(<Controls {...defaultProps} />)

        const select = screen.getByRole('combobox', { name: /tone/i })
        expect(select).toHaveClass(
            'bg-gray-800',
            'border',
            'border-gray-700',
            'rounded-md',
            'px-3',
            'py-2',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-red-500',
            'focus:border-red-500',
            'text-white',
        )

        const checkbox = screen.getByRole('checkbox', { name: /improve readability/i })
        expect(checkbox).toHaveClass(
            'h-4',
            'w-4',
            'rounded',
            'border-gray-700',
            'bg-gray-800',
            'text-red-500',
            'focus:ring-red-500',
            'focus:ring-offset-gray-900',
            'checked:bg-red-500',
            'checked:hover:bg-red-600',
            'checked:focus:bg-red-500',
        )
    })
})
