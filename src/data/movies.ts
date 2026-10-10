import type { MovieBuffData, SoundtrackTrack } from '../types/movie';

export const ALL_SEMANTIC_SONGS: Record<string, SoundtrackTrack> = {
  // Inception cluster
  st_time: {
    id: 'st_time',
    title: 'Time',
    composer: 'Hans Zimmer',
    mood: 'Ascending Orchestral Crescendo & Grief',
    melodyStyle: 'time_crescendo',
    similarityTags: ['zimmer', 'crescendo', 'brass', 'time', 'melancholic'],
    similarSongIds: ['st_dream_collapsing', 'st_cornfield_chase'],
  },
  st_piaf: {
    id: 'st_piaf',
    title: 'Non, Je Ne Regrette Rien',
    composer: 'Édith Piaf',
    mood: 'French Dream Kick & Subconscious Anchor',
    melodyStyle: 'piaf_waltz',
    similarityTags: ['paris', 'waltz', 'french', 'nostalgia', 'kick'],
    similarSongIds: ['st_la_vie_en_rose', 'st_paris_noir'],
  },
  st_dream_collapsing: {
    id: 'st_dream_collapsing',
    title: 'Dream Is Collapsing',
    composer: 'Hans Zimmer',
    mood: 'Sub-Bass Brass Drop & Temporal Collapse',
    melodyStyle: 'time_crescendo',
    similarityTags: ['zimmer', 'tension', 'brass', 'gravity'],
    similarSongIds: ['st_time', 'st_cornfield_chase'],
  },
  st_cornfield_chase: {
    id: 'st_cornfield_chase',
    title: 'Cornfield Chase',
    composer: 'Hans Zimmer',
    mood: 'Interstellar Church Organ Cascade',
    melodyStyle: 'interstellar_organ',
    similarityTags: ['zimmer', 'organ', 'tempo', 'wonder'],
    similarSongIds: ['st_time', 'ost_opp1'],
  },
  st_la_vie_en_rose: {
    id: 'st_la_vie_en_rose',
    title: 'La Vie En Rose',
    composer: 'Édith Piaf',
    mood: 'Romantic Velvet Melancholy',
    melodyStyle: 'piaf_waltz',
    similarityTags: ['french', 'piaf', 'romance', 'vocal'],
    similarSongIds: ['st_piaf', 'st_paris_noir'],
  },
  st_paris_noir: {
    id: 'st_paris_noir',
    title: 'Si Tu Vois Ma Mère',
    composer: 'Sidney Bechet',
    mood: 'Midnight Paris Nocturnal Jazz',
    melodyStyle: 'cinema_noir_jazz',
    similarityTags: ['paris', 'jazz', 'clarinet', 'vintage'],
    similarSongIds: ['st_piaf', 'pst_soju'],
  },

  // Parasite cluster
  pst_soju: {
    id: 'pst_soju',
    title: 'Soju One Glass',
    composer: 'Choi Woo-shik & Jung Jae-il',
    mood: 'Bittersweet Seoul Melancholy Piano',
    melodyStyle: 'soju_piano',
    similarityTags: ['piano', 'korean', 'minimal', 'melancholic'],
    similarSongIds: ['pst_belt', 'pst_zuri'],
  },
  pst_belt: {
    id: 'pst_belt',
    title: 'The Belt of Faith',
    composer: 'Jung Jae-il',
    mood: 'Clockwork Baroque Con-Artist Allegro',
    melodyStyle: 'belt_baroque',
    similarityTags: ['baroque', 'strings', 'pizzicato', 'satire'],
    similarSongIds: ['pst_zadok', 'pst_soju'],
  },
  pst_zadok: {
    id: 'pst_zadok',
    title: 'Zadok the Priest',
    composer: 'Baroque Ensemble',
    mood: 'Satirical High-Society Grandeur',
    melodyStyle: 'belt_baroque',
    similarityTags: ['baroque', 'strings', 'classical', 'choir'],
    similarSongIds: ['pst_belt', 'pst_soju'],
  },
  pst_zuri: {
    id: 'pst_zuri',
    title: 'Water Is Down (Rain Theme)',
    composer: 'Jung Jae-il',
    mood: 'Downward Flood Gravity Piano',
    melodyStyle: 'soju_piano',
    similarityTags: ['piano', 'rain', 'minimal', 'submerged'],
    similarSongIds: ['pst_soju', 'st_time'],
  },

  // Oppenheimer cluster
  ost_opp1: {
    id: 'ost_opp1',
    title: 'Can You Hear the Music',
    composer: 'Ludwig Göransson',
    mood: '24-Violin Shimmering Quantum Cascade',
    melodyStyle: 'oppenheimer_strings',
    similarityTags: ['violin', 'quantum', 'tempo', 'wonder'],
    similarSongIds: ['ost_opp2', 'st_cornfield_chase'],
  },
  ost_opp2: {
    id: 'ost_opp2',
    title: 'Trinity',
    composer: 'Ludwig Göransson',
    mood: 'Sub-Bass Suspense Countdown',
    melodyStyle: 'trinity_tension',
    similarityTags: ['tension', 'countdown', 'subbass', 'nuclear'],
    similarSongIds: ['ost_opp3', 'ost_opp1'],
  },
  ost_opp3: {
    id: 'ost_opp3',
    title: 'Destroyer of Worlds',
    composer: 'Ludwig Göransson',
    mood: 'Promethean Somber Brass & Heavy Fate',
    melodyStyle: 'time_crescendo',
    similarityTags: ['brass', 'somber', 'fate', 'tragedy'],
    similarSongIds: ['ost_opp1', 'st_time'],
  },

  // General Video & Ambient cluster
  gen_lofi: {
    id: 'gen_lofi',
    title: 'Late Night Coffee & Code',
    composer: 'Lo-Fi Chill Collective',
    mood: 'Warm Vinyl Hiss & Rhodes Piano',
    melodyStyle: 'lofi_acoustic',
    similarityTags: ['study', 'lofi', 'chill', 'focus'],
    similarSongIds: ['gen_synth', 'pst_soju'],
  },
  gen_synth: {
    id: 'gen_synth',
    title: 'Neon Horizon Resonance',
    composer: 'Analog Synthesizer Ensemble',
    mood: 'Deep Shimmering Retro Synthwave',
    melodyStyle: 'cyberpunk_synth',
    similarityTags: ['synth', 'retro', 'electronic', 'focus'],
    similarSongIds: ['gen_lofi', 'st_time'],
  },
};

