import { Mail, Waves, Users, Tv } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';

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


export default function JoinUsPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto text-center">
        <Waves className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold">Join the Typhoon Movement</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This isn't just another streaming service. We're building a home for stories that defy the mainstream—a platform where independent creators are championed and viewers discover their next favorite film.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-accent" />
              <span>For Film Lovers</span>
            </CardTitle>
            <CardDescription>Tired of the same old formula? So are we.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Dive into a curated library of films that challenge, inspire, and entertain. Discover hidden gems, support emerging artists, and be part of a community that celebrates authentic, unfiltered storytelling. 
            </p>
             <p>Your next great movie night starts here.</p>
          </CardContent>
        </Card>
        <Card className="bg-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tv className="h-6 w-6 text-accent" />
              <span>For Filmmakers</span>
            </CardTitle>
            <CardDescription>Your vision deserves a stage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We believe in the power of your voice. Typhoon Entertainment is your platform to connect with a dedicated audience eager for fresh perspectives. We provide the space, you bring the story.
            </p>
            <p>
              <Button asChild>
                <Link href="/submit">Submit Your Film</Link>
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-2xl mx-auto mt-12">
        <CardHeader className="text-center">
          <CardTitle>Connect With Us</CardTitle>
          <CardDescription>Have a question or a great idea? We'd love to hear it.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-4 border-b pb-6">
            <Mail className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <a href="mailto:selorm@typhoonentertainment.ca" className="text-muted-foreground hover:text-primary transition-colors">
                selorm@typhoonentertainment.ca
              </a>
            </div>
          </div>
          
          <div className="pt-2 text-center">
            <h3 className="font-semibold mb-4">Follow the Movement</h3>
            <div className="flex items-center justify-center gap-6">
               <Button asChild variant="outline" size="icon">
                  <Link href="https://www.facebook.com/share/1JndZR7e8X/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="h-5 w-5" />
                  </Link>
               </Button>
               <Button asChild variant="outline" size="icon">
                 <Link href="https://www.instagram.com/typhoonentertainment/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </Link>
               </Button>
               <Button asChild variant="outline" size="icon">
                 <Link href="https://www.tiktok.com/@typhoonent" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <TikTokIcon className="h-5 w-5" />
                  </Link>
               </Button>
               <Button asChild variant="outline" size="icon">
                 <Link href="https://www.youtube.com/channel/UCkSB2BkituD7xZ-kusViQfw" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <Youtube className="h-5 w-5" />
                  </Link>
               </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
