import React, { useState } from 'react';
import '../styles/filmy.css';

export const OptionsApp: React.FC = () => {
  const [detectNetflix, setDetectNetflix] = useState(true);
  const [detectYouTube, setDetectYouTube] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <>
      <div className="filmy-atmosphere" />

      <div className="app-container" style={{ maxWidth: '650px', paddingTop: '32px' }}>
        <header className="cinema-header">
          <div className="brand-section">
            <div className="film-reel-icon">🎬</div>
            <div>
              <h1 className="brand-title">Cinephile Settings</h1>
              <div className="brand-sub">Movie Buff's Rabbit Hole Preferences</div>
            </div>
          </div>
        </header>

        <div className="rabbit-section" style={{ padding: '24px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              color: 'var(--text-dark)',
              marginBottom: '16px',
            }}
          >
            Streaming Platform Detection
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: 'var(--text-dark)', display: 'block' }}>Netflix Detection</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Automatically detect titles playing on netflix.com
                </span>
              </div>
              <input
                type="checkbox"
                checked={detectNetflix}
                onChange={(e) => setDetectNetflix(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#be123c' }}
              />
            </label>

            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: 'var(--text-dark)', display: 'block' }}>YouTube Detection</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Automatically extract video titles and trailers on youtube.com
                </span>
              </div>
              <input
                type="checkbox"
                checked={detectYouTube}
                onChange={(e) => setDetectYouTube(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#be123c' }}
              />
            </label>
          </div>

          <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleSave}
              className="search-btn"
              style={{ padding: '10px 24px', fontSize: '13px' }}
            >
              Save Preferences
            </button>
            {savedNotice && (
              <span style={{ color: '#059669', fontSize: '13px', fontWeight: 600 }}>
                ✓ Preferences saved!
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
