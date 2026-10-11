import React, { useState } from 'react';
import type { SimilarMovie, OppositeMovie } from '../types/movie';

interface EndingExplainedCardProps {
  ending?: {
    summary: string;
    theories: string[];
    theoryUrls?: { theory: string; url: string }[];
    similarMovies: SimilarMovie[];
    oppositeMovies: OppositeMovie[];
  };
  onSelectMovie?: (title: string) => void;
}

export const EndingExplainedCard: React.FC<EndingExplainedCardProps> = ({ ending }) => {
  const [activeTab, setActiveTab] = useState<'theories' | 'similar' | 'opposite'>('theories');

  if (!ending || !ending.summary) return null;

  return (
    <div className="rabbit-section">
      <div className="section-trigger" style={{ cursor: 'default' }}>
        <div className="section-trigger-title">
          <span className="section-icon">🌀</span>
          <div>
            <h3 className="section-heading">Ending Explained & Movie Bridges</h3>
          </div>
        </div>
        <span className="section-badge">Resolution</span>
      </div>

      <div className="section-body">
        {/* Max 3 Sub Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
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
            ⚡ Completely Opposite
          </button>
        </div>

        {/* Theories Tab */}
        {activeTab === 'theories' && (
          <div>
            <div className="says-box" style={{ borderLeftColor: '#f59e0b', marginBottom: '12px' }}>
              <span className="sub-label" style={{ color: '#d97706' }}>Climactic Climax & Resolution</span>
              <p className="frame-text">{ending.summary}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ending.theories.map((theory, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#f8fafc',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    borderLeft: '3px solid #06b6d4',
                    fontSize: '13px',
                    lineHeight: '1.45',
                    color: '#0f172a',
                  }}
                >
                  {theory}
                </div>
              ))}
            </div>

            {/* Real Exploration Links for Theories */}
            {ending.theoryUrls && ending.theoryUrls.length > 0 && (
              <div style={{ marginTop: '14px', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#be123c', fontWeight: 800 }}>
                  Active Exploration Links & Video Essays
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                  {ending.theoryUrls.map((tu, i) => (
                    <a
                      key={i}
                      href={tu.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-row"
                      style={{ fontSize: '12.5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <span>▶ {tu.theory}</span>
                      <span style={{ fontSize: '11px', color: '#be123c', fontWeight: 600 }}>Explore ↗</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Similar Movies Tab */}
        {activeTab === 'similar' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ending.similarMovies.map((sim, i) => (
              <div
                key={i}
                style={{
                  background: '#f8fafc',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px' }}>
                    {sim.title} ({sim.year}) • <span style={{ color: '#be123c' }}>★ {sim.rating}%</span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                    dir. {sim.director}
                  </div>
                  <p style={{ fontSize: '12px', color: '#334155', marginTop: '4px' }}>
                    {sim.pitch}
                  </p>
                </div>

                <a
                  href={sim.exploreUrl || `https://www.imdb.com/find/?q=${encodeURIComponent(sim.title)}`}
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
        )}

        {/* Opposite Movies Tab */}
        {activeTab === 'opposite' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ending.oppositeMovies.map((opp, i) => (
              <div
                key={i}
                style={{
                  background: '#f8fafc',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px' }}>
                    {opp.title} ({opp.year}) • <span style={{ color: '#0891b2' }}>★ {opp.rating}%</span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                    dir. {opp.director}
                  </div>
                  <p style={{ fontSize: '12px', color: '#334155', marginTop: '4px' }}>
                    {opp.contrastReason}
                  </p>
                </div>

                <a
                  href={opp.exploreUrl || `https://www.imdb.com/find/?q=${encodeURIComponent(opp.title)}`}
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
        )}
      </div>
    </div>
  );
};
