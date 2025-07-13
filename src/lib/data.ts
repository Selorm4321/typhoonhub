
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
      tagline: "Some things are best left at the bottom of the sea.",
      synopsis: "A father and son's routine fishing trip turns into a living nightmare when they haul a supernatural entity from the murky depths. Trapped on their small boat, they must confront a terrifying legend made real before the ocean claims them both."
    },
    {
      title: 'Alice And Huck',
      youtubeVideoId: 'QW6_dfNfE0c',
      tagline: "The rabbit hole is a dangerous place.",
      synopsis: "In this dark and gritty reimagining of classic characters, Alice and Huck navigate a perilous, modern world of danger and secrets. This short film explores their desperate journey to escape unseen forces that hunt them."
    },
     {
      title: 'When Jesse was Born',
      youtubeVideoId: 'kMBqikKeXYM',
      tagline: "Everything changes in a single moment.",
      synopsis: "A short film drama that explores the profound and pivotal moment of a new life's arrival. Starring Ryan Robbins and Erica Carroll, the story delves into the emotional landscape that shifts forever when a child is born."
    },
    {
      title: 'Thirsty (Trailer)',
      youtubeVideoId: 'l6QMx5w1TGc',
      tagline: "Some cravings can't be quenched.",
      synopsis: "A woman's grip on reality unravels as she is plagued by an unquenchable thirst and haunting visions. This psychological thriller blurs the line between nightmare and waking life, trapping its protagonist in a cycle of paranoia and fear."
    },
    {
      title: 'Jwhonjovouchor and the Yiiiii Kakai Voice of Waste Mask',
      youtubeVideoId: 'v3_ueH-TMdc',
      tagline: "From Trash Comes a Voice. From Waste Comes Art.",
      synopsis: "An intimate look into the world of Ghanaian artist Jwhonjovouchor, who transforms discarded materials and ocean waste into breathtaking masks and sculptures. This documentary explores his philosophy of finding hope in what society throws away and his mission to give a voice to the environment through his unique and powerful art."
    },
    {
      title: 'New Day',
      youtubeVideoId: 'IHWigm2UgQE',
      tagline: "When the world locks down, the doors to hatred swing wide open.",
      synopsis: 'When the world locks down, the doors to hatred swing wide open. "A New Day" is a gripping short film that explores the dark side of pandemic paranoia and the rise of anti-Asian hate. Mike, a single father, finds himself trapped with his young daughter, Yoyo, and a xenophobic landlord, Lucas, whose fear of the "China virus" quickly turns into aggressive prejudice. After losing his job and facing escalating hostility at home, Mike is confronted with the brutal reality of racism when he is violently assaulted on the street. He returns to a gut-wrenching scene that forces him into a final, desperate confrontation to save his daughter. This film is a powerful, unflinching look at the human cost of fear and the enduring strength of a father\'s love in the search for a better tomorrow. --- A Film by Max Xu'
    },
    {
      title: 'Thato - Sterkinekor Vision Mission',
      youtubeVideoId: '_smkf5Iv2Z0',
      tagline: "Bringing a child's world into focus.",
      synopsis: "Share the Gift of Sight. Thato, a Sterkinekor Vision Mission commercial. A collaboration between AFDA and Vega School of Brand . Silver Lorie Award Winner Director: Zwelethu Radebe Producers: Ahmed Seedat & Dithapelo Segodi D.O.P: Ofentse Mwase Editor: Masonwabe Joka Sound Designer: Cale Wadacor"
    },
    {
      title: 'Typhoon Talk: Break the Stigma',
      youtubeVideoId: '6gmYHtOfWa4',
      tagline: "A new conversation for a new culture.",
      synopsis: "Host Jill Maria dives deep into Canada's evolving culture, exploring the worlds of cannabis cultivation and the controversial practice of microdosing for mental wellness. This episode challenges preconceptions and opens a dialogue to break the stigma."
    },
    {
      title: 'The Art Of Indie | Ep. 1: Exploring Creativity with Nikki Wallin',
      youtubeVideoId: 'FmyrrtqP3Sc',
      tagline: "The journey behind the vision.",
      synopsis: "In the debut episode of 'The Art Of Indie,' host Alyssa Parker is joined by the multi-talented Nikki Wallin. Discover the journey of an independent creator who wears the hats of producer, writer, and actor to bring compelling stories to life."
    },
    {
      title: 'The Art Of Indie | Episode #2: Comedy Gold with Devon Ferguson',
      youtubeVideoId: 'krNFpw5gnDI',
      tagline: "Unpacking the art of the laugh.",
      synopsis: "Host Alyssa Parker sits down with comedy mastermind Devon Ferguson to explore the craft of making people laugh. This episode unpacks the art of indie comedy, from writing and producing to the inspirations that fuel a unique comedic voice."
    }
];


export const films: Film[] = yourShowsData.map((show, index) => {
  const posterUrl = show.youtubeVideoId
    ? `https://img.youtube.com/vi/${show.youtubeVideoId}/hqdefault.jpg`
    : `https://placehold.co/480x360.png`;

  const backdropUrl = show.youtubeVideoId
    ? `https://img.youtube.com/vi/${show.youtubeVideoId}/maxresdefault.jpg`
    : `https://placehold.co/1280x720.png`;

  return {
    id: index + 1,
    title: show.title,
    youtubeVideoId: show.youtubeVideoId,
    tagline: show.tagline,
    synopsis: show.synopsis,
    posterUrl: posterUrl,
    backdropUrl: backdropUrl,
    genres: ['Indie', 'Short'],
    cast: [
      { name: 'Creator Name', character: 'Host/Director', avatarUrl: `https://placehold.co/100x${100 + index}` },
    ],
    reviews: [],
    durationMinutes: 15,
  };
});


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
