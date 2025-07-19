import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <svg
        width="200"
        height="150"
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Typhoonhub Logo"
        className="w-full h-full"
      >
        <defs>
          <style>{`
            @keyframes rotate-film {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .film-rotate {
              animation: rotate-film 5s linear infinite;
            }
            @keyframes flicker-glow {
              0% { filter: drop-shadow(0 0 3px #00E0FF) drop-shadow(0 0 3px #FF00E0); }
              50% { filter: drop-shadow(0 0 5px #00E0FF) drop-shadow(0 0 5px #FF00E0); }
              100% { filter: drop-shadow(0 0 3px #00E0FF) drop-shadow(0 0 3px #FF00E0); }
            }
            .film-flicker {
              animation: flicker-glow 1.5s infinite alternate;
            }
          `}</style>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E0FF" />
            <stop offset="100%" stopColor="#FF00E0" />
          </linearGradient>
          <linearGradient id="solidNeonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00BFFF" />
            <stop offset="100%" stopColor="#FF1493" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="50" cy="75" r="40" fill="url(#solidNeonGradient)" opacity="0.9" filter="url(#glow)" className="film-rotate" style={{ transformOrigin: '50px 75px' }} />
        <circle cx="50" cy="75" r="35" fill="#0d0d1a" />
        <line x1="50" y1="35" x2="50" y2="115" stroke="#00E0FF" strokeWidth="2" strokeLinecap="round" className="film-rotate" style={{ transformOrigin: '50px 75px' }} />
        <line x1="22.9" y1="50.6" x2="77.1" y2="99.4" stroke="#FF00E0" strokeWidth="2" strokeLinecap="round" className="film-rotate" style={{ transformOrigin: '50px 75px' }} />
        <line x1="77.1" y1="50.6" x2="22.9" y2="99.4" stroke="#00E0FF" strokeWidth="2" strokeLinecap="round" className="film-rotate" style={{ transformOrigin: '50px 75px' }} />

        <circle cx="150" cy="75" r="40" fill="url(#solidNeonGradient)" opacity="0.9" filter="url(#glow)" className="film-rotate" style={{ transformOrigin: '150px 75px' }} />
        <circle cx="150" cy="75" r="35" fill="#0d0d1a" />
        <line x1="150" y1="35" x2="150" y2="115" stroke="#00E0FF" strokeWidth="2" strokeLinecap="round" className="film-rotate" style={{ transformOrigin: '150px 75px' }} />
        <line x1="122.9" y1="50.6" x2="177.1" y2="99.4" stroke="#FF00E0" strokeWidth="2" strokeLinecap="round" className="film-rotate" style={{ transformOrigin: '150px 75px' }} />
        <line x1="177.1" y1="50.6" x2="122.9" y2="99.4" stroke="#00E0FF" strokeWidth="2" strokeLinecap="round" className="film-rotate" style={{ transformOrigin: '150px 75px' }} />

        <path d="M 50 75 A 40 40 0 0 1 70 40 L 130 40 A 40 40 0 0 1 150 75 A 40 40 0 0 1 130 110 L 70 110 A 40 40 0 0 1 50 75 Z"
              fill="none" stroke="url(#neonGradient)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"
              className="film-flicker" />

        <circle cx="75" cy="35" r="2" fill="#0d0d1a" />
        <circle cx="85" cy="35" r="2" fill="#0d0d1a" />
        <circle cx="115" cy="35" r="2" fill="#0d0d1a" />
        <circle cx="125" cy="35" r="2" fill="#0d0d1a" />

        <circle cx="75" cy="115" r="2" fill="#0d0d1a" />
        <circle cx="85" cy="115" r="2" fill="#0d0d1a" />
        <circle cx="115" cy="115" r="2" fill="#0d0d1a" />
        <circle cx="125" cy="115" r="2" fill="#0d0d1a" />
        
        <text
          x="100"
          y="145"
          fontFamily="Inter, sans-serif"
          fontSize="24"
          fontWeight="900"
          letterSpacing="0.1em"
          textAnchor="middle"
          fill="url(#neonGradient)"
          style={{textTransform: "uppercase"}}
          className="film-flicker"
        >
          Typhoonhub
        </text>
      </svg>
    </div>
  );
}
