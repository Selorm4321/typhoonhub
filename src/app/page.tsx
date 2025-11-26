
'use client';

import React, { useState } from 'react';
import FilmCarousel from '@/components/film-carousel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { films } from '@/lib/data';
import { Film, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle subscription logic here
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Newsletter Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-600/30">
                <span className="text-red-500 text-sm font-medium">📺 Stay Connected</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Join the TyphoonHub Community
              </h1>
              <p className="text-gray-400 text-lg max-w-xl">
                Get the latest indie films, podcasts & creator spotlights delivered
                directly to your inbox. No spam, just independent creativity.
              </p>
            </div>

            {/* Right Form */}
            <div className="flex-1 w-full max-w-md">
              <form onSubmit={handleSubscribe} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 focus:border-red-600 focus:ring-red-600"
                  required
                />
                <Button
                  type="submit"
                  className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg"
                >
                  Subscribe Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  By subscribing, you agree to our{' '}
                  <Link href="/terms" className="underline hover:text-gray-400">
                    Terms
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="underline hover:text-gray-400">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
              {subscribed && (
                <div className="mt-4 p-3 bg-green-600/20 border border-green-600/30 rounded-lg text-green-500 text-sm text-center">
                  ✓ Successfully subscribed!
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Browse All Shows Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-red-600 rounded-xl">
              <Film className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Browse All Shows
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our complete collection of independent films, shorts, and
              documentaries.
            </p>
          </div>

          {/* Film Grid */}
          <FilmCarousel title="" films={films} />

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 h-12"
            >
              <Link href="/browse">
                View All Shows
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
