export type Tone = 'original' | 'formal' | 'playful'

export interface ImproveTextParams {
    text: string
    tone: Tone
    improveReadability: boolean
    apiKey: string
}
