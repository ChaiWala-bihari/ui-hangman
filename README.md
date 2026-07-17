# Hangman Odyssey 🎮

A modern, minimal, and responsive Hangman game built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It features multiple word categories, hints, scoring, visual feedback, dark mode integration, and keyboard support.

---

## Features

- 🧠 **Predefined Categories**: Play words from fields like *Programming*, *Astronomy*, *Geography*, *Animals*, and *Food & Drink*.
- 💡 **Interactive Hints**: Expandable clues to aid guessing when stuck.
- 🎯 **Tactile Virtual Keyboard**: Responsive layout matching QWERTY standards, color-coded for correct (green) and incorrect (faded/strike-through) letters.
- ⌨️ **Physical Keyboard Support**: Detects and registers alphanumeric keyboard inputs natively on desktop.
- 💖 **Animated Hangman & Lives**: Smoothly animates drawing parts and shows live statuses as cute heart tokens.
- 💾 **Score Persistence**: Scoreboard (Wins & Losses) is saved in the browser's `localStorage` and automatically loaded on return.
- 🌗 **Premium Dark/Light Mode Adaptability**: Tailored colors and subtle neon gradients fit system dark preferences automatically.
- 🔄 **Action Control Center**: Quickly retry the current word or fetch a new random one.

---

## Folder Structure

```text
/
├── app/
│   ├── globals.css          # Tailwind configurations, custom animations & theme
│   ├── layout.tsx           # Global layout & metadata SEO tag configuration
│   └── page.tsx             # Hangman game state machine & layout builder
├── components/
│   ├── HangmanDrawing.tsx   # SVG Renderer for hangman gallows and character parts
│   ├── WordDisplay.tsx      # Underscore generator and letter reveal boxes
│   ├── Keyboard.tsx         # Responsive virtual QWERTY keyboard buttons
│   ├── GameStats.tsx        # Scores, heart indicators, and incorrect list display
│   ├── GameControls.tsx     # Categories, hints, restart, and next word triggers
│   └── GameStatusBanner.tsx # Win/Lose conditional overlays and results
├── constants/
│   └── words.ts             # Default parameters and secret word bank
├── types/
│   └── index.ts             # TypeScript definitions for states, scores, and words
└── utils/
    └── gameHelpers.ts       # Standalone mathematical/logical game helper validations
```

---

## Getting Started

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Run the Development Server
Start the Next.js local server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to play!

### 3. Production Build
Verify code types and compile the optimized production package:
```bash
npm run build
```

---

## Customizing Word Bank
To add your own secret words or categories, open `constants/words.ts` and append items to the `WORD_LIST` array following this structure:

```typescript
{
  word: 'YOURWORD', // Must be uppercase alphabetic letters only
  category: 'Your Category Name',
  hint: 'A helpful description or clue for the player.'
}
```

---

## Game State Utility Functions
All isolated calculations are defined inside `utils/gameHelpers.ts`:
- **`getRandomWord(currentWord?: string)`**: Pulls a random item from the list while ensuring the game avoids repeating the same word back-to-back.
- **`getIncorrectGuesses(word: string, guessedLetters: string[])`**: Calculates incorrect guesses.
- **`isWordComplete(word: string, guessedLetters: string[])`**: Scans the letters to verify if the puzzle is fully solved.
- **`getGameStatus(...)`**: Resolves if current status is `'playing'`, `'won'`, or `'lost'`.
