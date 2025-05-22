import React from 'react'

import type { Tone } from '../../interfaces/openAI.interface'

import { capitalize } from '../../helpers/stringHelpers'
import { TONES } from '../../constants/tones'

interface ControlsProps {
    tone: Tone
    setTone: (tone: Tone) => void
    improveReadability: boolean
    setImproveReadability: (value: boolean) => void
}

const Controls: React.FC<ControlsProps> = props => {
    const { tone, setTone, improveReadability, setImproveReadability } = props

    return (
        <div className="flex flex-col gap-3 py-1">
            <div className="flex flex-col gap-1">
                <label htmlFor="tone" className="text-sm font-medium text-gray-300">
                    Tone
                </label>
                <select
                    id="tone"
                    value={tone}
                    onChange={e => setTone(e.target.value.toLowerCase() as Tone)}
                    className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white"
                >
                    {TONES.map(tone => (
                        <option key={tone} value={tone}>
                            {capitalize(tone)}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="readability"
                    checked={improveReadability}
                    onChange={e => setImproveReadability(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-red-500 focus:ring-red-500 focus:ring-offset-gray-900 checked:bg-red-500 checked:hover:bg-red-600 checked:focus:bg-red-500"
                />
                <label htmlFor="readability" className="ml-2 text-sm text-gray-300">
                    Improve readability?
                </label>
            </div>
        </div>
    )
}

export default Controls
