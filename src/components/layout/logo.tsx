import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <svg
        width="200"
        height="60"
        viewBox="0 0 400 120"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Typhoon Entertainment Logo"
        className="w-full h-full"
      >
        <defs>
          <filter id="neon-glow-filter-anim">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          </filter>
          <style>
            {`
              .glow-layer {
                animation: pulse 4s infinite ease-in-out;
              }
              
              .text-layer {
                animation: flicker 3s infinite linear;
              }

              @keyframes pulse {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 1; }
              }

              @keyframes flicker {
                0%, 19.9%, 22%, 62.9%, 64%, 64.9%, 70%, 100% {
                  opacity: 1;
                }
                20%, 21.9%, 63%, 63.9%, 65%, 69.9% {
                  opacity: 0.8;
                }
              }
            `}
          </style>
        </defs>

        <g fontFamily="Montserrat, sans-serif" fontWeight="700" fontSize="60" textAnchor="middle" dominantBaseline="central">
          <text
            className="glow-layer"
            x="50%"
            y="50%"
            fill="none"
            stroke="#00bfff"
            strokeWidth="12"
            filter="url(#neon-glow-filter-anim)"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            TYPHOON
          </text>
          <text
            x="50%"
            y="50%"
            fill="none"
            stroke="#00bfff"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            TYPHOON
          </text>
          <text className="text-layer" x="50%" y="50%" fill="#e0ffff" stroke="none">
            TYPHOON
          </text>
        </g>
      </svg>
    </div>
  );
}
