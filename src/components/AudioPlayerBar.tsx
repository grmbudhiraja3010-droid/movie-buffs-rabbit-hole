import React, { useEffect, useState } from 'react';
import { audioClient, type AudioState } from '../services/audioService';
import type { SoundtrackTrack } from '../types/movie';

interface AudioPlayerBarProps {
  initialTracks: SoundtrackTrack[];
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ initialTracks }) => {
  const [audioState, setAudioState] = useState<AudioState>(audioClient.getState());

  useEffect(() => {
    audioClient.setInitialSongs(initialTracks);
    const unsub = audioClient.subscribe((state) => {
      setAudioState(state);
    });
    return unsub;
  }, [initialTracks]);

  const handleSelectSong = (song: SoundtrackTrack) => {
    if (audioState.isPlaying && audioState.currentSong?.id === song.id) {
      audioClient.stop();
    } else {
      audioClient.selectAndPlaySong(song);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    audioClient.setVolume(val);
  };

  const currentSong = audioState.currentSong;

  return (
    <div className="audio-bar-card">
      <div className="audio-header-row">
        <div className="audio-current-info">
          <div className="equalizer-anim" style={{ opacity: audioState.isPlaying ? 1 : 0.4 }}>
            <div className="equalizer-bar" style={{ animationPlayState: audioState.isPlaying ? 'running' : 'paused' }} />
            <div className="equalizer-bar" style={{ animationPlayState: audioState.isPlaying ? 'running' : 'paused' }} />
            <div className="equalizer-bar" style={{ animationPlayState: audioState.isPlaying ? 'running' : 'paused' }} />
          </div>
          <div>
            <div className="audio-status-label">
              {audioState.isPlaying ? '🎧 Playing Side-by-Side with Movie' : '🎵 Ambient Soundtrack (Paused)'}
            </div>
            <div className="track-title-main">
              {currentSong ? `${currentSong.title} — ${currentSong.composer}` : 'Select a matching soundtrack below'}
            </div>
          </div>
        </div>

        <div className="audio-slider-controls">
          <button
            className="audio-circle-btn"
            onClick={() => audioClient.togglePlay()}
            title={audioState.isPlaying ? 'Pause background song' : 'Play soundtrack'}
          >
            {audioState.isPlaying ? '⏸' : '▶'}
          </button>

          <div className="volume-wrap">
            <span style={{ fontSize: '12px' }}>🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={audioState.volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              title={`Volume: ${Math.round(audioState.volume * 100)}%`}
            />
            <span style={{ fontSize: '11px', color: '#64748b', minWidth: '28px' }}>
              {Math.round(audioState.volume * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Exactly 2 Semantic Song Suggestions */}
      <div className="song-suggestions-wrapper">
        <div className="suggestions-badge-label">
          ✨ Semantically Matching Songs (2 Suggestions — click to play & update similar):
        </div>

        <div className="suggestions-grid">
          {audioState.suggestions.map((song) => {
            const isThisPlaying = audioState.isPlaying && audioState.currentSong?.id === song.id;

            return (
              <div
                key={song.id}
                className={`song-card-item ${isThisPlaying ? 'active-playing' : ''}`}
                onClick={() => handleSelectSong(song)}
              >
                <div className="song-item-left">
                  <div className="song-play-icon">
                    {isThisPlaying ? '🔊' : '▶'}
                  </div>
                  <div>
                    <div className="song-item-title">{song.title}</div>
                    <div className="song-item-artist">{song.composer}</div>
                    <div className="song-item-mood">{song.mood}</div>
                  </div>
                </div>

                <button className={`song-action-pill ${isThisPlaying ? 'playing' : ''}`}>
                  {isThisPlaying ? 'Playing' : 'Listen'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