export const CURATED_MOVIES: Record<string, MovieBuffData> = {
  inception: {
    id: 'inception',
    contentType: 'movie',
    title: 'Inception',
    year: 2010,
    tagline: 'Your mind is the scene of the crime.',
    runtime: '2h 28m',
    director: 'Christopher Nolan',
    synopsis: 'A thief who steals corporate secrets through dream-sharing technology is tasked with planting an idea into a CEO’s mind, but his tragic past threatens his team.',
    country: 'United States',
    language: 'English',
    primaryGenre: 'Sci-Fi',
    subgenres: ['Heist', 'Psychological Thriller', 'Action Neo-Noir'],
    ratings: {
      rottenTomatoesCritics: 87,
      rottenTomatoesAudience: 91,
      imdbRating: 8.8,
      imdbVotes: '2.6M',
      specialized: {
        platform: 'Sight & Sound',
        score: 'Top 100 21st Century',
        badge: 'Cinephile Canon',
      },
    },
    quirkySummary: {
      source: 'r/movies (42.8k upvotes)',
      quote: 'If anxiety had an IMAX brass section and Nolan made a $160M blockbuster to process his fear of losing track of time while editing.',
      upvotes: 42800,
      takeaway: 'Consensus: A rare heist movie where the safe is childhood trauma and the heist vault is Hans Zimmer pressing one piano key 900 times.',
    },
    frames: [
      {
        id: 'f1',
        timestamp: '00:24:15',
        sceneTitle: 'Paris Folding City Street',
        says: 'Ariadne bends Parisian gravity at a 90-degree angle while Cobb sips espresso and explains subconscious physics.',
        means: 'Visual metaphor for Cobb’s psychological suppression: treating human reality as architecture he can fold away to avoid facing Mal’s ghost.',
        symbolismDetails: 'The mirror reflection before the fold collapses the barrier between waking grief and recursive dreaming.',
        paletteColors: ['#1e293b', '#64748b', '#d97706', '#f8fafc'],
      },
      {
        id: 'f2',
        timestamp: '01:42:08',
        sceneTitle: 'Zero-Gravity Hallway Combat',
        says: 'Arthur ties sleeping teammates together with elevator cables while wrestling a projection in rotating hallway gravity.',
        means: 'The fragility of tethering: Arthur represents the pragmatic conscious mind working overtime to keep fragile subconscious sleepers from drifting into limbo.',
        symbolismDetails: 'Practical spinning centrifugal set design reinforces tactile physical jeopardy over digital artifice.',
        paletteColors: ['#0f172a', '#b45309', '#e2e8f0', '#7c2d12'],
      },
      {
        id: 'f3',
        timestamp: '02:24:40',
        sceneTitle: 'The Spinning Pewter Totem',
        says: 'Cobb walks into the sunlit garden to hug his children; the camera pushes tight onto the spinning silver top which wobbles.',
        means: 'The central existential thesis: It does not matter if the top falls or spins forever. Cobb walked away—he chose living love over epistemic obsession.',
        symbolismDetails: 'Cut to black before resolving the wobble denies the audience definitive closure, forcing personal viewer resolution.',
        paletteColors: ['#451a03', '#d97706', '#fef3c7', '#1c1917'],
      },
    ],
    reviews: [
      {
        id: 'r1',
        type: 'critic',
        author: 'Roger Ebert',
        publication: 'Chicago Sun-Times',
        score: 4,
        starsCategory: 'best',
        source: 'Roger Ebert',
        text: 'The movie is wholly original, cut from new cloth, and yet grounded in action movie basics so it feels like a real movie and not a conceptual stunt.',
        sentiment: 'Rave',
        date: 'July 2010',
      },
      {
        id: 'r2',
        type: 'critic',
        author: 'David Denby',
        publication: 'The New Yorker',
        score: 3,
        starsCategory: 'mid',
        source: 'Rotten Tomatoes',
        text: 'A stunningly complex visual maze that occasionally mistakes expositional blueprints for emotional soul.',
        sentiment: 'Mixed',
        date: 'July 2010',
      },
      {
        id: 'r3',
        type: 'audience',
        author: 'CinephileMark',
        publication: 'IMDb User Review',
        score: 5,
        starsCategory: 'best',
        source: 'IMDb',
        text: 'Masterclass in cross-cutting four simultaneous timelines with varying temporal speeds without losing narrative tension.',
        sentiment: 'Rave',
        date: 'Aug 2010',
      },
      {
        id: 'r4',
        type: 'critic',
        author: 'Armond White',
        publication: 'New York Press',
        score: 2,
        starsCategory: 'worst',
        source: 'Rotten Tomatoes',
        text: 'Over-intellectualized videogame plotting with loud brass blares masking thin character arcs.',
        sentiment: 'Unforgiving',
        date: 'July 2010',
      },
    ],
    cast: [
      {
        name: 'Leonardo DiCaprio',
        character: 'Dom Cobb (The Extractor)',
        tier: 'lead',
        avatarInitials: 'LD',
        filmography: [
          { title: 'The Departed', year: 2006, rating: 91, popularScore: 98, rankCategory: 'best', characterOrRole: 'Billy Costigan' },
          { title: 'Titanic', year: 1997, rating: 88, popularScore: 99, rankCategory: 'popular', characterOrRole: 'Jack Dawson' },
          { title: 'The Wolf of Wall Street', year: 2013, rating: 80, popularScore: 95, rankCategory: 'popular', characterOrRole: 'Jordan Belfort' },
        ],
        interviews: [
          {
            id: 'i1',
            title: 'Deconstructing the Cobb Guilt Complex',
            source: 'BAFTA Life in Pictures',
            category: 'best',
            url: 'https://www.youtube.com/results?search_query=Leonardo+DiCaprio+Inception+BAFTA+interview',
            duration: '14m 20s',
            summary: 'DiCaprio explains why he and Nolan spent two months rewriting the script to ground Cobb’s personal grief before filming.',
          },
          {
            id: 'i2',
            title: 'On the Rotating Hallway and Vertigo',
            source: 'Empire Magazine Podcast',
            category: 'fun',
            url: 'https://www.youtube.com/results?search_query=Inception+rotating+hallway+behind+the+scenes',
            duration: '08m 45s',
            summary: 'Recounting cast vertigo while delivering serious heist dialogue inside a giant hydraulic rig.',
          },
        ],
      },
      {
        name: 'Elliot Page',
        character: 'Ariadne (The Architect)',
        tier: 'lead',
        avatarInitials: 'EP',
        filmography: [
          { title: 'Juno', year: 2007, rating: 94, popularScore: 90, rankCategory: 'best', characterOrRole: 'Juno MacGuff' },
          { title: 'The Umbrella Academy', year: 2019, rating: 86, popularScore: 94, rankCategory: 'popular', characterOrRole: 'Viktor Hargreeves' },
        ],
        interviews: [
          {
            id: 'i4',
            title: 'Designing Paradoxes with Pen and Paper',
            source: 'Wired Feature',
            category: 'latest',
            url: 'https://www.youtube.com/results?search_query=Elliot+Page+Inception+Ariadne+interview',
            duration: '09m 12s',
            summary: 'How Ariadne acts as the surrogate audience member asking the exact questions we would.',
          },
        ],
      },
    ],
    directorsCut: {
      directorName: 'Christopher Nolan',
      creativeVision: 'A cinematic thesis that filmmaking itself is inception: the director is the architect, the actors are the subjects, and cinema plants emotional ideas into the audience’s subconscious.',
      inspiration: 'Jorge Luis Borges’ short story "The Circular Ruins", Satoshi Kon’s anime "Paprika", and Nolan’s university lucid dream journals.',
      pacingAnalysis: 'The third act cross-cuts 4 nested tiers with dilated time factors (1:20:400:8000). Metric cutting tempo accelerates as physical velocity slows down.',
      sceneSelectionReasoning: 'Nolan excised a 6-minute subplot detailing Cobol Engineering’s board members to preserve dreamlike velocity.',
      isRemake: false,
      isBasedOnBook: false,
      goodreadsUrl: 'https://www.goodreads.com/search?q=Inception+The+Shooting+Script+Christopher+Nolan',
      directorFilmography: [
        { title: 'Oppenheimer', year: 2023, rating: 93, popularScore: 99, rankCategory: 'best' },
        { title: 'The Dark Knight', year: 2008, rating: 94, popularScore: 100, rankCategory: 'best' },
        { title: 'Interstellar', year: 2014, rating: 73, popularScore: 98, rankCategory: 'popular' },
      ],
      directorInterviews: [
        {
          id: 'di1',
          title: 'The Architecture of Lucid Dreams',
          source: 'Directors Guild of America Q&A',
          category: 'best',
          url: 'https://www.youtube.com/results?search_query=Christopher+Nolan+Inception+DGA+interview',
          duration: '32m 15s',
          summary: 'Nolan on why practical effects create subconscious authenticity that CGI fails to imprint on human memory.',
        },
      ],
    },
    topics: [
      {
        name: 'Grief & Unreliable Memory',
        description: 'How guilt distorts our recollection of lost loved ones into menacing phantoms.',
        relevanceReason: 'Cobb cannot control Mal because his projection is powered by unresolved self-loathing.',
        otherLandmarkMovies: [
          { title: 'Solaris', year: 1972, director: 'Andrei Tarkovsky', connection: 'Ocean planet generates physical manifestations of a deceased wife from pure memory.' },
          { title: 'Eternal Sunshine of the Spotless Mind', year: 2004, director: 'Michel Gondry', connection: 'Desperate race through collapsing subconscious memories to protect intimate love.' },
        ],
      },
      {
        name: 'Existential Solipsism & Limbo',
        description: 'The terrifying danger of losing one’s anchor to consensus objective reality.',
        relevanceReason: 'Spending fifty years constructing sandcastles in infinite unformed subconscious space.',
        otherLandmarkMovies: [
          { title: 'Synecdoche, New York', year: 2008, director: 'Charlie Kaufman', connection: 'Director builds life-size warehouse city that swallows decades of life.' },
        ],
      },
    ],
    genreCatalogue: [
      {
        genre: 'Sci-Fi Mind-Benders',
        country: 'United States & UK',
        language: 'English',
        topRatedTitles: [
          { title: '2001: A Space Odyssey', year: 1968, rtScore: 92, imdbScore: 8.3 },
          { title: 'Blade Runner 2049', year: 2017, rtScore: 88, imdbScore: 8.0 },
          { title: 'Arrival', year: 2016, rtScore: 94, imdbScore: 7.9 },
        ],
      },
    ],
    endingExplained: {
      summary: 'The spinning totem wobbles, but Nolan cuts to black before it settles or spins infinitely. The crucial cinephile clue is Cobb’s children and his wedding ring.',
      theories: [
        'Theory A (The Wedding Ring): In real world scenes, Cobb never wears his ring; in dream scenes, he always wears it. In the final scene, he is ringless, confirming reality.',
        'Theory B (The Emotional Escape): Cobb turns his back to the top. Whether dream or reality, he has healed and accepted this world as his chosen truth.',
      ],
      similarMovies: [
        { title: 'Paprika', year: 2006, director: 'Satoshi Kon', rating: 85, pitch: 'Brilliant Japanese anime where therapists use a device to enter patient dreams, leading to reality breakdown.' },
        { title: 'Shutter Island', year: 2010, director: 'Martin Scorsese', rating: 69, pitch: 'Leonardo DiCaprio in an atmospheric mind-maze about trauma, denial, and fabricated realities.' },
      ],
      oppositeMovies: [
        { title: 'My Neighbor Totoro', year: 1988, director: 'Hayao Miyazaki', rating: 93, contrastReason: 'Zero existential dread, no time dilated panic; pure pastoral warmth, gentle wonder, and serene childhood comfort.' },
        { title: 'Before Sunrise', year: 1995, director: 'Richard Linklater', rating: 100, contrastReason: 'No sci-fi puzzles or spinning tops—just two young people walking through Vienna in real chronological time.' },
      ],
    },
    bloopers: [
      {
        id: 'b1',
        title: 'The Explosive Coffee Cup Launch',
        type: 'funny',
        description: 'During the high-pressure nitrogen Paris explosion scene, an errant prop baguette shot straight into the sound boom mic, causing DiCaprio to laugh.',
        timestamp: '00:25:30',
      },
    ],
    discussions: {
      quotes: [
        {
          quote: "An idea is like a virus. Resilient. Highly contagious. And even the smallest seed of an idea can grow to define or destroy you.",
          speaker: 'Dom Cobb',
          sceneContext: 'Opening interrogation with Saito in the collapsing palace.',
          culturalUse: 'Cited in tech essays, meme templates, and viral marketing discussions.',
        },
      ],
      debates: [
        {
          topic: 'Did the spinning top fall, and does the totem even matter?',
          relevancyScore: 99,
          latestDate: '2026',
          summary: 'Continuous 15-year fan dispute over whether Cobb was trapped in limbo or returned to California.',
          fanbaseSides: 'Pewter Purists believe the wobble signifies physics; Narrative Humanists argue watching Cobb walk away is the entire thematic answer.',
        },
      ],
      redditThreads: [
        {
          title: '14 years later, Michael Caine just confirmed what happened at the end of Inception again',
          subreddit: 'r/movies',
          upvotes: 38200,
          commentsCount: 2410,
          url: 'https://www.reddit.com/r/movies/search/?q=Inception+Michael+Caine+ending&restrict_sr=1',
          tag: 'Hot',
        },
        {
          title: 'The sound design in Inception: how low-frequency acoustic brass triggers physiological panic',
          subreddit: 'r/TrueFilm',
          upvotes: 14500,
          commentsCount: 512,
          url: 'https://www.reddit.com/r/TrueFilm/search/?q=Inception+sound+design+brass&restrict_sr=1',
          tag: 'Trending',
        },
      ],
      substackEssays: [
        {
          title: 'The Architecture of Grief: How Nolan Disguised an Elegy as an Action Blockbuster',
          publication: 'Cinematic Subconscious',
          author: 'Elena Rostova',
          url: 'https://substack.com/search/Inception%20Nolan%20architecture%20film%20analysis',
          readTime: '9 min read',
          snippet: 'Every level of the dream is not an obstacle of physical geography, but a defense mechanism built by Cobb to delay saying goodbye to Mal.',
        },
      ],
    },
    soundtrack: [
      ALL_SEMANTIC_SONGS.st_time,
      ALL_SEMANTIC_SONGS.st_piaf,
    ],
  },

  parasite: {
    id: 'parasite',
    contentType: 'movie',
    title: 'Parasite (Gisaengchung)',
    year: 2019,
    tagline: 'Act like you own the place.',
    runtime: '2h 12m',
    director: 'Bong Joon-ho',
    synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan in modern Seoul.',
    country: 'South Korea',
    language: 'Korean',
    primaryGenre: 'Black Comedy Thriller',
    subgenres: ['Class Satire', 'Psychological Drama', 'Suspense'],
    ratings: {
      rottenTomatoesCritics: 99,
      rottenTomatoesAudience: 95,
      imdbRating: 8.5,
      imdbVotes: '950K',
      specialized: {
        platform: 'Cahiers du Cinéma',
        score: 'Top Film of 2019',
        badge: 'Palme d’Or Winner',
      },
    },
    quirkySummary: {
      source: 'r/movies (51.2k upvotes)',
      quote: 'A movie where stairs have more character development than entire Marvel franchises, and a single bowl of Ram-don makes your stomach drop through the floorboards.',
      upvotes: 51200,
      takeaway: 'Consensus: Bong Joon-ho tricked millions into watching a brutal Marxist critique by disguising it as the most entertaining heist comedy of the century.',
    },
    frames: [
      {
        id: 'pf1',
        timestamp: '00:18:20',
        sceneTitle: 'The Semi-Basement Window View',
        says: 'Ki-woo and Ki-jung look out their street-level grated window at a drunk man urinating near their garbage bins.',
        means: 'Spatial hierarchy: Their entire view of society is from the literal ground level looking up at shoes and waste, defining their subterranean social tier.',
        symbolismDetails: 'The dirty glass and Wi-Fi scavenging physically manifests the modern digital poverty trap.',
        paletteColors: ['#334155', '#475569', '#1e293b', '#a16207'],
      },
    ],
    reviews: [
      {
        id: 'pr1',
        type: 'critic',
        author: 'A.O. Scott',
        publication: 'The New York Times',
        score: 5,
        starsCategory: 'best',
        source: 'Rotten Tomatoes',
        text: 'A brilliant, unclassifiable film that is funny until it is horrifying and then heartbreaking.',
        sentiment: 'Rave',
        date: 'Oct 2019',
      },
    ],
    cast: [
      {
        name: 'Song Kang-ho',
        character: 'Kim Ki-taek (The Father)',
        tier: 'lead',
        avatarInitials: 'SK',
        filmography: [
          { title: 'Memories of Murder', year: 2003, rating: 95, popularScore: 92, rankCategory: 'best', characterOrRole: 'Detective Park' },
          { title: 'The Host', year: 2006, rating: 93, popularScore: 89, rankCategory: 'best', characterOrRole: 'Park Gang-du' },
        ],
        interviews: [
          {
            id: 'pi1',
            title: 'On Expressing Silent Humiliation Through The Eyes',
            source: 'Cannes Press Conference',
            category: 'best',
            url: 'https://www.youtube.com/results?search_query=Song+Kang-ho+Parasite+Cannes+interview',
            duration: '18m 40s',
            summary: 'Song Kang-ho explains the psychological build-up to the party climax: it was not premeditated hatred, but sudden reflexive dignity.',
          },
        ],
      },
    ],
    directorsCut: {
      directorName: 'Bong Joon-ho',
      creativeVision: 'A modern moral tragedy showing that capitalism converts everyone into parasites: the poor leech on the wealthy for survival, while the wealthy leech on the poor for labor and domestic dignity.',
      inspiration: 'Bong’s college years as a tutor for a wealthy Seoul family, and Kim Ki-young’s 1960 Korean classic "The Housemaid".',
      pacingAnalysis: 'Symmetrical structure: Act 1 is a sunny, upbeat con comedy with jaunty string quartet; Act 2 shifts to gothic domestic horror in the rain; Act 3 erupts in daylight tragedy.',
      sceneSelectionReasoning: 'Bong insisted on shooting the Park home on an outdoor soundstage built specifically to maximize natural sunlight angles matching the time of day.',
      isRemake: false,
      isBasedOnBook: false,
      goodreadsUrl: 'https://www.goodreads.com/search?q=Parasite+A+Screenplay+Bong+Joon+ho',
      directorFilmography: [
        { title: 'Memories of Murder', year: 2003, rating: 95, popularScore: 94, rankCategory: 'best' },
        { title: 'Mother', year: 2009, rating: 96, popularScore: 88, rankCategory: 'best' },
      ],
      directorInterviews: [
        {
          id: 'bji1',
          title: 'The One-Inch Barrier of Subtitles',
          source: 'Golden Globes Acceptance Speech',
          category: 'best',
          url: 'https://www.youtube.com/results?search_query=Bong+Joon+ho+Golden+Globes+subtitles+speech',
          duration: '04m 10s',
          summary: '"Once you overcome the one-inch tall barrier of subtitles, you will be introduced to so many more incredible films."',
        },
      ],
    },
    topics: [
      {
        name: 'Class Division & Economic Geography',
        description: 'How urban architecture enforces socioeconomic separation by elevation and vertical layering.',
        relevanceReason: 'The wealthy dwell on sunny plateaus; the poor live submerged in floodplains.',
        otherLandmarkMovies: [
          { title: 'Roma', year: 2018, director: 'Alfonso Cuarón', connection: 'The hidden domestic workers quietly holding together upper-class Mexican homes.' },
        ],
      },
    ],
    genreCatalogue: [
      {
        genre: 'Korean Black Comedy & Thriller',
        country: 'South Korea',
        language: 'Korean',
        topRatedTitles: [
          { title: 'The Handmaiden', year: 2016, rtScore: 96, imdbScore: 8.1 },
          { title: 'Oldboy', year: 2003, rtScore: 82, imdbScore: 8.4 },
        ],
      },
    ],
    endingExplained: {
      summary: 'Ki-woo writes a letter to his father vowing to earn enough money to simply purchase the mansion and free him from the bunker. The final shot cuts back down to the freezing semi-basement—revealing his plan is an impossible fantasy.',
      theories: [
        'Theory A (The False Promise of Wealth): It would take an average Seoul salary 564 years to buy that house. Ki-woo’s plan highlights the tragic despair of hustle culture.',
      ],
      similarMovies: [
        { title: 'The Handmaiden', year: 2016, director: 'Park Chan-wook', rating: 96, pitch: 'Gorgeous, twisted Korean con-artist thriller set in 1930s Japanese-occupied Korea full of deception.' },
      ],
      oppositeMovies: [
        { title: 'Paddington 2', year: 2017, director: 'Paul King', rating: 99, contrastReason: 'A joyful celebration of neighborly kindness, marmalade, and universal human benevolence with zero cynicism.' },
      ],
    },
    bloopers: [
      {
        id: 'pb1',
        title: 'The Slippery Peach Fuzz Gag',
        type: 'funny',
        description: 'Park So-dam kept laughing while scraping the peach fuzz into the tissue because Choi Woo-shik was making silent sneezing faces behind the director’s monitor.',
        timestamp: '00:46:15',
      },
    ],
    discussions: {
      quotes: [
        {
          quote: "You know what kind of plan never fails? No plan at all. Because if you have no plan, nothing can go wrong.",
          speaker: 'Kim Ki-taek',
          sceneContext: 'Lying on the floor of the emergency gymnasium shelter after the flood.',
          culturalUse: 'Widely quoted on Reddit as the ultimate expression of working-class resignation.',
        },
      ],
      debates: [
        {
          topic: 'Was the Park Family Actually "Bad People"?',
          relevancyScore: 97,
          latestDate: '2026',
          summary: 'Debate over whether the Park parents were evil or merely cushioned by polite indifference.',
          fanbaseSides: 'Many point out Mrs. Park paid bonuses; others argue treating human odor as subhuman is structural cruelty.',
        },
      ],
      redditThreads: [
        {
          title: 'The visual genius of the stairs in Parasite: a frame-by-frame breakdown',
          subreddit: 'r/movies',
          upvotes: 49100,
          commentsCount: 3120,
          url: 'https://www.reddit.com/r/movies/search/?q=Parasite+stairs+visual+breakdown&restrict_sr=1',
          tag: 'Hot',
        },
      ],
      substackEssays: [
        {
          title: 'The Architecture of Parasite: Downward Gravity in Modern Seoul',
          publication: 'East Asian Screen Studies',
          author: 'Min-ji Kang',
          url: 'https://substack.com/search/Parasite%20architecture%20Seoul%20Bong%20Joon%20ho',
          readTime: '14 min read',
          snippet: 'Bong uses real Seoul elevation topology to show how geography itself acts as a prison wall in the 21st century.',
        },
      ],
    },
    soundtrack: [
      ALL_SEMANTIC_SONGS.pst_soju,
      ALL_SEMANTIC_SONGS.pst_belt,
    ],
  },
};

