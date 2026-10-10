/**
 * Offscreen audio player for Movie Buff's Rabbit Hole.
 * Runs in the background independently of the popup DOM.
 * Generates rich, melodic, semantically matching songs side-by-side with movie audio.
 * Does NOT stop when the popup is closed or minimized.
 * Stops only when manually stopped or when the page changes.
 */

interface SongPayload {
  id: string;
  title: string;
  artist: string;
  mood: string;
  melodyStyle: string;
}

class OffscreenAudioPlayer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentSong: SongPayload | null = null;
  private volume: number = 0.5;
  private isMuted: boolean = false;
  private activeNodes: (AudioNode | number)[] = [];

  constructor() {
    this.setupListeners();
  }

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private setupListeners() {
    chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
      if (msg.type === 'PLAY_SONG') {
        this.play(msg.song, msg.volume ?? this.volume);
        sendResponse({ success: true, isPlaying: true, song: this.currentSong, volume: this.volume });
      } else if (msg.type === 'STOP_SONG' || msg.type === 'STOP_AUDIO_PAGE_CHANGED') {
        this.stop();
        sendResponse({ success: true, isPlaying: false });
      } else if (msg.type === 'SET_VOLUME') {
        this.setVolume(msg.volume);
        sendResponse({ success: true, volume: this.volume });
      } else if (msg.type === 'GET_AUDIO_STATUS') {
        sendResponse({
          isPlaying: this.isPlaying,
          currentSong: this.currentSong,
          volume: this.volume,
          isMuted: this.isMuted,
        });
      }
      return true;
    });
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.volume * 0.35;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
    // Broadcast status update
    chrome.runtime.sendMessage({
      type: 'AUDIO_STATUS_CHANGED',
      isPlaying: this.isPlaying,
      currentSong: this.currentSong,
      volume: this.volume,
    }).catch(() => {});
  }

  public stop() {
    for (const item of this.activeNodes) {
      if (typeof item === 'number') {
        window.clearInterval(item);
      } else {
        try {
          if ('stop' in item && typeof (item as OscillatorNode).stop === 'function') {
            (item as OscillatorNode).stop();
          }
          item.disconnect();
        } catch {
          // already disconnected
        }
      }
    }
    this.activeNodes = [];
    this.isPlaying = false;
    this.currentSong = null;

    chrome.runtime.sendMessage({
      type: 'AUDIO_STATUS_CHANGED',
      isPlaying: false,
      currentSong: null,
      volume: this.volume,
    }).catch(() => {});
  }

  public play(song: SongPayload, vol: number) {
    this.stop();
    this.currentSong = song;
    this.volume = vol;
    const ctx = this.getContext();

    const master = ctx.createGain();
    master.gain.setValueAtTime(this.volume * 0.35, ctx.currentTime);
    master.connect(ctx.destination);
    this.masterGain = master;

    // Synthesize semantic musical piece based on melodyStyle
    this.renderSemanticMelody(ctx, master, song.melodyStyle);

    this.isPlaying = true;
    chrome.runtime.sendMessage({
      type: 'AUDIO_STATUS_CHANGED',
      isPlaying: true,
      currentSong: this.currentSong,
      volume: this.volume,
    }).catch(() => {});
  }

  private renderSemanticMelody(ctx: AudioContext, dest: AudioNode, style: string) {
    // 1. Time (Hans Zimmer style ascending minor chord progression: Am -> F -> C -> G/B)
    if (style === 'time_crescendo') {
      const chords = [
        [220.0, 261.63, 329.63, 440.0], // Am
        [174.61, 220.0, 261.63, 349.23], // F
        [130.81, 164.81, 196.0, 261.63], // C
        [123.47, 146.83, 196.0, 246.94], // G
      ];
      let step = 0;
      const playStep = () => {
        const freqs = chords[step % chords.length] || chords[0];
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = i === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          g.gain.setValueAtTime(0.001, ctx.currentTime);
          g.gain.exponentialRampToValueAtTime(0.2 / (i + 1), ctx.currentTime + 1.2);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.8);
          osc.connect(g);
          g.connect(dest);
          osc.start();
          osc.stop(ctx.currentTime + 4.0);
          this.activeNodes.push(osc, g);
        });
        step++;
      };
      playStep();
      const interval = window.setInterval(playStep, 4000);
      this.activeNodes.push(interval);
    }
    // 2. Parisian Waltz / Édith Piaf style (3/4 tempo accordion/strings)
    else if (style === 'piaf_waltz') {
      const melodyNotes = [261.63, 293.66, 329.63, 392.0, 349.23, 329.63, 293.66];
      let nIdx = 0;
      const playWaltz = () => {
        // Bass on 1
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(130.81, ctx.currentTime);
        bassGain.gain.setValueAtTime(0.18, ctx.currentTime);
        bassGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        bassOsc.connect(bassGain);
        bassGain.connect(dest);
        bassOsc.start();
        bassOsc.stop(ctx.currentTime + 0.7);

        // Melody note
        const melOsc = ctx.createOscillator();
        const melGain = ctx.createGain();
        melOsc.type = 'sine';
        melOsc.frequency.setValueAtTime(melodyNotes[nIdx % melodyNotes.length], ctx.currentTime);
        melGain.gain.setValueAtTime(0.12, ctx.currentTime);
        melGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);
        melOsc.connect(melGain);
        melGain.connect(dest);
        melOsc.start();
        melOsc.stop(ctx.currentTime + 1.2);

        this.activeNodes.push(bassOsc, bassGain, melOsc, melGain);
        nIdx++;
      };
      playWaltz();
      const interval = window.setInterval(playWaltz, 1200);
      this.activeNodes.push(interval);
    }
    // 3. Korean Minimalist Melancholy Piano (Soju One Glass style)
    else if (style === 'soju_piano') {
      const pianoNotes = [196.0, 246.94, 293.66, 392.0, 440.0, 392.0, 329.63];
      let pIdx = 0;
      const playPiano = () => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(pianoNotes[pIdx % pianoNotes.length], ctx.currentTime);
        g.gain.setValueAtTime(0.2, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);
        osc.connect(g);
        g.connect(dest);
        osc.start();
        osc.stop(ctx.currentTime + 2.4);
        this.activeNodes.push(osc, g);
        pIdx++;
      };
      playPiano();
      const interval = window.setInterval(playPiano, 1800);
      this.activeNodes.push(interval);
    }
    // 4. Baroque Pizzicato Strings (Belt of Faith style)
    else if (style === 'belt_baroque') {
      const staccatoFreqs = [220, 277.18, 329.63, 440, 329.63, 277.18, 220, 164.81];
      let sIdx = 0;
      const playPizzicato = () => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(staccatoFreqs[sIdx % staccatoFreqs.length], ctx.currentTime);
        g.gain.setValueAtTime(0.22, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(g);
        g.connect(dest);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
        this.activeNodes.push(osc, g);
        sIdx++;
      };
      playPizzicato();
      const interval = window.setInterval(playPizzicato, 450);
      this.activeNodes.push(interval);
    }
    // 5. Oppenheimer Cascading Violin Motif
    else if (style === 'oppenheimer_strings') {
      const violinArp = [329.63, 392.0, 493.88, 587.33, 659.25, 587.33, 493.88, 392.0];
      let vIdx = 0;
      const playViolin = () => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(violinArp[vIdx % violinArp.length], ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);

        g.gain.setValueAtTime(0.08, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

        osc.connect(filter);
        filter.connect(g);
        g.connect(dest);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
        this.activeNodes.push(osc, filter, g);
        vIdx++;
      };
      playViolin();
      const interval = window.setInterval(playViolin, 300);
      this.activeNodes.push(interval);
    }
    // Default: Atmospheric Cinematic Pad
    else {
      const droneNotes = [110, 164.81, 220, 329.63];
      droneNotes.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        g.gain.setValueAtTime(0.15 / (i + 1), ctx.currentTime);
        osc.connect(g);
        g.connect(dest);
        osc.start();
        this.activeNodes.push(osc, g);
      });
    }
  }
}

new OffscreenAudioPlayer();
