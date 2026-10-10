import React, { useState } from 'react';
import type { BlooperItem } from '../types/movie';

interface BloopersCardProps {
  bloopers: BlooperItem[];
}

export const BloopersCard: React.FC<BloopersCardProps> = ({ bloopers }) => {
  const [activeType, setActiveType] = useState<'all' | 'funny' | 'dramatic'>('all');

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
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Funny corpsing & unscripted laughter vs. dramatic on-set hazards
            </p>
          </div>
        </div>
        <span className="section-badge">{bloopers.length} Outtakes</span>
      </div>

      <div className="section-body">
        <div style={{ display: 'flex', gap: '8px', margin: '4px 0 12px' }}>
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
            😂 Funny / Props & Corpsing
          </button>
          <button
            className={`filter-pill ${activeType === 'dramatic' ? 'active' : ''}`}
            onClick={() => setActiveType('dramatic')}
          >
            ⚡ Dramatic / Intense Hazards
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '12px 14px',
                borderRadius: '8px',
                borderLeft: `3px solid ${item.type === 'funny' ? '#f59e0b' : '#e11d48'}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#fff' }}>
                  {item.title}
                </span>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  {item.timestamp ? `Scene: ${item.timestamp}` : ''} •{' '}
                  <strong style={{ color: item.type === 'funny' ? '#fbbf24' : '#fb7185' }}>
                    {item.type.toUpperCase()}
                  </strong>
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#cbd5e1', marginTop: '4px', lineHeight: '1.45' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
