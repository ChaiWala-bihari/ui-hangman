export interface WordItem {
  word: string;
  category: string;
  hint: string;
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  wordItem: WordItem;
  guessedLetters: string[];
  maxGuesses: number;
}

export interface ScoreBoard {
  wins: number;
  losses: number;
}
