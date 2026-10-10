import React, { useState } from 'react';
import type { DirectorsCut, FilmographyFilter, InterviewFilter } from '../types/movie';

interface DirectorsCutCardProps {
  directorsCut: DirectorsCut;
}

export const DirectorsCutCard: React.FC<DirectorsCutCardProps> = ({ directorsCut }) => {
  const [filmoFilter, setFilmoFilter] = useState<FilmographyFilter>('all');
  const [interviewFilter, setInterviewFilter] = useState<InterviewFilter>('all');

  const filteredFilmography = directorsCut.directorFilmography.filter((f) => {
    if (filmoFilter === 'all') return true;
    return f.rankCategory === filmoFilter;
  });

  const filteredInterviews = directorsCut.directorInterviews.filter((i) => {
    if (interviewFilter === 'all') return true;
    return i.category === interviewFilter;
  });

  return (
    <div className="rabbit-section">
      <div className="section-trigger" style={{ cursor: 'default' }}>
        <div className="section-trigger-title">
          <span className="section-icon">🎬</span>
          <div>
            <h3 className="section-heading">Director’s Cut: Auteur Vault</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Creative vision, inspiration, pacing analysis, remakes & book adaptations
            </p>
          </div>
        </div>
        <span className="section-badge">{directorsCut.directorName}</span>
      </div>

      <div className="section-body">
        {/* Core Vision & Inspiration */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
          <div className="says-box" style={{ borderLeftColor: '#f59e0b' }}>
            <span className="sub-label" style={{ color: '#fbbf24' }}>Creative Vision & Philosophy</span>
            <p className="frame-text">{directorsCut.creativeVision}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="says-box">
              <span className="sub-label">Inspirations & Catalysts</span>
              <p className="frame-text">{directorsCut.inspiration}</p>
            </div>

            <div className="says-box">
              <span className="sub-label">Pacing & Temporal Cadence</span>
              <p className="frame-text">{directorsCut.pacingAnalysis}</p>
            </div>
          </div>

          <div className="means-box" style={{ borderLeftColor: '#06b6d4' }}>
            <span className="sub-label" style={{ color: '#22d3ee' }}>Scene Selection & Excised Sequences</span>
            <p className="frame-text">{directorsCut.sceneSelectionReasoning}</p>
          </div>
        </div>

        {/* Remake or Book Adaptation Details */}
        <div style={{ marginTop: '14px', background: '#f8fafc', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '14px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--crimson-600)', fontWeight: 800, letterSpacing: '0.05em' }}>
            Adaptation & Origin Matrix
          </span>
          <div style={{ marginTop: '6px', fontSize: '12.5px', color: 'var(--text-dark)' }}>
            {directorsCut.isBasedOnBook ? (
              <div>
                📚 <strong>Based on Book:</strong> {directorsCut.bookTitle} by {directorsCut.bookAuthor}
                {directorsCut.goodreadsUrl && (
                  <div style={{ marginTop: '6px' }}>
                    <a
                      href={directorsCut.goodreadsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-row"
                      style={{ display: 'inline-flex', padding: '5px 12px', fontSize: '12px', color: 'var(--crimson-600)', fontWeight: 600 }}
                    >
                      📖 View on Goodreads & Read Reader Reviews ↗
                    </a>
                  </div>
                )}
                {directorsCut.bookDivergenceNotes && (
                  <p style={{ marginTop: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <strong>Adaptation Changes:</strong> {directorsCut.bookDivergenceNotes}
                  </p>
                )}
              </div>
            ) : directorsCut.isRemake ? (
              <div>
                🔄 <strong>Remake of:</strong> {directorsCut.remakeOriginalTitle}
                <p style={{ marginTop: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  {directorsCut.remakeComparison}
                </p>
              </div>
            ) : (
              <div>
                ✨ <strong>Original Screenplay:</strong> Wholly original cinematic work not derived from prior intellectual property or remakes.
              </div>
            )}
          </div>
        </div>

        {/* Director Filmography */}
        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)' }}>
              {directorsCut.directorName} Filmography:
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {(['all', 'best', 'popular', 'else'] as FilmographyFilter[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilmoFilter(cat)}
                  className={`filter-pill ${filmoFilter === cat ? 'active' : ''}`}
                  style={{ fontSize: '10.5px', padding: '2px 8px' }}
                >
                  {cat === 'all' ? 'All' : cat === 'best' ? 'Best Rated' : cat === 'popular' ? 'Popular' : 'Other Works'}
                </button>
              ))}
            </div>
          </div>

          <div className="filmography-chips">
            {filteredFilmography.map((work, idx) => (
              <div key={idx} className={`filmo-chip ${work.rankCategory}`}>
                <strong>{work.title}</strong> ({work.year}) •{' '}
                <span style={{ color: 'var(--gold-600)', fontWeight: 600 }}>★ {work.rating}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Director Interviews */}
        {directorsCut.directorInterviews.length > 0 && (
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)' }}>
                Director Masterclasses & Debates:
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {(['all', 'best', 'controversial', 'latest'] as InterviewFilter[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setInterviewFilter(cat)}
                    className={`filter-pill ${interviewFilter === cat ? 'active' : ''}`}
                    style={{ fontSize: '10.5px', padding: '2px 8px' }}
                  >
                    {cat === 'all' ? 'All' : cat === 'best' ? 'Deep-Dive' : cat === 'controversial' ? 'Controversial' : 'Latest'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredInterviews.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    background: '#f8fafc',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    borderLeft: `3px solid ${item.category === 'controversial' ? 'var(--crimson-500)' : 'var(--gold-500)'}`,
                    textDecoration: 'none',
                    transition: 'var(--transition-smooth)',
                  }}
                  className="link-row"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: 700 }}>
                    <span style={{ color: 'var(--text-dark)' }}>{item.title} ↗</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                      {item.source} ({item.duration})
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-body)', marginTop: '4px' }}>
                    {item.summary}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