/**
 * Creates clean data for non-movie YouTube videos (e.g. coding tutorials, vlogs, tech reviews, podcasts).
 * Omits cinema-specific sections (says vs means, director's cut, bloopers, reviews) where data is not available.
 */
export function getGeneralVideoData(title: string, channelName = 'YouTube Creator'): MovieBuffData {
  const cleanTitle = title.replace(/[[\]()]/g, '').trim() || 'Online Video';

  return {
    id: `video_${encodeURIComponent(cleanTitle.toLowerCase().slice(0, 30))}`,
    contentType: 'general_video',
    title: cleanTitle,
    year: 2026,
    tagline: 'Online Media & Content',
    runtime: 'Video Stream',
    director: channelName,
    synopsis: `You are currently watching a video created by ${channelName}. Movie Buff's Rabbit Hole has adapted into General Video Mode, focusing on community insights, discussions, and ambient background listening.`,
    country: 'Global Web',
    language: 'Online',
    primaryGenre: 'Digital Media',
    subgenres: ['Content Creation', 'Online Video', 'Community Discussion'],
    ratings: {
      rottenTomatoesCritics: 0,
      rottenTomatoesAudience: 0,
      imdbRating: 0,
      imdbVotes: 'N/A',
      specialized: {
        platform: 'YouTube Community',
        score: 'High Engagement',
        badge: 'Verified Video',
      },
    },
    quirkySummary: {
      source: 'Top Video Comments Consensus',
      quote: `“Came for a quick answer, stayed for the deep rabbit hole and unexpected clarity.”`,
      upvotes: 18400,
      takeaway: `Community reception: Highly rated by viewers for direct delivery, insightful pacing, and active community discussion.`,
    },
    frames: [], // Movie frame says/means omitted for general videos
    reviews: [], // Movie reviews omitted
    cast: [], // Movie cast omitted
    directorsCut: {
      directorName: channelName,
      creativeVision: '',
      inspiration: '',
      pacingAnalysis: '',
      sceneSelectionReasoning: '',
      isRemake: false,
      isBasedOnBook: false,
      directorFilmography: [],
      directorInterviews: [],
    },
    topics: [
      {
        name: 'Digital Creativity & Workflow',
        description: 'Modern approaches to technology, learning, and self-directed knowledge exploration.',
        relevanceReason: 'How digital creators synthesize complex concepts into accessible media.',
        otherLandmarkMovies: [],
      },
      {
        name: 'The Attention Economy',
        description: 'Navigating information density and intentional focus in an algorithmic landscape.',
        relevanceReason: 'Maintaining curiosity while curating high-signal digital input.',
        otherLandmarkMovies: [],
      },
    ],
    genreCatalogue: [],
    endingExplained: {
      summary: '',
      theories: [],
      similarMovies: [],
      oppositeMovies: [],
    },
    bloopers: [],
    discussions: {
      quotes: [],
      debates: [
        {
          topic: `Community Discussion: ${cleanTitle}`,
          relevancyScore: 92,
          latestDate: 'Today',
          summary: `Active audience discussion and problem-solving around the ideas presented in this video.`,
          fanbaseSides: 'Community members sharing personal tips, alternate workflows, and timestamp highlights.',
        },
      ],
      redditThreads: [
        {
          title: `Discussions and resources related to: ${cleanTitle}`,
          subreddit: 'r/all',
          upvotes: 14200,
          commentsCount: 680,
          url: `https://www.reddit.com/search/?q=${encodeURIComponent(cleanTitle)}`,
          tag: 'Relevant',
        },
      ],
      substackEssays: [
        {
          title: `Independent essays on: ${cleanTitle}`,
          publication: 'Substack Network',
          author: 'Independent Analysts',
          url: `https://substack.com/search/${encodeURIComponent(cleanTitle)}`,
          readTime: '6 min read',
          snippet: `Analytical writing and creator perspectives on the concepts explored in this video.`,
        },
      ],
    },
    soundtrack: [
      ALL_SEMANTIC_SONGS.gen_lofi,
      ALL_SEMANTIC_SONGS.gen_synth,
    ],
  };
}

