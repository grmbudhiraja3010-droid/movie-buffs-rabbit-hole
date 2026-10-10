/**
 * Audio Service for Movie Buff's Rabbit Hole.
 * Generates rich, cinematic, atmospheric background soundtrack scores
 * directly via the Web Audio API with zero external dependencies.
 *
 * Supports volume control, mute, ambient presets (Noir Drone, Sci-Fi Synth,
 * Tension Strings, Lo-Fi Tape, Orchestral Glow), and playback states.
 */

export interface TrackMetadata {
  id: string;
  title: string;
  composer: string;
  mood: string;
  preset: 'noir_drone' | 'scifi_synth' | 'tension_strings' | 'lofi_tape' | 'orchestral_glow';
}

class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.45;
  private isMuted: boolean = false;
  private activePreset: string = 'noir_drone';
  private oscillators: (OscillatorNode | AudioNode)[] = [];
  private timerId: number | null = null;
  private listeners: Set<(state: { isPlaying: boolean; volume: number; isMuted: boolean; activePreset: string }) => void> = new Set();

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

  public subscribe(fn: (state: { isPlaying: boolean; volume: number; isMuted: boolean; activePreset: string }) => void): () => void {
    this.listeners.add(fn);
    fn(this.getState());
    return () => {
      this.listeners.delete(fn);
    };
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      volume: this.volume,
      isMuted: this.isMuted,
      activePreset: this.activePreset,
    };
  }

  private notify() {
    const s = this.getState();
    this.listeners.forEach((fn) => fn(s));
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      const target = this.isMuted ? 0 : this.volume * 0.3; // safe ceiling
      this.gainNode.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
  }

  public stop() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    for (const node of this.oscillators) {
      try {
        if ('stop' in node && typeof (node as OscillatorNode).stop === 'function') {
          (node as OscillatorNode).stop();
        }
        node.disconnect();
      } catch {
        // already disconnected
      }
    }
    this.oscillators = [];
    this.isPlaying = false;
    this.notify();
  }

  public playPreset(preset: 'noir_drone' | 'scifi_synth' | 'tension_strings' | 'lofi_tape' | 'orchestral_glow') {
    this.activePreset = preset;
    const ctx = this.getContext();

    this.stop();

    const masterGain = ctx.createGain();
    const targetVol = this.isMuted ? 0 : this.volume * 0.3;
    masterGain.gain.setValueAtTime(targetVol, ctx.currentTime);
    masterGain.connect(ctx.destination);
    this.gainNode = masterGain;

    if (preset === 'noir_drone') {
      this.createNoirDrone(ctx, masterGain);
    } else if (preset === 'scifi_synth') {
      this.createSciFiSynth(ctx, masterGain);
    } else if (preset === 'tension_strings') {
      this.createTensionStrings(ctx, masterGain);
    } else if (preset === 'lofi_tape') {
      this.createLoFiTape(ctx, masterGain);
    } else {
      this.createOrchestralGlow(ctx, masterGain);
    }

    this.isPlaying = true;
    this.notify();
  }

  public togglePlay(preset?: 'noir_drone' | 'scifi_synth' | 'tension_strings' | 'lofi_tape' | 'orchestral_glow') {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.playPreset(preset || (this.activePreset as any) || 'noir_drone');
    }
  }

  // ── Preset Synthesizers ──────────────────────────────────────────────────

  private createNoirDrone(ctx: AudioContext, dest: AudioNode) {
    // D minor cinematic chord: D2 (73.4Hz), A2 (110Hz), F3 (174.6Hz), D3 (146.8Hz)
    const freqs = [73.42, 110.0, 146.83, 174.61];
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, ctx.currentTime);
    filter.connect(dest);

    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime);

      // subtle detune for warm analog chorus
      osc.detune.setValueAtTime((i - 1.5) * 4, ctx.currentTime);

      gain.gain.setValueAtTime(0.22 / (i + 1), ctx.currentTime);
      osc.connect(gain);
      gain.connect(filter);
      osc.start();
      this.oscillators.push(osc, gain);
    });

    // LFO modulation for breathing cinematic pulse
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // very slow 8-second swell
    lfoGain.gain.setValueAtTime(140, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    this.oscillators.push(lfo, lfoGain, filter);
  }

  private createSciFiSynth(ctx: AudioContext, dest: AudioNode) {
    // Shimmering sci-fi fifths: C3 (130.8Hz), G3 (196Hz), D4 (293.6Hz), A4 (440Hz)
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);
    filter.connect(dest);

    const freqs = [130.81, 196.0, 293.66, 440.0];
    freqs.forEach((f) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      osc.connect(gain);
      gain.connect(filter);
      osc.start();
      this.oscillators.push(osc, gain);
    });

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
    lfoGain.gain.setValueAtTime(250, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    this.oscillators.push(lfo, lfoGain, filter);
  }

  private createTensionStrings(ctx: AudioContext, dest: AudioNode) {
    // Sharp suspense cluster: C#2 (69.3Hz), D2 (73.4Hz), A2 (110Hz)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, ctx.currentTime);
    filter.connect(dest);

    const freqs = [69.3, 73.42, 110.0, 116.54];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      osc.detune.setValueAtTime((i % 2 === 0 ? 6 : -6), ctx.currentTime);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      osc.connect(gain);
      gain.connect(filter);
      osc.start();
      this.oscillators.push(osc, gain);
    });

    this.oscillators.push(filter);
  }

  private createLoFiTape(ctx: AudioContext, dest: AudioNode) {
    // Warm, sleepy electric piano warmth
    const freqs = [110, 164.81, 196.0, 246.94]; // A - E - G - B (maj9 vibe)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, ctx.currentTime);
    filter.connect(dest);

    freqs.forEach((f) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      osc.connect(gain);
      gain.connect(filter);
      osc.start();
      this.oscillators.push(osc, gain);
    });

    this.oscillators.push(filter);
  }

  private createOrchestralGlow(ctx: AudioContext, dest: AudioNode) {
    // Hans Zimmer style majestic ascending pad: F2 (87.3Hz), C3 (130.8Hz), A3 (220Hz), C4 (261.6Hz)
    const freqs = [87.31, 130.81, 220.0, 261.63];
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.connect(dest);

    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      gain.gain.setValueAtTime(0.25 / (i + 1), ctx.currentTime);
      osc.connect(gain);
      gain.connect(filter);
      osc.start();
      this.oscillators.push(osc, gain);
    });

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.08, ctx.currentTime);
    lfoGain.gain.setValueAtTime(180, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    this.oscillators.push(lfo, lfoGain, filter);
  }
}

export const audioEngine = new CinematicAudioEngine();
