import { openAIPromptBuilder, openAIService } from '../openAI.service'
import { SYSTEM_MESSAGE, ERROR_MESSAGES } from '../../constants/messages'
import { processOutput } from '../../helpers/processors'

global.fetch = jest.fn()

jest.mock('../../helpers/processors', () => ({
    processOutput: jest.fn(text => text),
}))

describe('openAI.service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        ;(global.fetch as jest.Mock).mockClear()
        ;(processOutput as jest.Mock).mockClear()
    })

    describe('openAIPromptBuilder', () => {
        it('builds prompt with original tone and no readability improvement', () => {
            const prompt = openAIPromptBuilder('original', false)
            expect(prompt).toBe(
                SYSTEM_MESSAGE.ORIGINAL + SYSTEM_MESSAGE.ORIGINAL_READABILITY + SYSTEM_MESSAGE.AVOID_DASHES,
            )
        })

        it('builds prompt with formal tone and readability improvement', () => {
            const prompt = openAIPromptBuilder('formal', true)
            expect(prompt).toBe(
                SYSTEM_MESSAGE.ORIGINAL +
                    SYSTEM_MESSAGE.FORMAL +
                    SYSTEM_MESSAGE.IMPROVE_READABILITY +
                    SYSTEM_MESSAGE.AVOID_DASHES,
            )
        })

        it('builds prompt with playful tone and readability improvement', () => {
            const prompt = openAIPromptBuilder('playful', true)
            expect(prompt).toBe(
                SYSTEM_MESSAGE.ORIGINAL +
                    SYSTEM_MESSAGE.PLAYFUL +
                    SYSTEM_MESSAGE.IMPROVE_READABILITY +
                    SYSTEM_MESSAGE.AVOID_DASHES,
            )
        })
    })

    describe('openAIService', () => {
        const mockParams = {
            text: 'Test input text',
            tone: 'original' as const,
            improveReadability: false,
            apiKey: 'sk-test123',
        }

        const mockResponse = {
            choices: [
                {
                    message: {
                        content: 'Improved test text',
                    },
                },
            ],
        }

        it('successfully calls OpenAI API and returns processed text', async () => {
            ;(global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            })

            const result = await openAIService(mockParams)

            expect(global.fetch).toHaveBeenCalledWith('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer sk-test123',
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: openAIPromptBuilder(mockParams.tone, mockParams.improveReadability),
                        },
                        { role: 'user', content: mockParams.text },
                    ],
                    temperature: 0.7,
                    max_tokens: 1000,
                }),
            })

            expect(processOutput).toHaveBeenCalledWith('Improved test text')
            expect(result).toBe('Improved test text')
        })

        it('throws error when API call fails', async () => {
            const errorMessage = 'Invalid API key'
            ;(global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                json: () => Promise.resolve({ error: { message: errorMessage } }),
            })

            await expect(openAIService(mockParams)).rejects.toThrow(errorMessage)
        })

        it('throws error when API response has no content', async () => {
            ;(global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ choices: [{ message: {} }] }),
            })

            await expect(openAIService(mockParams)).rejects.toThrow(ERROR_MESSAGES.FAILED_TO_IMPROVE_TEXT)
        })

        it('throws error when API response has no choices', async () => {
            ;(global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ choices: [] }),
            })

            await expect(openAIService(mockParams)).rejects.toThrow(ERROR_MESSAGES.FAILED_TO_IMPROVE_TEXT)
        })

        it('handles network errors', async () => {
            const networkError = new Error('Network error')
            ;(global.fetch as jest.Mock).mockRejectedValueOnce(networkError)

            await expect(openAIService(mockParams)).rejects.toThrow(networkError)
        })

        it('processes output text to avoid AI detection', async () => {
            const textWithEmDash = 'This is a test—with an em dash'
            ;(global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () =>
                    Promise.resolve({
                        choices: [{ message: { content: textWithEmDash } }],
                    }),
            })
            ;(processOutput as jest.Mock).mockReturnValueOnce('This is a test-with an em dash')

            const result = await openAIService(mockParams)

            expect(processOutput).toHaveBeenCalledWith(textWithEmDash)
            expect(result).toBe('This is a test-with an em dash')
        })
    })
})
