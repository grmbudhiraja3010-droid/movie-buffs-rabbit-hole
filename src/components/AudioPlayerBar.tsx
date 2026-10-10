import React, { useEffect, useState } from 'react';
import { audioEngine } from '../services/audioService';
import type { SoundtrackTrack } from '../types/movie';

interface AudioPlayerBarProps {
  tracks: SoundtrackTrack[];
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ tracks }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [isMuted, setIsMuted] = useState(false);

  const currentTrack = tracks[activeIdx] || tracks[0];

  useEffect(() => {
    const unsub = audioEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setVolume(state.volume);
      setIsMuted(state.isMuted);
    });
    return unsub;
  }, []);

  const handlePlayToggle = () => {
    if (currentTrack) {
      audioEngine.togglePlay(currentTrack.audioPreset);
    }
  };

  const handleNextTrack = () => {
    const next = (activeIdx + 1) % tracks.length;
    setActiveIdx(next);
    if (isPlaying) {
      audioEngine.playPreset(tracks[next].audioPreset);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    audioEngine.setVolume(val);
  };

  return (
    <div className="audio-bar">
      <div className="audio-track-info">
        <div className="equalizer-anim" style={{ opacity: isPlaying ? 1 : 0.3 }}>
          <div className="equalizer-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
          <div className="equalizer-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
          <div className="equalizer-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
        </div>
        <div className="track-names">
          <div className="track-title">{currentTrack?.title || 'Ambient Score'}</div>
          <div className="track-composer">
            {currentTrack?.composer} • {currentTrack?.mood}
          </div>
        </div>
      </div>

      <div className="audio-controls">
        <button
          className="audio-btn"
          onClick={handlePlayToggle}
          title={isPlaying ? 'Pause background soundtrack' : 'Play background soundtrack while watching'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <button className="audio-btn" onClick={handleNextTrack} title="Next ambient track">
          ⏭
        </button>

        <div className="volume-slider-wrap">
          <button
            className="audio-btn"
            style={{ width: '26px', height: '26px', fontSize: '11px' }}
            onClick={() => audioEngine.toggleMute()}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
          />
        </div>
      </div>
    </div>
  );
};
