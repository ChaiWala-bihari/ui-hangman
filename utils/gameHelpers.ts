import { WordItem, GameStatus } from '../types';
import { WORD_LIST } from '../constants/words';

/**
 * Gets a random word item from the list, ensuring it's different from the current one if specified.
 */
export function getRandomWord(currentWord?: string): WordItem {
  const filteredList = currentWord
    ? WORD_LIST.filter(item => item.word !== currentWord.toUpperCase())
    : WORD_LIST;
  
  const list = filteredList.length > 0 ? filteredList : WORD_LIST;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

/**
 * Normalizes a letter for consistent comparison (e.g. uppercase).
 */
export function normalizeLetter(letter: string): string {
  return letter.toUpperCase();
}

/**
 * Gets the list of incorrect guesses from the total guessed letters.
 */
export function getIncorrectGuesses(word: string, guessedLetters: string[]): string[] {
  const upperWord = word.toUpperCase();
  return guessedLetters.filter(
    letter => !upperWord.includes(normalizeLetter(letter))
  );
}

/**
 * Determines if the player has guessed all the letters in the secret word.
 */
export function isWordComplete(word: string, guessedLetters: string[]): boolean {
  const upperWord = word.toUpperCase();
  const normalizedGuesses = guessedLetters.map(normalizeLetter);
  
  // Check if every letter in the word (excluding whitespace/special chars if any) has been guessed
  for (let i = 0; i < upperWord.length; i++) {
    const char = upperWord[i];
    // Ignore non-alphabet characters if there are any
    if (char >= 'A' && char <= 'Z') {
      if (!normalizedGuesses.includes(char)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Returns the current status of the game.
 */
export function getGameStatus(
  word: string,
  guessedLetters: string[],
  maxGuesses: number
): GameStatus {
  const incorrectCount = getIncorrectGuesses(word, guessedLetters).length;
  
  if (incorrectCount >= maxGuesses) {
    return 'lost';
  }
  
  if (isWordComplete(word, guessedLetters)) {
    return 'won';
  }
  
  return 'playing';
}
