
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
      title: 'MAMI',
      youtubeVideoId: 'MtIRD4VX_bo',
      tagline: 'Some things are best left at the bottom of the sea.',
      synopsis: 'A father and son\'s routine fishing trip turns into a living nightmare...'
    },
    {
      title: 'Alice And Huck',
      youtubeVideoId: 'QW6_dfNfE0c',
      tagline: 'The rabbit hole is a dangerous place.',
      synopsis: 'In this dark and gritty reimagining of classic characters...'
    },
    {
      title: 'HARBINGER CUSTOMS: Distinguished Gentleman\'s Ride',
      youtubeVideoId: 'kMBqikKeXYM',
      tagline: 'Riding Dapper for a Cause.',
      synopsis: 'More than just motorcycles, it\'s a movement...'
    },
    {
      title: 'HARBINGER CUSTOMS SHOP INTRO',
      youtubeVideoId: 'IHWigm2UgQE',
      tagline: 'Where Metal Meets Soul.',
      synopsis: 'Step inside the Harbinger Customs workshop in Squamish, BC...'
    },
    {
      title: 'Typhoon Talk: Break the Stigma',
      youtubeVideoId: '6gmYHtOfWa4',
      tagline: 'A new conversation for a new culture.',
      synopsis: 'Host Jill Maria dives deep into Canada\'s evolving culture...'
    },
    {
      title: 'The Art Of Indie | Ep. 1: Exploring Creativity with Nikki Wallin',
      youtubeVideoId: 'FmyrrtqP3Sc',
      tagline: 'The journey behind the vision.',
      synopsis: 'In the debut episode of "The Art Of Indie," host Alyssa Parker is joined by the multi-talented Nikki Wallin...'
    },
    {
      title: 'The Art Of Indie | Episode #2: Comedy Gold with Devon Ferguson',
      youtubeVideoId: 'krNFpw5gnDI',
      tagline: 'Unpacking the art of the laugh.',
      synopsis: 'Host Alyssa Parker sits down with comedy mastermind Devon Ferguson...'
    },
    {
      title: 'HARBINGER CUSTOMS AD',
      youtubeVideoId: 'v3_ueH-TMdc',
      tagline: 'Forged in Fire. Built to Ride.',
      synopsis: 'A high-octane showcase of Harbinger Customs...'
    },
    {
      title: 'Thirsty (Trailer)',
      youtubeVideoId: 'l6QMx5w1TGc',
      tagline: 'Some cravings can\'t be quenched.',
      synopsis: 'A woman\'s grip on reality unravels as she is plagued by an unquenchable thirst...'
    },
    {
      title: 'Thato - Ster-Kinekor Vision Mission',
      youtubeVideoId: '_smkf5Iv2Z0',
      tagline: 'Bringing a child\'s world into focus.',
      synopsis: 'Follow the touching story of Thato, a young boy navigating a blurry, out-of-focus world...'
    }
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
