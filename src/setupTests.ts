import '@testing-library/jest-dom'

type ChromeStorageMock = {
    get: jest.Mock
    set: jest.Mock
}

const mockChrome = {
    storage: {
        sync: {
            get: jest.fn(),
            set: jest.fn(),
        } as ChromeStorageMock,
    },
}

// @ts-expect-error - Intentionally mocking only the parts needed
global.chrome = mockChrome

Object.assign(navigator, {
    clipboard: {
        writeText: jest.fn(),
    },
})
