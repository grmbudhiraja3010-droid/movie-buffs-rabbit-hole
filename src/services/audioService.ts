/**
 * Audio Service for Movie Buff's Rabbit Hole.
 * Coordinates background soundtrack playback with offscreen document.
 * Manages semantic song recommendations (max 2 suggestions at any time).
 */
import { ALL_SEMANTIC_SONGS } from '../data/movies';
import type { SoundtrackTrack } from '../types/movie';

export interface AudioState {
  isPlaying: boolean;
  currentSong: SoundtrackTrack | null;
  volume: number;
  suggestions: SoundtrackTrack[]; // exactly 2 recommendations max
}

class AudioClient {
  private isPlaying: boolean = false;
  private currentSong: SoundtrackTrack | null = null;
  private volume: number = 0.5;
  private suggestions: SoundtrackTrack[] = [];
  private listeners: Set<(state: AudioState) => void> = new Set();

  constructor() {
    this.initStatusCheck();
    this.listenForBackgroundUpdates();
  }

  private initStatusCheck() {
    if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
      chrome.runtime.sendMessage({ type: 'GET_AUDIO_STATUS' }).then((res) => {
        if (res && res.isPlaying) {
          this.isPlaying = res.isPlaying;
          this.currentSong = res.currentSong;
          this.volume = res.volume ?? 0.5;
          this.notify();
        }
      }).catch(() => {});
    }
  }

  private listenForBackgroundUpdates() {
    if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
      chrome.runtime.onMessage.addListener((msg) => {
        if (msg.type === 'AUDIO_STATUS_CHANGED') {
          this.isPlaying = msg.isPlaying;
          this.currentSong = msg.currentSong;
          this.volume = msg.volume ?? this.volume;
          this.notify();
        }
      });
    }
  }

  public subscribe(fn: (state: AudioState) => void): () => void {
    this.listeners.add(fn);
    fn(this.getState());
    return () => {
      this.listeners.delete(fn);
    };
  }

  public getState(): AudioState {
    return {
      isPlaying: this.isPlaying,
      currentSong: this.currentSong,
      volume: this.volume,
      suggestions: this.suggestions.slice(0, 2),
    };
  }

  private notify() {
    const s = this.getState();
    this.listeners.forEach((fn) => fn(s));
  }

  /**
   * Sets the initial 2 song suggestions for a given movie/video context.
   */
  public setInitialSongs(initialTracks: SoundtrackTrack[]) {
    if (initialTracks.length >= 2) {
      this.suggestions = initialTracks.slice(0, 2);
    } else if (initialTracks.length === 1) {
      const first = initialTracks[0];
      const secondId = first.similarSongIds?.[0] || 'st_piaf';
      const second = ALL_SEMANTIC_SONGS[secondId] || ALL_SEMANTIC_SONGS.st_piaf;
      this.suggestions = [first, second];
    } else {
      this.suggestions = [ALL_SEMANTIC_SONGS.st_time, ALL_SEMANTIC_SONGS.st_piaf];
    }
    this.notify();
  }

  /**
   * Plays a selected song and immediately updates the 2 suggestions with similarity to it.
   */
  public selectAndPlaySong(song: SoundtrackTrack) {
    this.currentSong = song;
    this.isPlaying = true;

    // Dynamically calculate 2 similar songs to this selected song
    const similarIds = song.similarSongIds || [];
    const nextSuggestions: SoundtrackTrack[] = [];

    for (const sid of similarIds) {
      if (ALL_SEMANTIC_SONGS[sid] && ALL_SEMANTIC_SONGS[sid].id !== song.id) {
        nextSuggestions.push(ALL_SEMANTIC_SONGS[sid]);
      }
      if (nextSuggestions.length === 2) break;
    }

    // Fallback if less than 2
    if (nextSuggestions.length < 2) {
      for (const key of Object.keys(ALL_SEMANTIC_SONGS)) {
        const candidate = ALL_SEMANTIC_SONGS[key];
        if (candidate.id !== song.id && !nextSuggestions.some((s) => s.id === candidate.id)) {
          nextSuggestions.push(candidate);
        }
        if (nextSuggestions.length === 2) break;
      }
    }

    this.suggestions = nextSuggestions.slice(0, 2);

    // Send command to offscreen player
    if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
      chrome.runtime.sendMessage({
        type: 'PLAY_SONG',
        song: {
          id: song.id,
          title: song.title,
          artist: song.composer,
          mood: song.mood,
          melodyStyle: song.melodyStyle,
        },
        volume: this.volume,
      }).catch(() => {});
    }

    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.stop();
    } else {
      const toPlay = this.currentSong || this.suggestions[0] || ALL_SEMANTIC_SONGS.st_time;
      this.selectAndPlaySong(toPlay);
    }
  }

  public stop() {
    this.isPlaying = false;
    if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
      chrome.runtime.sendMessage({ type: 'STOP_SONG' }).catch(() => {});
    }
    this.notify();
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
      chrome.runtime.sendMessage({ type: 'SET_VOLUME', volume: this.volume }).catch(() => {});
    }
    this.notify();
  }
}

export const audioClient = new AudioClient();
