'use client';

export const dynamic = "force-dynamic";

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import type { Investment } from '@/lib/types/investment';
import { fetchInvestmentBySlug } from '@/lib/investments';
import { pct } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, Users, Target, CheckCircle, ExternalLink, Film, Clapperboard, Video, FileText } from 'lucide-react';
import InvestmentDetailClientBlock from '@/components/investment-detail-client-block';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export default function InvestmentDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [investment, setInvestment] = useState<Investment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetchInvestmentBySlug(slug).then(fetchedInvestment => {
      if (fetchedInvestment) {
        setInvestment(fetchedInvestment);
        document.title = `${fetchedInvestment.title} | Typhoon`;
      } else {
        setInvestment(null);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="w-full h-[400px] rounded-lg mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="w-full h-48" />
            <Skeleton className="w-full h-32" />
          </div>
          <div className="space-y-8">
            <Skeleton className="w-full h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (!investment) {
    notFound();
  }

  const percent = pct(investment.raised, investment.goal);

  return (
    <main className="container mx-auto py-8">
      <Link href="/invest" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Investments
      </Link>

      {/* Hero Section */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
        <Image src={investment.heroImage} alt={investment.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="font-headline text-5xl font-bold">{investment.title}</h1>
          <p className="text-xl mt-2 text-white/90">{investment.tagline}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Story Section */}
          <Card>
            <CardHeader><CardTitle>The Story</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{investment.longDescription}</p>
            </CardContent>
          </Card>

          {/* Highlights Section */}
          {investment.highlights && investment.highlights.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Key Highlights</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {investment.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Team Section */}
          <Card>
            <CardHeader><CardTitle>The Team</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold flex items-center"><Clapperboard className="mr-2 h-5 w-5"/>Director</h3>
                <p className="text-muted-foreground">{investment.team.director}</p>
              </div>
              {investment.team.producers && investment.team.producers.length > 0 && (
                <div>
                  <h3 className="font-semibold flex items-center"><Film className="mr-2 h-5 w-5"/>Producers</h3>
                  <p className="text-muted-foreground">{investment.team.producers.join(', ')}</p>
                </div>
              )}
              {investment.team.cast && investment.team.cast.length > 0 && (
                 <div>
                  <h3 className="font-semibold flex items-center"><Users className="mr-2 h-5 w-5"/>Key Cast</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                    {investment.team.cast.map((member, i) => (
                      <div key={i} className="text-muted-foreground">
                        <span className="font-medium text-foreground">{member.name}</span> as {member.role}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documents Section */}
          {investment.docLinks && investment.docLinks.length > 0 && (
             <Card>
              <CardHeader><CardTitle>Documents</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                {investment.docLinks.map((doc, i) => (
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" key={i} className="flex items-center text-primary underline hover:no-underline">
                    <FileText className="mr-2 h-4 w-4"/>{doc.name}<ExternalLink className="ml-1.5 h-4 w-4"/>
                  </a>
                ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-8">
          {/* Funding Card */}
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl">Funding Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Progress value={percent} className="h-3" />
                <div className="flex justify-between items-baseline mt-2">
                  <span className="text-2xl font-bold text-primary">{formatter.format(investment.raised)}</span>
                  <span className="text-sm text-muted-foreground">of {formatter.format(investment.goal)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-lg py-2 border-y">
                <div className="flex items-center font-semibold">
                  <Target className="mr-3 h-5 w-5 text-primary"/>
                  <span>{percent}%</span>
                </div>
                <div className="flex items-center font-semibold">
                  <Users className="mr-3 h-5 w-5 text-primary"/>
                  <span>{investment.backers}</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground pt-1">
                <span>Funded</span>
                <span>Backers</span>
              </div>
              <InvestmentDetailClientBlock investment={investment} />
            </CardContent>
          </Card>

          {/* Media Gallery */}
          {(investment.images?.length > 0 || investment.videoUrl) && (
            <Card>
              <CardHeader><CardTitle>Media</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {investment.videoUrl && (
                  <div className="aspect-video rounded-md overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={investment.videoUrl.replace("watch?v=", "embed/")} // Basic embed URL conversion
                      title={`${investment.title} Trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  {investment.images.map((img, i) => (
                    <div key={i} className="relative aspect-video rounded-md overflow-hidden">
                      <Image src={img} alt={`Still ${i+1} for ${investment.title}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
