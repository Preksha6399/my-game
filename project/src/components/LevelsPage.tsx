import React, { useState, useEffect } from 'react';
import { ArrowLeft, Lock, Star, Zap, Rocket } from 'lucide-react';

interface Level {
  id: number;
  name: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  position: { x: string; y: string };
  shipPart: string;
}

interface Character {
  id: string;
  name: string;
  emoji: string;
  color: string;
  outfit: string;
}

interface LevelsPageProps {
  onBack: () => void;
  onLevelSelect: (levelId: number) => void;
  character: Character;
  unlockedLevels: { [key: string]: number }; // ✅ this is what was missing
  currentPhase: string | null;
}

const LevelsPage: React.FC<LevelsPageProps> = ({ onBack, onLevelSelect, character, unlockedLevels, currentPhase }) => {

  const generateLevels = (unlocked: number, completed: number[] = []) => {
    const levels: Level[] = [];
    const centerX = 50;
    const centerY = 50;
    const radius = 35;

    const parts = ['cockpit', 'wing', 'engine', 'thruster'];

    for (let i = 1; i <= 15; i++) {
      const angle = (i - 1) * (360 / 15) * (Math.PI / 180);
      const spiralRadius = radius * (0.6 + (i - 1) * 0.09);
      const x = centerX + spiralRadius * Math.cos(angle);
      const y = centerY - spiralRadius * Math.sin(angle);

      levels.push({
        id: i,
        name: `Level ${i}`,
        isUnlocked: i === 1 || i <= unlocked,
        isCompleted: completed.includes(i),
        position: { x: `${x}%`, y: `${y}%` },
        shipPart: i === 15 ? 'cockpit' : parts[(i - 1) % parts.length]
      });
    }

    return levels;
  };

  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

 useEffect(() => {
  if (!currentPhase) return;

  const savedCompleted = JSON.parse(localStorage.getItem("completedLevels") || "[]");
  const unlocked = unlockedLevels[currentPhase] || 1;

  setLevels(generateLevels(unlocked, savedCompleted));
}, [unlockedLevels, currentPhase]);




  const handleLevelClick = (level: Level) => {
    if (!level.isUnlocked) return;

    setSelectedLevel(level.id);
    setIsTransitioning(true);

    setTimeout(() => {
      onLevelSelect(level.id);
    }, 1000);
  };

  const getPhaseTheme = () => {
    switch (currentPhase) {
      case 'c-galaxy':
        return { name: 'C Galaxy', color: 'from-blue-900 via-cyan-900 to-indigo-900', primary: '#00ffff' };
      case 'cpp-galaxy':
        return { name: 'C++ Galaxy', color: 'from-purple-900 via-pink-900 to-indigo-900', primary: '#ff00ff' };
      case 'java-galaxy':
        return { name: 'Java Galaxy', color: 'from-orange-900 via-red-900 to-yellow-900', primary: '#fbbf24' };
      default:
        return { name: 'Galaxy', color: 'from-blue-900 via-cyan-900 to-indigo-900', primary: '#00ffff' };
    }
  };

  const theme = getPhaseTheme();

  const getLevelIcon = (level: Level) => {
    if (level.isCompleted) return '⭐';
    if (level.id === 15) return '👑';
    if (!level.isUnlocked) return '🔒';
    return getShipPartIcon(level.shipPart);
  };

  const getShipPartIcon = (shipPart: string) => {
    switch (shipPart) {
      case 'cockpit': return '🛸';
      case 'wing': return '✈️';
      case 'engine': return '🔥';
      case 'thruster': return '🚀';
      default: return '🔧';
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      <div className={`absolute inset-0 bg-gradient-to-b ${theme.color}`}>
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
        <div className="nebula nebula-3"></div>
        <div className="nebula nebula-4"></div>
        <div className="flying-saucer saucer-1">🛸</div>
        <div className="flying-saucer saucer-2">🛸</div>
        <div className="asteroid-trail">
          <div className="asteroid">☄️</div>
          <div className="asteroid-glow"></div>
        </div>
        <div className="floating-planet planet-1"></div>
        <div className="floating-planet planet-2"></div>
        <div className="floating-planet planet-3"></div>
        <div className="floating-planet planet-4"></div>
      </div>

      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000">
          <div className="text-center">
            <div className="alien-character mb-4 animate-spin">
              <div className="alien-body"></div>
              <div className="alien-eyes">
                <div className="alien-eye alien-eye-1"></div>
                <div className="alien-eye alien-eye-2"></div>
              </div>
            </div>
            <p className="text-cyan-400 text-xl font-bold animate-pulse">
              Entering Level {selectedLevel}...
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 p-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group"
        >
          <ArrowLeft className="w-6 h-6 group-hover:animate-pulse" />
          <span className="font-bold">Back to Phases</span>
        </button>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: theme.primary }}>
            {theme.name}
          </h1>
          <p className="text-cyan-300 text-lg animate-pulse">
            Choose your level, {character.name}!
          </p>
        </div>

        <div className="relative w-full max-w-4xl h-96 md:h-[600px] mx-auto">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse opacity-30"></div>

            <div className="alien-group-vertical">
              <img
                src="Flux_Dev_A_colorful_illustration_of_a_cute_alien_face_designed_2.png"
                alt="Zyx Alien"
                className="alien-image-big"
              />
              <div className="alien-speech-below">
                Hello {character.name}! Ready for adventure? 🛸
              </div>
            </div> 
          {levels.map((level) => (
            <div
              key={level.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: level.position.x, top: level.position.y }}
            >
              <div
                className={`level-orb ${level.isUnlocked ? 'unlocked' : 'locked'} ${level.isCompleted ? 'completed' : ''}`}
                onClick={() => handleLevelClick(level)}
              >
                <div className="orb-glow" style={{ background: level.isUnlocked ? `radial-gradient(circle, transparent 40%, ${theme.primary}40 70%, transparent 100%)` : undefined }}></div>
                <div className="orb-content">
                  <div className="text-2xl mb-1">
                    {getLevelIcon(level)}
                  </div>
                  <div className="text-xs font-bold">{level.id}</div>
                </div>
                <div className="level-name">{level.name}</div>
                {level.isCompleted && (
                  <div className="completion-effect">
                    <Star className="w-4 h-4 text-yellow-400 animate-spin" />
                  </div>
                )}
                {level.isUnlocked && !level.isCompleted && (
                  <div className="unlock-rings">
                    <div className="unlock-ring ring-1"></div>
                    <div className="unlock-ring ring-2"></div>
                    <div className="unlock-ring ring-3"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 w-full max-w-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-cyan-400 font-bold">Progress</span>
            <span className="text-cyan-400 font-bold">
              {levels.filter(l => l.isCompleted).length}/15
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(levels.filter(l => l.isCompleted).length / 15) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelsPage;
