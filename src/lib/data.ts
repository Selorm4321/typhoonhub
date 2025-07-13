
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
      synopsis: 'A father and son\'s routine fishing trip turns into a living nightmare when they discover a cursed mermaid statue at the bottom of the ocean.'
    },
    {
      title: 'Alice And Huck',
      youtubeVideoId: 'QW6_dfNfE0c',
      tagline: 'The rabbit hole is a dangerous place.',
      synopsis: 'In this dark and gritty reimagining of classic characters, a street-smart Alice teams up with a cynical Huck Finn to navigate a surreal, corrupt underworld.'
    },
    {
      title: 'HARBINGER CUSTOMS: Distinguished Gentleman\'s Ride',
      youtubeVideoId: 'kMBqikKeXYM',
      tagline: 'Riding Dapper for a Cause.',
      synopsis: 'More than just motorcycles, it\'s a movement. Join Harbinger Customs as they participate in the Distinguished Gentleman\'s Ride, raising funds and awareness for men\'s health.'
    },
    {
      title: 'HARBINGER CUSTOMS SHOP INTRO',
      youtubeVideoId: 'IHWigm2UgQE',
      tagline: 'Where Metal Meets Soul.',
      synopsis: 'Step inside the Harbinger Customs workshop in Squamish, BC, and witness the artistry and passion that goes into every custom motorcycle build.'
    },
    {
      title: 'Typhoon Talk: Break the Stigma',
      youtubeVideoId: '6gmYHtOfWa4',
      tagline: 'A new conversation for a new culture.',
      synopsis: 'Host Jill Maria dives deep into Canada\'s evolving culture, discussing important and often overlooked topics with a panel of insightful guests.'
    },
    {
      title: 'The Art Of Indie | Ep. 1: Exploring Creativity with Nikki Wallin',
      youtubeVideoId: 'FmyrrtqP3Sc',
      tagline: 'The journey behind the vision.',
      synopsis: 'In the debut episode of "The Art Of Indie," host Alyssa Parker is joined by the multi-talented Nikki Wallin to discuss the creative process and the life of an independent artist.'
    },
    {
      title: 'The Art Of Indie | Episode #2: Comedy Gold with Devon Ferguson',
      youtubeVideoId: 'krNFpw5gnDI',
      tagline: 'Unpacking the art of the laugh.',
      synopsis: 'Host Alyssa Parker sits down with comedy mastermind Devon Ferguson to explore the nuances of joke writing, performance, and finding humor in the everyday.'
    },
    {
      title: 'HARBINGER CUSTOMS AD',
      youtubeVideoId: 'v3_ueH-TMdc',
      tagline: 'Forged in Fire. Built to Ride.',
      synopsis: 'A high-octane showcase of Harbinger Customs, featuring stunning visuals of their unique bikes and the rugged beauty of the Canadian landscape.'
    },
    {
      title: 'Thirsty (Trailer)',
      youtubeVideoId: 'l6QMx5w1TGc',
      tagline: 'Some cravings can\'t be quenched.',
      synopsis: 'A woman\'s grip on reality unravels as she is plagued by an unquenchable thirst. This psychological thriller will leave you questioning everything.'
    },
    {
      title: 'Thato - Ster-Kinekor Vision Mission',
      youtubeVideoId: '_smkf5Iv2Z0',
      tagline: 'Bringing a child\'s world into focus.',
      synopsis: 'Follow the touching story of Thato, a young boy navigating a blurry, out-of-focus world, and the incredible impact of Ster-Kinekor\'s Vision Mission.'
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
    title: 'MAMI',
    tagline: 'Some things are best left at the bottom of the sea.',
    synopsis: 'A father and son\'s routine fishing trip turns into a living nightmare when they discover a cursed mermaid statue at the bottom of the ocean. Help us bring the full feature-length version of this terrifying short to life.',
    trailerYoutubeId: 'MtIRD4VX_bo',
    fundingGoal: 80000,
    currentFunding: 34500,
    investors: 188,
  },
  {
    id: 2,
    title: 'Alice And Huck',
    tagline: 'The rabbit hole is a dangerous place.',
    synopsis: 'We\'ve introduced you to the gritty world of Alice and Huck. Now, we want to expand their story into a full series. Fund the pilot episode and join them on their first big case.',
    trailerYoutubeId: 'QW6_dfNfE0c',
    fundingGoal: 120000,
    currentFunding: 95000,
    investors: 451,
  },
  {
    id: 3,
    title: 'Thirsty',
    tagline: 'Some cravings can\'t be quenched.',
    synopsis: 'The trailer left you wanting more. We want to produce the full-length feature film, exploring the depths of obsession and madness. Your investment can make it happen.',
    trailerYoutubeId: 'l6QMx5w1TGc',
    fundingGoal: 65000,
    currentFunding: 12000,
    investors: 95,
  },
];
