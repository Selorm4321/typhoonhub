
export type Film = {
  id: number;
  title: string;
  tagline: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  releaseYear: number;
  genres: string[];
  cast: { name: string; character: string; avatarUrl:string }[];
  reviews: { author: string; text: string; rating: number }[];
  durationMinutes: number;
  youtubeVideoId: string;
};

const yourShowsData: { title: string; youtubeVideoId: string }[] = [
    { title: 'New Day', youtubeVideoId: 'IHWigm2UgQE' },
    { title: 'Alice And Huck', youtubeVideoId: 'QW6_dfNfE0c' },
    { title: 'Typhoon Talk Episode 1 - Break the Stigma', youtubeVideoId: '6gmYHtOfWa4' },
    { title: 'MAMI', youtubeVideoId: 'MtIRD4VX_bo' },
    { title: 'jwohnjovouchor and the Yiiiii Kakai Voice of Waste Masks', youtubeVideoId: 'v3_ueH-TMdc' },
    { title: 'HARBINGER CUSTOMS AD', youtubeVideoId: 'V2iPIiOn3vU' },
    { title: 'When Jesse was born', youtubeVideoId: 'kMBqikKeXYM' },
    { title: 'The Art Of Indie | Ep. 1: Exploring Creativity with Nikki Wallin', youtubeVideoId: 'FmyrrtqP3Sc' },
    { title: 'The Art Of Indie | Episode #2: Comedy Gold with Devon Ferguson', youtubeVideoId: 'krNFpw5gnDI' },
];


export const films: Film[] = yourShowsData.map((show, index) => ({
  id: index + 1,
  title: show.title,
  youtubeVideoId: show.youtubeVideoId,
  tagline: `A great tagline for ${show.title}.`,
  synopsis: `You can edit the details for this show (like the title, tagline, and synopsis) in the src/lib/data.ts file.`,
  posterUrl: `https://img.youtube.com/vi/${show.youtubeVideoId}/hqdefault.jpg`,
  backdropUrl: `https://img.youtube.com/vi/${show.youtubeVideoId}/maxresdefault.jpg`,
  releaseYear: 2024,
  genres: ['Indie', 'Short'],
  cast: [
    { name: 'Creator Name', character: 'Host/Director', avatarUrl: `https://placehold.co/100x${100 + index}` },
  ],
  reviews: [],
  durationMinutes: 15,
}));
