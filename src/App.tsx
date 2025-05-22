import type { Tone } from './interfaces/openAI.interface'

import { useState, useEffect } from 'react'
import { openAIService } from './services/openAI.service'

import Header from './components/Header/Header'
import Controls from './components/Controls/Controls'
import TextEditor from './components/TextEditor/TextEditor'
import Button from './components/Button/Button'
import Settings from './components/Settings/Settings'

function App() {
    const [tone, setTone] = useState<Tone>('original')
    const [improveReadability, setImproveReadability] = useState<boolean>(false)

    const [inputText, setInputText] = useState<string>('')
    const [outputText, setOutputText] = useState<string>('')

    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)
    const [isGenerating, setIsGenerating] = useState<boolean>(false)

    const [apiKey, setApiKey] = useState<string>('')

    const [error, setError] = useState<string | null>(null)

    const handleSaveSettings = (apiKey: string) => {
        setApiKey(apiKey)
        chrome.storage.sync.set({ apiKey })
        setIsSettingsOpen(false)
    }

    const handleGenerate = async () => {
        if (!apiKey || !inputText) {
            return
        }

        setIsGenerating(true)

        try {
            const result = await openAIService({ text: inputText, tone, improveReadability, apiKey })
            setOutputText(result)
        } catch (error) {
            setError(error as string)
            setOutputText('')
        } finally {
            setIsGenerating(false)
        }
    }

    useEffect(() => {
        chrome.storage.sync.get(['apiKey'], result => {
            if (result.apiKey) {
                setApiKey(result.apiKey)
            } else {
                setIsSettingsOpen(true)
            }
        })
    }, [])

    return (
        <>
            <div className="bg-gray-900 shadow-lg shadow-purple-900/10 w-[350px] max-w-md overflow-hidden border border-gray-800">
                <div className="p-4 flex flex-col gap-4">
                    <Header onOpenSettings={() => setIsSettingsOpen(true)} />
                    <Controls
                        tone={tone}
                        setTone={setTone}
                        improveReadability={improveReadability}
                        setImproveReadability={setImproveReadability}
                    />
                    <TextEditor inputText={inputText} outputText={outputText} setInputText={setInputText} />
                    {error && <div className="error-message">{error}</div>}
                    <Button onClick={handleGenerate} isDisabled={!inputText} isLoading={isGenerating}>
                        Generate
                    </Button>
                </div>
            </div>
            <Settings
                apiKey={apiKey}
                isOpen={isSettingsOpen}
                setApiKey={setApiKey}
                onClose={() => setIsSettingsOpen(false)}
                onSave={handleSaveSettings}
            />
        </>
    )
}

export default App
