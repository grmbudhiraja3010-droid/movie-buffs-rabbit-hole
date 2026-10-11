import React, { useEffect, useState } from 'react';
import { detectCurrentMovie, sanitizeTitle, type ActiveContext } from '../services/contextService';
import { getMovieData, getGeneralVideoData, CURATED_MOVIES } from '../data/movies';
import type { MovieBuffData } from '../types/movie';

import { QuirkySummaryCard } from '../components/QuirkySummaryCard';
import { ReviewsCard } from '../components/ReviewsCard';
import { CastRabbitHole } from '../components/CastRabbitHole';
import { DirectorsCutCard } from '../components/DirectorsCutCard';
import { ThematicTopicsCard } from '../components/ThematicTopicsCard';
import { EndingExplainedCard } from '../components/EndingExplainedCard';
import { BloopersCard } from '../components/BloopersCard';
import { DiscussionsCard } from '../components/DiscussionsCard';

import '../styles/filmy.css';

export interface AppProps {
  mode?: 'popup' | 'tab';
}

export const App: React.FC<AppProps> = ({ mode = 'popup' }) => {
  const [context, setContext] = useState<ActiveContext | null>(null);
  const [movieData, setMovieData] = useState<MovieBuffData>(CURATED_MOVIES.inception);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial detection & State restoration
  useEffect(() => {
    async function load() {
      const urlParams = new URLSearchParams(window.location.search);
      const requestedMovie = urlParams.get('movie');
      const requestedType = urlParams.get('contentType');

      const detected = await detectCurrentMovie(requestedMovie, requestedType);
      setContext(detected);
      setMovieData(detected.movieData);

      // Persist active movie cleanly so future popup opens or tabs stay intact
      if (typeof chrome !== 'undefined' && chrome.storage?.local) {
        chrome.storage.local.set({
          lastActiveTitle: detected.movieData.title,
          lastVideoType: detected.movieData.contentType || 'movie',
          lastWatchedUrl: detected.sourceUrl || '',
        });
      }
    }
    void load();
  }, []);

  const updateActiveMovie = (newData: MovieBuffData) => {
    setMovieData(newData);
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.set({
        lastActiveTitle: newData.title,
        lastVideoType: newData.contentType || 'movie',
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const clean = sanitizeTitle(searchQuery.trim());
    const found = getMovieData(clean);
    updateActiveMovie(found);
    setSearchQuery('');
  };

  const handleMovieSelect = (title: string) => {
    const clean = sanitizeTitle(title);
    const found = getMovieData(clean);
    updateActiveMovie(found);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleContentType = () => {
    if (movieData.contentType === 'general_video') {
      const movie = getMovieData(movieData.title);
      updateActiveMovie(movie);
    } else {
      const gen = getGeneralVideoData(movieData.title, movieData.director);
      updateActiveMovie(gen);
    }
  };

  const handleOpenTab = () => {
    const targetUrl = `popup.html?mode=tab&movie=${encodeURIComponent(movieData.title)}&contentType=${encodeURIComponent(movieData.contentType || 'movie')}`;
    if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
      void chrome.tabs.create({ url: chrome.runtime.getURL(targetUrl) });
    } else {
      window.open(targetUrl, '_blank');
    }
  };

  const handleOpenOptions = () => {
    if (typeof chrome !== 'undefined' && chrome.runtime?.openOptionsPage) {
      void chrome.runtime.openOptionsPage();
    } else {
      window.open('options.html', '_blank');
    }
  };

  const isMovie = movieData.contentType !== 'general_video';

  return (
    <>
      <div className="filmy-atmosphere" />

      <div className={`app-container ${mode === 'tab' ? 'tab-mode-container' : 'popup-container'}`}>
        {/* Cinema Header */}
        <header className="cinema-header">
          <div className="brand-section">
            <div className="film-reel-icon">🎬</div>
            <div>
              <h1 className="brand-title">Movie Buff's Rabbit Hole</h1>
              <div className="brand-sub">The Cinephile's Companion</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {mode === 'popup' && (
              <button
                className="header-action-btn"
                onClick={handleOpenTab}
                title="Expand to Fullscreen Dashboard Tab"
              >
                ⤢
              </button>
            )}
            <button
              className="header-action-btn"
              onClick={handleOpenOptions}
              title="Cinephile Settings"
            >
              ⚙
            </button>
          </div>
        </header>

        {/* SECTION 1: FIRST SECTION — Currently Playing Film/Video Overview + Integrated Genres */}
        <section className="first-cinema-section">
          {/* Top Status & Mode Toggle */}
          <div className="first-section-status-bar">
            <div className="watching-tag">
              <span className="pulse-dot" />
              <span>
                {context?.isWatching
                  ? `Now Watching on ${context.platform.toUpperCase()}`
                  : isMovie
                  ? 'Cinema Selection'
                  : 'Online Video Media'}
              </span>
            </div>

            <button
              onClick={handleToggleContentType}
              className="mode-toggle-pill"
              title="Toggle between Movie and General Video analysis mode"
            >
              {isMovie ? '🎬 Movie Mode' : '📹 General Video Mode'} (Switch ↗)
            </button>
          </div>

          {/* Main Title & Core Meta */}
          <h2 className="movie-title">{movieData.title}</h2>

          <div className="movie-meta-line">
            <span className="meta-pill">{movieData.year}</span>
            <span>•</span>
            <span className="meta-pill">{movieData.runtime}</span>
            <span>•</span>
            <span className="meta-director">
              {isMovie ? 'Directed by ' : 'Creator: '}
              <strong>{movieData.director}</strong>
            </span>
            <span>•</span>
            <span className="meta-pill">{movieData.language}</span>
          </div>

          {/* GENRES: Added directly in this first section per Rule 9 */}
          <div className="first-section-genres">
            <span className="genre-pill primary">🎬 {movieData.primaryGenre}</span>
            {movieData.subgenres.map((g) => (
              <span key={g} className="genre-pill">
                {g}
              </span>
            ))}
          </div>

          <p className="movie-synopsis">{movieData.synopsis}</p>

          {/* Quick Search / Switcher Bar */}
          <form className="search-movie-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search or jump to any movie (e.g. Inception, Parasite, Oppenheimer)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              Explore ↗
            </button>
          </form>
        </section>

        {/* SECTION 2: Quirky Reddit & Community Summary (Upvotes) */}
        <QuirkySummaryCard
          source={movieData.quirkySummary.source}
          quote={movieData.quirkySummary.quote}
          upvotes={movieData.quirkySummary.upvotes}
          takeaway={movieData.quirkySummary.takeaway}
        />

        {/* CINEMA-SPECIFIC SECTIONS: Only enabled for movies when data is present */}
        {isMovie && (
          <>
            {/* Reviews Section */}
            {movieData.reviews && movieData.reviews.length > 0 && (
              <ReviewsCard reviews={movieData.reviews} ratings={movieData.ratings} />
            )}

            {/* Cast Rabbit Hole (Google-Style, max 3 filters, stable shape) */}
            {movieData.cast && movieData.cast.length > 0 && (
              <CastRabbitHole cast={movieData.cast} />
            )}

            {/* Director's Cut (Active links, books only if true, max 3 filters) */}
            {movieData.directorsCut?.creativeVision && (
              <DirectorsCutCard directorsCut={movieData.directorsCut} />
            )}

            {/* Thematic Topics (Real core themes of the work) */}
            {movieData.topics && movieData.topics.length > 0 && (
              <ThematicTopicsCard
                topics={movieData.topics}
                onSelectMovie={handleMovieSelect}
              />
            )}

            {/* Ending Explained & Movie Bridges (Real active links) */}
            {movieData.endingExplained?.summary && (
              <EndingExplainedCard
                ending={movieData.endingExplained}
                onSelectMovie={handleMovieSelect}
              />
            )}

            {/* Bloopers (ONLY IF real blooper videos are available!) */}
            {movieData.bloopers && movieData.bloopers.length > 0 && (
              <BloopersCard bloopers={movieData.bloopers} />
            )}
          </>
        )}

        {/* GENERAL VIDEO MODE: Only keep relevant thematic topics if available */}
        {!isMovie && movieData.topics && movieData.topics.length > 0 && (
          <ThematicTopicsCard
            topics={movieData.topics}
            onSelectMovie={handleMovieSelect}
          />
        )}

        {/* Discussions, Debates, Reddit & Substack (No iconic dialogue quotes) */}
        {movieData.discussions && (
          <DiscussionsCard discussions={movieData.discussions} />
        )}

        {/* Footer */}
        <footer style={{ textAlign: 'center', color: '#ffffff', fontSize: '11px', marginTop: '12px', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
          Movie Buff's Rabbit Hole • Made for cinephiles • Privacy-first
        </footer>
      </div>
    </>
  );
};
