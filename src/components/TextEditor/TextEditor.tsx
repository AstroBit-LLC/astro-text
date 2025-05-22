import React, { useState, useEffect } from 'react'

import { RotateCcwIcon, CopyIcon, SplitIcon } from 'lucide-react'

import Tooltip from '../Tooltip/Tooltip'

interface TextEditorProps {
    inputText: string
    outputText: string
    setInputText: (text: string) => void
}

const TextEditor: React.FC<TextEditorProps> = props => {
    const { inputText, outputText, setInputText } = props

    const [hasResponse, setHasResponse] = useState<boolean>(false)
    const [isComparing, setIsComparing] = useState<boolean>(false)
    const [showingOriginal, setShowingOriginal] = useState<boolean>(true)

    const handleCopy = () => {
        navigator.clipboard.writeText(hasResponse && !isComparing ? outputText : inputText)
    }

    const handleReset = () => {
        setInputText('')
        setHasResponse(false)
        setIsComparing(false)
        setShowingOriginal(true)
    }

    const handleCompare = () => {
        if (!isComparing) {
            setIsComparing(true)
            setShowingOriginal(true)
        } else if (!showingOriginal) {
            setShowingOriginal(true)
        } else {
            setShowingOriginal(false)
        }
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value

        if (isComparing) {
            setIsComparing(false)
            setShowingOriginal(true)
        }

        setInputText(newText)
    }

    const displayText = isComparing
        ? showingOriginal
            ? inputText
            : outputText
        : outputText && hasResponse
          ? outputText
          : inputText

    useEffect(() => {
        if (outputText.length > 0) {
            setHasResponse(true)
        }
    }, [outputText])

    return (
        <div className="relative">
            <div className="flex gap-1 my-2 justify-end">
                <Tooltip content="Clear">
                    <button
                        className="p-1.5 hover:bg-gray-800 rounded-md transition-colors"
                        onClick={handleReset}
                        disabled={!inputText && !outputText}
                        aria-label="Clear text"
                    >
                        <RotateCcwIcon
                            size={16}
                            className={`${!inputText && !outputText ? 'text-gray-600' : 'text-gray-400'}`}
                            aria-hidden="true"
                        />
                    </button>
                </Tooltip>
                <Tooltip content="Copy">
                    <button
                        className="p-1.5 hover:bg-gray-800 rounded-md transition-colors"
                        onClick={handleCopy}
                        disabled={!inputText && !outputText}
                        aria-label="Copy text"
                    >
                        <CopyIcon
                            size={16}
                            className={`${!inputText && !outputText ? 'text-gray-600' : 'text-gray-400'}`}
                            aria-hidden="true"
                        />
                    </button>
                </Tooltip>
                <Tooltip content={isComparing ? (showingOriginal ? 'Show Generated' : 'Show Original') : 'Compare'}>
                    <button
                        className={`p-1.5 rounded-md transition-colors ${
                            isComparing ? 'bg-gray-800 text-red-500' : 'hover:bg-gray-800 text-gray-400'
                        } ${!outputText ? 'text-gray-600' : ''}`}
                        onClick={handleCompare}
                        disabled={!outputText}
                        aria-label={
                            isComparing ? (showingOriginal ? 'Show Generated' : 'Show Original') : 'Compare texts'
                        }
                    >
                        <SplitIcon size={16} aria-hidden="true" />
                    </button>
                </Tooltip>
            </div>
            <textarea
                value={displayText}
                onChange={handleTextChange}
                placeholder="Enter your text here..."
                className="w-full h-32 p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none text-white placeholder-gray-500"
                readOnly={isComparing}
            />
        </div>
    )
}

export default TextEditor
