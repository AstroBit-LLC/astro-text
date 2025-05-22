import React from 'react'

import Spinner from '../Spinner/Spinner'

interface ButtonProps {
    children: React.ReactNode
    onClick: VoidFunction
    isDisabled?: boolean
    isLoading?: boolean
}

const Button: React.FC<ButtonProps> = props => {
    const { children, onClick, isDisabled, isLoading } = props

    return (
        <button
            onClick={onClick}
            disabled={isDisabled || isLoading}
            className="flex items-center justify-center w-full bg-red-600 hover:bg-red-500 text-white font-medium py-2.5 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500"
        >
            {isLoading ? <Spinner /> : children}
        </button>
    )
}

export default Button
