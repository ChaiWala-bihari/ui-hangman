import React from 'react';

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
  revealAll?: boolean;
}

export default function WordDisplay({ word, guessedLetters, revealAll = false }: WordDisplayProps) {
  const normalizedGuesses = guessedLetters.map(l => l.toUpperCase());

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-6 my-4 select-none">
      {word.split('').map((char, index) => {
        const isLetter = char >= 'A' && char <= 'Z';
        const isGuessed = normalizedGuesses.includes(char);
        const shouldReveal = isGuessed || revealAll;

        return (
          <div
            key={`${char}-${index}`}
            className="flex flex-col items-center justify-center"
          >
            {/* Letter box */}
            <span
              className={`
                text-2xl md:text-4xl font-extrabold tracking-widest uppercase
                w-10 h-12 md:w-14 md:h-16 flex items-center justify-center rounded-xl
                transition-all duration-300 transform
                ${
                  isGuessed
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 scale-100'
                    : revealAll
                    ? 'text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 scale-100 font-bold'
                    : 'text-transparent scale-90'
                }
              `}
            >
              {isLetter && shouldReveal ? char : isLetter ? '' : char}
            </span>
            
            {/* Underline bar */}
            {isLetter && (
              <span
                className={`
                  h-1 w-8 md:w-11 rounded-full transition-all duration-300 mt-1
                  ${
                    isGuessed
                      ? 'bg-indigo-500 dark:bg-indigo-400'
                      : revealAll
                      ? 'bg-rose-400 dark:bg-rose-500'
                      : 'bg-slate-300 dark:bg-slate-700'
                  }
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
