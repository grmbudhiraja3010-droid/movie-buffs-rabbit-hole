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
        <div style={{ background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '10px', padding: '14px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#67e8f9' }}>
            Theme: {activeTopic.name}
          </div>
          <p style={{ fontSize: '12.5px', color: '#e2e8f0', marginTop: '4px', lineHeight: '1.45' }}>
            {activeTopic.description}
          </p>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
            <strong>Why it matters here:</strong> {activeTopic.relevanceReason}
          </div>

          {/* Other Landmark Movies exploring this exact topic */}
          <div style={{ marginTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#fbbf24', fontWeight: 700, letterSpacing: '0.05em' }}>
              Other Landmark Cinema Exploring #{activeTopic.name}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {activeTopic.otherLandmarkMovies.map((film, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 600, color: '#fff', fontSize: '13px' }}>
                      {film.title} ({film.year})
                    </span>{' '}
                    <span style={{ color: '#94a3b8', fontSize: '11.5px' }}>dir. {film.director}</span>
                    <p style={{ fontSize: '11.5px', color: '#cbd5e1', marginTop: '2px' }}>
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
