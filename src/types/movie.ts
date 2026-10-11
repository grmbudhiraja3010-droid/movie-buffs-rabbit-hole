export type ReviewFilter = 'all' | 'best' | 'mid' | 'worst';
export type ReviewSourceFilter = 'all' | 'Rotten Tomatoes' | 'IMDb' | 'Letterboxd';
export type InterviewFilter = 'all' | 'best' | 'latest';
export type FilmographyFilter = 'all' | 'best' | 'popular';

export interface ReviewItem {
  id: string;
  type: 'critic' | 'audience';
  author: string;
  publication?: string;
  score: number; // out of 5
  starsCategory: 'best' | 'mid' | 'worst';
  source: 'Rotten Tomatoes' | 'IMDb' | 'Letterboxd' | 'Roger Ebert';
  text: string;
  sentiment: 'Rave' | 'Favorable' | 'Mixed' | 'Unforgiving';
  date: string;
}

export interface InterviewItem {
  id: string;
  title: string;
  source: string;
  category: 'latest' | 'best';
  url: string;
  duration: string;
  summary: string;
}

export interface FilmographyWork {
  title: string;
  year: number;
  rating: number; // e.g. 92
  popularScore: number; // 1-100
  rankCategory: 'best' | 'popular' | 'else';
  characterOrRole?: string;
  imdbUrl?: string;
}

export interface CastMember {
  name: string;
  character: string;
  tier: 'lead' | 'supporting' | 'cameo';
  avatarInitials: string;
  photoUrl?: string;
  filmography: FilmographyWork[];
  interviews: InterviewItem[];
}

export interface DirectorsCut {
  directorName: string;
  creativeVision: string;
  visionUrl?: string;
  inspiration: string;
  inspirationUrl?: string;
  pacingAnalysis: string;
  sceneSelectionReasoning: string;
  isRemake: boolean;
  remakeOriginalTitle?: string;
  remakeComparison?: string;
  isBasedOnBook: boolean;
  bookTitle?: string;
  bookAuthor?: string;
  goodreadsUrl?: string;
  bookDivergenceNotes?: string;
  directorFilmography: FilmographyWork[];
  directorInterviews: InterviewItem[];
}

export interface ThematicTopic {
  name: string;
  description: string;
  relevanceReason: string;
  exploreUrl?: string;
  otherLandmarkMovies: {
    title: string;
    year: number;
    director: string;
    connection: string;
    exploreUrl?: string;
  }[];
}

export interface SimilarMovie {
  title: string;
  year: number;
  director: string;
  rating: number;
  pitch: string;
  exploreUrl?: string;
}

export interface OppositeMovie {
  title: string;
  year: number;
  director: string;
  rating: number;
  contrastReason: string;
  exploreUrl?: string;
}

export interface BlooperItem {
  id: string;
  title: string;
  type: 'funny' | 'dramatic';
  description: string;
  timestamp?: string;
  videoUrl?: string;
}

export interface DebateControversy {
  topic: string;
  relevancyScore: number;
  latestDate: string;
  summary: string;
  fanbaseSides: string;
  exploreUrl?: string;
}

export interface RedditDiscussion {
  title: string;
  subreddit: string;
  upvotes: number;
  commentsCount: number;
  url: string;
  tag: 'Hot' | 'Trending' | 'Relevant';
}

export interface SubstackEssay {
  title: string;
  publication: string;
  author: string;
  url: string;
  readTime: string;
  snippet: string;
}

export interface MovieBuffData {
  id: string;
  contentType?: 'movie' | 'general_video';
  title: string;
  year: number;
  tagline: string;
  runtime: string;
  director: string;
  synopsis: string;
  country: string;
  language: string;
  primaryGenre: string;
  subgenres: string[];
  ratings: {
    rottenTomatoesCritics: number;
    rottenTomatoesAudience: number;
    imdbRating: number;
    imdbVotes: string;
    specialized: {
      platform: string;
      score: string;
      badge: string;
    };
  };
  quirkySummary: {
    source: string;
    quote: string;
    upvotes: number;
    takeaway: string;
  };
  reviews: ReviewItem[];
  cast: CastMember[];
  directorsCut?: DirectorsCut;
  topics: ThematicTopic[];
  endingExplained?: {
    summary: string;
    theories: string[];
    theoryUrls?: { theory: string; url: string }[];
    similarMovies: SimilarMovie[];
    oppositeMovies: OppositeMovie[];
  };
  bloopers: BlooperItem[];
  discussions: {
    debates: DebateControversy[];
    redditThreads: RedditDiscussion[];
    substackEssays: SubstackEssay[];
  };
}
