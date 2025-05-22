import { render, screen } from '@testing-library/react'

import Tooltip from './Tooltip'

describe('Tooltip', () => {
    it('renders children correctly', () => {
        render(
            <Tooltip content="Test tooltip">
                <button>Hover me</button>
            </Tooltip>,
        )

        expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument()
    })

    it('renders tooltip content', () => {
        render(
            <Tooltip content="Test tooltip">
                <button>Hover me</button>
            </Tooltip>,
        )

        expect(screen.getByText('Test tooltip')).toBeInTheDocument()
    })

    it('applies correct classes to tooltip container', () => {
        render(
            <Tooltip content="Test tooltip">
                <button>Hover me</button>
            </Tooltip>,
        )

        const tooltipContainer = screen.getByText('Test tooltip').closest('div')?.parentElement
        expect(tooltipContainer).toHaveClass(
            'absolute',
            'left-1/2',
            '-translate-x-1/2',
            '-bottom-1',
            'translate-y-full',
            'opacity-0',
            'group-hover:opacity-100',
            'transition-opacity',
            'duration-200',
            'pointer-events-none',
        )
    })

    it('applies correct classes to tooltip content', () => {
        render(
            <Tooltip content="Test tooltip">
                <button>Hover me</button>
            </Tooltip>,
        )

        const tooltipContent = screen.getByText('Test tooltip').closest('div')
        expect(tooltipContent).toHaveClass(
            'bg-gray-950',
            'text-gray-200',
            'text-xs',
            'px-2',
            'py-1',
            'rounded',
            'mt-1',
            'whitespace-nowrap',
        )
    })

    it('wraps children in a relative container with group class', () => {
        render(
            <Tooltip content="Test tooltip">
                <button>Hover me</button>
            </Tooltip>,
        )

        const container = screen.getByRole('button', { name: 'Hover me' }).closest('div')
        expect(container).toHaveClass('relative', 'group')
    })

    it('renders with complex children', () => {
        render(
            <Tooltip content="Complex tooltip">
                <div>
                    <span>Nested</span>
                    <button>Button</button>
                </div>
            </Tooltip>,
        )

        expect(screen.getByText('Nested')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument()
        expect(screen.getByText('Complex tooltip')).toBeInTheDocument()
    })

    it('maintains tooltip content visibility state', () => {
        render(
            <Tooltip content="Test tooltip">
                <button>Hover me</button>
            </Tooltip>,
        )

        const tooltipContainer = screen.getByText('Test tooltip').closest('div')?.parentElement
        expect(tooltipContainer).toHaveClass('opacity-0')
        expect(tooltipContainer).toHaveClass('group-hover:opacity-100')
    })
})
