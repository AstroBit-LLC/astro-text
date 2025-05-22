import React, { useState, useEffect } from 'react'

import { XIcon, EyeIcon, EyeOffIcon } from 'lucide-react'

interface SettingsProps {
    apiKey: string
    isOpen: boolean
    onClose: VoidFunction
    setApiKey: (apiKey: string) => void
    onSave: (apiKey: string) => void
}

const Settings: React.FC<SettingsProps> = props => {
    const { apiKey, isOpen, onClose, setApiKey, onSave } = props

    const [showApiKey, setShowApiKey] = useState<boolean>(false)
    const [originalApiKey, setOriginalApiKey] = useState<string>('')
    const [localApiKey, setLocalApiKey] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(localApiKey)
    }

    const handleClose = () => {
        setLocalApiKey(originalApiKey)
        setApiKey(originalApiKey)
        onClose()
    }

    const toggleApiKeyVisibility = () => {
        setShowApiKey(!showApiKey)
    }

    const isSaveDisabled = Boolean(
        !localApiKey || localApiKey.length === 0 || (originalApiKey && localApiKey === originalApiKey),
    )

    useEffect(() => {
        if (isOpen) {
            setOriginalApiKey(apiKey)
            setLocalApiKey(apiKey)
            setShowApiKey(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="settings-title"
                    className="bg-gray-900 rounded-xl w-full max-w-md border border-gray-800"
                >
                    <div className="p-6 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h2 id="settings-title" className="text-xl font-semibold text-white">
                                Settings
                            </h2>
                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-gray-800 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!localApiKey || localApiKey.length === 0}
                                aria-label="Close settings"
                            >
                                <XIcon size={18} className="text-gray-400" aria-hidden="true" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="apiKey" className="text-sm font-medium text-gray-300">
                                    OpenAI API Key
                                </label>
                                <div className="relative">
                                    <input
                                        id="apiKey"
                                        type={showApiKey ? 'text' : 'password'}
                                        value={localApiKey}
                                        onChange={e => {
                                            setLocalApiKey(e.target.value)
                                            setApiKey(e.target.value)
                                        }}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white pr-10"
                                        placeholder="sk-..."
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleApiKeyVisibility}
                                        onMouseDown={e => e.preventDefault()}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-800 rounded-md transition-colors"
                                        aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
                                    >
                                        {showApiKey ? (
                                            <EyeOffIcon size={18} className="text-gray-400" aria-hidden="true" />
                                        ) : (
                                            <EyeIcon size={18} className="text-gray-400" aria-hidden="true" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-400">
                                    Your API key is stored locally in your browser and never sent to our servers.
                                </p>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-4 py-2 rounded-md border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!localApiKey || localApiKey.length === 0}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isSaveDisabled}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    )
}

export default Settings
