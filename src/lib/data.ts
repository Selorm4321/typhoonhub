
export type Film = {
  id: number;
  title: string;
  tagline: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  releaseYear?: number;
  genres: string[];
  cast: { name: string; character: string; avatarUrl:string }[];
  reviews: { author: string; text: string; rating: number }[];
  durationMinutes: number;
  youtubeVideoId: string;
};

const yourShowsData: { title: string; youtubeVideoId: string; tagline: string; }[] = [
    { title: 'New Day', youtubeVideoId: 'IHWigm2UgQE', tagline: 'A fresh start, a new perspective.' },
    { title: 'Alice And Huck', youtubeVideoId: 'QW6_dfNfE0c', tagline: 'A timeless adventure reimagined.' },
    { title: 'Typhoon Talk Episode 1 - Break the Stigma', youtubeVideoId: '6gmYHtOfWa4', tagline: 'Open conversations that matter.' },
    { title: 'MAMI', youtubeVideoId: 'MtIRD4VX_bo', tagline: 'A powerful story of motherhood.' },
    { title: 'jwohnjovouchor and the Yiiiii Kakai Voice of Waste Masks', youtubeVideoId: 'v3_ueH-TMdc', tagline: 'Art, identity, and the voices unheard.' },
    { title: 'HARBINGER CUSTOMS AD', youtubeVideoId: 'V2iPIiOn3vU', tagline: 'Craftsmanship in motion.' },
    { title: 'When Jesse was born', youtubeVideoId: 'kMBqikKeXYM', tagline: 'A new life, a new journey.' },
    { title: 'The Art Of Indie | Ep. 1: Exploring Creativity with Nikki Wallin', youtubeVideoId: 'FmyrrtqP3Sc', tagline: 'Diving into the creative mind.' },
    { title: 'The Art Of Indie | Episode #2: Comedy Gold with Devon Ferguson', youtubeVideoId: 'krNFpw5gnDI', tagline: 'Finding the funny in the everyday.' },
];


export const films: Film[] = yourShowsData.map((show, index) => ({
  id: index + 1,
  title: show.title,
  youtubeVideoId: show.youtubeVideoId,
  tagline: show.tagline,
  synopsis: `You can edit the details for this show (like the title, tagline, and synopsis) in the src/lib/data.ts file.`,
  posterUrl: `https://img.youtube.com/vi/${show.youtubeVideoId}/hqdefault.jpg`,
  backdropUrl: `https://img.youtube.com/vi/${show.youtubeVideoId}/maxresdefault.jpg`,
  genres: ['Indie', 'Short'],
  cast: [
    { name: 'Creator Name', character: 'Host/Director', avatarUrl: `https://placehold.co/100x${100 + index}` },
  ],
  reviews: [],
  durationMinutes: 15,
}));
