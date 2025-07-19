import { Facebook, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import Logo from './logo';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.6 5.82s.51.5 0 0A4.24 4.24 0 0 1 12.53 3h-.1a4.24 4.24 0 0 0-4.13 4.34v8.41a4.24 4.24 0 0 0 4.24 4.24h.1a4.24 4.24 0 0 0 4.13-4.34s-.51-.5 0 0a4.24 4.24 0 0 1 4.13 4.34h.1a4.24 4.24 0 0 0 4.24-4.24V10.1a4.24 4.24 0 0 0-4.24-4.24h-.1a4.24 4.24 0 0 0-4.13 4.34Z" />
    </svg>
);

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo className="h-10 w-auto" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; Typhoonhub. All Rights Reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://www.facebook.com/share/1JndZR7e8X/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="https://www.instagram.com/typhoonentertainment/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="https://www.tiktok.com/@typhoonent" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <TikTokIcon className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="https://www.youtube.com/channel/UCkSB2BkituD7xZ-kusViQfw" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <Youtube className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
