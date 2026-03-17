export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'PC' | 'Console' | 'Mobile' | 'Esports' | 'Hardware';
  author: string;
  date: string;
  imageUrl: string;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Nowa era RPG: Zapowiedź "Shadow Realm"',
    excerpt: 'Twórcy legendarnych serii ogłaszają swój najbardziej ambitny projekt w historii. Czy to będzie gra dekady?',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
    category: 'PC',
    author: 'Jan Kowalski',
    date: '2024-03-02',
    imageUrl: 'https://picsum.photos/seed/rpg/1200/600',
    featured: true,
  },
  {
    id: '2',
    title: 'PlayStation 6: Pierwsze przecieki o specyfikacji',
    excerpt: 'Nieoficjalne źródła sugerują, że nowa konsola Sony może zrewolucjonizować rynek dzięki nowej technologii chłodzenia.',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...',
    category: 'Console',
    author: 'Anna Nowak',
    date: '2024-03-01',
    imageUrl: 'https://picsum.photos/seed/console/800/500',
  },
  {
    id: '3',
    title: 'Finały World Championship 2024 w Katowicach',
    excerpt: 'Największe wydarzenie esportowe roku powraca do Polski. Sprawdź harmonogram i ceny biletów.',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo...',
    category: 'Esports',
    author: 'Marek Zych',
    date: '2024-02-28',
    imageUrl: 'https://picsum.photos/seed/esports/800/500',
  },
  {
    id: '4',
    title: 'RTX 5090 - Czy Twój zasilacz to wytrzyma?',
    excerpt: 'Analizujemy zapotrzebowanie na moc nowych kart graficznych od Nvidii. Wyniki są zaskakujące.',
    content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident...',
    category: 'Hardware',
    author: 'Piotr Wiśniewski',
    date: '2024-02-27',
    imageUrl: 'https://picsum.photos/seed/gpu/800/500',
  },
  {
    id: '5',
    title: 'Mobilne hity 2024: W co warto zagrać?',
    excerpt: 'Zestawienie najlepszych gier na iOS i Androida, które zadebiutowały w tym kwartale.',
    content: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus...',
    category: 'Mobile',
    author: 'Kasia Gry',
    date: '2024-02-26',
    imageUrl: 'https://picsum.photos/seed/mobile/800/500',
  },
  {
    id: '6',
    title: 'Cyberpunk 2077: Nowy patch zmienia wszystko',
    excerpt: 'CD Projekt Red nie przestaje ulepszać swojej flagowej produkcji. Zobacz listę zmian.',
    content: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae...',
    category: 'PC',
    author: 'Jan Kowalski',
    date: '2024-02-25',
    imageUrl: 'https://picsum.photos/seed/cyber/800/500',
  }
];

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  platform: 'Steam' | 'Epic' | 'PSN' | 'Xbox' | 'Nintendo';
  region: 'Global' | 'EU' | 'PL';
  imageUrl: string;
  galleryImages?: string[];
  category: string;
  rating: number;
  reviewsCount: number;
}

