export const SYSTEM_MESSAGE = {
    ORIGINAL: 'You are a helpful assistant that improves text.',
    FORMAL: ' Use formal language and professional tone.',
    PLAYFUL: ' Use playful, engaging language with a casual tone.',
    IMPROVE_READABILITY: ' Improve readability, flow, and clarity while preserving the original meaning.',
    ORIGINAL_READABILITY: ' Only fix grammar and lexical errors without changing the overall structure.',
    AVOID_DASHES:
        ' Never use em dashes (—) in your response, replace them with en dashes (—) or other appropriate punctuation.',
} as const

export const ERROR_MESSAGES = {
    FAILED_TO_IMPROVE_TEXT: 'Failed to improve text. Please check your API key and try again.',
    ERROR_IMPROVING_TEXT: 'Error improving text:',
} as const
