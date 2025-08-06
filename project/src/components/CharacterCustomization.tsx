import React, { useState } from 'react';
import { ArrowLeft, Check, Palette, Shirt, User } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  emoji: string;
  color: string;
  outfit: string;
}

interface CharacterCustomizationProps {
  onBack: () => void;
  onSave: (character: Character) => void;
  currentCharacter: Character;
}

const CharacterCustomization: React.FC<CharacterCustomizationProps> = ({ 
  onBack, 
  onSave, 
  currentCharacter 
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(currentCharacter);
  const [activeTab, setActiveTab] = useState<'avatar' | 'color' | 'outfit'>('avatar');

  const avatars = [
    { id: 'alien1', name: 'Zyx', emoji: '👽', description: 'Classic Green Alien' },
    { id: 'alien2', name: 'Blip', emoji: '🛸', description: 'UFO Pilot' },
    { id: 'alien3', name: 'Nova', emoji: '🌟', description: 'Star Being' },
    { id: 'alien4', name: 'Cosmo', emoji: '🚀', description: 'Space Explorer' },
    { id: 'alien5', name: 'Orbit', emoji: '🪐', description: 'Planet Guardian' },
    { id: 'alien6', name: 'Nebula', emoji: '☄️', description: 'Comet Rider' }
  ];

  const colors = [
    { id: 'green', name: 'Cosmic Green', value: '#4ade80', glow: 'rgba(74, 222, 128, 0.6)' },
    { id: 'blue', name: 'Nebula Blue', value: '#3b82f6', glow: 'rgba(59, 130, 246, 0.6)' },
    { id: 'purple', name: 'Galaxy Purple', value: '#a855f7', glow: 'rgba(168, 85, 247, 0.6)' },
    { id: 'pink', name: 'Plasma Pink', value: '#ec4899', glow: 'rgba(236, 72, 153, 0.6)' },
    { id: 'cyan', name: 'Quantum Cyan', value: '#06b6d4', glow: 'rgba(6, 182, 212, 0.6)' },
    { id: 'orange', name: 'Solar Orange', value: '#f97316', glow: 'rgba(249, 115, 22, 0.6)' }
  ];

  const outfits = [
    { id: 'space_suit', name: 'Space Suit', icon: '🚀', description: 'Classic astronaut gear' },
    { id: 'energy_armor', name: 'Energy Armor', icon: '⚡', description: 'High-tech protection' },
    { id: 'crystal_robe', name: 'Crystal Robe', icon: '💎', description: 'Mystical alien attire' },
    { id: 'stealth_cloak', name: 'Stealth Cloak', icon: '🌫️', description: 'Invisible mode gear' },
    { id: 'royal_cape', name: 'Royal Cape', icon: '👑', description: 'Galactic royalty' },
    { id: 'tech_vest', name: 'Tech Vest', icon: '🔧', description: 'Engineer equipment' }
  ];

  const handleSave = () => {
    onSave(selectedCharacter);
    onBack();
  };

  const updateCharacter = (updates: Partial<Character>) => {
    setSelectedCharacter(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Enhanced Space Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-indigo-900 to-black">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
        <div className="nebula nebula-3"></div>
        <div className="nebula nebula-4"></div>
        
        <div className="floating-planet planet-1"></div>
        <div className="floating-planet planet-2"></div>
        <div className="floating-planet planet-3"></div>
        <div className="floating-planet planet-4"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group"
        >
          <ArrowLeft className="w-6 h-6 group-hover:animate-pulse" />
          <span className="font-bold">Back</span>
        </button>
        
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-6 py-3 bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-full hover:bg-green-600/40 transition-all duration-300 hover:scale-105 text-green-400 font-bold"
        >
          <Check className="w-5 h-5" />
          <span>Save Character</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center p-4">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="holographic-text text-3xl md:text-5xl font-bold mb-4">
            👽 CUSTOMIZE YOUR CHARACTER
          </h1>
          <p className="text-cyan-300 text-lg animate-pulse">
            Create your unique alien identity!
          </p>
        </div>

        {/* Character Preview */}
        <div className="mb-8">
          <div className="character-preview">
            <div 
              className="character-preview-body"
              style={{ 
                background: `radial-gradient(circle, ${colors.find(c => c.id === selectedCharacter.color)?.value || '#4ade80'}, ${colors.find(c => c.id === selectedCharacter.color)?.value || '#4ade80'}dd)`,
                boxShadow: `0 0 40px ${colors.find(c => c.id === selectedCharacter.color)?.glow || 'rgba(74, 222, 128, 0.6)'}`
              }}
            >
              <div className="character-avatar">
                {avatars.find(a => a.id === selectedCharacter.id)?.emoji || '👽'}
              </div>
              <div className="character-outfit">
                {outfits.find(o => o.id === selectedCharacter.outfit)?.icon || '🚀'}
              </div>
            </div>
            <div className="character-name">
              {avatars.find(a => a.id === selectedCharacter.id)?.name || 'Alien'}
            </div>
          </div>
        </div>

        {/* Customization Tabs */}
        <div className="w-full max-w-4xl">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-6 space-x-4">
            <button
              onClick={() => setActiveTab('avatar')}
              className={`tab-button ${activeTab === 'avatar' ? 'active' : ''}`}
            >
              <User className="w-5 h-5 mr-2" />
              Avatar
            </button>
            <button
              onClick={() => setActiveTab('color')}
              className={`tab-button ${activeTab === 'color' ? 'active' : ''}`}
            >
              <Palette className="w-5 h-5 mr-2" />
              Color
            </button>
            <button
              onClick={() => setActiveTab('outfit')}
              className={`tab-button ${activeTab === 'outfit' ? 'active' : ''}`}
            >
              <Shirt className="w-5 h-5 mr-2" />
              Outfit
            </button>
          </div>

          {/* Tab Content */}
          <div className="customization-content">
            {activeTab === 'avatar' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {avatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    onClick={() => updateCharacter({ id: avatar.id, name: avatar.name, emoji: avatar.emoji })}
                    className={`customization-option ${selectedCharacter.id === avatar.id ? 'selected' : ''}`}
                  >
                    <div className="option-icon">{avatar.emoji}</div>
                    <div className="option-name">{avatar.name}</div>
                    <div className="option-description">{avatar.description}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'color' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {colors.map((color) => (
                  <div
                    key={color.id}
                    onClick={() => updateCharacter({ color: color.id })}
                    className={`customization-option ${selectedCharacter.color === color.id ? 'selected' : ''}`}
                  >
                    <div 
                      className="color-preview"
                      style={{ 
                        background: color.value,
                        boxShadow: `0 0 20px ${color.glow}`
                      }}
                    ></div>
                    <div className="option-name">{color.name}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'outfit' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {outfits.map((outfit) => (
                  <div
                    key={outfit.id}
                    onClick={() => updateCharacter({ outfit: outfit.id })}
                    className={`customization-option ${selectedCharacter.outfit === outfit.id ? 'selected' : ''}`}
                  >
                    <div className="option-icon">{outfit.icon}</div>
                    <div className="option-name">{outfit.name}</div>
                    <div className="option-description">{outfit.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCustomization;