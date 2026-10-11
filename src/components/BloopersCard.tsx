import React, { useState } from 'react';
import type { BlooperItem } from '../types/movie';

interface BloopersCardProps {
  bloopers: BlooperItem[];
}

export const BloopersCard: React.FC<BloopersCardProps> = ({ bloopers }) => {
  const [activeType, setActiveType] = useState<'all' | 'funny' | 'dramatic'>('all');

  // Rule 12: DO NOT ADD BLOOPERS IF NOT AVAILABLE
  if (!bloopers || bloopers.length === 0) return null;

  const filtered = bloopers.filter((b) => {
    if (activeType === 'all') return true;
    return b.type === activeType;
  });

  return (
    <div className="rabbit-section">
      <div className="section-trigger" style={{ cursor: 'default' }}>
        <div className="section-trigger-title">
          <span className="section-icon">🎪</span>
          <div>
            <h3 className="section-heading">Bloopers & BTS Outtakes</h3>
          </div>
        </div>
        <span className="section-badge">{bloopers.length} Real Outtakes</span>
      </div>

      <div className="section-body">
        {/* Max 3 Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <button
            className={`filter-pill ${activeType === 'all' ? 'active' : ''}`}
            onClick={() => setActiveType('all')}
          >
            All Outtakes
          </button>
          <button
            className={`filter-pill ${activeType === 'funny' ? 'active' : ''}`}
            onClick={() => setActiveType('funny')}
          >
            😂 Funny Gag Reels
          </button>
          <button
            className={`filter-pill ${activeType === 'dramatic' ? 'active' : ''}`}
            onClick={() => setActiveType('dramatic')}
          >
            ⚡ On-Set Hazards
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#f8fafc',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px' }}>
                  {item.title}
                </span>
                {item.videoUrl && (
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="explore-link-btn"
                  >
                    Watch Real Video ↗
                  </a>
                )}
              </div>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '4px' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
