
'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SearchInput from '@/components/search-input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Logo from './logo';
import { useAuth } from '@/context/auth-context';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/browse', label: 'Browse' },
  { href: '/live', label: 'Live TV' },
  { href: '/invest', label: 'Invest' },
  { href: '/global-cinema', label: 'Global Cinema' },
  { href: '/submit', label: 'Submit Film' },
  { href: '/contact', label: 'Join Us' },
];

export default function Header() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center">
          <Logo className="h-12 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === link.href ? 'text-foreground font-semibold' : 'text-foreground/60'
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
          <div className="hidden items-center gap-2 md:flex">
            {!loading &&
              (user ? (
                <>
                  <Button asChild variant="ghost">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="secondary" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost">
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              ))}
          </div>
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                 {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'transition-colors hover:text-foreground',
                      pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                 <div className="mt-4">
                  <SearchInput />
                </div>
                 <div className="mt-6 flex flex-col gap-4">
                  {!loading &&
                    (user ? (
                      <>
                        <Button asChild><Link href="/dashboard">Dashboard</Link></Button>
                        <Button variant="outline" onClick={handleLogout}>
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild variant="ghost">
                          <Link href="/login">Log In</Link>
                        </Button>
                        <Button asChild>
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </>
                    ))}
                 </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
