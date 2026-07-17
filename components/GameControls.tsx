import React, { useState, useEffect } from 'react';
import { WordItem } from '../types';

interface GameControlsProps {
  wordItem: WordItem;
  onRestart: () => void;
  onNewWord: () => void;
}

export default function GameControls({ wordItem, onRestart, onNewWord }: GameControlsProps) {
  const [showHint, setShowHint] = useState(false);

  // Hide hint when wordItem changes
  useEffect(() => {
    setShowHint(false);
  }, [wordItem]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto my-4 px-2">
      {/* Category & Hint panel */}
      <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-4 flex flex-col items-center justify-between gap-3 sm:flex-row transition-all duration-300">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-550 uppercase tracking-widest">
            Category:
          </span>
          <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            {wordItem.category}
          </span>
        </div>

        <button
          onClick={() => setShowHint(prev => !prev)}
          className={`
            text-xs font-bold px-4.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 border shadow-sm cursor-pointer
            ${
              showHint
                ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-500'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-750'
            }
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18v-5.25m0 0a3 3 0 00-3-3H9.75M12 13.5h.008v.008H12v-.008zM12 3a9 9 0 100 18 9 9 0 000-18z"
            />
          </svg>
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
      </div>

      {/* Expandable Hint Text */}
      {showHint && (
        <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100/50 dark:border-amber-950/20 text-amber-800 dark:text-amber-300/80 rounded-2xl p-4 text-sm font-medium text-center shadow-inner animate-fadeIn">
          <span className="font-bold text-amber-600 dark:text-amber-400">Hint:</span> {wordItem.hint}
        </div>
      )}

      {/* Main Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        {/* Restart Game Button */}
        <button
          onClick={onRestart}
          className="flex-1 bg-violet-50/50 hover:bg-violet-100/50 text-violet-700 font-bold px-6 py-3.5 rounded-xl border border-violet-200 dark:bg-violet-950/15 dark:border-violet-900/40 dark:text-violet-400 dark:hover:bg-violet-950/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:shadow hover:shadow-violet-500/5 active:translate-y-0.5 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5 text-violet-500 dark:text-violet-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Restart Game (Retry)
        </button>

        {/* New Random Word Button */}
        <button
          onClick={onNewWord}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/20 active:translate-y-0.5 hover:shadow-indigo-500/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3M3 12c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M3 12l-3 3m3-3l3 3"
            />
          </svg>
          New Random Word
        </button>
      </div>
    </div>
  );
}
