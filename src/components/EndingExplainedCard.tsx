import React, { useState } from 'react';
import type { SimilarMovie, OppositeMovie } from '../types/movie';

interface EndingExplainedCardProps {
  ending: {
    summary: string;
    theories: string[];
    similarMovies: SimilarMovie[];
    oppositeMovies: OppositeMovie[];
  };
  onSelectMovie?: (title: string) => void;
}

export const EndingExplainedCard: React.FC<EndingExplainedCardProps> = ({ ending, onSelectMovie }) => {
  const [activeTab, setActiveTab] = useState<'theories' | 'similar' | 'opposite'>('theories');

  return (
    <div className="rabbit-section">
      <div className="section-trigger" style={{ cursor: 'default' }}>
        <div className="section-trigger-title">
          <span className="section-icon">🌀</span>
          <div>
            <h3 className="section-heading">Ending Explained & Movie Bridges</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Final frame analysis, competing theories, similar films, & polar opposite palate cleansers
            </p>
          </div>
        </div>
        <span className="section-badge">Deep Resolution</span>
      </div>

      <div className="section-body">
        {/* Sub tabs */}
        <div style={{ display: 'flex', gap: '8px', margin: '4px 0 14px' }}>
          <button
            className={`filter-pill ${activeTab === 'theories' ? 'active' : ''}`}
            onClick={() => setActiveTab('theories')}
          >
            🧩 Ending Breakdown & Theories
          </button>
          <button
            className={`filter-pill ${activeTab === 'similar' ? 'active' : ''}`}
            onClick={() => setActiveTab('similar')}
          >
            🎬 Similar Cinematic Vibes
          </button>
          <button
            className={`filter-pill ${activeTab === 'opposite' ? 'active' : ''}`}
            onClick={() => setActiveTab('opposite')}
          >
            ⚡ Completely Opposite (Palate Cleansers)
          </button>
        </div>

        {activeTab === 'theories' && (
          <div>
            <div className="says-box" style={{ borderLeftColor: '#f59e0b', marginBottom: '12px' }}>
              <span className="sub-label" style={{ color: '#fbbf24' }}>The Climactic Resolution</span>
              <p className="frame-text">{ending.summary}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ending.theories.map((theory, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    borderLeft: '3px solid #06b6d4',
                    fontSize: '12.5px',
                    lineHeight: '1.45',
                    color: '#e2e8f0',
                  }}
                >
                  {theory}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'similar' && (
          <div>
            <p style={{ fontSize: '12.5px', color: '#94a3b8', marginBottom: '10px' }}>
              If you loved the narrative architecture and philosophical weight of this film, watch these next:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ending.similarMovies.map((sim, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#fff' }}>
                      {sim.title} ({sim.year}) •{' '}
                      <span style={{ color: '#fbbf24', fontSize: '12px' }}>★ {sim.rating}%</span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>dir. {sim.director}</div>
                    <p style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>{sim.pitch}</p>
                  </div>
                  {onSelectMovie && (
                    <button
                      onClick={() => onSelectMovie(sim.title)}
                      className="filter-pill"
                      style={{ fontSize: '11px', padding: '4px 10px', marginLeft: '12px', whiteSpace: 'nowrap' }}
                    >
                      Inspect ↗
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'opposite' && (
          <div>
            <p style={{ fontSize: '12.5px', color: '#fb7185', marginBottom: '10px' }}>
              <strong>Tonal Palate Cleansers:</strong> Finished watching something intensely heavy or mind-bending? These films provide complete antithetical relief in color, warmth, or pacing:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ending.oppositeMovies.map((opp, i) => (
                <div key={i} className="contrast-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="contrast-title">
                      {opp.title} ({opp.year}) • <span style={{ color: '#fbbf24' }}>★ {opp.rating}%</span>
                    </div>
                    {onSelectMovie && (
                      <button
                        onClick={() => onSelectMovie(opp.title)}
                        className="filter-pill"
                        style={{ fontSize: '11px', padding: '3px 8px' }}
                      >
                        Reset Mood ↗
                      </button>
                    )}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '2px' }}>
                    dir. {opp.director}
                  </div>
                  <p style={{ fontSize: '12px', color: '#f1f5f9', marginTop: '6px' }}>
                    <strong>Why it's polar opposite:</strong> {opp.contrastReason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