export const products: Product[] = [
  {
    id: 'p1',
    title: 'Elden Ring: Shadow of the Erdtree Edition',
    price: 249.99,
    originalPrice: 299.99,
    platform: 'Steam',
    region: 'Global',
    imageUrl: 'https://picsum.photos/seed/elden/400/600',
    galleryImages: [
      'https://picsum.photos/seed/elden1/800/450',
      'https://picsum.photos/seed/elden2/800/450',
      'https://picsum.photos/seed/elden3/800/450',
    ],
    category: 'RPG',
    rating: 4.9,
    reviewsCount: 1250,
  },
  {
    id: 'p2',
    title: 'Cyberpunk 2077: Ultimate Edition',
    price: 129.50,
    originalPrice: 199.00,
    platform: 'Epic',
    region: 'Global',
    imageUrl: 'https://picsum.photos/seed/cyberpunk/400/600',
    galleryImages: [
      'https://picsum.photos/seed/cyber1/800/450',
      'https://picsum.photos/seed/cyber2/800/450',
      'https://picsum.photos/seed/cyber3/800/450',
    ],
    category: 'Action',
    rating: 4.7,
    reviewsCount: 8500,
  },
  {
    id: 'p3',
    title: 'The Witcher 3: Wild Hunt - Complete Edition',
    price: 45.00,
    originalPrice: 149.00,
    platform: 'Steam',
    region: 'Global',
    imageUrl: 'https://picsum.photos/seed/witcher/400/600',
    galleryImages: [
      'https://picsum.photos/seed/witcher1/800/450',
      'https://picsum.photos/seed/witcher2/800/450',
      'https://picsum.photos/seed/witcher3/800/450',
    ],
    category: 'RPG',
    rating: 4.9,
    reviewsCount: 25000,
  },
  {
    id: 'p4',
    title: 'Red Dead Redemption 2',
    price: 89.99,
    originalPrice: 249.00,
    platform: 'Steam',
    region: 'Global',
    imageUrl: 'https://picsum.photos/seed/rdr2/400/600',
    category: 'Open World',
    rating: 4.8,
    reviewsCount: 15000,
  },
  {
    id: 'p5',
    title: 'Hogwarts Legacy',
    price: 159.00,
    originalPrice: 269.00,
    platform: 'Steam',
    region: 'Global',
    imageUrl: 'https://picsum.photos/seed/hogwarts/400/600',
    category: 'Adventure',
    rating: 4.6,
    reviewsCount: 4200,
  },
  {
    id: 'p6',
    title: 'Baldur\'s Gate 3',
    price: 219.00,
    platform: 'Steam',
    region: 'Global',
    imageUrl: 'https://picsum.photos/seed/bg3/400/600',
    category: 'RPG',
    rating: 5.0,
    reviewsCount: 32000,
  }
];

export interface EsportEvent {
  id: string;
  name: string;
  game: string;
  startDate: string;
  endDate: string;
  prizePool: string;
  location: string;
  imageUrl: string;
}

export interface EsportMatch {
  id: string;
  eventId: string;
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  status: 'live' | 'upcoming' | 'finished';
  time: string;
  game: string;
}

export const esportEvents: EsportEvent[] = [
  {
    id: 'e1',
    name: 'IEM Katowice 2024',
    game: 'Counter-Strike 2',
    startDate: '2024-02-01',
    endDate: '2024-02-11',
    prizePool: '$1,000,000',
    location: 'Katowice, Polska',
    imageUrl: 'https://picsum.photos/seed/iem/800/400',
  },
  {
    id: 'e2',
    name: 'LEC Spring 2024',
    game: 'League of Legends',
    startDate: '2024-01-13',
    endDate: '2024-04-14',
    prizePool: '€200,000',
    location: 'Berlin, Niemcy',
    imageUrl: 'https://picsum.photos/seed/lec/800/400',
  },
  {
    id: 'e3',
    name: 'PGL Major Copenhagen',
    game: 'Counter-Strike 2',
    startDate: '2024-03-17',
    endDate: '2024-03-31',
    prizePool: '$1,250,000',
    location: 'Kopenhaga, Dania',
    imageUrl: 'https://picsum.photos/seed/major/800/400',
  }
];

export const esportMatches: EsportMatch[] = [
  {
    id: 'm1',
    eventId: 'e1',
    teamA: 'G2 Esports',
    teamB: 'FaZe Clan',
    scoreA: 2,
    scoreB: 1,
    status: 'finished',
    time: '2024-02-11 18:00',
    game: 'CS2',
  },
  {
    id: 'm2',
    eventId: 'e1',
    teamA: 'Natus Vincere',
    teamB: 'Team Vitality',
    scoreA: 0,
    scoreB: 2,
    status: 'finished',
    time: '2024-02-10 15:00',
    game: 'CS2',
  },
  {
    id: 'm3',
    eventId: 'e2',
    teamA: 'G2 Esports',
    teamB: 'Fnatic',
    scoreA: 1,
    scoreB: 0,
    status: 'live',
    time: '2024-03-02 19:00',
    game: 'LoL',
  },
  {
    id: 'm4',
    eventId: 'e2',
    teamA: 'Team Heretics',
    teamB: 'SK Gaming',
    status: 'upcoming',
    time: '2024-03-02 21:00',
    game: 'LoL',
  },
  {
    id: 'm5',
    eventId: 'e3',
    teamA: 'TBD',
    teamB: 'TBD',
    status: 'upcoming',
    time: '2024-03-17 12:00',
    game: 'CS2',
  }
];

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  views: string;
  date: string;
  channel: string;
  category: string;
}

