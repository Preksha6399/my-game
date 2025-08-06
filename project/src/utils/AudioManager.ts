// src/utils/AudioManager.ts

export class AudioManager {
  private static instance: AudioManager;
  private backgroundAudio: HTMLAudioElement;

  private constructor() {
    this.backgroundAudio = new Audio('/music/home-ambient.mp3');
    this.backgroundAudio.loop = true;
    this.backgroundAudio.volume = 0.5; // Default volume
  }

  // Singleton pattern
  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public playMusic(): void {
    this.backgroundAudio.play().catch((error) => {
      console.warn('Music play was blocked by browser autoplay policy:', error);
    });
  }

  public pauseMusic(): void {
    this.backgroundAudio.pause();
  }

  public toggleMusic(): void {
    if (this.backgroundAudio.paused) {
      this.playMusic();
    } else {
      this.pauseMusic();
    }
  }

  public isPlaying(): boolean {
    return !this.backgroundAudio.paused;
  }

  public setVolume(volume: number): void {
    this.backgroundAudio.volume = Math.max(0, Math.min(1, volume));
  }

  public mute(): void {
    this.backgroundAudio.muted = true;
  }

  public unmute(): void {
    this.backgroundAudio.muted = false;
  }

 public isMuted(): boolean {
  return this.backgroundAudio.muted;
} // ✅ <-- This closing bracket must be followed by a semicolon

public setMuted(muted: boolean): void {
  this.backgroundAudio.muted = muted;
}

public cleanup(): void {
  this.pauseMusic();
  this.backgroundAudio.src = '';
}

}