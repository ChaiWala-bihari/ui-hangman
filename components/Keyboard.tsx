import React from 'react';

interface KeyboardProps {
  word: string;
  guessedLetters: string[];
  onSelectKey: (letter: string) => void;
  disabled?: boolean;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export default function Keyboard({ word, guessedLetters, onSelectKey, disabled = false }: KeyboardProps) {
  const upperWord = word.toUpperCase();
  const normalizedGuesses = guessedLetters.map(l => l.toUpperCase());

  return (
    <div className="flex flex-col gap-2 w-full max-w-2xl mx-auto px-2 select-none">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1.5 md:gap-2">
          {row.map(letter => {
            const isGuessed = normalizedGuesses.includes(letter);
            const isCorrect = isGuessed && upperWord.includes(letter);
            const isIncorrect = isGuessed && !upperWord.includes(letter);
            const isDisabled = isGuessed || disabled;

            // Compute styling classes
            let btnClass = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-sm active:translate-y-0.5 hover:shadow';
            
            if (isCorrect) {
              btnClass = 'bg-emerald-500 text-white border-emerald-500 dark:bg-emerald-600 dark:border-emerald-600 cursor-not-allowed opacity-90';
            } else if (isIncorrect) {
              btnClass = 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50 line-through';
            } else if (disabled) {
              btnClass = 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-650 cursor-not-allowed opacity-60';
            }

            return (
              <button
                key={letter}
                onClick={() => !isDisabled && onSelectKey(letter)}
                disabled={isDisabled}
                className={`
                  flex-1 max-w-[50px] aspect-square md:aspect-[3/4] md:max-w-[56px] h-11 md:h-14
                  flex items-center justify-center rounded-xl text-base md:text-lg font-bold border
                  transition-all duration-150 outline-none focus:ring-2 focus:ring-indigo-500/40
                  ${btnClass}
                `}
                title={
                  isCorrect
                    ? `Correctly guessed ${letter}`
                    : isIncorrect
                    ? `Incorrectly guessed ${letter}`
                    : `Guess letter ${letter}`
                }
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
