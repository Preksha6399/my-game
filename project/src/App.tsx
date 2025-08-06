import React, { useEffect, useState } from 'react';
import { Gamepad2, Settings, User } from 'lucide-react';
import PhaseSelection from './components/PhaseSelection';
import CharacterCustomization from './components/CharacterCustomization';
import SettingsModal from './components/SettingsModal';
import LevelsPage from './components/LevelsPage';
import QuizLevel from './components/QuizLevel';
import { quizData } from './data/quizData';
import { AudioManager } from './utils/AudioManager';
import AIChatbot from './components/AIChatbot';



interface Character {
  id: string;
  name: string;
  emoji: string;
  color: string;
  outfit: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'phases' | 'levels' | 'game' | 'customize' | 'victory'>('home');
  const [currentPhase, setCurrentPhase] = useState<string | null>(null);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  const [unlockedLevels, setUnlockedLevels] = useState(() => {
    const saved = localStorage.getItem("unlockedLevels");
    return saved ? JSON.parse(saved) : {
      'c-galaxy': 1,
      'cpp-galaxy': 1,
      'java-galaxy': 1
    };
  });

  const [starsEarned, setStarsEarned] = useState<number>(() => {
    return parseInt(localStorage.getItem("totalStars") || "0");
  });

  const [isMuted, setIsMuted] = useState(false);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [volume, setVolume] = useState(() => {
    return parseInt(localStorage.getItem("gameVolume") || "70");
  });
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [audioManager, setAudioManager] = useState<AudioManager | null>(null);

  const [character, setCharacter] = useState<Character>({
    id: 'alien1',
    name: 'Zyx',
    emoji: '👽',
    color: 'green',
    outfit: 'space_suit'
  });

  useEffect(() => {
    setIsLoaded(true);
    
    // Initialize audio manager
    const manager = new AudioManager();
    setAudioManager(manager);
    
    // Set initial volume and mute state
    manager.setVolume(volume);
    manager.setMuted(isMuted);
    
    // Start home music
    manager.playMusic('home');
    
    return () => {
      manager.cleanup();
    };
  }, []);

  // Update audio when settings change
  useEffect(() => {
    if (audioManager) {
      audioManager.setMuted(isMuted);
      localStorage.setItem("gameMuted", isMuted.toString());
    }
  }, [isMuted, audioManager]);

  useEffect(() => {
    if (audioManager) {
      audioManager.setVolume(volume);
      localStorage.setItem("gameVolume", volume.toString());
    }
  }, [volume, audioManager]);

  // Update music based on current page/phase
  useEffect(() => {
    if (!audioManager) return;
    
    if (currentPage === 'home') {
      audioManager.playMusic('home');
    } else if (currentPage === 'phases') {
      audioManager.playMusic('phases');
    } else if (currentPage === 'levels' || currentPage === 'game') {
      if (currentPhase === 'c-galaxy') {
        audioManager.playMusic('c-phase');
      } else if (currentPhase === 'cpp-galaxy') {
        audioManager.playMusic('cpp-phase');
      } else if (currentPhase === 'java-galaxy') {
        audioManager.playMusic('java-phase');
      }
    } else if (currentPage === 'victory') {
      audioManager.playMusic('victory');
    }
  }, [currentPage, currentPhase, audioManager]);

  // Save stars to localStorage
  useEffect(() => {
    localStorage.setItem("totalStars", starsEarned.toString());
  }, [starsEarned]);

  // Save unlocked levels to localStorage
  useEffect(() => {
    localStorage.setItem("unlockedLevels", JSON.stringify(unlockedLevels));
  }, [unlockedLevels]);

