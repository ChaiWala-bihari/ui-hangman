import React from 'react';

interface HangmanDrawingProps {
  wrongGuessesCount: number;
  gameStatus: 'playing' | 'won' | 'lost';
}

export default function HangmanDrawing({ wrongGuessesCount, gameStatus }: HangmanDrawingProps) {
  // SVG parts for the hangman body
  // Head
  const HEAD = (
    <g key="head" className="transition-opacity duration-500 ease-in-out">
      <circle
        cx="160"
        cy="95"
        r="22"
        className="stroke-[3.5]"
        stroke="currentColor"
        fill="none"
      />
      {/* Eyes depending on state */}
      {gameStatus === 'lost' ? (
        <>
          {/* Left Dead Eye */}
          <line x1="150" y1="90" x2="156" y2="96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="156" y1="90" x2="150" y2="96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Right Dead Eye */}
          <line x1="164" y1="90" x2="170" y2="96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="170" y1="90" x2="164" y2="96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Frown */}
          <path d="M 152 107 Q 160 102 168 107" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : gameStatus === 'won' ? (
        <>
          {/* Happy Eyes */}
          <path d="M 149 92 Q 152 89 155 92" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 165 92 Q 168 89 171 92" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Smile */}
          <path d="M 152 101 Q 160 110 168 101" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* Normal Eyes */}
          <circle cx="152" cy="92" r="2" fill="currentColor" />
          <circle cx="168" cy="92" r="2" fill="currentColor" />
          {/* Neutral mouth */}
          <line x1="154" y1="103" x2="166" y2="103" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </g>
  );

  // Body
  const BODY = (
    <line
      key="body"
      x1="160"
      y1="117"
      x2="160"
      y2="185"
      className="stroke-[3.5] transition-opacity duration-500 ease-in-out"
      stroke="currentColor"
      strokeLinecap="round"
    />
  );

  // Left Arm
  const LEFT_ARM = (
    <line
      key="left-arm"
      x1="160"
      y1="135"
      x2="125"
      y2="160"
      className="stroke-[3.5] transition-opacity duration-500 ease-in-out"
      stroke="currentColor"
      strokeLinecap="round"
    />
  );

  // Right Arm
  const RIGHT_ARM = (
    <line
      key="right-arm"
      x1="160"
      y1="135"
      x2="195"
      y2="160"
      className="stroke-[3.5] transition-opacity duration-500 ease-in-out"
      stroke="currentColor"
      strokeLinecap="round"
    />
  );

  // Left Leg
  const LEFT_LEG = (
    <line
      key="left-leg"
      x1="160"
      y1="185"
      x2="130"
      y2="235"
      className="stroke-[3.5] transition-opacity duration-500 ease-in-out"
      stroke="currentColor"
      strokeLinecap="round"
    />
  );

  // Right Leg
  const RIGHT_LEG = (
    <line
      key="right-leg"
      x1="160"
      y1="185"
      x2="190"
      y2="235"
      className="stroke-[3.5] transition-opacity duration-500 ease-in-out"
      stroke="currentColor"
      strokeLinecap="round"
    />
  );

  const BODY_PARTS = [HEAD, BODY, LEFT_ARM, RIGHT_ARM, LEFT_LEG, RIGHT_LEG];

  // Class mapping based on game status
  let colorClass = 'text-slate-400 dark:text-slate-500';
  if (gameStatus === 'won') {
    colorClass = 'text-emerald-500 dark:text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]';
  } else if (gameStatus === 'lost') {
    colorClass = 'text-rose-500 dark:text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]';
  } else if (wrongGuessesCount > 4) {
    colorClass = 'text-amber-500 dark:text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.2)]';
  }

  return (
    <div className="flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-inner w-full max-w-[260px] mx-auto aspect-square">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 250 280"
        fill="none"
        className={`transition-colors duration-500 ${colorClass}`}
      >
        {/* Gallows Base */}
        <line
          x1="20"
          y1="260"
          x2="230"
          y2="260"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Gallows Vertical Pole */}
        <line
          x1="70"
          y1="20"
          x2="70"
          y2="260"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Gallows Horizontal Beam */}
        <line
          x1="70"
          y1="20"
          x2="160"
          y2="20"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Gallows Diagonal Support */}
        <line
          x1="70"
          y1="60"
          x2="110"
          y2="20"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Gallows Rope */}
        <line
          x1="160"
          y1="20"
          x2="160"
          y2="73"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Render body parts dynamically based on count */}
        {BODY_PARTS.slice(0, wrongGuessesCount)}
      </svg>
    </div>
  );
}
