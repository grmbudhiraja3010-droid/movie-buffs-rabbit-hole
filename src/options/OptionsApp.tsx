import React, { useState } from 'react';
import '../styles/filmy.css';

export const OptionsApp: React.FC = () => {
  const [defaultVolume, setDefaultVolume] = useState(45);
  const [autoPlaySoundtrack, setAutoPlaySoundtrack] = useState(true);
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
      <div className="projector-glow" />

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
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: '#fff', marginBottom: '16px' }}>
            Soundtrack & Ambient Scores
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#fff', display: 'block' }}>Default Background Soundtrack Volume</strong>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Ambient soundtrack level when opening extension
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={defaultVolume}
                  onChange={(e) => setDefaultVolume(Number(e.target.value))}
                  className="volume-slider"
                />
                <span style={{ fontSize: '12px', color: '#fbbf24', width: '32px' }}>{defaultVolume}%</span>
              </div>
            </label>

            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#fff', display: 'block' }}>Auto-Play Cinematic Ambience</strong>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Subtly begin playing ambient synthesizer score when viewing film details
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoPlaySoundtrack}
                onChange={(e) => setAutoPlaySoundtrack(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#e11d48' }}
              />
            </label>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              color: '#fff',
              marginTop: '24px',
              marginBottom: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '16px',
            }}
          >
            Streaming Platform Detection
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#fff', display: 'block' }}>Netflix Detection</strong>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Automatically detect titles and frames playing on netflix.com
                </span>
              </div>
              <input
                type="checkbox"
                checked={detectNetflix}
                onChange={(e) => setDetectNetflix(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#e11d48' }}
              />
            </label>

            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#fff', display: 'block' }}>YouTube Detection</strong>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Automatically detect movie trailers and video essays on youtube.com
                </span>
              </div>
              <input
                type="checkbox"
                checked={detectYouTube}
                onChange={(e) => setDetectYouTube(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#e11d48' }}
              />
            </label>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="search-btn" onClick={handleSave} style={{ padding: '10px 24px' }}>
              Save Settings
            </button>
            {savedNotice && <span style={{ color: '#4ade80', fontSize: '13px' }}>✓ Settings saved successfully!</span>}
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '12px', color: '#64748b', marginTop: '16px' }}>
          GitHub Repository:{' '}
          <a
            href="https://github.com/grmbudhiraja3010-droid/movie-buffs-rabbit-hole"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fbbf24', textDecoration: 'none' }}
          >
            https://github.com/grmbudhiraja3010-droid/movie-buffs-rabbit-hole
          </a>
        </div>
      </div>
    </>
  );
};
