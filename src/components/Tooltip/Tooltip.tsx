import React from 'react'

interface TooltipProps {
    children: React.ReactNode
    content: string
}

const Tooltip: React.FC<TooltipProps> = props => {
    const { children, content } = props

    return (
        <div className="relative group">
            {children}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-950 text-gray-200 text-xs px-2 py-1 rounded mt-1 whitespace-nowrap">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Tooltip
