'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InvestmentProgressBar } from '@/components/invest/ProgressBar';
import { TierCard } from '@/components/invest/TierCard';
import { FAQ } from '@/components/invest/FAQ';
import { InvestModal } from '@/components/invest/InvestModal';
import { ArrowRight, BarChart, Search, Zap } from 'lucide-react';
import { FeaturedProjectCard } from '@/components/invest/FeaturedProjectCard';

// Note: generateMetadata is commented out because it only works in Server Components.
// We are using a Client Component here to handle the modal state.
// SEO metadata can be set in a parent layout or via a custom hook if needed.
/*
export const metadata: Metadata = {
  title: 'Invest in Independent Cinema | Typhoonhub',
  description: 'Discover and invest in the next generation of groundbreaking independent films. Your support brings unique stories to the screen.',
  openGraph: {
    title: 'Invest in Independent Cinema | Typhoonhub',
    description: 'Discover and invest in the next generation of groundbreaking independent films.',
    url: 'https://typhoonhub.ca/invest',
    siteName: 'Typhoonhub',
    images: [
      {
        url: 'https://typhoonhub.ca/og-invest.png', // Placeholder OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};
*/

export const dynamic = "force-dynamic";
export const revalidate = 0;

const faqItems = [
  {
    question: "What is the minimum investment amount?",
    answer: "The minimum investment varies by project but typically starts at the 'Bronze' tier. Our goal is to make film investment accessible to a wide range of supporters."
  },
  {
    question: "How do I get a return on my investment?",
    answer: "Returns are typically paid out from the film's profits after distribution. Each project has a detailed prospectus outlining the waterfall schedule and potential ROI. Please review all documents carefully."
  },
  {
    question: "What are the risks?",
    answer: "Film investment is inherently risky and may not be suitable for all investors. There is no guarantee of a return. We encourage you to read the full prospectus and consult with a financial advisor."
  },
  {
    question: "Can I invest from outside of Canada?",
    answer: "Yes, our platform is open to international investors, subject to local regulations. Please ensure you are compliant with your country's laws regarding such investments."
  },
  {
    question: "When will I see the finished film?",
    answer: "Production timelines vary. Investors are given exclusive access to behind-the-scenes updates, and you will be the first to know about premiere dates and festival screenings."
  },
];

export default function InvestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <InvestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-primary/10 via-background to-background">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                      Invest in Independent Cinema
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Your support brings unique stories to the screen. Discover and fund the next generation of groundbreaking films from visionary creators.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link
                      href="#"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      View Prospectus
                    </Link>
                    <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
                      Register Interest
                    </Button>
                  </div>
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1594904533828-7800c4515c38?q=80&w=2070&auto=format&fit=crop"
                  width="600"
                  height="600"
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
              </div>
            </div>
          </section>

          {/* Featured Project Section */}
          <section id="featured" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Featured Project</h2>
                <FeaturedProjectCard />
            </div>
          </section>

          {/* How It Works Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Investing in independent film on Typhoonhub is a simple and transparent process.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <div className="grid gap-1 text-center">
                  <div className="flex justify-center items-center mb-4">
                    <div className="bg-primary rounded-full p-3">
                      <Search className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">1. Discover</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse our curated selection of film projects and find stories that resonate with you.
                  </p>
                </div>
                <div className="grid gap-1 text-center">
                   <div className="flex justify-center items-center mb-4">
                    <div className="bg-primary rounded-full p-3">
                      <BarChart className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">2. Review</h3>
                  <p className="text-sm text-muted-foreground">
                    Dive into the project details, including the script, budget, team, and investment prospectus.
                  </p>
                </div>
                <div className="grid gap-1 text-center">
                   <div className="flex justify-center items-center mb-4">
                    <div className="bg-primary rounded-full p-3">
                      <Zap className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">3. Invest</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your investment tier and become a part of the film's journey from script to screen.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Investment Tiers Section */}
          <section id="register" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Investment Tiers</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the level of support that's right for you. Every contribution makes a difference.
                </p>
              </div>
              <div className="mx-auto w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                <TierCard
                  tierName="Bronze"
                  amount="$100"
                  perks={["Digital copy of the film", "Your name in the credits", "Exclusive updates"]}
                />
                <TierCard
                  tierName="Silver"
                  amount="$500"
                  perks={["All Bronze perks", "Signed movie poster", "Two premiere tickets"]}
                  isFeatured={true}
                />
                <TierCard
                  tierName="Gold"
                  amount="$1,500"
                  perks={["All Silver perks", "Associate Producer credit", "Set visit invitation"]}
                />
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
            <div className="container max-w-3xl px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
              </div>
              <div className="pt-12">
                <FAQ items={faqItems} />
              </div>
            </div>
          </section>

        </main>
        {/* Compliance Footer */}
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-muted-foreground">
            Disclaimer: The information on this page is not an offer to sell securities. All investments are subject to risk. Please consult with a financial professional.
          </p>
        </footer>
      </div>
    </>
  );
}
