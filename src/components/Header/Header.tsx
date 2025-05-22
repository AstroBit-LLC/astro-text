import React from 'react'

import { SettingsIcon } from 'lucide-react'

interface HeaderProps {
    onOpenSettings: VoidFunction
}

const Header: React.FC<HeaderProps> = props => {
    const { onOpenSettings } = props

    return (
        <header role="banner" className="flex justify-between items-center">
            <div className="flex justify-between items-center gap-2">
                <div
                    data-testid="logo-container"
                    className="bg-red-800/10 text-white w-8 h-8 rounded-md flex items-center justify-center backdrop-blur-sm ring-1 ring-red-500"
                >
                    🚀
                </div>
                <h1 className="text-2xl font-light text-white tracking-widest">
                    ∆stro<span className="text-red-500 font-bold">Text</span>
                </h1>
            </div>
            <button
                aria-label="Settings"
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                onClick={onOpenSettings}
            >
                <SettingsIcon size={18} className="text-gray-400" />
            </button>
        </header>
    )
}

export default Header
