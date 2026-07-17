'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WordItem, GameStatus, ScoreBoard } from '../types';
import { DEFAULT_MAX_GUESSES } from '../constants/words';
import { getRandomWord, getIncorrectGuesses, getGameStatus } from '../utils/gameHelpers';

// Components
import HangmanDrawing from '../components/HangmanDrawing';
import WordDisplay from '../components/WordDisplay';
import Keyboard from '../components/Keyboard';
import GameStats from '../components/GameStats';
import GameControls from '../components/GameControls';
import GameStatusBanner from '../components/GameStatusBanner';

export default function HangmanGame() {
  const [wordItem, setWordItem] = useState<WordItem | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [score, setScore] = useState<ScoreBoard>({ wins: 0, losses: 0 });
  const [mounted, setMounted] = useState(false);

  // Ref to track the last scored word to prevent duplicate scoring
  const scoredWordRef = useRef<string | null>(null);

  // Initialize word and load score from localStorage on mount
  useEffect(() => {
    setMounted(true);
    setWordItem(getRandomWord());
    
    const savedScore = localStorage.getItem('hangman-score');
    if (savedScore) {
      try {
        setScore(JSON.parse(savedScore));
      } catch (e) {
        console.error('Error loading scoreboard from localStorage:', e);
      }
    }
  }, []);

  // Compute game metrics inline for single-source-of-truth reactivity
  const word = wordItem?.word || '';
  const incorrectGuesses = wordItem ? getIncorrectGuesses(word, guessedLetters) : [];
  const wrongGuessesCount = incorrectGuesses.length;
  const gameStatus: GameStatus = wordItem 
    ? getGameStatus(word, guessedLetters, DEFAULT_MAX_GUESSES) 
    : 'playing';

  // Handle letter guessing (useCallback to stabilize dependency array for keydown listener)
  const handleGuessLetter = useCallback((letter: string) => {
    const upperLetter = letter.toUpperCase();
    if (
      gameStatus !== 'playing' ||
      guessedLetters.includes(upperLetter) ||
      !/^[A-Z]$/.test(upperLetter)
    ) {
      return;
    }

    setGuessedLetters(prev => [...prev, upperLetter]);
  }, [guessedLetters, gameStatus]);

  // Handle Scoreboard progression
  useEffect(() => {
    if (!word || gameStatus === 'playing') return;
    if (scoredWordRef.current === word) return; // Already updated score for this word

    scoredWordRef.current = word;

    setScore(prev => {
      const nextScore = {
        wins: gameStatus === 'won' ? prev.wins + 1 : prev.wins,
        losses: gameStatus === 'lost' ? prev.losses + 1 : prev.losses
      };
      localStorage.setItem('hangman-score', JSON.stringify(nextScore));
      return nextScore;
    });
  }, [gameStatus, word]);

  // Handle restarting current word
  const handleRestart = () => {
    setGuessedLetters([]);
    // Remove the current word from scoring block so they can try it again
    if (scoredWordRef.current === word) {
      scoredWordRef.current = null;
    }
  };

  // Handle drawing a new random word
  const handleNewWord = () => {
    if (wordItem) {
      const nextWord = getRandomWord(wordItem.word);
      setWordItem(nextWord);
      setGuessedLetters([]);
    }
  };

  // Handle reset scoreboard
  const handleResetScoreboard = () => {
    const initialScore = { wins: 0, losses: 0 };
    setScore(initialScore);
    localStorage.setItem('hangman-score', JSON.stringify(initialScore));
  };

  // Attach physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when typing in input elements (none currently, but good practice)
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      
      // Ignore modifier keys
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) {
        return;
      }

      handleGuessLetter(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGuessLetter]);

  // Render a clean loading shell during SSR hydration
  if (!mounted || !wordItem) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center p-8 bg-slate-50 dark:bg-[#090d16] text-slate-800 dark:text-slate-100 min-h-screen">
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
            Initializing Game...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#090d16] dark:to-[#0f172a] text-slate-800 dark:text-slate-100 px-4 py-8 md:py-12">
      {/* Container */}
      <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col justify-between">
        
        {/* Header */}
        <header className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-2 mb-1.5 bg-indigo-50 dark:bg-indigo-950/30 px-3.5 py-1 rounded-full border border-indigo-100 dark:border-indigo-950/50 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-ping"></span>
            <span className="text-[10px] font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
              Classic Word Game
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent pb-1">
            HANGMAN
          </h1>
          <p className="text-xs md:text-sm font-medium text-slate-400 dark:text-slate-500 max-w-md mx-auto mt-1">
            Guess the secret word letter by letter. Type using your physical keyboard or click the buttons below!
          </p>
        </header>

        {/* Main Grid: Left is Hangman Drawing, Right is Word & Keyboard */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl w-full mx-auto my-4">
          
          {/* Left Column: Visual Hangman (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col justify-center items-center">
            <HangmanDrawing
              wrongGuessesCount={wrongGuessesCount}
              gameStatus={gameStatus}
            />
          </div>

          {/* Right Column: Game Stats, Word Display, Keyboard (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            {/* Stats Dashboard */}
            <GameStats
              wrongGuessesCount={wrongGuessesCount}
              maxGuesses={DEFAULT_MAX_GUESSES}
              guessedLetters={guessedLetters}
              word={word}
              score={score}
            />

            {/* Banner for Win / Lose */}
            <GameStatusBanner
              status={gameStatus}
              wordItem={wordItem}
              onRestart={handleRestart}
              onNewWord={handleNewWord}
            />

            {/* Word Display */}
            <WordDisplay
              word={word}
              guessedLetters={guessedLetters}
              revealAll={gameStatus === 'lost'}
            />

            {/* Virtual Keyboard */}
            <Keyboard
              word={word}
              guessedLetters={guessedLetters}
              onSelectKey={handleGuessLetter}
              disabled={gameStatus !== 'playing'}
            />
          </div>
        </main>

        {/* Controls & Reset Score Footer */}
        <footer className="mt-8 border-t border-slate-200/50 dark:border-slate-800/50 pt-6">
          <GameControls
            wordItem={wordItem}
            onRestart={handleRestart}
            onNewWord={handleNewWord}
          />
          
          <div className="text-center mt-6">
            <button
              onClick={handleResetScoreboard}
              className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-550 uppercase hover:text-rose-500 dark:hover:text-rose-400 transition-colors py-2 px-4 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900/40"
              title="Reset scoreboard to 0-0"
            >
              Reset Scoreboard
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
