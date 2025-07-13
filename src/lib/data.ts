
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
      youtubeVideoId: 'placeholder_id',
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
      title: 'Hope Arising: The Voice of Waste',
      youtubeVideoId: 'v3_ueH-TMdc',
      tagline: "From Trash Comes a Voice. From Waste Comes Art.",
      synopsis: "An intimate look into the world of Ghanaian artist Jwhonjovouchor, who transforms discarded materials and ocean waste into breathtaking masks and sculptures. This documentary explores his philosophy of finding hope in what society throws away."
    },
    {
      title: "HARBINGER CUSTOMS: Distinguished Gentleman's Ride",
      youtubeVideoId: 'kMBqikKeXYM',
      tagline: "Riding Dapper for a Cause.",
      synopsis: "More than just motorcycles, it's a movement. This mini-documentary follows Harbinger Customs as they join the 'Distinguished Gentleman’s Ride,' a global event where dapper riders unite on vintage bikes to raise funds and awareness for men's health."
    },
    {
      title: 'HARBINGER CUSTOMS SHOP INTRO',
      youtubeVideoId: 'IHWigm2UgQE',
      tagline: "Where Metal Meets Soul.",
      synopsis: "Step inside the Harbinger Customs workshop in Squamish, BC. This atmospheric introduction captures the meticulous craft, dedicated passion, and raw materials that are forged into unique, custom-built motorcycles."
    },
    {
      title: "Thato - Ster-Kinekor Vision Mission (Commercial)",
      youtubeVideoId: '_smkf5Iv2Z0',
      tagline: "Bringing a child's world into focus.",
      synopsis: "Follow the touching story of Thato, a young boy navigating a blurry, out-of-focus world. This award-winning commercial beautifully illustrates how the simple gift of eyeglasses can bring a child's life into sharp, joyful focus."
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
