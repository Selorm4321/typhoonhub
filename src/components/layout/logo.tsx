import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 90"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('font-headline', className)}
      aria-label="Typhoon Entertainment Logo"
    >
      {/* Film Reel Shape */}
      <path
        d="M85,15 C100,15 105,25 105,35V55C105,65 100,75 85,75H25C10,75 5,65 5,55V35C5,25 10,15 25,15H85Z"
        stroke="#00d1ff"
        strokeWidth="5"
        fill="none"
        className="text-[#00d1ff] animate-pulse-glow"
      />
      <path
        d="M15,75 C45,95 75,95 100,75"
        stroke="#00d1ff"
        strokeWidth="5"
        fill="none"
        className="text-[#00d1ff] animate-pulse-glow"
        strokeLinecap="round"
      />

      {/* Reel Holes */}
      <circle cx="30" cy="45" r="9" fill="transparent" stroke="#00d1ff" strokeWidth="2" />
      <circle cx="70" cy="30" r="7" fill="transparent" stroke="#00d1ff" strokeWidth="2" />
      <circle cx="70" cy="60" r="7" fill="transparent" stroke="#00d1ff" strokeWidth="2" />

      {/* TYPHOON Text */}
      <text
        x="115"
        y="52"
        fontSize="34"
        fontWeight="bold"
        fill="#ff00a0"
        className="text-[#ff00a0] animate-pulse-glow"
      >
        TYPHOON
      </text>

      {/* ENTERTAINMENT Text */}
      <text
        x="117"
        y="76"
        fontSize="15"
        fontWeight="normal"
        fill="#00d1ff"
        letterSpacing="1.5"
        className="text-[#00d1ff] animate-pulse-glow"
      >
        ENTERTAINMENT
      </text>
    </svg>
  );
}
