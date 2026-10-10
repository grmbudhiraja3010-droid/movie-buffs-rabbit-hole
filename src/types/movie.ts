export type ReviewFilter = 'all' | 'best' | 'mid' | 'worst';
export type ReviewSourceFilter = 'all' | 'Rotten Tomatoes' | 'IMDb' | 'Letterboxd';
export type InterviewFilter = 'all' | 'latest' | 'best' | 'controversial' | 'fun';
export type FilmographyFilter = 'all' | 'best' | 'popular' | 'else';

export interface FrameAnalysis {
  id: string;
  timestamp: string;
  sceneTitle: string;
  says: string; // The literal dialogue / visible action
  means: string; // The subtext, visual metaphor, psychological subversion
  symbolismDetails: string;
  paletteColors: string[];
}

export interface ReviewItem {
  id: string;
  type: 'critic' | 'audience';
  author: string;
  publication?: string;
  score: number; // out of 5
  starsCategory: 'best' | 'mid' | 'worst'; // best: 5/5 or 4.5/5, mid: 3/5, worst: <3
  source: 'Rotten Tomatoes' | 'IMDb' | 'Letterboxd' | 'Roger Ebert';
  text: string;
  sentiment: 'Rave' | 'Favorable' | 'Mixed' | 'Unforgiving';
  date: string;
}

export interface InterviewItem {
  id: string;
  title: string;
  source: string;
  category: 'latest' | 'best' | 'controversial' | 'fun';
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
}

export interface CastMember {
  name: string;
  character: string;
  tier: 'lead' | 'supporting' | 'cameo';
  avatarInitials: string;
  filmography: FilmographyWork[];
  interviews: InterviewItem[];
}

export interface DirectorsCut {
  directorName: string;
  creativeVision: string;
  inspiration: string;
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
  otherLandmarkMovies: {
    title: string;
    year: number;
    director: string;
    connection: string;
  }[];
}

export interface SimilarMovie {
  title: string;
  year: number;
  director: string;
  rating: number;
  pitch: string;
}

export interface OppositeMovie {
  title: string;
  year: number;
  director: string;
  rating: number;
  contrastReason: string;
}

export interface BlooperItem {
  id: string;
  title: string;
  type: 'funny' | 'dramatic';
  description: string;
  timestamp?: string;
}

export interface DiscussionQuote {
  quote: string;
  speaker: string;
  sceneContext: string;
  culturalUse: string;
}

export interface DebateControversy {
  topic: string;
  relevancyScore: number; // 0-100
  latestDate: string;
  summary: string;
  fanbaseSides: string;
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

export interface SoundtrackTrack {
  id: string;
  title: string;
  composer: string;
  mood: string;
  audioPreset: 'noir_drone' | 'scifi_synth' | 'tension_strings' | 'lofi_tape' | 'orchestral_glow';
}

export interface MovieBuffData {
  id: string;
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
  frames: FrameAnalysis[];
  reviews: ReviewItem[];
  cast: CastMember[];
  directorsCut: DirectorsCut;
  topics: ThematicTopic[];
  genreCatalogue: {
    genre: string;
    country: string;
    language: string;
    topRatedTitles: { title: string; year: number; rtScore: number; imdbScore: number }[];
  }[];
  endingExplained: {
    summary: string;
    theories: string[];
    similarMovies: SimilarMovie[];
    oppositeMovies: OppositeMovie[];
  };
  bloopers: BlooperItem[];
  discussions: {
    quotes: DiscussionQuote[];
    debates: DebateControversy[];
    redditThreads: RedditDiscussion[];
    substackEssays: SubstackEssay[];
  };
  soundtrack: SoundtrackTrack[];
}
