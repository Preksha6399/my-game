
import { X, Volume2, VolumeX, Music, Zap, Shield, Sword, Volume1, Settings as SettingsIcon } from 'lucide-react';


import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  soundEffectsEnabled: boolean;
  onToggleSoundEffects: () => void;
  difficulty: 'easy' | 'medium' | 'hard';
  onDifficultyChange: (difficulty: 'easy' | 'medium' | 'hard') => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isMuted,
  onToggleMute,
  soundEffectsEnabled,
  onToggleSoundEffects,
  difficulty,
  onDifficultyChange,
  volume,
  onVolumeChange
}) => {
  if (!isOpen) return null;

  const difficultyOptions = [
    { id: 'easy', name: 'Cadet', icon: Shield, color: 'text-green-400', description: 'Perfect for beginners' },
    { id: 'medium', name: 'Explorer', icon: Zap, color: 'text-yellow-400', description: 'Balanced challenge' },
    { id: 'hard', name: 'Commander', icon: Sword, color: 'text-red-400', description: 'For coding masters' }
  ];

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return VolumeX;
    if (volume < 50) return Volume1;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-gradient-to-b from-purple-900/90 to-indigo-900/90 backdrop-blur-md border border-cyan-400/30 rounded-2xl p-6 w-full max-w-md mx-4 animate-modal-appear">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center">
  <SettingsIcon className="w-6 h-6 mr-2" />
  Settings
</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
          >
            <X className="w-6 h-6 text-cyan-400" />
          </button>
        </div>

        {/* Settings Options */}
        <div className="space-y-6">
          
          {/* Audio Settings */}
          <div className="settings-section">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Music className="w-5 h-5 mr-2 text-cyan-400" />
              Audio
            </h3>
            
            {/* Background Music */}
            <div className="settings-option">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <VolumeIcon className={`w-5 h-5 mr-3 ${isMuted ? 'text-red-400' : 'text-purple-400'}`} />
                  <span className="text-white">Background Music</span>
                </div>
                <button
                  onClick={onToggleMute}
                  className={`settings-toggle ${!isMuted ? 'active' : ''}`}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>
            </div>

            {/* Volume Control */}
            <div className="settings-option">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white flex items-center">
                    <Volume2 className="w-5 h-5 mr-3 text-cyan-400" />
                    Volume
                  </span>
                  <span className="text-cyan-400 font-bold">{volume}%</span>
                </div>
                
                {/* Volume Slider */}
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => onVolumeChange(parseInt(e.target.value))}
                    className="volume-slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    disabled={isMuted}
                  />
                  <div 
                    className="volume-fill absolute top-0 left-0 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg pointer-events-none transition-all duration-300"
                    style={{ width: `${isMuted ? 0 : volume}%` }}
                  ></div>
                </div>
                
                {/* Volume Level Indicators */}
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Silent</span>
                  <span>Loud</span>
                </div>
              </div>
            </div>
            {/* Sound Effects */}
            <div className="settings-option">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 mr-3 text-yellow-400" />
                  <span className="text-white">Sound Effects</span>
                </div>
                <button
                  onClick={onToggleSoundEffects}
                  className={`settings-toggle ${soundEffectsEnabled ? 'active' : ''}`}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Difficulty Settings */}
          <div className="settings-section">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Sword className="w-5 h-5 mr-2 text-cyan-400" />
              Difficulty Level
            </h3>
            
            <div className="space-y-3">
              {difficultyOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => onDifficultyChange(option.id as 'easy' | 'medium' | 'hard')}
                    className={`difficulty-option ${difficulty === option.id ? 'selected' : ''}`}
                  >
                    <div className="flex items-center">
                      <IconComponent className={`w-5 h-5 mr-3 ${option.color}`} />
                      <div className="text-left">
                        <div className="font-bold text-white">{option.name}</div>
                        <div className="text-sm text-gray-300">{option.description}</div>
                      </div>
                    </div>
                    {difficulty === option.id && (
                      <div className="difficulty-check">✓</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-cyan-400/20">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              🎵 Phase-specific alien music themes
            </p>
            <p className="text-xs text-gray-500">
              Settings are saved automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;