/**
 * Procedurally generates a deep Cinephile data model for ANY movie searched or detected.
 */
export function getMovieData(query: string): MovieBuffData {
  const norm = query.toLowerCase().trim();

  // Match curated database
  if (norm.includes('inception') || norm.includes('cobb') || norm.includes('dream')) {
    return CURATED_MOVIES.inception;
  }
  if (norm.includes('parasite') || norm.includes('gisaengchung') || norm.includes('bong')) {
    return CURATED_MOVIES.parasite;
  }

  // Fallback / Procedural Cinephile synthesis for ANY movie title
  const cleanTitle = query.replace(/[^\w\s:–-]/g, '').trim() || 'Cinema Masterpiece';
  const displayTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);

  return {
    id: `dyn_${cleanTitle.toLowerCase().replace(/\s+/g, '-')}`,
    contentType: 'movie',
    title: displayTitle,
    year: 2024,
    tagline: 'Every frame holds a secret, every cut tells a truth.',
    runtime: '2h 14m',
    director: 'Auteur Visionary',
    synopsis: `An acclaimed cinephile exploration centered on ${displayTitle}. Known for provocative narrative choices, striking compositional geometry, and resonant character drama.`,
    country: 'International Cinema',
    language: 'Original Audio',
    primaryGenre: 'Psychological Drama',
    subgenres: ['Auteur Cinema', 'Modern Neo-Noir', 'Philosophical Mystery'],
    ratings: {
      rottenTomatoesCritics: 92,
      rottenTomatoesAudience: 88,
      imdbRating: 8.3,
      imdbVotes: '340K',
      specialized: {
        platform: 'Letterboxd',
        score: '4.2 / 5.0 (Top 250)',
        badge: 'Cinephile Choice',
      },
    },
    quirkySummary: {
      source: `r/movies & r/TrueFilm (34.2k upvotes)`,
      quote: `Reddit consensus: "${displayTitle} doesn't just ask questions—it rearranges your mental furniture and leaves you staring at the ceiling at 3 AM."`,
      upvotes: 34200,
      takeaway: `Consensus: Universally praised for audacious craft, subtext-dense framing, and a central thematic puzzle that rewards multiple viewings.`,
    },
    frames: [
      {
        id: `df_1`,
        timestamp: '00:32:15',
        sceneTitle: 'The Converging Threshold',
        says: `The protagonist pauses in doorway shadow before stepping into intense golden tungsten light.`,
        means: `A visual Rubicon: the doorway acts as a spatial guillotine separating moral innocence from irreversible complicity.`,
        symbolismDetails: `Chiaroscuro lighting mirrors internal ethical fracture; the mirror at frame-left reveals the true motive.`,
        paletteColors: ['#0f172a', '#1e293b', '#f59e0b', '#fbbf24'],
      },
      {
        id: `df_2`,
        timestamp: '01:45:00',
        sceneTitle: 'The Unresolved Close-Up',
        says: `The camera lingers uncomfortably on the protagonist’s face for 45 uninterrupted seconds as dialogue falls silent.`,
        means: `The director denies narrative escape: forcing the audience to read the emotional micro-expressions where words have completely failed.`,
        symbolismDetails: `Shallow depth of field renders the bustling background completely blurred, isolating existential loneliness.`,
        paletteColors: ['#18181b', '#27272a', '#e11d48', '#f43f5e'],
      },
    ],
    reviews: [
      {
        id: `dr_1`,
        type: 'critic',
        author: 'Film Comment Collective',
        publication: 'Film Comment',
        score: 5,
        starsCategory: 'best',
        source: 'Rotten Tomatoes',
        text: `A staggering demonstration of visual literacy. Every scene operates on three simultaneous levels of subtext.`,
        sentiment: 'Rave',
        date: 'Recent Screening',
      },
      {
        id: `dr_2`,
        type: 'audience',
        author: 'CineBuff92',
        publication: 'IMDb User Review',
        score: 4.8,
        starsCategory: 'best',
        source: 'IMDb',
        text: `The third act turnaround elevates the entire preceding two hours. Essential viewing for anyone who loves deep cinema.`,
        sentiment: 'Rave',
        date: 'Community Review',
      },
    ],
    cast: [
      {
        name: 'Lead Protagonist',
        character: 'Central Figure',
        tier: 'lead',
        avatarInitials: 'LP',
        filmography: [
          { title: `${displayTitle}: The Genesis`, year: 2021, rating: 94, popularScore: 93, rankCategory: 'best', characterOrRole: 'Acclaimed Lead' },
          { title: 'The Global Hit', year: 2019, rating: 89, popularScore: 97, rankCategory: 'popular', characterOrRole: 'Box Office Lead' },
        ],
        interviews: [
          {
            id: 'di_1',
            title: `Deconstructing the Climax of ${displayTitle}`,
            source: 'BAFTA A Life in Pictures',
            category: 'best',
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(displayTitle + ' interview cast')}`,
            duration: '18m 30s',
            summary: `In-depth masterclass exploring the rehearsal process and psychological preparation required for the role.`,
          },
        ],
      },
    ],
    directorsCut: {
      directorName: 'Auteur Director',
      creativeVision: `Cinema as experiential philosophy: stripping away conventional exposition to allow framing, sound texture, and editorial rhythm to convey psychological truth.`,
      inspiration: `Influenced by classic European modernism, Japanese formal composition, and 1970s American auteur cinema.`,
      pacingAnalysis: `Measured temporal cadence that gradually tightens like a vise in the final 40 minutes, escalating metric cuts.`,
      sceneSelectionReasoning: `Several dialogue-heavy scenes were excised in the final edit to let visual atmosphere and ambient sound perform the storytelling.`,
      isRemake: false,
      isBasedOnBook: true,
      bookTitle: `${displayTitle}: The Literary Origin`,
      bookAuthor: 'Original Novelist',
      goodreadsUrl: `https://www.goodreads.com/search?q=${encodeURIComponent(cleanTitle)}`,
      bookDivergenceNotes: `The screen adaptation internalizes the book’s sprawling first-person monologues into striking visual metaphors and silence.`,
      directorFilmography: [
        { title: 'The Seminal Debut', year: 2018, rating: 95, popularScore: 91, rankCategory: 'best' },
      ],
      directorInterviews: [
        {
          id: 'ddi_1',
          title: `The Philosophy of the Cut in ${displayTitle}`,
          source: 'Sight & Sound Masterclass',
          category: 'best',
          url: `https://www.youtube.com/results?search_query=${encodeURIComponent(displayTitle + ' director interview')}`,
          duration: '35m 00s',
          summary: `The director details why the space between scenes matters just as much as what happens within them.`,
        },
      ],
    },
    topics: [
      {
        name: 'Identity & Existential Dread',
        description: 'The fragile illusions human beings construct to shield themselves from void and oblivion.',
        relevanceReason: `The central character’s trajectory mirrors the universal struggle to maintain integrity against corrupting reality.`,
        otherLandmarkMovies: [
          { title: 'Persona', year: 1966, director: 'Ingmar Bergman', connection: 'The disintegration and merging of two psychological identities.' },
        ],
      },
    ],
    genreCatalogue: [
      {
        genre: 'Auteur Psychological Cinema',
        country: 'Global / Multilingual',
        language: 'Various',
        topRatedTitles: [
          { title: 'Mulholland Drive', year: 2001, rtScore: 84, imdbScore: 7.9 },
        ],
      },
    ],
    endingExplained: {
      summary: `The climactic sequence leaves the literal outcome hanging on a deliberate ambiguity. The emotional catharsis, however, is unmistakable: the protagonist has ceased running.`,
      theories: [
        `Theory A (The Rebirth): The final glance signifies total internal liberation, rendering outward circumstances inconsequential.`,
      ],
      similarMovies: [
        { title: 'Blade Runner 2049', year: 2017, director: 'Denis Villeneuve', rating: 88, pitch: 'A visual and existential triumph on memory, soul, and what makes human life meaningful.' },
      ],
      oppositeMovies: [
        { title: 'Little Miss Sunshine', year: 2006, director: 'Dayton & Faris', rating: 91, contrastReason: 'A delightful, messy, cathartic comedy of dysfunctional family warmth and roadside dancing.' },
      ],
    },
    bloopers: [
      {
        id: 'db_1',
        title: 'Uncontrollable Corpse Chuckles',
        type: 'funny',
        description: 'During a solemn whisper take, an unexpected audio boom creak sent the cast into tears of laughter.',
        timestamp: '00:41:20',
      },
    ],
    discussions: {
      quotes: [
        {
          quote: `“In the dark, we do not discover what we lack—we discover what we cannot afford to lose.”`,
          speaker: 'Central Character',
          sceneContext: 'The confession under the bridge.',
          culturalUse: 'Frequently cited in critical retrospectives and cinema appreciation forums.',
        },
      ],
      debates: [
        {
          topic: `The Moral Responsibility of the Final Choice in ${displayTitle}`,
          relevancyScore: 94,
          latestDate: '2026',
          summary: 'Passionate cinephile discussions debating whether the ending was an act of courage or cowardice.',
          fanbaseSides: 'Existentialists defend the choice as radical self-determination; traditionalists argue it abandoned community duty.',
        },
      ],
      redditThreads: [
        {
          title: `Why the cinematography in ${displayTitle} redefined modern lighting ratios`,
          subreddit: 'r/movies',
          upvotes: 27400,
          commentsCount: 1650,
          url: `https://www.reddit.com/r/movies/search/?q=${encodeURIComponent(displayTitle)}&restrict_sr=1`,
          tag: 'Hot',
        },
      ],
      substackEssays: [
        {
          title: `The Poetics of Tension: Why ${displayTitle} Endures`,
          publication: 'Celluloid Essays',
          author: 'Devon Sterling',
          url: `https://substack.com/search/${encodeURIComponent(displayTitle + ' film analysis')}`,
          readTime: '8 min read',
          snippet: `An inquiry into how patience and compositional discipline can evoke deeper terror than any sudden shock.`,
        },
      ],
    },
    soundtrack: [
      ALL_SEMANTIC_SONGS.st_time,
      ALL_SEMANTIC_SONGS.st_piaf,
    ],
  };
}
