import React, { useState } from 'react';
import type { DirectorsCut } from '../types/movie';

interface DirectorsCutCardProps {
  directorsCut?: DirectorsCut;
}

export const DirectorsCutCard: React.FC<DirectorsCutCardProps> = ({ directorsCut }) => {
  const [activeTab, setActiveTab] = useState<'vision' | 'filmography' | 'interviews'>('vision');

  if (!directorsCut || !directorsCut.creativeVision) return null;

  return (
    <div className="rabbit-section">
      <div className="section-trigger" style={{ cursor: 'default' }}>
        <div className="section-trigger-title">
          <span className="section-icon">🎬</span>
          <div>
            <h3 className="section-heading">Director’s Cut: Auteur Vault</h3>
          </div>
        </div>
        <span className="section-badge">{directorsCut.directorName}</span>
      </div>

      <div className="section-body">
        {/* Max 3 Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <button
            className={`filter-pill ${activeTab === 'vision' ? 'active' : ''}`}
            onClick={() => setActiveTab('vision')}
          >
            🎯 Vision & Inspirations
          </button>
          <button
            className={`filter-pill ${activeTab === 'filmography' ? 'active' : ''}`}
            onClick={() => setActiveTab('filmography')}
          >
            📽️ Director Filmography
          </button>
          <button
            className={`filter-pill ${activeTab === 'interviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('interviews')}
          >
            🎙️ Masterclasses & Talks
          </button>
        </div>

        {/* Vision & Inspirations Tab */}
        {activeTab === 'vision' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="says-box" style={{ borderLeftColor: '#f59e0b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span className="sub-label" style={{ color: '#d97706' }}>Creative Vision</span>
                {directorsCut.visionUrl && (
                  <a
                    href={directorsCut.visionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="explore-link-btn"
                  >
                    Watch Video Analysis ↗
                  </a>
                )}
              </div>
              <p className="frame-text">{directorsCut.creativeVision}</p>
            </div>

            <div className="says-box" style={{ borderLeftColor: '#06b6d4' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span className="sub-label" style={{ color: '#0891b2' }}>Inspirations & Influences</span>
                {directorsCut.inspirationUrl && (
                  <a
                    href={directorsCut.inspirationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="explore-link-btn"
                  >
                    Explore Influences ↗
                  </a>
                )}
              </div>
              <p className="frame-text">{directorsCut.inspiration}</p>
            </div>

            {/* ONLY DISPLAY BOOK SECTION IF ACTUALLY BASED ON A BOOK */}
            {directorsCut.isBasedOnBook && directorsCut.goodreadsUrl && (
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#be123c', fontWeight: 800 }}>
                  📚 Literary Origin (Based on Book)
                </div>
                <div style={{ marginTop: '4px', fontSize: '13px', color: '#0f172a' }}>
                  <strong>{directorsCut.bookTitle}</strong> by {directorsCut.bookAuthor}
                </div>
                <div style={{ marginTop: '8px' }}>
                  <a
                    href={directorsCut.goodreadsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-row"
                    style={{ display: 'inline-flex', fontSize: '12px', color: '#be123c', fontWeight: 600 }}
                  >
                    📖 View on Goodreads & Read Reader Reviews ↗
                  </a>
                </div>
                {directorsCut.bookDivergenceNotes && (
                  <p style={{ marginTop: '6px', fontSize: '12px', color: '#64748b' }}>
                    <strong>Adaptation Changes:</strong> {directorsCut.bookDivergenceNotes}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Filmography Tab */}
        {activeTab === 'filmography' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {directorsCut.directorFilmography.map((work, idx) => (
              <a
                key={idx}
                href={work.imdbUrl || `https://www.imdb.com/find/?q=${encodeURIComponent(work.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-row"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px' }}
              >
                <div>
                  <strong style={{ color: '#0f172a' }}>{work.title}</strong>{' '}
                  <span style={{ color: '#64748b', fontSize: '12px' }}>({work.year})</span>
                </div>
                <span style={{ fontSize: '12px', color: '#be123c', fontWeight: 600 }}>
                  ★ {work.rating}% on RT ↗
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Masterclasses & Talks Tab */}
        {activeTab === 'interviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {directorsCut.directorInterviews.map((iv) => (
              <a
                key={iv.id}
                href={iv.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-row"
                style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '4px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '13px' }}>
                    ▶ {iv.title}
                  </span>
                  <span style={{ fontSize: '11.5px', color: '#be123c', fontWeight: 600 }}>Watch ↗</span>
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                  {iv.source} · {iv.duration}
                </div>
                <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                  {iv.summary}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
