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
                background: '#f8fafc',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)',
                borderLeft: `3px solid ${item.type === 'funny' ? 'var(--gold-500)' : 'var(--crimson-500)'}`,
                borderLeftWidth: '3px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-dark)' }}>
                  {item.title}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {item.timestamp ? `Scene: ${item.timestamp}` : ''} •{' '}
                  <strong style={{ color: item.type === 'funny' ? 'var(--gold-600)' : 'var(--crimson-600)' }}>
                    {item.type.toUpperCase()}
                  </strong>
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-body)', marginTop: '4px', lineHeight: '1.45' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
