import React, { useEffect, useState } from 'react';
import { detectCurrentMovie, type ActiveContext } from '../services/contextService';
import { getMovieData, getGeneralVideoData, CURATED_MOVIES } from '../data/movies';
import type { MovieBuffData } from '../types/movie';

import { AudioPlayerBar } from '../components/AudioPlayerBar';
import { DepthMeter } from '../components/DepthMeter';
import { QuirkySummaryCard } from '../components/QuirkySummaryCard';
import { FrameAnalysisCard } from '../components/FrameAnalysisCard';
import { ReviewsCard } from '../components/ReviewsCard';
import { CastRabbitHole } from '../components/CastRabbitHole';
import { DirectorsCutCard } from '../components/DirectorsCutCard';
import { GenreTableCard } from '../components/GenreTableCard';
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
  const [depthLevel, setDepthLevel] = useState(1);

  // Initial detection & State restoration
  useEffect(() => {
    async function load() {
      const urlParams = new URLSearchParams(window.location.search);
      const requestedMovie = urlParams.get('movie');

      const detected = await detectCurrentMovie(requestedMovie);
      setContext(detected);
      setMovieData(detected.movieData);

      // Persist active movie so future popup opens or tabs stay intact
      if (typeof chrome !== 'undefined' && chrome.storage?.local) {
        chrome.storage.local.set({
          lastActiveMovieId: detected.movieData.id,
          lastContentType: detected.movieData.contentType || 'movie',
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
        lastActiveMovieId: newData.id,
        lastContentType: newData.contentType || 'movie',
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = getMovieData(searchQuery.trim());
    updateActiveMovie(found);
    setSearchQuery('');
  };

  const handleMovieSelect = (title: string) => {
    const found = getMovieData(title);
    updateActiveMovie(found);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleContentType = () => {
    if (movieData.contentType === 'general_video') {
      // Switch to movie analysis
      const movie = getMovieData(movieData.title);
      updateActiveMovie(movie);
    } else {
      // Switch to general video
      const gen = getGeneralVideoData(movieData.title, movieData.director);
      updateActiveMovie(gen);
    }
  };

  const handleOpenTab = () => {
    const targetUrl = `popup.html?mode=tab&movie=${encodeURIComponent(movieData.id)}&contentType=${encodeURIComponent(movieData.contentType || 'movie')}`;
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

  const isGeneralVideo = movieData.contentType === 'general_video';

  return (
    <>
      <div className="filmy-atmosphere" />

      <div className={`app-container ${mode === 'tab' ? 'tab-mode-container' : ''}`}>
        {/* Cinema Header */}
        <header className="cinema-header">
          <div className="brand-section">
            <div className="film-reel-icon">🎬</div>
            <div>
              <h1 className="brand-title">Movie Buff's Rabbit Hole</h1>
              <div className="brand-sub">The Cinephile's Companion</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {mode === 'popup' && (
              <button
                className="header-action-btn"
                onClick={handleOpenTab}
                title="Expand to Fullscreen Dashboard Tab (keeps current page intact)"
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

        {/* Content Type Identifier Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '8px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px' }}>
            <span style={{ fontSize: '15px' }}>{isGeneralVideo ? '📹' : '🎬'}</span>
            <span>
              Detected: <strong>{isGeneralVideo ? 'General Video / Online Media' : 'Cinema / Movie Title'}</strong>
            </span>
          </div>

          <button
            onClick={handleToggleContentType}
            className="filter-pill"
            style={{ fontSize: '11px', padding: '3px 10px' }}
          >
            {isGeneralVideo ? 'Analyze as Movie ↗' : 'View as General Video ↗'}
          </button>
        </div>

        {/* Audio Soundtrack Player (2 Semantic Songs with Dynamic Similarity) */}
        <AudioPlayerBar initialTracks={movieData.soundtrack} />

        {/* Rabbit Hole Depth Meter (Active for Cinema mode) */}
        {!isGeneralVideo && (
          <DepthMeter currentLevel={depthLevel} onSelectLevel={(lvl) => setDepthLevel(lvl)} />
        )}

        {/* Movie Hero / Playing Banner */}
        <section className="movie-hero">
          <div className="hero-main-row">
            <div className="movie-poster-box">
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>{isGeneralVideo ? '📹' : '📽️'}</div>
              <div style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 600 }}>
                {movieData.primaryGenre}
              </div>
              <div style={{ fontSize: '10px', color: '#fbbf24', marginTop: '4px' }}>
                {movieData.country}
              </div>
            </div>

            <div className="hero-details">
              {context?.isWatching && (
                <div className="watching-badge">
                  <span className="pulse-dot" />
                  <span>Now Watching ({context.platform.toUpperCase()})</span>
                </div>
              )}

              <h2 className="movie-title">{movieData.title}</h2>

              <div className="movie-meta-line">
                <span className="meta-pill">{movieData.year}</span>
                <span>•</span>
                <span className="meta-pill">{movieData.runtime}</span>
                <span>•</span>
                <span className="meta-director">
                  {isGeneralVideo ? 'Creator / Channel: ' : 'Directed by '}
                  <strong>{movieData.director}</strong>
                </span>
                <span>•</span>
                <span className="meta-pill">{movieData.language}</span>
              </div>

              <p className="movie-synopsis">{movieData.synopsis}</p>
            </div>
          </div>

          {/* Quick Movie Search / Switcher Bar */}
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

        {/* Quirky Community Summary */}
        <QuirkySummaryCard
          source={movieData.quirkySummary.source}
          quote={movieData.quirkySummary.quote}
          upvotes={movieData.quirkySummary.upvotes}
          takeaway={movieData.quirkySummary.takeaway}
        />

        {/* CINEMA-SPECIFIC SECTIONS: Only displayed when data is available for movies */}
        {!isGeneralVideo && (
          <>
            {/* Reviews Section */}
            {movieData.reviews.length > 0 && (
              <ReviewsCard reviews={movieData.reviews} ratings={movieData.ratings} />
            )}

            {/* Frame Analysis: Says vs Means */}
            {movieData.frames.length > 0 && (
              <FrameAnalysisCard frames={movieData.frames} />
            )}

            {/* Cast Rabbit Hole */}
            {movieData.cast.length > 0 && (
              <CastRabbitHole cast={movieData.cast} />
            )}

            {/* Director's Cut */}
            {movieData.directorsCut?.creativeVision && (
              <DirectorsCutCard directorsCut={movieData.directorsCut} />
            )}

            {/* Genre Table */}
            {movieData.genreCatalogue.length > 0 && (
              <GenreTableCard movieData={movieData} />
            )}

            {/* Thematic Topics */}
            {movieData.topics.length > 0 && (
              <ThematicTopicsCard
                topics={movieData.topics}
                onSelectMovie={handleMovieSelect}
              />
            )}

            {/* Ending Explained */}
            {movieData.endingExplained?.summary && (
              <EndingExplainedCard
                ending={movieData.endingExplained}
                onSelectMovie={handleMovieSelect}
              />
            )}

            {/* Bloopers & BTS Outtakes */}
            {movieData.bloopers.length > 0 && (
              <BloopersCard bloopers={movieData.bloopers} />
            )}
          </>
        )}

        {/* Discussions, Fandoms, Quotes, Debates, Reddit & Substack */}
        <DiscussionsCard discussions={movieData.discussions} />

        {/* Footer */}
        <footer style={{ textAlign: 'center', color: '#ffffff', fontSize: '12px', marginTop: '16px', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
          Movie Buff's Rabbit Hole • Made for cinephiles • Privacy-first
        </footer>
      </div>
    </>
  );
};
