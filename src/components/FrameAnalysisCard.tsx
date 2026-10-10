import React, { useState } from 'react';
import type { FrameAnalysis } from '../types/movie';

interface FrameAnalysisCardProps {
  frames: FrameAnalysis[];
}

export const FrameAnalysisCard: React.FC<FrameAnalysisCardProps> = ({ frames }) => {
  const [selectedFrameId, setSelectedFrameId] = useState(frames[0]?.id || '');
  const activeFrame = frames.find((f) => f.id === selectedFrameId) || frames[0];

  if (!activeFrame) return null;

  return (
    <div className="rabbit-section">
      <div className="section-trigger" style={{ cursor: 'default' }}>
        <div className="section-trigger-title">
          <span className="section-icon">🎞️</span>
          <div>
            <h3 className="section-heading">Current Frame: Says vs. Means</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Visual symbolism, cinematography subtext, & color psychology
            </p>
          </div>
        </div>
        <span className="section-badge">{frames.length} Key Sequences</span>
      </div>

      <div className="section-body">
        {/* Frame Selector Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
          {frames.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFrameId(f.id)}
              className={`filter-pill ${f.id === activeFrame.id ? 'active' : ''}`}
            >
              ⏱️ {f.timestamp} — {f.sceneTitle}
            </button>
          ))}
        </div>

        <div className="frame-card">
          <div className="frame-top">
            <span className="frame-title">{activeFrame.sceneTitle}</span>
            <span className="frame-time">{activeFrame.timestamp}</span>
          </div>

          <div className="says-means-grid">
            <div className="says-box">
              <span className="sub-label">Surface: Frame Says</span>
              <p className="frame-text">{activeFrame.says}</p>
            </div>

            <div className="means-box">
              <span className="sub-label">Subtext: Frame Means</span>
              <p className="frame-text">{activeFrame.means}</p>
            </div>
          </div>

          <div style={{ marginTop: '4px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Cinematic Symbolism:
            </span>
            <p style={{ fontSize: '12.5px', color: '#cbd5e1', lineHeight: '1.45' }}>
              {activeFrame.symbolismDetails}
            </p>
          </div>

          <div className="palette-bar">
            <span>Color Palette:</span>
            {activeFrame.paletteColors.map((hex, i) => (
              <span
                key={i}
                className="color-swatch"
                style={{ backgroundColor: hex }}
                title={`Color: ${hex}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
