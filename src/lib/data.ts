
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
};

export const films: Film[] = [
  {
    id: 1,
    title: 'Everything Everywhere All at Once',
    tagline: 'The universe is so much bigger than you realize.',
    synopsis: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.',
    posterUrl: 'https://placehold.co/500x750',
    backdropUrl: 'https://placehold.co/1920x1080',
    releaseYear: 2022,
    genres: ['Action', 'Adventure', 'Comedy', 'Sci-Fi'],
    cast: [
      { name: 'Michelle Yeoh', character: 'Evelyn Wang', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Ke Huy Quan', character: 'Waymond Wang', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Stephanie Hsu', character: 'Joy Wang / Jobu Tupaki', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'Rotten Tomatoes', text: 'An expertly calibrated assault on the senses.', rating: 5 },
      { author: 'The Guardian', text: 'A pure firework display of technical flair.', rating: 4.5 },
    ],
    durationMinutes: 139,
  },
  {
    id: 2,
    title: 'Parasite',
    tagline: 'Act like you own the place.',
    synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    posterUrl: 'https://placehold.co/500x751',
    backdropUrl: 'https://placehold.co/1920x1081',
    releaseYear: 2019,
    genres: ['Thriller', 'Comedy', 'Drama'],
    cast: [
      { name: 'Song Kang-ho', character: 'Kim Ki-taek', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Lee Sun-kyun', character: 'Park Dong-ik', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Cho Yeo-jeong', character: 'Choi Yeon-gyo', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'The New York Times', text: 'A spicy, despairing, and breathtakingly vicious masterpiece.', rating: 5 },
    ],
    durationMinutes: 132,
  },
  {
    id: 3,
    title: 'Moonlight',
    tagline: 'This is the story of a lifetime.',
    synopsis: 'A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood in Miami.',
    posterUrl: 'https://placehold.co/500x752',
    backdropUrl: 'https://placehold.co/1920x1082',
    releaseYear: 2016,
    genres: ['Drama'],
    cast: [
      { name: 'Mahershala Ali', character: 'Juan', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Trevante Rhodes', character: 'Chiron (Adult)', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Naomie Harris', character: 'Paula', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'Variety', text: 'A beautiful, deeply personal film.', rating: 5 },
    ],
    durationMinutes: 111,
  },
  {
    id: 4,
    title: 'Get Out',
    tagline: 'Just because you\'re invited, doesn\'t mean you\'re welcome.',
    synopsis: 'A young African-American visits his white girlfriend\'s parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.',
    posterUrl: 'https://placehold.co/500x753',
    backdropUrl: 'https://placehold.co/1920x1083',
    releaseYear: 2017,
    genres: ['Horror', 'Mystery', 'Thriller'],
    cast: [
      { name: 'Daniel Kaluuya', character: 'Chris Washington', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Allison Williams', character: 'Rose Armitage', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Bradley Whitford', character: 'Dean Armitage', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'IndieWire', text: 'A horror masterpiece with a biting social commentary.', rating: 5 },
    ],
    durationMinutes: 104,
  },
  {
    id: 5,
    title: 'Lady Bird',
    tagline: 'Time to fly.',
    synopsis: 'In 2002, an artistically inclined seventeen-year-old girl comes of age in Sacramento, California.',
    posterUrl: 'https://placehold.co/500x754',
    backdropUrl: 'https://placehold.co/1920x1084',
    releaseYear: 2017,
    genres: ['Comedy', 'Drama'],
    cast: [
      { name: 'Saoirse Ronan', character: 'Christine "Lady Bird" McPherson', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Laurie Metcalf', character: 'Marion McPherson', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Timothée Chalamet', character: 'Kyle Scheible', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'RogerEbert.com', text: 'An absolute gem. Funny, heartfelt, and brilliant.', rating: 5 },
    ],
    durationMinutes: 94,
  },
  {
    id: 6,
    title: 'Nomadland',
    tagline: 'See you down the road.',
    synopsis: 'A woman in her sixties who, after losing everything in the Great Recession, embarks on a journey through the American West, living as a van-dwelling modern-day nomad.',
    posterUrl: 'https://placehold.co/500x755',
    backdropUrl: 'https://placehold.co/1920x1085',
    releaseYear: 2020,
    genres: ['Drama'],
    cast: [
      { name: 'Frances McDormand', character: 'Fern', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'David Strathairn', character: 'Dave', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Linda May', character: 'Linda', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'The Hollywood Reporter', text: 'A poetic and poignant exploration of the American dream.', rating: 4.5 },
    ],
    durationMinutes: 107,
  },
  {
    id: 7,
    title: 'The Lobster',
    tagline: 'An unconventional love story.',
    synopsis: 'In a dystopian near future, single people, according to the laws of The City, are taken to The Hotel, where they are obliged to find a romantic partner in forty-five days or are transformed into beasts and sent off into The Woods.',
    posterUrl: 'https://placehold.co/500x756',
    backdropUrl: 'https://placehold.co/1920x1086',
    releaseYear: 2015,
    genres: ['Comedy', 'Drama', 'Romance', 'Sci-Fi'],
    cast: [
      { name: 'Colin Farrell', character: 'David', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Rachel Weisz', character: 'Short Sighted Woman', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Léa Seydoux', character: 'Loner Leader', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'The Guardian', text: 'A darkly funny and surreal satire.', rating: 4 },
    ],
    durationMinutes: 119,
  },
  {
    id: 8,
    title: 'Call Me by Your Name',
    tagline: 'Is it better to speak or to die?',
    synopsis: 'In 1980s Italy, a romance blossoms between a seventeen-year-old student and the older man hired as his father\'s research assistant.',
    posterUrl: 'https://placehold.co/500x757',
    backdropUrl: 'https://placehold.co/1920x1087',
    releaseYear: 2017,
    genres: ['Drama', 'Romance'],
    cast: [
      { name: 'Timothée Chalamet', character: 'Elio Perlman', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Armie Hammer', character: 'Oliver', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Michael Stuhlbarg', character: 'Mr. Perlman', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'Empire', text: 'A sun-drenched, intoxicating romance.', rating: 5 },
    ],
    durationMinutes: 132,
  },
  {
    id: 9,
    title: 'Manchester by the Sea',
    tagline: 'The past is never gone.',
    synopsis: 'A depressed uncle is asked to take care of his teenage nephew after the boy\'s father dies.',
    posterUrl: 'https://placehold.co/500x758',
    backdropUrl: 'https://placehold.co/1920x1088',
    releaseYear: 2016,
    genres: ['Drama'],
    cast: [
      { name: 'Casey Affleck', character: 'Lee Chandler', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Michelle Williams', character: 'Randi Chandler', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Lucas Hedges', character: 'Patrick Chandler', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'A.V. Club', text: 'A heartbreaking and powerfully acted drama.', rating: 5 },
    ],
    durationMinutes: 137,
  },
  {
    id: 10,
    title: 'Little Miss Sunshine',
    tagline: 'A family on the verge of a breakdown.',
    synopsis: 'A family determined to get their young daughter into the finals of a beauty pageant take a cross-country trip in their VW bus.',
    posterUrl: 'https://placehold.co/500x759',
    backdropUrl: 'https://placehold.co/1920x1089',
    releaseYear: 2006,
    genres: ['Adventure', 'Comedy', 'Drama'],
    cast: [
      { name: 'Abigail Breslin', character: 'Olive Hoover', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Greg Kinnear', character: 'Richard Hoover', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Steve Carell', character: 'Frank Ginsberg', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'Rolling Stone', text: 'A dysfunctional family road trip that is hilarious and touching.', rating: 4 },
    ],
    durationMinutes: 101,
  },
  {
    id: 11,
    title: 'Juno',
    tagline: 'A comedy about growing up... and the bumps along the way.',
    synopsis: 'Faced with an unplanned pregnancy, an offbeat teenager makes an unusual decision regarding her unborn child.',
    posterUrl: 'https://placehold.co/500x760',
    backdropUrl: 'https://placehold.co/1920x1090',
    releaseYear: 2007,
    genres: ['Comedy', 'Drama'],
    cast: [
      { name: 'Elliot Page', character: 'Juno MacGuff', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Michael Cera', character: 'Paulie Bleeker', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Jennifer Garner', character: 'Vanessa Loring', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'Entertainment Weekly', text: 'Quirky, clever, and endlessly quotable.', rating: 4.5 },
    ],
    durationMinutes: 96,
  },
  {
    id: 12,
    title: 'Whiplash',
    tagline: 'The road to greatness can take you to the edge.',
    synopsis: 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student\'s potential.',
    posterUrl: 'https://placehold.co/500x761',
    backdropUrl: 'https://placehold.co/1920x1091',
    releaseYear: 2014,
    genres: ['Drama', 'Music'],
    cast: [
      { name: 'Miles Teller', character: 'Andrew Neiman', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'J.K. Simmons', character: 'Terence Fletcher', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Paul Reiser', character: 'Jim Neiman', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'The Telegraph', text: 'An electrifying and intense drama.', rating: 5 },
    ],
    durationMinutes: 107,
  },
  {
    id: 13,
    title: 'Boyhood',
    tagline: '12 years in the making.',
    synopsis: 'Filmed over 12 years with the same cast, Richard Linklater\'s Boyhood is a groundbreaking story of growing up as seen through the eyes of a child named Mason.',
    posterUrl: 'https://placehold.co/500x762',
    backdropUrl: 'https://placehold.co/1920x1092',
    releaseYear: 2014,
    genres: ['Drama'],
    cast: [
      { name: 'Ellar Coltrane', character: 'Mason Evans Jr.', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Patricia Arquette', character: 'Olivia Evans', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Ethan Hawke', character: 'Mason Evans Sr.', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'Slant Magazine', text: 'An epic and intimate masterpiece.', rating: 5 },
    ],
    durationMinutes: 165,
  },
  {
    id: 14,
    title: 'Her',
    tagline: 'A Spike Jonze love story.',
    synopsis: 'In a near future, a lonely writer develops an unlikely relationship with an advanced operating system designed to meet his every need.',
    posterUrl: 'https://placehold.co/500x763',
    backdropUrl: 'https://placehold.co/1920x1093',
    releaseYear: 2013,
    genres: ['Drama', 'Romance', 'Sci-Fi'],
    cast: [
      { name: 'Joaquin Phoenix', character: 'Theodore Twombly', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Amy Adams', character: 'Amy', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Scarlett Johansson', character: 'Samantha (voice)', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'The Verge', text: 'A beautiful and poignant look at love in the modern world.', rating: 4.5 },
    ],
    durationMinutes: 126,
  },
  {
    id: 15,
    title: 'The Grand Budapest Hotel',
    tagline: 'A murder, a masterpiece, a mystery.',
    synopsis: 'The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.',
    posterUrl: 'https://placehold.co/500x764',
    backdropUrl: 'https://placehold.co/1920x1094',
    releaseYear: 2014,
    genres: ['Adventure', 'Comedy', 'Drama'],
    cast: [
      { name: 'Ralph Fiennes', character: 'M. Gustave', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Tony Revolori', character: 'Zero Moustafa', avatarUrl: 'https://placehold.co/100x100' },
      { name: 'Saoirse Ronan', character: 'Agatha', avatarUrl: 'https://placehold.co/100x100' },
    ],
    reviews: [
      { author: 'Time Out', text: 'A whimsical and visually stunning caper.', rating: 5 },
    ],
    durationMinutes: 99,
  },
];
