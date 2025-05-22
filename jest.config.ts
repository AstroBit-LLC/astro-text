import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        // Handle module aliases (if you're using them in your tsconfig.json)
        '^@/(.*)$': '<rootDir>/src/$1',
        // Handle CSS imports (if you're using CSS modules)
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    transform: {
        // Use ts-jest for TypeScript files
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.test.json',
            },
        ],
    },
    testMatch: [
        // Match test files
        '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
        '<rootDir>/src/**/*.{spec,test}.{ts,tsx}',
    ],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/vite-env.d.ts',
        '!src/main.tsx',
        '!src/popup.tsx',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    verbose: true,
}

export default config