export interface Stream {
  id: string;
  title: string;
  thumbnailUrl: string;
  viewerCount: string;
  streamer: string;
  game: string;
  platform: 'Twitch' | 'YouTube' | 'Kick';
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  topicsCount: number;
  postsCount: number;
  lastPost?: {
    topicTitle: string;
    author: string;
    date: string;
  };
  subcategories?: ForumCategory[];
}

export interface ForumTopic {
  id: string;
  categoryId: string;
  title: string;
  author: string;
  date: string;
  views: number;
  replies: number;
  isSticky?: boolean;
  isLocked?: boolean;
  lastPost: {
    author: string;
    date: string;
  };
}

export interface UserProfile {
  id: string;
  username: string;
  avatarUrl: string;
  joinDate: string;
  rank: string;
  achievements: {
    id: string;
    name: string;
    icon: string;
    description: string;
  }[];
  stats: {
    comments: number;
    ratings: number;
    forumPosts: number;
  };
  history: {
    type: 'comment' | 'rating' | 'forum_post';
    content: string;
    target: string;
    date: string;
  }[];
}

export const forumCategories: ForumCategory[] = [
  {
    id: 'c1',
    name: 'Gry',
    description: 'Dyskusje o wszystkich grach wideo',
    topicsCount: 1250,
    postsCount: 15400,
    subcategories: [
      { id: 'sc1', name: 'PC', description: 'Wszystko o graniu na komputerach osobistych', topicsCount: 500, postsCount: 6000 },
      { id: 'sc2', name: 'PS5', description: 'Najnowsza generacja od Sony', topicsCount: 300, postsCount: 4000 },
      { id: 'sc3', name: 'PS4', description: 'Klasyka i wciąż żywa platforma Sony', topicsCount: 150, postsCount: 2000 },
      { id: 'sc4', name: 'Xbox', description: 'Ekosystem Microsoftu', topicsCount: 100, postsCount: 1500 },
      { id: 'sc5', name: 'Switch', description: 'Przenośna rewolucja Nintendo', topicsCount: 120, postsCount: 1200 },
      { id: 'sc6', name: 'Mobilne', description: 'Gry na iOS i Androida', topicsCount: 80, postsCount: 700 },
    ]
  },
  {
    id: 'c2',
    name: 'Filmy',
    description: 'Kino, premiery, recenzje',
    topicsCount: 450,
    postsCount: 3200,
    lastPost: {
      topicTitle: 'Dune: Part Two - Wasze opinie',
      author: 'MovieBuff',
      date: '10 min temu'
    }
  },
  {
    id: 'c3',
    name: 'Seriale',
    description: 'Binge-watching i nowości streamingowe',
    topicsCount: 380,
    postsCount: 2800,
    lastPost: {
      topicTitle: 'The Last of Us Season 2 - Przecieki',
      author: 'SeriesFan',
      date: '1 godz temu'
    }
  }
];

