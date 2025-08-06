import React, { useEffect, useState } from 'react';
import { AudioManager } from '@/utils/AudioManager'; // Adjust path as needed

const GameView = () => {
  const audioManager = AudioManager.getInstance();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      audioManager.playMusic();
      setIsPlaying(true);
      window.removeEventListener('click', handleUserInteraction);
    };

    // Only play music after user clicks (browser autoplay policy)
    window.addEventListener('click', handleUserInteraction);

    return () => {
      audioManager.pauseMusic();
      window.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  const toggleMusic = () => {
    audioManager.toggleMusic();
    setIsPlaying(audioManager.isPlaying());
  };

  return (
    <div>
      {/* Your Game UI */}
      <button
        onClick={toggleMusic}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1000,
          padding: '10px 20px',
          background: isPlaying ? '#333' : '#555',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        {isPlaying ? 'Pause Music 🎵' : 'Play Music ▶️'}
      </button>
    </div>
  );
};

export default GameView;
