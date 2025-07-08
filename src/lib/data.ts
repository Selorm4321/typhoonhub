
export type Film = {
  id: number;
  title: string;
  tagline: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  genres: string[];
  cast: { name: string; character: string; avatarUrl:string }[];
  reviews: { author: string; text: string; rating: number }[];
  durationMinutes: number;
  youtubeVideoId: string;
};

const yourShowsData: { title: string; youtubeVideoId: string; tagline: string; synopsis: string; }[] = [
    { 
      title: 'New Day', 
      youtubeVideoId: 'IHWigm2UgQE', 
      tagline: 'A fresh start, a new perspective.',
      synopsis: 'A visually stunning and uplifting short film that captures the promise and potential of a new beginning.'
    },
    { 
      title: 'Alice And Huck', 
      youtubeVideoId: 'QW6_dfNfE0c', 
      tagline: 'A timeless adventure reimagined.',
      synopsis: 'This inventive film blends the classic tales of Alice in Wonderland and Huckleberry Finn into a unique and surreal journey of discovery.'
    },
    { 
      title: 'Typhoon Talk Episode 1 - Break the Stigma', 
      youtubeVideoId: '6gmYHtOfWa4', 
      tagline: 'Open conversations that matter.',
      synopsis: 'In the inaugural episode of Typhoon Talk, the hosts dive into an open and honest conversation about mental health, aiming to break down stigmas.'
    },
    { 
      title: 'MAMI', 
      youtubeVideoId: 'MtIRD4VX_bo', 
      tagline: 'A powerful story of motherhood.',
      synopsis: 'An intimate and emotional portrayal of the bonds of motherhood, exploring its joys, challenges, and enduring strength.'
    },
    { 
      title: 'jwohnjovouchor and the Yiiiii Kakai Voice of Waste Masks', 
      youtubeVideoId: 'v3_ueH-TMdc', 
      tagline: 'Art, identity, and the voices unheard.',
      synopsis: 'A thought-provoking look at how art can transform discarded materials into powerful statements on identity and consumer culture.'
    },
    { 
      title: 'HARBINGER CUSTOMS AD', 
      youtubeVideoId: 'V2iPIiOn3vU', 
      tagline: 'Craftsmanship in motion.',
      synopsis: 'Experience the artistry and precision of custom craftsmanship in this stylish and fast-paced promotional piece.'
    },
    { 
      title: 'When Jesse was born', 
      youtubeVideoId: 'kMBqikKeXYM', 
      tagline: 'A new life, a new journey.',
      synopsis: 'A heartfelt and personal film documenting the precious moments surrounding the arrival of a new life.'
    },
    { 
      title: 'The Art Of Indie | Ep. 1: Exploring Creativity with Nikki Wallin', 
      youtubeVideoId: 'FmyrrtqP3Sc', 
      tagline: 'Diving into the creative mind.',
      synopsis: 'Join us for the first episode of The Art Of Indie, featuring a deep dive into the creative process and inspiration of artist Nikki Wallin.'
    },
    { 
      title: 'The Art Of Indie | Episode #2: Comedy Gold with Devon Ferguson', 
      youtubeVideoId: 'krNFpw5gnDI', 
      tagline: 'Finding the funny in the everyday.',
      synopsis: 'The Art of Indie continues with a hilarious and insightful look at the world of stand-up comedy with the talented Devon Ferguson.'
    },
];


export const films: Film[] = yourShowsData.map((show, index) => ({
  id: index + 1,
  title: show.title,
  youtubeVideoId: show.youtubeVideoId,
  tagline: show.tagline,
  synopsis: show.synopsis,
  posterUrl: `https://img.youtube.com/vi/${show.youtubeVideoId}/hqdefault.jpg`,
  backdropUrl: `https://img.youtube.com/vi/${show.youtubeVideoId}/maxresdefault.jpg`,
  genres: ['Indie', 'Short'],
  cast: [
    { name: 'Creator Name', character: 'Host/Director', avatarUrl: `https://placehold.co/100x${100 + index}` },
  ],
  reviews: [],
  durationMinutes: 15,
}));
