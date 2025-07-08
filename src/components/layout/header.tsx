
'use client';

import { Clapperboard, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SearchInput from '@/components/search-input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/live', label: 'Live TV' },
  { href: '/invest', label: 'Invest' },
  { href: '/search', label: 'Search' },
  { href: '/submit', label: 'Submit Film' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Clapperboard className="h-6 w-6 text-primary" />
          <span className="hidden font-bold font-headline sm:inline-block">Typhoon Entertainment</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden md:block">
            <SearchInput />
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" asChild>
            <Link href="/search">
              <Search />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
