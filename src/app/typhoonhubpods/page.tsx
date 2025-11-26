'use client';

import { useState } from 'react';
import { podcastEpisodes } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TyphoonHubPodsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data for featured episodes (using the podcast data we have)
  const featuredEpisodes = [
    {
      id: 1,
      title: 'Global Cinema: Filming Around the World',
      subtitle: 'Filming Around the World',
      image: 'https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/Global%20cinema%20cover.png?alt=media&token=04f7a39d-18c7-4bcf-890b-b80be847fc54',
      category: 'TyphoonHub Originals'
    },
    {
      id: 2,
      title: 'Global Cinema: International Film Markets',
      subtitle: 'International Film Markets',
      image: 'https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/Global%20cinema%20cover.png?alt=media&token=04f7a39d-18c7-4bcf-890b-b80be847fc54',
      category: 'TyphoonHub Originals'
    },
    {
      id: 3,
      title: 'Global Cinema: Cultural Storytelling',
      subtitle: 'Cultural Storytelling',
      image: 'https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/Global%20cinema%20cover.png?alt=media&token=04f7a39d-18c7-4bcf-890b-b80be847fc54',
      category: 'TyphoonHub Originals'
    }
  ];

  const historyEpisodes = [
    {
      id: 4,
      title: 'The Golden Age of Cinema',
      subtitle: 'Classic Hollywood',
      image: 'https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/Global%20cinema%20cover.png?alt=media&token=04f7a39d-18c7-4bcf-890b-b80be847fc54',
      category: 'TyphoonHub Originals'
    },
    {
      id: 5,
      title: 'Rise of Independent Film',
      subtitle: 'The Indie Movement',
      image: 'https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/Global%20cinema%20cover.png?alt=media&token=04f7a39d-18c7-4bcf-890b-b80be847fc54',
      category: 'TyphoonHub Originals'
    },
    {
      id: 6,
      title: 'Digital Revolution in Filmmaking',
      subtitle: 'Modern Cinema',
      image: 'https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/Global%20cinema%20cover.png?alt=media&token=04f7a39d-18c7-4bcf-890b-b80be847fc54',
      category: 'TyphoonHub Originals'
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = (maxLength: number) => {
    setCurrentIndex((prev) => Math.min(maxLength - 1, prev + 1));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                TYPHOON<span className="text-red-600">POD</span>
              </h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl">
            Explore global cinema, independent filmmaking, and the stories behind the lens
          </p>
        </div>
      </section>

      {/* Featured New Episodes */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured New Episodes</h2>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="text-white hover:text-red-600"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleNext(featuredEpisodes.length)}
                disabled={currentIndex >= featuredEpisodes.length - 3}
                className="text-white hover:text-red-600"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
              <Link href="/global-cinema">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  SEE MORE
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEpisodes.map((episode, index) => (
              <Link key={episode.id} href="/global-cinema">
                <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-red-600 transition-all group cursor-pointer">
                  <div className="aspect-square relative">
                    <Image
                      src={episode.image}
                      alt={episode.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">
                      {episode.title}
                    </h3>
                    <p className="text-sm text-red-600 mb-2">{episode.subtitle}</p>
                    <p className="text-xs text-gray-400">{episode.category}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* History & Legacy Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">History & Legacy</h2>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="text-white hover:text-red-600"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleNext(historyEpisodes.length)}
                disabled={currentIndex >= historyEpisodes.length - 3}
                className="text-white hover:text-red-600"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
              <Link href="/global-cinema">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  SEE MORE
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {historyEpisodes.map((episode) => (
              <Link key={episode.id} href="/global-cinema">
                <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-red-600 transition-all group cursor-pointer">
                  <div className="aspect-square relative">
                    <Image
                      src={episode.image}
                      alt={episode.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">
                      {episode.title}
                    </h3>
                    <p className="text-sm text-gray-400">{episode.category}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
