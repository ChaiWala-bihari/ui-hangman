import React from 'react';
import { GameStatus, WordItem } from '../types';

interface GameStatusBannerProps {
  status: GameStatus;
  wordItem: WordItem;
  onRestart: () => void;
  onNewWord: () => void;
}

export default function GameStatusBanner({
  status,
  wordItem,
  onRestart,
  onNewWord
}: GameStatusBannerProps) {
  if (status === 'playing') return null;

  const isWon = status === 'won';

  return (
    <div
      className={`
        w-full max-w-2xl mx-auto my-6 p-6 rounded-2xl border text-center shadow-lg transform scale-100 transition-all duration-500 animate-bounceOnce
        ${
          isWon
            ? 'bg-emerald-50 border-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-950/50 dark:text-emerald-350'
            : 'bg-rose-50 border-rose-100 text-rose-800 dark:bg-rose-950/20 dark:border-rose-950/50 dark:text-rose-350'
        }
      `}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        {/* Animated Icon */}
        <div
          className={`
            w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-inner
            ${
              isWon
                ? 'bg-emerald-100/60 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-100/60 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400'
            }
          `}
        >
          {isWon ? '🏆' : '💀'}
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">
          {isWon ? 'Victory!' : 'Game Over'}
        </h2>

        {/* Message */}
        <p className="text-sm md:text-base font-medium max-w-md">
          {isWon
            ? `Congratulations! You correctly guessed the word "${wordItem.word}" and saved the hangman!`
            : `Unfortunate! You ran out of remaining guesses. The correct word was:`}
        </p>

        {/* Secret Word Reveal (on Lose) */}
        {!isWon && (
          <div className="bg-rose-100 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/40 px-5 py-2 rounded-xl text-lg font-black tracking-widest text-rose-600 dark:text-rose-400 uppercase select-all shadow-inner my-1">
            {wordItem.word}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 w-full sm:w-auto mt-3">
          <button
            onClick={onRestart}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-bold border border-violet-200 bg-violet-50/50 hover:bg-violet-100/50 text-violet-700 dark:bg-violet-950/15 dark:border-violet-900/40 dark:text-violet-400 dark:hover:bg-violet-950/25 transition-all duration-200 cursor-pointer shadow-sm active:translate-y-0.5"
          >
            Retry Word
          </button>
          <button
            onClick={onNewWord}
            className={`
              flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 cursor-pointer active:translate-y-0.5 shadow-md
              ${
                isWon
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10'
                  : 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/10'
              }
            `}
          >
            Next Word
          </button>
        </div>
      </div>
    </div>
  );
}
