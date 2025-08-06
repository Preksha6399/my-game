import React, { useState } from 'react';
import { ArrowLeft, Lock, Star, Zap, Coffee, Cpu, BookOpen, X } from 'lucide-react';





interface Phase {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  requiredStars: number;
  color: string;
  glowColor: string;
  description: string;
}

interface Character {
  id: string;
  name: string;
  emoji: string;
  color: string;
  outfit: string;
}

interface PhaseSelectionProps {
  onBack: () => void;
  onPhaseSelect: (phaseId: string) => void;
  character: Character;
  starsEarned: number;
  setStarsEarned: (stars: number) => void;
}


const PhaseSelection: React.FC<PhaseSelectionProps> = ({ 
  onBack, 
  onPhaseSelect, 
  character, 
  starsEarned,
  setStarsEarned
}) => {

  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [showLockedMessage, setShowLockedMessage] = useState<string | null>(null);
  const [activeReadingPanel, setActiveReadingPanel] = useState<string | null>(null);

  const phases: Phase[] = [
    {
      id: 'c-galaxy',
      name: 'C Galaxy',
      subtitle: 'Start your journey with the basics of C',
      icon: '🌌',
      requiredStars: 0,
      color: 'from-blue-600 to-cyan-500',
      glowColor: 'rgba(59, 130, 246, 0.6)',
      description: 'Master the fundamentals of programming'
    },
    {
      id: 'cpp-galaxy',
      name: 'C++ Galaxy',
      subtitle: 'Face object-oriented invaders',
      icon: '🚀',
      requiredStars: 15,
      color: 'from-purple-600 to-pink-500',
      glowColor: 'rgba(147, 51, 234, 0.6)',
      description: 'Conquer advanced programming concepts'
    },
    {
      id: 'java-galaxy',
      name: 'Java Galaxy',
      subtitle: 'Defeat the robotic overlords',
      icon: '🤖',
      requiredStars: 30,
      color: 'from-orange-600 to-red-500',
      glowColor: 'rgba(249, 115, 22, 0.6)',
      description: 'Ultimate programming mastery awaits'
    }
  ];

  const readingContent = {
    'c-galaxy': {
      title: '📘 The C Programming Language',
      intro: 'C is a powerful, foundational programming language that has been around since the 1970s. It\'s like learning the alphabet before writing stories!',
      importance: 'C is important because it teaches you how computers really work at a low level. It\'s fast, efficient, and gives you direct control over memory.',
      usage: [
        'Operating Systems (Windows, Linux, macOS)',
        'Embedded systems (smart devices, cars)',
        'Game engines and high-performance software',
        'System programming and drivers'
      ],
      features: [
        'Fast execution speed',
        'Simple and clean syntax',
        'Portable across different systems',
        'Direct memory management',
        'Foundation for other languages'
      ],
      funFact: 'C is like the grandparent of many programming languages - languages like C++, Java, and JavaScript all borrowed ideas from C!',
      quote: 'Every coder starts somewhere — why not with C? 🚀'
    },
    'cpp-galaxy': {
      title: '📗 The C++ Programming Language',
      intro: 'C++ is C\'s powerful younger sibling! It takes everything great about C and adds object-oriented programming, making it perfect for building complex applications.',
      importance: 'C++ combines the speed of C with modern programming concepts like classes and objects. It\'s the language of choice for performance-critical applications.',
      usage: [
        'Video games (Unreal Engine, many AAA games)',
        'Desktop applications (Photoshop, browsers)',
        'System software and operating systems',
        'High-frequency trading systems'
      ],
      features: [
        'Object-Oriented Programming (OOP)',
        'Hybrid language (procedural + OOP)',
        'High performance and efficiency',
        'Rich standard library',
        'Memory control with modern features'
      ],
      funFact: 'C++ powers game engines like Unreal Engine, which created games like Fortnite and Rocket League!',
      quote: 'Create, build, and level up with C++! 🎮'
    },
    'java-galaxy': {
      title: '📙 The Java Programming Language',
      intro: 'Java is a versatile, object-oriented language famous for "Write Once, Run Anywhere." It\'s like having a universal translator for computers!',
      importance: 'Java is beginner-friendly yet powerful enough for enterprise applications. Its "write once, run anywhere" philosophy makes it incredibly popular.',
      usage: [
        'Minecraft (the world\'s most popular game!)',
        'Android mobile apps',
        'Web applications and servers',
        'Enterprise business software'
      ],
      features: [
        'Platform independent (runs anywhere)',
        'Object-oriented programming',
        'Automatic memory management',
        'Strong security features',
        'Huge community and libraries'
      ],
      funFact: 'Java runs on over 3 billion devices worldwide - from smartphones to smart TVs to spacecraft!',
      quote: 'With Java, the world is your playground! 🌍'
    }
  };
  const handlePhaseClick = (phase: Phase) => {
    if (starsEarned < phase.requiredStars) {
      setShowLockedMessage(`You need ${phase.requiredStars} stars to unlock ${phase.name}!`);
      setTimeout(() => setShowLockedMessage(null), 3000);
      return;
    }

    setSelectedPhase(phase.id);
    setTimeout(() => {
      onPhaseSelect(phase.id);
    }, 1000);
  };

  const handleReadingClick = (phaseId: string) => {
    setActiveReadingPanel(phaseId);
  };

  const handleCloseReading = () => {
    setActiveReadingPanel(null);
  };

  const handleStartGalaxy = (phaseId: string) => {
    setActiveReadingPanel(null);
    const phase = phases.find(p => p.id === phaseId);
    if (phase) {
      handlePhaseClick(phase);
    }
  };
  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Enhanced Space Background */}
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
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
        <div className="nebula nebula-3"></div>
        <div className="nebula nebula-4"></div>
        <div className="nebula nebula-5"></div>
        
        <div className="floating-planet planet-1"></div>
        <div className="floating-planet planet-2"></div>
        <div className="floating-planet planet-3"></div>
        <div className="floating-planet planet-4"></div>
        <div className="floating-planet planet-5"></div>
        
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
        
        <div className="flying-spaceship spaceship-1">🚀</div>
        <div className="flying-spaceship spaceship-2">🛸</div>
        <div className="flying-spaceship spaceship-3">🚁</div>
      </div>

      {/* Transition Overlay */}
      {selectedPhase && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-spin">
              {phases.find(p => p.id === selectedPhase)?.icon}
            </div>
            <p className="text-cyan-400 text-xl font-bold animate-pulse">
              Entering {phases.find(p => p.id === selectedPhase)?.name}...
            </p>
          </div>
        </div>
      )}

      {/* Locked Message Popup */}
      {showLockedMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-600/90 backdrop-blur-sm border border-red-400/50 rounded-lg px-6 py-3 animate-bounce">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-white" />
            <span className="text-white font-bold">{showLockedMessage}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 p-4 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group"
        >
          <ArrowLeft className="w-6 h-6 group-hover:animate-pulse" />
          <span className="font-bold">Back to Home</span>
        </button>

        {/* Stars Counter */}
        <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm border border-yellow-400/30 rounded-full px-4 py-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-400 font-bold">{starsEarned}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="mission-title text-4xl md:text-6xl font-bold mb-6">
            <div className="title-glow-bg"></div>
            <span className="mission-part">SELECT YOUR</span>
            <span className="hackers-part">GALAXY</span>
          </h1>
          <div className="title-underline"></div>
          <p className="text-cyan-300 text-lg mt-6 animate-shimmer">
            Choose your programming adventure, {character.name}!
          </p>
        </div>

        {/* Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {phases.map((phase, index) => {
            const isUnlocked = starsEarned >= phase.requiredStars;
            const isComingSoon = index > 0; // For demo purposes
            
            return (
              <div 
                key={phase.id}
                className="flex flex-col items-center space-y-4"
              >
                {/* Reading Button */}
                <button
                  onClick={() => handleReadingClick(phase.id)}
                  className="reading-button group hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-cyan-400/30 rounded-full hover:border-cyan-400/60 hover:bg-gradient-to-r hover:from-indigo-600/40 hover:to-purple-600/40">
                    <BookOpen className="w-4 h-4 text-cyan-400 group-hover:animate-pulse" />
                    <span className="text-cyan-400 font-bold text-sm">
                      {phase.id === 'c-galaxy' && '📘 Learn About C'}
                      {phase.id === 'cpp-galaxy' && '📗 Learn About C++'}
                      {phase.id === 'java-galaxy' && '📙 Learn About Java'}
                    </span>
                  </div>
                </button>

                {/* Phase Card */}
                <div
                  onClick={() => handlePhaseClick(phase)}
                  className={`phase-card ${isUnlocked ? 'unlocked' : 'locked'} group`}
                >
                  {/* Phase Glow */}
                  <div 
                    className="phase-glow"
                    style={{ 
                      background: isUnlocked 
                        ? `radial-gradient(circle, ${phase.glowColor} 0%, transparent 70%)`
                        : 'radial-gradient(circle, rgba(107, 114, 128, 0.3) 0%, transparent 70%)'
                    }}
                  ></div>

                  {/* Phase Content */}
                  <div className={`phase-content bg-gradient-to-br ${isUnlocked ? phase.color : 'from-gray-700 to-gray-800'}`}>
                    
                    {/* Lock Overlay */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                        <div className="text-center">
                          <Lock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-300 font-bold">
                            {phase.requiredStars} Stars Required
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Phase Icon */}
                    <div className="phase-icon text-6xl mb-4">
                      {phase.icon}
                    </div>

                    {/* Phase Info */}
                    <h3 className="phase-name text-2xl font-bold text-white mb-2">
                      {phase.name}
                    </h3>
                    
                    <p className="phase-subtitle text-cyan-200 mb-4 text-center">
                      {phase.subtitle}
                    </p>

                    <p className="phase-description text-gray-300 text-sm text-center mb-4">
                      {phase.description}
                    </p>

                    {/* Stars Required */}
                    <div className="flex items-center justify-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-bold">
                        {phase.requiredStars} Stars
                      </span>
                    </div>

                    {/* Unlock Animation */}
                    {isUnlocked && (
                      <div className="phase-unlock-rings">
                        <div className="unlock-ring ring-1"></div>
                        <div className="unlock-ring ring-2"></div>
                        <div className="unlock-ring ring-3"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="mt-12 text-center">
          <p className="text-cyan-400 mb-2">Your Progress</p>
          <div className="flex items-center justify-center space-x-4">
            {phases.map((phase, index) => (
              <div key={phase.id} className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${
                  starsEarned >= phase.requiredStars 
                    ? 'bg-green-400 animate-pulse' 
                    : 'bg-gray-600'
                }`}></div>
                {index < phases.length - 1 && (
                  <div className={`w-8 h-1 mx-2 ${
                    starsEarned >= phases[index + 1].requiredStars 
                      ? 'bg-green-400' 
                      : 'bg-gray-600'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reading Panel Modal */}
      {activeReadingPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleCloseReading}
          ></div>
          
          {/* Reading Panel */}
          <div className="relative bg-gradient-to-br from-indigo-900/95 to-purple-900/95 backdrop-blur-md border-2 border-cyan-400/40 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-modal-appear">
            
            {/* Close Button */}
            <button
              onClick={handleCloseReading}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors duration-300 group"
            >
              <X className="w-6 h-6 text-cyan-400 group-hover:text-white" />
            </button>

            {/* Content */}
            <div className="space-y-6">
              {/* Title */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {readingContent[activeReadingPanel as keyof typeof readingContent].title}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto"></div>
              </div>

              {/* Introduction */}
              <div className="bg-black/30 rounded-2xl p-6 border border-cyan-400/20">
                <h3 className="text-xl font-bold text-cyan-400 mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  What is it?
                </h3>
                <p className="text-white leading-relaxed">
                  {readingContent[activeReadingPanel as keyof typeof readingContent].intro}
                </p>
              </div>

              {/* Why Important */}
              <div className="bg-black/30 rounded-2xl p-6 border border-purple-400/20">
                <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Why is it important?
                </h3>
                <p className="text-white leading-relaxed">
                  {readingContent[activeReadingPanel as keyof typeof readingContent].importance}
                </p>
              </div>

              {/* Where it's used */}
              <div className="bg-black/30 rounded-2xl p-6 border border-green-400/20">
                <h3 className="text-xl font-bold text-green-400 mb-3 flex items-center">
                  <Cpu className="w-5 h-5 mr-2" />
                  Where is it used?
                </h3>
                <ul className="space-y-2">
                  {readingContent[activeReadingPanel as keyof typeof readingContent].usage.map((item, index) => (
                    <li key={index} className="text-white flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Features */}
              <div className="bg-black/30 rounded-2xl p-6 border border-yellow-400/20">
                <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center">
                  <Coffee className="w-5 h-5 mr-2" />
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {readingContent[activeReadingPanel as keyof typeof readingContent].features.map((feature, index) => (
                    <li key={index} className="text-white flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fun Fact */}
              <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-2xl p-6 border border-pink-400/30">
                <h3 className="text-xl font-bold text-pink-400 mb-3">🎉 Fun Fact!</h3>
                <p className="text-white leading-relaxed italic">
                  {readingContent[activeReadingPanel as keyof typeof readingContent].funFact}
                </p>
              </div>

              {/* Motivational Quote */}
              <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-6 border border-cyan-400/30 text-center">
                <p className="text-xl font-bold text-cyan-400 italic">
                  "{readingContent[activeReadingPanel as keyof typeof readingContent].quote}"
                </p>
              </div>

              {/* Action Button */}
              <div className="text-center pt-4">
                <button
                  onClick={() => handleStartGalaxy(activeReadingPanel)}
                  className="game-button group px-8 py-4"
                >
                  <div className="button-glow"></div>
                  <div className="button-content">
                    <Zap className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                    <span>
                      Start {phases.find(p => p.id === activeReadingPanel)?.name}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhaseSelection;