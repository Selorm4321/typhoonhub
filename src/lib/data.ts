
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
      synopsis: 'A visually stunning and uplifting short film that captures the promise and potential of a new beginning, following a character through a transformative day.'
    },
    { 
      title: 'Alice And Huck', 
      youtubeVideoId: 'QW6_dfNfE0c', 
      tagline: 'Two classic tales, one surreal journey.',
      synopsis: 'This inventive film blends the classic tales of Alice in Wonderland and Huckleberry Finn into a unique and surreal journey of discovery and adventure.'
    },
    { 
      title: 'Typhoon Talk Episode 1 - Break the Stigma', 
      youtubeVideoId: '6gmYHtOfWa4', 
      tagline: 'Open conversations that matter.',
      synopsis: 'In the inaugural episode of Typhoon Talk, the hosts dive into an open and honest conversation about mental health, aiming to break down stigmas and foster understanding.'
    },
    { 
      title: 'MAMI', 
      youtubeVideoId: 'MtIRD4VX_bo', 
      tagline: 'A powerful story of motherhood.',
      synopsis: 'An intimate and emotional portrayal of the bonds of motherhood, exploring its joys, challenges, and enduring strength through a personal and artistic lens.'
    },
    { 
      title: 'jwohnjovouchor and the Yiiiii Kakai Voice of Waste Masks', 
      youtubeVideoId: 'v3_ueH-TMdc', 
      tagline: 'Art, identity, and the voices unheard.',
      synopsis: 'A thought-provoking look at how art can transform discarded materials into powerful statements on identity, consumer culture, and environmental consciousness.'
    },
    { 
      title: 'HARBINGER CUSTOMS AD', 
      youtubeVideoId: 'V2iPIiOn3vU', 
      tagline: 'Craftsmanship in motion.',
      synopsis: 'Experience the artistry and precision of custom craftsmanship in this stylish and fast-paced promotional piece that showcases true dedication to detail.'
    },
    { 
      title: 'When Jesse was born', 
      youtubeVideoId: 'kMBqikKeXYM', 
      tagline: 'A new life, a new journey.',
      synopsis: 'A heartfelt and personal film documenting the precious and intimate moments surrounding the arrival of a new life and the beginning of a family\'s journey.'
    },
    { 
      title: 'The Art Of Indie | Ep. 1: Exploring Creativity with Nikki Wallin', 
      youtubeVideoId: 'FmyrrtqP3Sc', 
      tagline: 'Diving into the creative mind.',
      synopsis: 'Join us for the first episode of The Art Of Indie, featuring a deep dive into the creative process, inspirations, and unique artistic vision of guest Nikki Wallin.'
    },
    { 
      title: 'The Art Of Indie | Episode #2: Comedy Gold with Devon Ferguson', 
      youtubeVideoId: 'krNFpw5gnDI', 
      tagline: 'Finding the funny in the everyday.',
      synopsis: 'The Art of Indie continues with a hilarious and insightful look at the world of stand-up comedy, exploring the craft with the talented Devon Ferguson.'
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

export type FundingProject = {
  id: number;
  title: string;
  tagline: string;
  synopsis: string;
  trailerYoutubeId: string;
  fundingGoal: number;
  currentFunding: number;
  investors: number;
};

export const fundingProjects: FundingProject[] = [
  {
    id: 1,
    title: 'Project Nebula',
    tagline: 'A journey beyond the stars.',
    synopsis: 'A small crew of explorers travels to a newly discovered star system, only to find they are not alone. A sci-fi thriller about first contact and survival.',
    trailerYoutubeId: 'IHWigm2UgQE',
    fundingGoal: 50000,
    currentFunding: 22500,
    investors: 142,
  },
  {
    id: 2,
    title: 'Echoes of the Past',
    tagline: 'Some memories are best left forgotten.',
    synopsis: 'A historian discovers an ancient artifact that allows her to relive memories from the past. But when she uncovers a dark secret, she becomes the target of a shadowy organization.',
    trailerYoutubeId: 'QW6_dfNfE0c',
    fundingGoal: 75000,
    currentFunding: 68250,
    investors: 310,
  },
  {
    id: 3,
    title: 'The Last City',
    tagline: 'Hope is their only currency.',
    synopsis: 'In a post-apocalyptic world, a young woman leads a small group of survivors on a perilous journey to find the last known human city. A story of resilience and hope.',
    trailerYoutubeId: 'MtIRD4VX_bo',
    fundingGoal: 100000,
    currentFunding: 45000,
    investors: 255,
  },
];