export const forumTopics: ForumTopic[] = [
  {
    id: 't1',
    categoryId: 'sc1',
    title: 'Najlepsze mody do Wiedźmina 3 w 2024 roku',
    author: 'GeraltFan',
    date: '2024-03-01 12:00',
    views: 1250,
    replies: 45,
    isSticky: true,
    lastPost: { author: 'CiriLover', date: '5 min temu' }
  },
  {
    id: 't2',
    categoryId: 'sc1',
    title: 'Problem z wydajnością w Cyberpunku po nowym patchu',
    author: 'TechGuru',
    date: '2024-03-02 09:30',
    views: 850,
    replies: 28,
    lastPost: { author: 'GamerPro99', date: '1 godz temu' }
  },
  {
    id: 't3',
    categoryId: 'sc2',
    title: 'Kiedy zapowiedź Ghost of Tsushima 2?',
    author: 'SamuraiX',
    date: '2024-02-28 15:45',
    views: 3200,
    replies: 120,
    isSticky: true,
    lastPost: { author: 'SonyFan', date: '10 min temu' }
  },
  {
    id: 't4',
    categoryId: 'sc2',
    title: 'Czy warto kupić PS5 Pro dla GTA 6?',
    author: 'RockstarFan',
    date: '2024-03-01 20:15',
    views: 5400,
    replies: 230,
    lastPost: { author: 'ConsoleKing', date: '30 min temu' }
  },
  {
    id: 't5',
    categoryId: 'sc5',
    title: 'Switch 2 - Wszystkie przecieki w jednym miejscu',
    author: 'NintendoSpy',
    date: '2024-02-25 10:00',
    views: 12000,
    replies: 450,
    isSticky: true,
    lastPost: { author: 'MarioBros', date: '2 min temu' }
  },
  {
    id: 't6',
    categoryId: 'c2',
    title: 'Dune: Part Two - Dyskusja bez spoilerów',
    author: 'MovieBuff',
    date: '2024-03-01 18:00',
    views: 4500,
    replies: 180,
    lastPost: { author: 'CinemaLover', date: '15 min temu' }
  }
];

export const otherUsers: UserProfile[] = [
  {
    id: 'u2',
    username: 'MovieBuff',
    avatarUrl: 'https://picsum.photos/seed/user2/200/200',
    joinDate: '2022-11-10',
    rank: 'Koneser Kina',
    achievements: [
      { id: 'a4', name: 'Recenzent', icon: '✍️', description: 'Napisano 50 recenzji filmowych' },
      { id: 'a5', name: 'Złoty Bilet', icon: '🎟️', description: 'Uczestnik 10 premier' },
    ],
    stats: { comments: 320, ratings: 120, forumPosts: 450 },
    history: [
      { type: 'forum_post', content: 'Dune: Part Two to arcydzieło wizualne.', target: 'Filmy / Dune: Part Two', date: '2024-03-01 18:05' },
      { type: 'comment', content: 'Czekam na wersję reżyserską!', target: 'Oppenheimer: Wydanie Blu-ray', date: '2024-02-20 12:00' },
    ]
  },
  {
    id: 'u3',
    username: 'NintendoSpy',
    avatarUrl: 'https://picsum.photos/seed/user3/200/200',
    joinDate: '2023-01-05',
    rank: 'Ekspert Nintendo',
    achievements: [
      { id: 'a6', name: 'Hydraulik', icon: '🍄', description: 'Ukończono wszystkie gry z serii Mario' },
    ],
    stats: { comments: 85, ratings: 40, forumPosts: 620 },
    history: [
      { type: 'forum_post', content: 'Nowy ekran OLED w Switch 2 jest niemal pewny.', target: 'Gry / Switch / Switch 2 Przecieki', date: '2024-02-25 10:05' },
    ]
  }
];

export const currentUser: UserProfile = {
  id: 'u1',
  username: 'GamerPro99',
  avatarUrl: 'https://picsum.photos/seed/user1/200/200',
  joinDate: '2023-05-15',
  rank: 'Weteran',
  achievements: [
    { id: 'a1', name: 'Gaduła', icon: '💬', description: 'Napisano ponad 100 komentarzy' },
    { id: 'a2', name: 'Krytyk', icon: '⭐', description: 'Oceniono 50 materiałów' },
    { id: 'a3', name: 'Stały bywalec', icon: '📅', description: 'Konto aktywne od ponad roku' },
  ],
  stats: {
    comments: 142,
    ratings: 56,
    forumPosts: 89
  },
  history: [
    { type: 'comment', content: 'Świetna recenzja, zgadzam się z oceną końcową!', target: 'Cyberpunk 2077: Nowy patch', date: '2024-03-02 14:20' },
    { type: 'forum_post', content: 'Moim zdaniem RTX 5090 będzie wymagał co najmniej 1000W zasilacza.', target: 'Sprzęt / RTX 5090 - Dyskusja', date: '2024-03-01 10:05' },
    { type: 'rating', content: 'Ocena: 9/10', target: 'Elden Ring: Shadow of the Erdtree', date: '2024-02-28 22:15' },
    { type: 'forum_post', content: 'Ktoś chętny na rajd w Destiny 2 dzisiaj wieczorem?', target: 'Gry / PC / Destiny 2', date: '2024-02-27 16:40' },
  ]
};

