/**
 * Process the output text to avoid AI detection
 * @param text - The text to process
 * @returns The processed text
 */
export const processOutput = (text: string): string => text.replace(/—/g, '-')
