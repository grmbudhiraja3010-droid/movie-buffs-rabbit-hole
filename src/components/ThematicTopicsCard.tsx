import React, { useState } from 'react';
import type { ThematicTopic } from '../types/movie';

interface ThematicTopicsCardProps {
  topics: ThematicTopic[];
  onSelectMovie?: (title: string) => void;
}

export const ThematicTopicsCard: React.FC<ThematicTopicsCardProps> = ({ topics, onSelectMovie }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeTopic = topics[selectedIdx] || topics[0];

  if (!activeTopic) return null;

  return (
    <div className="rabbit-section">
      <div className="section-trigger" style={{ cursor: 'default' }}>
        <div className="section-trigger-title">
          <span className="section-icon">💡</span>
          <div>
            <h3 className="section-heading">Thematic Rabbit Hole (Beyond Genre)</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Deep motifs: Women’s Independence, Existential Dread, Conflict, Class, Moral Compromise
            </p>
          </div>
        </div>
        <span className="section-badge">{topics.length} Core Themes</span>
      </div>

      <div className="section-body">
        {/* Topic Pills */}
        <div className="topic-tags">
          {topics.map((t, idx) => (
            <button
              key={t.name}
              className={`topic-tag ${idx === selectedIdx ? 'active' : ''}`}
              onClick={() => setSelectedIdx(idx)}
            >
              #{t.name}
            </button>
          ))}
        </div>

        {/* Selected Topic Breakdown */}
        <div style={{ background: '#f8fafc', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-dark)' }}>
            Theme: #{activeTopic.name}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-body)', marginTop: '4px', lineHeight: '1.45' }}>
            {activeTopic.description}
          </p>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
            <strong>Why it matters here:</strong> {activeTopic.relevanceReason}
          </div>

          {/* Other Landmark Movies exploring this exact topic */}
          <div style={{ marginTop: '14px', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--crimson-600)', fontWeight: 800, letterSpacing: '0.05em' }}>
              Other Landmark Cinema Exploring #{activeTopic.name}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {activeTopic.otherLandmarkMovies.map((film, i) => (
                <div
                  key={i}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '13px' }}>
                      {film.title} ({film.year})
                    </span>{' '}
                    <span style={{ color: 'var(--text-muted)', fontSize: '11.5px' }}>dir. {film.director}</span>
                    <p style={{ fontSize: '12px', color: 'var(--text-body)', marginTop: '3px' }}>
                      {film.connection}
                    </p>
                  </div>

                  {onSelectMovie && (
                    <button
                      onClick={() => onSelectMovie(film.title)}
                      className="filter-pill"
                      style={{ fontSize: '11px', padding: '3px 8px', whiteSpace: 'nowrap', marginLeft: '10px' }}
                    >
                      Dive ↗
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
