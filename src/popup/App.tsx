import React, { useEffect, useState } from 'react';
import { detectCurrentMovie, type ActiveContext } from '../services/contextService';
import { getMovieData, CURATED_MOVIES } from '../data/movies';
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

  // Initial detection
  useEffect(() => {
    async function load() {
      const detected = await detectCurrentMovie();
      setContext(detected);
      setMovieData(detected.movieData);
    }
    void load();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = getMovieData(searchQuery.trim());
    setMovieData(found);
    setSearchQuery('');
  };

  const handleMovieSelect = (title: string) => {
    const found = getMovieData(title);
    setMovieData(found);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTab = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
      void chrome.tabs.create({ url: chrome.runtime.getURL('popup.html?mode=tab') });
    } else {
      window.open('popup.html?mode=tab', '_blank');
    }
  };

  const handleOpenOptions = () => {
    if (typeof chrome !== 'undefined' && chrome.runtime?.openOptionsPage) {
      void chrome.runtime.openOptionsPage();
    } else {
      window.open('options.html', '_blank');
    }
  };

  return (
    <>
      {/* Filmy Atmosphere Layers */}
      <div className="filmy-atmosphere" />
      <div className="projector-glow" />
      <div className="ambient-dust-layer" />

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
                className="audio-btn"
                onClick={handleOpenTab}
                title="Expand to Fullscreen Dashboard Tab"
                style={{ borderRadius: '8px', width: '34px', height: '34px' }}
              >
                ⤢
              </button>
            )}
            <button
              className="audio-btn"
              onClick={handleOpenOptions}
              title="Cinephile Settings"
              style={{ borderRadius: '8px', width: '34px', height: '34px' }}
            >
              ⚙
            </button>
          </div>
        </header>

        {/* Audio Soundtrack Player (Plays background song while watching) */}
        <AudioPlayerBar tracks={movieData.soundtrack} />

        {/* Rabbit Hole Depth Meter */}
        <DepthMeter currentLevel={depthLevel} onSelectLevel={(lvl) => setDepthLevel(lvl)} />

        {/* Movie Playing / Hero Banner */}
        <section className="movie-hero">
          <div className="filmstrip-border-top" />

          <div className="hero-main-row">
            <div className="movie-poster-box">
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>📽️</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
                {movieData.primaryGenre}
              </div>
              <div style={{ fontSize: '10px', color: '#f59e0b', marginTop: '4px' }}>
                {movieData.country}
              </div>
            </div>

            <div className="hero-details">
              {context?.isWatching && (
                <div className="watching-badge">
                  <span className="pulse-dot" />
                  <span>Now Playing ({context.platform.toUpperCase()})</span>
                </div>
              )}

              <h2 className="movie-title">{movieData.title}</h2>

              <div className="movie-meta-line">
                <span className="meta-pill">{movieData.year}</span>
                <span>•</span>
                <span className="meta-pill">{movieData.runtime}</span>
                <span>•</span>
                <span className="meta-director">
                  Directed by <strong>{movieData.director}</strong>
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

        {/* Quirky Reddit Summary */}
        <QuirkySummaryCard
          source={movieData.quirkySummary.source}
          quote={movieData.quirkySummary.quote}
          upvotes={movieData.quirkySummary.upvotes}
          takeaway={movieData.quirkySummary.takeaway}
        />

        {/* Reviews Section (Directly under movie hero) */}
        <ReviewsCard reviews={movieData.reviews} ratings={movieData.ratings} />

        {/* Frame Analysis: Says vs Means */}
        <FrameAnalysisCard frames={movieData.frames} />

        {/* Cast Rabbit Hole (Main leads to rest, filmography, interviews) */}
        <CastRabbitHole cast={movieData.cast} />

        {/* Director's Cut (Creative vision, pacing, remakes, Goodreads link) */}
        <DirectorsCutCard directorsCut={movieData.directorsCut} />

        {/* Genre Table (Expandable with Country & Language sections) */}
        <GenreTableCard movieData={movieData} />

        {/* Thematic Topics (Non-genre themes & jumping to other movies) */}
        <ThematicTopicsCard
          topics={movieData.topics}
          onSelectMovie={handleMovieSelect}
        />

        {/* Ending Explained, Similar Movies & Polar Opposite Palate Cleansers */}
        <EndingExplainedCard
          ending={movieData.endingExplained}
          onSelectMovie={handleMovieSelect}
        />

        {/* Bloopers & BTS Outtakes (Funny vs Dramatic) */}
        <BloopersCard bloopers={movieData.bloopers} />

        {/* Discussions, Fandoms, Quotes, Debates, Reddit & Substack */}
        <DiscussionsCard discussions={movieData.discussions} />

        {/* Footer */}
        <footer style={{ textAlign: 'center', color: '#64748b', fontSize: '11px', marginTop: '20px' }}>
          Movie Buff's Rabbit Hole • Made for cinephiles • Privacy-first
        </footer>
      </div>
    </>
  );
};
