import React, { useState } from 'react';
import type { CastMember } from '../types/movie';

interface CastRabbitHoleProps {
  cast: CastMember[];
}

export const CastRabbitHole: React.FC<CastRabbitHoleProps> = ({ cast }) => {
  const [selectedActorName, setSelectedActorName] = useState<string>(cast[0]?.name || '');
  const [tierFilter, setTierFilter] = useState<'all' | 'lead' | 'supporting'>('all');

  if (!cast || cast.length === 0) return null;

  // Max 3 filters
  const filteredCast = cast.filter((c) => {
    if (tierFilter === 'all') return true;
    return c.tier === tierFilter;
  });

  const activeActor = cast.find((c) => c.name === selectedActorName) || filteredCast[0] || cast[0];

  return (
    <div className="rabbit-section">
      <div className="section-trigger" style={{ cursor: 'default' }}>
        <div className="section-trigger-title">
          <span className="section-icon">🎭</span>
          <div>
            <h3 className="section-heading">Cast Rabbit Hole: Leads to Ensemble</h3>
          </div>
        </div>
        <span className="section-badge">{cast.length} Cast</span>
      </div>

      <div className="section-body">
        {/* Tier filter pills - max 3 */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          {(['all', 'lead', 'supporting'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`filter-pill ${tierFilter === t ? 'active' : ''}`}
            >
              {t === 'all' ? 'All Cast' : t === 'lead' ? '🌟 Lead Cast' : '🎬 Supporting'}
            </button>
          ))}
        </div>

        {/* Google-Style Cast Carousel */}
        <div className="google-cast-carousel">
          {filteredCast.map((actor) => {
            const isSelected = actor.name === activeActor?.name;
            return (
              <div
                key={actor.name}
                className={`google-actor-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedActorName(actor.name)}
                title={`Click to view movies & shows for ${actor.name}`}
              >
                <div className="google-actor-avatar">
                  <div className="avatar-circle">
                    {actor.avatarInitials || actor.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <div className="google-actor-name">{actor.name}</div>
                <div className="google-actor-role">{actor.character}</div>
              </div>
            );
          })}
        </div>

        {/* Selected Actor Details: Movies and Shows */}
        {activeActor && (
          <div className="google-actor-detail-panel">
            <div className="actor-detail-header">
              <div>
                <span className="actor-detail-title">{activeActor.name}</span>
                <span className="actor-detail-role">as {activeActor.character}</span>
              </div>
              <span className="actor-detail-badge">{activeActor.tier}</span>
            </div>

            {/* Movies and TV Shows list */}
            <div style={{ marginTop: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Notable Movies & TV Shows:
              </div>

              <div className="actor-works-grid">
                {activeActor.filmography.map((work, idx) => (
                  <a
                    key={idx}
                    href={work.imdbUrl || `https://www.imdb.com/find/?q=${encodeURIComponent(work.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="actor-work-chip"
                    title={`Explore ${work.title} on IMDb`}
                  >
                    <span className="work-chip-title">{work.title}</span>
                    <span className="work-chip-meta">
                      ({work.year}) {work.characterOrRole ? `· ${work.characterOrRole}` : ''}
                    </span>
                    <span className="work-chip-score">★ {work.rating}%</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Interviews if available */}
            {activeActor.interviews && activeActor.interviews.length > 0 && (
              <div style={{ marginTop: '14px', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Cast Interview & Media:
                </div>
                {activeActor.interviews.map((iv) => (
                  <a
                    key={iv.id}
                    href={iv.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-row"
                    style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span>▶ <strong>{iv.title}</strong> ({iv.source} · {iv.duration})</span>
                    <span style={{ fontSize: '11px', color: '#be123c', fontWeight: 600 }}>Watch ↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
