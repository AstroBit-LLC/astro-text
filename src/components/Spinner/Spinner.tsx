import React from 'react'

const Spinner: React.FC = () => {
    return (
        <div
            className="w-4 h-4 border-4 border-t-transparent border-b-transparent border-red-500 rounded-full animate-spin"
            role="status"
        />
    )
}

export default Spinner
