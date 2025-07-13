import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <svg
        width="600"
        height="480"
        viewBox="0 0 600 480"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Typhoon Entertainment Logo"
        className="w-full h-full"
      >
        <defs>
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

              .glow-blue { animation: pulse-blue 5s infinite ease-in-out; }
              .glow-pink { animation: pulse-pink 4s infinite ease-in-out; }
              .highlight { animation: flicker 3s infinite linear alternate; }

              @keyframes pulse-blue {
                50% { opacity: 1; }
              }
              @keyframes pulse-pink {
                50% { opacity: 1; }
              }
              @keyframes flicker {
                0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
                20%, 24%, 55% { opacity: 0.7; }
              }
            `}
          </style>

          <filter id="neon-blue-glow-anim" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          </filter>
          <filter id="neon-pink-glow-anim" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="coloredBlur" />
          </filter>
          <g id="film-reel-icon-anim" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M155,212 C100,212 80,160 100,120 L150,45" /><path d="M150,45 A75 75 0 1 1 295,190" /><path d="M150,45 L215,65" /><ellipse cx="220" cy="120" rx="55" ry="60" /><ellipse cx="220" cy="120" rx="20" ry="22" /><path d="M148,202 L138,185 M138,192 L128,175 M128,182 L118,165 M118,172 L108,155 M108,162 L98,145" /><ellipse cx="260" cy="125" rx="5" ry="12" transform="rotate(30, 260, 125)" /><ellipse cx="235" cy="160" rx="5" ry="12" transform="rotate(90, 235, 160)" /><ellipse cx="205" cy="160" rx="5" ry="12" transform="rotate(90, 205, 160)" /><ellipse cx="180" cy="125" rx="5" ry="12" transform="rotate(-30, 180, 125)" /><ellipse cx="190" cy="85" rx="5" ry="12" transform="rotate(30, 190, 85)" /><ellipse cx="245" cy="85" rx="5" ry="12" transform="rotate(-30, 245, 85)" />
          </g>
        </defs>

        <g stroke="#00bfff">
          <use href="#film-reel-icon-anim" className="glow-blue" strokeWidth="12" filter="url(#neon-blue-glow-anim)" opacity="0.7" />
          <use href="#film-reel-icon-anim" strokeWidth="5" />
          <use href="#film-reel-icon-anim" className="highlight" stroke="#c4ffff" strokeWidth="1.5" />
          <g fontFamily="Montserrat, sans-serif" fontSize="28" letterSpacing="4" textAnchor="middle">
            <text x="300" y="380" className="glow-blue" filter="url(#neon-blue-glow-anim)" strokeWidth="6" opacity="0.7">ENTERTAINMENT</text>
            <text x="300" y="380" strokeWidth="2">ENTERTAINMENT</text>
            <text x="300" y="380" className="highlight" fill="#c4ffff" stroke="none">ENTERTAINMENT</text>
          </g>
        </g>
        
        <g stroke="#ff00a8">
          <g fontFamily="Montserrat, sans-serif" fontWeight="700" fontSize="80" letterSpacing="2" textAnchor="middle">
            <text x="300" y="320" className="glow-pink" filter="url(#neon-pink-glow-anim)" strokeWidth="15" opacity="0.8">TYPHOON</text>
            <text x="300" y="320" strokeWidth="6">TYPHOON</text>
            <text x="300" y="320" className="highlight" fill="#ffd6f5" stroke="none">TYPHOON</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
