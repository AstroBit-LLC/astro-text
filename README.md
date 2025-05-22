# AstroText 🚀 | Chrome Extension

**Author:** Pablo Beltran <br>
**Version:** v1.0.0 <br>
**Release Data:** May 12th, 2025 <br>

## What is AstroText 🚀?

AstroText is a lightweight Chrome extension that enhances and improves user-written text using a Large Language Model (LLM) API, such as OpenAI's GPT. It focuses on grammar correction, lexical improvements, and tone adjustment to support both non-native and native English speakers—especially in contexts like social media posts or professional emails.

## Core Features

### LLM API Integration

- Users can connect their own API key through the settings modal
- API key is stored securely in Chrome's sync storage
- Toggle visibility of API key with an eye icon
- Changes to API key are only saved when explicitly confirmed

### Tone Selection

- Choose the desired tone: Original, Formal, or Playful
- Tone selection affects the style of the generated text
- Changes are applied immediately to new generations

### Improve Readability Toggle

- **When ON:** rewrites the paragraph to improve flow and clarity
- **When OFF:** only performs grammar and lexical corrections
- Toggle state is visually indicated with a red checkbox
- Changes are applied immediately to new generations

### Text Editor

- A text area where the user pastes or writes the paragraph to be improved
- Supports both input and output modes
- Automatically switches to input mode when editing
- Maintains original text for comparison

### Action Buttons

- **Clear:** Clears the current text and resets the editor state
- **Copy:** Copies the currently displayed text (input or output) to the clipboard
- **Compare:** Toggles between original and generated text for easy comparison
    - Shows tooltip indicating which text will be displayed
    - Makes textarea read-only during comparison
    - Visual indicator when in compare mode
- **Generate:** Sends the text to the LLM for processing
    - Disabled when no API key is set or text is empty
    - Shows loading state during generation

### Settings Modal

- Opens a secondary modal to configure and store the API Key
- Secure password field with visibility toggle
- Save button is disabled when no changes are made
- Cancel button reverts any unsaved changes
- API key is never sent to our servers

### AI Trace Avoidance

- The output must not use the character "—" (em dash), as it's often a giveaway of AI-generated text
- Maintains natural language patterns in generated text

## UI Layout

A minimal, rounded modal with a vertical stack layout:

```
    +----------------------------------------------+
    | AstroText 🚀                         [⚙] (a) |
    +----------------------------------------------+
    | Tone: [Dropdown]                        (b)  |
    | Improve readability? [✓]               (c)   |
    |                                              |
    | [ Clear ] (d) [ Copy ] (e) [ Compare ] (f)   |
    |                                              |
    | [ Textarea input/output ]              (g)   |
    |                                              |
    |                         [ Generate ]  (h)    |
    +----------------------------------------------+
```

| Label | Component       | Behavior                                                         |
| ----- | --------------- | ---------------------------------------------------------------- |
| (a)   | Settings Button | Opens modal to enter and save API key with visibility toggle     |
| (b)   | Tone Dropdown   | Options: Original, Formal, Playful                               |
| (c)   | Checkbox        | Toggle for readability improvement with red indicator            |
| (d)   | Clear Button    | Clears text and resets editor state                              |
| (e)   | Copy Button     | Copies currently displayed text (input/output)                   |
| (f)   | Compare Button  | Toggles between original and generated text with visual feedback |
| (g)   | Textarea        | Main input/output area with automatic mode switching             |
| (h)   | Generate Button | Sends request to LLM with loading state                          |

## Developer Setup

### Prerequisites

- Node.js (v14+)
- npm

### Installation

1. Clone the repository:

```
git clone https://github.com/AstroBit-LLC/astro-text.git
cd astro-text
```

2. Install dependencies:

```
npm install
```

3. Development build with hot-reload:

```
npm start
```

4. Production build:

```
npm run build
```

### Loading the Extension in Chrome

1. Build the extension: `npm run build`
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `dist` directory from your project
5. The extension should now appear in your browser toolbar

### Development Notes

- Built with React and TypeScript
- Uses Tailwind CSS for styling
- Implements Chrome's storage API for settings
- Follows modern React patterns and best practices
- Includes comprehensive error handling
- Features responsive and accessible UI components
