import type { ImproveTextParams, Tone } from '../interfaces/openAI.interface'

import { SYSTEM_MESSAGE, ERROR_MESSAGES } from '../constants/messages'
import { processOutput } from '../helpers/processors'

const OPENAI_MODEL = 'gpt-3.5-turbo' as const

/**
 * Builds the system message for the OpenAI API
 * @param tone - The tone of the text
 * @param improveReadability - Whether to improve the readability of the text
 * @returns The system message
 */
export const openAIPromptBuilder = (tone: Tone, improveReadability: boolean): string => {
    let systemMessage = SYSTEM_MESSAGE.ORIGINAL

    if (tone === 'formal') {
        systemMessage += SYSTEM_MESSAGE.FORMAL
    } else if (tone === 'playful') {
        systemMessage += SYSTEM_MESSAGE.PLAYFUL
    }

    if (improveReadability) {
        systemMessage += SYSTEM_MESSAGE.IMPROVE_READABILITY
    } else {
        systemMessage += SYSTEM_MESSAGE.ORIGINAL_READABILITY
    }

    systemMessage += SYSTEM_MESSAGE.AVOID_DASHES

    return systemMessage
}

/**
 * OpenAI service to improve text
 * @param params - The parameters for the service
 * @returns The improved text
 */
export const openAIService = async (params: ImproveTextParams): Promise<string> => {
    const { text, tone, improveReadability, apiKey } = params

    try {
        const systemMessage = openAIPromptBuilder(tone, improveReadability)

        const messages = [
            { role: 'system', content: systemMessage },
            { role: 'user', content: text },
        ]

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: OPENAI_MODEL,
                messages,
                temperature: 0.7,
                max_tokens: 1000,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error?.message ?? ERROR_MESSAGES.FAILED_TO_IMPROVE_TEXT)
        }

        const improvedText = data.choices[0]?.message.content

        if (!improvedText) {
            throw new Error(ERROR_MESSAGES.FAILED_TO_IMPROVE_TEXT)
        }

        return processOutput(improvedText)
    } catch (error) {
        console.error(ERROR_MESSAGES.ERROR_IMPROVING_TEXT, error)

        throw error
    }
}
