import React, { useState } from 'react';
import type { MovieBuffData } from '../types/movie';

interface GenreTableCardProps {
  movieData: MovieBuffData;
}

type GenreTabMode = 'overview' | 'country' | 'language';

export const GenreTableCard: React.FC<GenreTableCardProps> = ({ movieData }) => {
  const [tabMode, setTabMode] = useState<GenreTabMode>('overview');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rabbit-section">
      <div
        className="section-trigger"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer' }}
      >
        <div className="section-trigger-title">
          <span className="section-icon">🌐</span>
          <div>
            <h3 className="section-heading">Genre Table & Global Matrix</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              {movieData.primaryGenre} • {movieData.country} • {movieData.language}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="section-badge">
            {isExpanded ? 'Collapse ▲' : 'Expand Genre Table ▼'}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="section-body">
          {/* Sub-section Switcher: Country vs Language */}
          <div style={{ display: 'flex', gap: '8px', margin: '10px 0 14px' }}>
            <button
              className={`filter-pill ${tabMode === 'overview' ? 'active' : ''}`}
              onClick={() => setTabMode('overview')}
            >
              📊 Genre & RT Rankings
            </button>
            <button
              className={`filter-pill ${tabMode === 'country' ? 'active' : ''}`}
              onClick={() => setTabMode('country')}
            >
              🗺️ Country Section ({movieData.country})
            </button>
            <button
              className={`filter-pill ${tabMode === 'language' ? 'active' : ''}`}
              onClick={() => setTabMode('language')}
            >
              🗣️ Language Section ({movieData.language})
            </button>
          </div>

          {tabMode === 'overview' && (
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12.5px', color: '#cbd5e1' }}>
                Primary Genre: <strong style={{ color: '#fbbf24' }}>{movieData.primaryGenre}</strong>
                {' • '}Subgenres: {movieData.subgenres.join(', ')}
              </div>

              <table className="genre-table">
                <thead>
                  <tr>
                    <th>Subgenre Category</th>
                    <th>Region / Language</th>
                    <th>Top Rated (RT % / IMDb)</th>
                  </tr>
                </thead>
                <tbody>
                  {movieData.genreCatalogue.map((cat, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{cat.genre}</strong>
                      </td>
                      <td style={{ color: '#94a3b8' }}>
                        {cat.country} ({cat.language})
                      </td>
                      <td>
                        {cat.topRatedTitles.map((t, i) => (
                          <div key={i} style={{ fontSize: '11.5px', marginBottom: '2px' }}>
                            {t.title} ({t.year}) —{' '}
                            <span style={{ color: '#f87171' }}>🍅 {t.rtScore}%</span> •{' '}
                            <span style={{ color: '#fbbf24' }}>★ {t.imdbScore}</span>
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tabMode === 'country' && (
            <div style={{ background: '#f8fafc', border: '1px solid var(--border-light)', padding: '16px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--crimson-600)' }}>
                  Country Spotlight: {movieData.country}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>National Cinema Legacy</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-body)', marginTop: '6px', lineHeight: '1.45' }}>
                Exploring cinematic movements native to {movieData.country}. Screen titles sorted by critical acclaim and historical significance.
              </p>
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {movieData.genreCatalogue[0]?.topRatedTitles.map((t, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      background: '#ffffff',
                      border: '1px solid var(--border-light)',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '12.5px',
                    }}
                  >
                    <span><strong>{t.title}</strong> ({t.year})</span>
                    <span style={{ color: 'var(--crimson-600)', fontWeight: 700 }}>🍅 {t.rtScore}% RT</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tabMode === 'language' && (
            <div style={{ background: '#f8fafc', border: '1px solid var(--border-light)', padding: '16px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--crimson-600)' }}>
                  Language Spotlight: {movieData.language}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Dialogue Rhythm & Cadence</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-body)', marginTop: '6px', lineHeight: '1.45' }}>
                Films crafted in {movieData.language}. Cinephile recommendation: watch in original audio with subtitles to preserve authentic vocal inflection and intended sound design.
              </p>
              <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {movieData.subgenres.map((sg, i) => (
                  <span
                    key={i}
                    style={{
                      background: '#f1f5f9',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-dark)',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {sg} in {movieData.language}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
