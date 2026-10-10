import React, { useState } from 'react';
import type { CastMember, FilmographyFilter, InterviewFilter } from '../types/movie';

interface CastRabbitHoleProps {
  cast: CastMember[];
}

export const CastRabbitHole: React.FC<CastRabbitHoleProps> = ({ cast }) => {
  const [selectedActor, setSelectedActor] = useState<string>(cast[0]?.name || '');
  const [filmoFilter, setFilmoFilter] = useState<FilmographyFilter>('all');
  const [interviewFilter, setInterviewFilter] = useState<InterviewFilter>('all');

  const activeActor = cast.find((c) => c.name === selectedActor) || cast[0];

  if (!activeActor) return null;

  const filteredFilmography = activeActor.filmography.filter((f) => {
    if (filmoFilter === 'all') return true;
    return f.rankCategory === filmoFilter;
  });

  const filteredInterviews = activeActor.interviews.filter((i) => {
    if (interviewFilter === 'all') return true;
    return i.category === interviewFilter;
  });

  return (
    <div className="rabbit-section">
      <div className="section-trigger" style={{ cursor: 'default' }}>
        <div className="section-trigger-title">
          <span className="section-icon">🎭</span>
          <div>
            <h3 className="section-heading">Cast Rabbit Hole: Leads to Ensemble</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Filmographies (Best Rated → Popular) & Interview Vault (Latest → Best → Controversial)
            </p>
          </div>
        </div>
        <span className="section-badge">{cast.length} Cast Members</span>
      </div>

      <div className="section-body">
        {/* Cast Selection Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px' }}>
          {cast.map((actor) => (
            <button
              key={actor.name}
              onClick={() => setSelectedActor(actor.name)}
              className={`filter-pill ${actor.name === activeActor.name ? 'active' : ''}`}
            >
              {actor.tier === 'lead' ? '🌟' : '🎬'} {actor.name}
            </button>
          ))}
        </div>

        <div className="cast-item">
          <div className="cast-main">
            <div>
              <div className="cast-name">{activeActor.name}</div>
              <div className="cast-char">Playing: {activeActor.character}</div>
            </div>
            <span
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: activeActor.tier === 'lead' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                color: activeActor.tier === 'lead' ? '#fbbf24' : '#94a3b8',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              {activeActor.tier}
            </span>
          </div>

          {/* Filmography Section */}
          <div style={{ marginTop: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc' }}>
                Filmography & Television:
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {(['all', 'best', 'popular', 'else'] as FilmographyFilter[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilmoFilter(cat)}
                    className={`filter-pill ${filmoFilter === cat ? 'active' : ''}`}
                    style={{ fontSize: '10.5px', padding: '2px 8px' }}
                  >
                    {cat === 'all' ? 'All' : cat === 'best' ? 'Best Rated' : cat === 'popular' ? 'Popular' : 'Other Gems'}
                  </button>
                ))}
              </div>
            </div>

            <div className="filmography-chips">
              {filteredFilmography.map((item, idx) => (
                <div key={idx} className={`filmo-chip ${item.rankCategory}`}>
                  <strong>{item.title}</strong> ({item.year}) •{' '}
                  <span style={{ color: '#fbbf24' }}>★ {item.rating}%</span>{' '}
                  {item.characterOrRole && <span style={{ color: '#94a3b8' }}>as {item.characterOrRole}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Interviews Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc' }}>
                Interviews & Conversations:
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {(['all', 'latest', 'best', 'controversial', 'fun'] as InterviewFilter[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setInterviewFilter(cat)}
                    className={`filter-pill ${interviewFilter === cat ? 'active' : ''}`}
                    style={{ fontSize: '10.5px', padding: '2px 8px' }}
                  >
                    {cat === 'all'
                      ? 'All'
                      : cat === 'latest'
                      ? 'Latest'
                      : cat === 'best'
                      ? 'Best Deep-Dive'
                      : cat === 'controversial'
                      ? 'Dramatic / Friction'
                      : 'Fun & Quirky'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {filteredInterviews.length === 0 ? (
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No interviews under this category.</div>
              ) : (
                filteredInterviews.map((interview) => (
                  <a
                    key={interview.id}
                    href={interview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      background: '#f8fafc',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-light)',
                      borderLeft: `3px solid ${
                        interview.category === 'controversial'
                          ? 'var(--crimson-500)'
                          : interview.category === 'fun'
                          ? 'var(--cyan-500)'
                          : 'var(--gold-500)'
                      }`,
                      textDecoration: 'none',
                      transition: 'var(--transition-smooth)',
                    }}
                    className="link-row"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: 700 }}>
                      <span style={{ color: 'var(--text-dark)' }}>{interview.title} ↗</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                        {interview.source} ({interview.duration})
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-body)', marginTop: '4px' }}>
                      {interview.summary}
                    </p>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