export const videos: Video[] = [
  {
    id: 'v1',
    title: 'Elden Ring: Shadow of the Erdtree - Oficjalny Zwiastun Rozgrywki',
    thumbnailUrl: 'https://picsum.photos/seed/video1/800/450',
    duration: '3:05',
    views: '1.2M',
    date: '2 dni temu',
    channel: 'Bandai Namco',
    category: 'Zwiastuny',
  },
  {
    id: 'v2',
    title: 'Cyberpunk 2077: Jak zmienił się Night City w 2024?',
    thumbnailUrl: 'https://picsum.photos/seed/video2/800/450',
    duration: '15:20',
    views: '450K',
    date: '1 tydzień temu',
    channel: 'GamerGold TV',
    category: 'Recenzje',
  },
  {
    id: 'v3',
    title: 'TOP 10 Najlepszych Gier RPG wszech czasów',
    thumbnailUrl: 'https://picsum.photos/seed/video3/800/450',
    duration: '22:45',
    views: '890K',
    date: '3 dni temu',
    channel: 'GamerGold TV',
    category: 'Rankingi',
  },
  {
    id: 'v4',
    title: 'RTX 5090 vs RTX 4090 - Czy warto czekać?',
    thumbnailUrl: 'https://picsum.photos/seed/video4/800/450',
    duration: '12:10',
    views: '320K',
    date: '5 dni temu',
    channel: 'Hardware Pro',
    category: 'Sprzęt',
  },
  {
    id: 'v5',
    title: 'Historia serii Grand Theft Auto - Od 1 do 6',
    thumbnailUrl: 'https://picsum.photos/seed/video5/800/450',
    duration: '45:00',
    views: '2.5M',
    date: '2 tygodnie temu',
    channel: 'Gaming History',
    category: 'Dokumenty',
  },
  {
    id: 'v6',
    title: 'Najlepsze momenty z IEM Katowice 2024',
    thumbnailUrl: 'https://picsum.photos/seed/video6/800/450',
    duration: '10:30',
    views: '150K',
    date: '1 dzień temu',
    channel: 'Esport Central',
    category: 'Esport',
  }
];

export const streams: Stream[] = [
  {
    id: 's1',
    title: 'FINAŁY LEC SPRING 2024! G2 vs FNATIC',
    thumbnailUrl: 'https://picsum.photos/seed/stream1/800/450',
    viewerCount: '125K',
    streamer: 'LEC',
    game: 'League of Legends',
    platform: 'Twitch',
  },
  {
    id: 's2',
    title: 'Elden Ring DLC Hype! No Hit Run',
    thumbnailUrl: 'https://picsum.photos/seed/stream2/800/450',
    viewerCount: '45K',
    streamer: 'GamerGod',
    game: 'Elden Ring',
    platform: 'Twitch',
  },
  {
    id: 's3',
    title: 'Ranked Grind to Radiant! Solo Queue',
    thumbnailUrl: 'https://picsum.photos/seed/stream3/800/450',
    viewerCount: '12K',
    streamer: 'AcePlayer',
    game: 'Valorant',
    platform: 'YouTube',
  },
  {
    id: 's4',
    title: 'Chill Minecraft Building Session',
    thumbnailUrl: 'https://picsum.photos/seed/stream4/800/450',
    viewerCount: '8K',
    streamer: 'CraftyGirl',
    game: 'Minecraft',
    platform: 'Twitch',
  }
];
