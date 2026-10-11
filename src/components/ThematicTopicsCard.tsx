import React, { useState } from 'react';
import type { ThematicTopic } from '../types/movie';

interface ThematicTopicsCardProps {
  topics: ThematicTopic[];
  onSelectMovie?: (title: string) => void;
}

export const ThematicTopicsCard: React.FC<ThematicTopicsCardProps> = ({ topics, onSelectMovie }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeTopic = topics[selectedIdx] || topics[0];

  if (!topics || topics.length === 0 || !activeTopic) return null;

  return (
    <div className="rabbit-section">
      <div className="section-trigger" style={{ cursor: 'default' }}>
        <div className="section-trigger-title">
          <span className="section-icon">💡</span>
          <div>
            <h3 className="section-heading">Thematic Rabbit Hole (Beyond Genre)</h3>
          </div>
        </div>
        <span className="section-badge">{topics.length} Core Themes</span>
      </div>

      <div className="section-body">
        {/* Real Core Thematic Tags */}
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

        {/* Selected Theme Breakdown */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
              #{activeTopic.name}
            </div>
            {activeTopic.exploreUrl && (
              <a
                href={activeTopic.exploreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="explore-link-btn"
              >
                Explore Theme Video Essay ↗
              </a>
            )}
          </div>

          <p style={{ fontSize: '13px', color: '#334155', marginTop: '6px', lineHeight: '1.5' }}>
            {activeTopic.description}
          </p>

          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
            <strong>Why it matters here:</strong> {activeTopic.relevanceReason}
          </div>

          {/* Other Landmark Movies exploring this exact topic */}
          {activeTopic.otherLandmarkMovies && activeTopic.otherLandmarkMovies.length > 0 && (
            <div style={{ marginTop: '14px', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#be123c', fontWeight: 800 }}>
                Other Landmark Works Exploring #{activeTopic.name}
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                {activeTopic.otherLandmarkMovies.map((film, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '13px' }}>
                        {film.title} ({film.year})
                      </span>{' '}
                      <span style={{ color: '#64748b', fontSize: '11.5px' }}>dir. {film.director}</span>
                      <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                        {film.connection}
                      </p>
                    </div>

                    <a
                      href={film.exploreUrl || `https://www.imdb.com/find/?q=${encodeURIComponent(film.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="filter-pill"
                      style={{ fontSize: '11px', padding: '3px 8px', whiteSpace: 'nowrap', marginLeft: '10px', textDecoration: 'none' }}
                    >
                      Explore ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
