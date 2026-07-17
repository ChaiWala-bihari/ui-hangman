import React from 'react';
import { ScoreBoard } from '../types';

interface GameStatsProps {
  wrongGuessesCount: number;
  maxGuesses: number;
  guessedLetters: string[];
  word: string;
  score: ScoreBoard;
}

export default function GameStats({
  wrongGuessesCount,
  maxGuesses,
  guessedLetters,
  word,
  score
}: GameStatsProps) {
  const remainingGuesses = Math.max(0, maxGuesses - wrongGuessesCount);
  const upperWord = word.toUpperCase();
  const normalizedGuesses = guessedLetters.map(l => l.toUpperCase());

  // Filter incorrect guesses
  const incorrectGuesses = normalizedGuesses.filter(l => !upperWord.includes(l));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mx-auto mb-6">
      {/* Lives / Remaining Guesses */}
      <div className="bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center text-center">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
          Remaining Guesses
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          {/* Heart icons representing lives */}
          {Array.from({ length: maxGuesses }).map((_, i) => {
            const isLost = i >= remainingGuesses;
            return (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-6 h-6 transition-all duration-500 transform ${
                  isLost
                    ? 'text-slate-200 dark:text-slate-800 scale-90 opacity-40'
                    : 'text-rose-500 dark:text-rose-400 animate-pulse scale-100'
                }`}
                style={{ animationDelay: `${i * 100}ms`, animationDuration: '2s' }}
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            );
          })}
        </div>
        <span className="text-sm font-bold text-slate-700 dark:text-slate-250 mt-1">
          {remainingGuesses} / {maxGuesses}
        </span>
      </div>

      {/* Scoreboard */}
      <div className="bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center text-center">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
          Scoreboard
        </span>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {score.wins}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Wins
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-rose-500 dark:text-rose-400">
              {score.losses}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Losses
            </span>
          </div>
        </div>
      </div>

      {/* Incorrect Letters List */}
      <div className="bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center text-center">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
          Incorrect Guesses
        </span>
        {incorrectGuesses.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-1.5 mt-2 max-h-[44px] overflow-y-auto w-full px-1">
            {incorrectGuesses.map(letter => (
              <span
                key={letter}
                className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-950/50 rounded-lg px-2 py-0.5 text-xs font-black"
              >
                {letter}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-sm text-slate-400 dark:text-slate-500 italic mt-2">
            None yet
          </span>
        )}
      </div>
    </div>
  );
}