  const handleStartGame = () => {
    setCurrentPage('phases');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleCustomizeCharacter = () => {
    setCurrentPage('customize');
  };

  const handlePhaseSelect = (phaseId: string) => {
    setCurrentPhase(phaseId);
    setCurrentPage('levels');
  };

  const handleLevelSelect = (levelId: number) => {
    setCurrentLevelIndex(levelId - 1);
    setCurrentPage('game');
  };

  const handleLevelComplete = (earnedStar: boolean) => {
    if (earnedStar) {
      setStarsEarned(prev => prev + 1);
    }

    // Update unlocked level for current phase
    if (currentPhase) {
      const maxLevelsInPhase = 15;
      const currentUnlocked = unlockedLevels[currentPhase as keyof typeof unlockedLevels];
      
      if (currentLevelIndex + 1 >= currentUnlocked && currentUnlocked < maxLevelsInPhase) {
        setUnlockedLevels(prev => ({
          ...prev,
          [currentPhase]: prev[currentPhase as keyof typeof prev] + 1
        }));
      }
    }

    const currentPhaseData = quizData.find(phase => phase.id === currentPhase);
    if (!currentPhaseData) return;

    // Check if this was the last level of the phase
    if (currentLevelIndex >= currentPhaseData.levels.length - 1) {
      // Completed the phase, check if it's the final phase
      if (currentPhase === 'java-galaxy') {
        setCurrentPage('victory');
      } else {
        setCurrentPage('levels');
      }
    } else {
      // Move to next level
      setCurrentLevelIndex(prev => prev + 1);
    }
  };

  const handleRetryLevel = () => {
    // Level index stays the same, just reset the level
  };

  const handleSaveCharacter = (newCharacter: Character) => {
    setCharacter(newCharacter);
  };

  if (currentPage === 'customize') {
    return (
      <CharacterCustomization
        onBack={handleBackToHome}
        onSave={handleSaveCharacter}
        currentCharacter={character}
      />
    );
  }

  if (currentPage === 'phases') {
    return (
      <PhaseSelection
        onBack={handleBackToHome}
        onPhaseSelect={handlePhaseSelect}
        character={character}
        starsEarned={starsEarned}
      />
    );
  }

  if (currentPage === 'levels') {
    return (
     <LevelsPage
  onBack={() => setCurrentPage('phases')}
  onLevelSelect={handleLevelSelect}
  character={character}
  unlockedLevels={unlockedLevels} // ✅ make sure this name matches exactly
  currentPhase={currentPhase}
/>

    );
  }

  if (currentPage === 'game') {
    const currentPhaseData = quizData.find(phase => phase.id === currentPhase);
    if (!currentPhaseData) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl text-red-400 mb-4">Error: Phase not found</h1>
            <button
              onClick={handleBackToHome}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    return (
      <QuizLevel
        phase={currentPhaseData}
        currentLevelIndex={currentLevelIndex}
        character={character}
        starsEarned={starsEarned}
        onLevelComplete={handleLevelComplete}
        onBackToPhases={() => setCurrentPage('levels')}
        onRetryLevel={handleRetryLevel}
      />
    );
  }

  if (currentPage === 'victory') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-indigo-900 to-black">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
        <div className="relative z-10 text-center">
          <div className="text-8xl mb-8 animate-bounce">🏆</div>
          <h1 className="holographic-text text-4xl md:text-6xl font-bold mb-6">
            MISSION COMPLETE!
          </h1>
          <p className="text-cyan-300 text-xl mb-4">
            Congratulations, {character.name}!
          </p>
          <p className="text-white text-lg mb-8">
            You've mastered all three programming galaxies and earned {starsEarned} stars!
          </p>
          <div className="space-y-4">
            <button
              onClick={() => {
                setStarsEarned(0);
                setUnlockedLevels({
                  'c-galaxy': 1,
                  'cpp-galaxy': 1,
                  'java-galaxy': 1
                });
                setCurrentLevelIndex(0);
                setCurrentPhase(null);
                handleBackToHome();
              }}
              className="game-button group"
            >
              <div className="button-glow"></div>
              <div className="button-content">
                <Gamepad2 className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                <span>Play Again</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/Flux_Dev_a_fun_alien_character_on_a_black_and_dark_blue_backgr_2.jpg)',
            filter: 'brightness(0.7) contrast(1.1)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
      </div>

      {/* Enhanced 3D Animated Space Elements */}
      <div className="absolute inset-0">
        {/* Animated Stars */}
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        
        {/* Enhanced Nebula Clouds with 3D effect */}
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
        <div className="nebula nebula-3"></div>
        <div className="nebula nebula-4"></div>
        <div className="nebula nebula-5"></div>
        
        {/* 3D Floating Planets with Parallax */}
        <div className="floating-planet planet-1"></div>
        <div className="floating-planet planet-2"></div>
        <div className="floating-planet planet-3"></div>
        <div className="floating-planet planet-4"></div>
        <div className="floating-planet planet-5"></div>
        
        {/* Floating Code Particles */}
        <div className="code-particles">
          <div className="code-particle particle-1">{'<>'}</div>
          <div className="code-particle particle-2">{'{ }'}</div>
          <div className="code-particle particle-3">{'[ ]'}</div>
          <div className="code-particle particle-4">{'( )'}</div>
          <div className="code-particle particle-5">{'==='}</div>
          <div className="code-particle particle-6">{'+++'}</div>
          <div className="code-particle particle-7">{'>>>'}</div>
          <div className="code-particle particle-8">{'***'}</div>
        </div>
        
        {/* Flying Spaceships */}
        <div className="flying-spaceship spaceship-1">🚀</div>
        <div className="flying-spaceship spaceship-2">🛸</div>
        <div className="flying-spaceship spaceship-3">🚁</div>
      </div>

      {/* Settings Button */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="absolute bottom-4 right-4 z-50 p-4 bg-purple-600/20 backdrop-blur-sm border border-cyan-400/30 rounded-full hover:bg-purple-600/40 transition-all duration-300 hover:scale-110 group"
      >
        <Settings className="w-6 h-6 text-cyan-400 group-hover:animate-spin" />
      </button>

      {/* Main Content */}
      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Holographic Title */}
        <div className="text-center mb-20 mt-[-20px] animate-float">
          <h1 className="mission-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 relative">
            <div className="title-glow-bg"></div>
            <span className="mission-part">MISSION CODE:</span>
            <span className="hackers-part">SPACE HACKERS</span>
          </h1>
          <div className="title-underline"></div>
        </div>

        

        {/* Navigation Buttons */}
        <div className="space-y-6 w-full max-w-md mt-24 mb-12">
          <button 
            className="game-button w-full group"
            onClick={handleStartGame}
          >
            <div className="button-glow"></div>
            <div className="button-content">
              <Gamepad2 className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              <span>START GAME</span>
            </div>
          </button>
          
          <button 
            className="game-button w-full group"
            onClick={handleCustomizeCharacter}
          >
            <div className="button-glow"></div>
            <div className="button-content">
              <User className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              <span>👽 CUSTOMIZE CHARACTER</span>
            </div>
          </button>
        </div>

        {/* Tagline */}
        <div className="text-center">
          <p className="tagline-text text-lg md:text-xl text-cyan-300 animate-shimmer">
            Embark on an intergalactic coding adventure!
          </p>
        </div>
      </div>

      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        soundEffectsEnabled={soundEffectsEnabled}
        onToggleSoundEffects={() => setSoundEffectsEnabled(!soundEffectsEnabled)}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        volume={volume}
        onVolumeChange={setVolume}
      />

      <AIChatbot character={character} />
    </>
  );
}

export default App;