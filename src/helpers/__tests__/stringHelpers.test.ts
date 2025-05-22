import { capitalize } from '../stringHelpers'

describe('stringHelpers', () => {
    describe('capitalize', () => {
        it('should capitalize the first letter of a string', () => {
            expect(capitalize('hello')).toBe('Hello')
            expect(capitalize('world')).toBe('World')
        })

        it('should handle single character strings', () => {
            expect(capitalize('a')).toBe('A')
            expect(capitalize('z')).toBe('Z')
        })

        it('should handle already capitalized strings', () => {
            expect(capitalize('Hello')).toBe('Hello')
            expect(capitalize('WORLD')).toBe('WORLD')
        })

        it('should handle empty strings', () => {
            expect(capitalize('')).toBe('')
        })

        it('should handle strings with special characters', () => {
            expect(capitalize('123hello')).toBe('123hello')
            expect(capitalize('!hello')).toBe('!hello')
        })
    })
})
