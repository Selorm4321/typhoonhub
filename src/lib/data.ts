
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
    { title: 'My Awesome Show 1', youtubeVideoId: 'MtIRD4VX_bo' },
    { title: 'My Awesome Show 2', youtubeVideoId: 'v3_ueH-TMdc' },
    { title: 'My Awesome Show 3', youtubeVideoId: 'IHWigm2UgQE' },
    { title: 'My Awesome Show 4', youtubeVideoId: 'YCvqZ2nygGg' },
    { title: 'My Awesome Show 5', youtubeVideoId: 'kMBqikKeXYM' },
    { title: 'My Awesome Show 6', youtubeVideoId: 'QW6_dfNfE0c' },
    { title: 'My Awesome Show 7', youtubeVideoId: '6gmYHtOfWa4' },
    { title: 'My Awesome Show 8', youtubeVideoId: 'FmyrrtqP3Sc' },
    { title: 'My Awesome Show 9', youtubeVideoId: 'krNFpw5gnDI' },
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
