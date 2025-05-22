import { processOutput } from '../processors'

describe('processors', () => {
    describe('processOutput', () => {
        it('should replace em dashes with regular dashes', () => {
            expect(processOutput('Hello—World')).toBe('Hello-World')
            expect(processOutput('First—Second—Third')).toBe('First-Second-Third')
        })

        it('should handle text without em dashes', () => {
            expect(processOutput('Hello World')).toBe('Hello World')
            expect(processOutput('No-dashes-here')).toBe('No-dashes-here')
        })

        it('should handle empty strings', () => {
            expect(processOutput('')).toBe('')
        })

        it('should handle text with mixed dashes', () => {
            expect(processOutput('Regular-Em—Dash')).toBe('Regular-Em-Dash')
            expect(processOutput('—Start—Middle—End—')).toBe('-Start-Middle-End-')
        })
    })
})
