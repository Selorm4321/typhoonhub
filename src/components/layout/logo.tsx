import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('relative font-headline', className)}>
      <svg
        viewBox="0 0 400 150"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Typhoon Entertainment Logo"
        className="w-full h-full"
      >
        <g className="text-[#00d1ff] animate-pulse-glow" transform="translate(0, -10)">
          <path
            d="M32,103 C60,57 122,57 165,85 C215,117 252,103 294,83 C340,61 382,90 365,123 L336,118 C302,143 252,144 213,121 C159,89 97,117 32,103 Z"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32,98 C60,52 122,52 165,80 C215,112 252,98 294,78 C340,56 382,85 365,118"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <ellipse cx="245" cy="90" rx="8" ry="4" transform="rotate(-15 245 90)"/>
            <ellipse cx="270" cy="84" rx="8" ry="4" transform="rotate(-15 270 84)"/>
            <ellipse cx="295" cy="80" rx="8" ry="4" transform="rotate(-15 295 80)"/>
            <ellipse cx="320" cy="82" rx="8" ry="4" transform="rotate(-5 320 82)"/>
            <ellipse cx="150" cy="85" rx="8" ry="4" transform="rotate(20 150 85)"/>
            <ellipse cx="125" cy="82" rx="8" ry="4" transform="rotate(20 125 82)"/>
            <ellipse cx="100" cy="85" rx="8" ry="4" transform="rotate(15 100 85)"/>
            <ellipse cx="75" cy="92" rx="8" ry="4" transform="rotate(10 75 92)"/>
            <ellipse cx="182" cy="112" rx="4" ry="6" />
            <ellipse cx="192" cy="100" rx="4" ry="6" />
            <ellipse cx="205" cy="110" rx="4" ry="6" />
            <ellipse cx="195" cy="120" rx="4" ry="6" />
          </g>
        </g>
        
        <g className="glitch-text-container">
          <text
            x="50%"
            y="95"
            textAnchor="middle"
            fontSize="56"
            fontWeight="bold"
            fill="#ff00a0"
            className="glitch-text"
          >
            TYPHOON
          </text>
        </g>

        <text
          x="50%"
          y="125"
          textAnchor="middle"
          fontSize="22"
          fontWeight="normal"
          fill="#00d1ff"
          letterSpacing="4"
          className="text-[#00d1ff] animate-pulse-glow"
        >
          ENTERTAINMENT
        </text>
      </svg>
    </div>
  );
}
