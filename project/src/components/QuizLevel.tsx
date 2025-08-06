import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Star, Zap, RotateCcw, Trophy } from 'lucide-react';
import { QuizQuestion, Phase } from '../data/quizData';

interface Character {
  id: string;
  name: string;
  emoji: string;
  color: string;
  outfit: string;
}

interface QuizLevelProps {
  phase: Phase;
  currentLevelIndex: number;
  character: Character;
  starsEarned: number;
  onLevelComplete: (earnedStar: boolean) => void;
  onBackToPhases: () => void;
  onRetryLevel: () => void;
}

const QuizLevel: React.FC<QuizLevelProps> = ({
  phase,
  currentLevelIndex,
  character,
  starsEarned,
  onLevelComplete,
  onBackToPhases,
  onRetryLevel
}) => {
  const [lives, setLives] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [animatingAlien, setAnimatingAlien] = useState<number | null>(null);

  const currentQuestion = phase.levels[currentLevelIndex];

  useEffect(() => {
    // Reset state when level changes
    setLives(3);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setShowExplanation(false);
    setGameOver(false);
    setAnimatingAlien(null);
  }, [currentLevelIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || gameOver) return;

    setSelectedAnswer(answerIndex);
    setAnimatingAlien(answerIndex);
    
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
  const completed = JSON.parse(localStorage.getItem("completedLevels") || "[]");
  const currentLevel = currentLevelIndex + 1;

  if (!completed.includes(currentLevel)) {
    const updated = [...completed, currentLevel];
    localStorage.setItem("completedLevels", JSON.stringify(updated));
    localStorage.setItem("unlockedLevel", (currentLevel + 1).toString());

    // ⭐ Update stars
    const previousStars = parseInt(localStorage.getItem("totalStars") || "0");
    localStorage.setItem("totalStars", (previousStars + 1).toString());
  }

  // Continue with animation...
  setTimeout(() => {
    setShowExplanation(true);
    setTimeout(() => {
      onLevelComplete(true);
    }, 2000);
  }, 1000);
}
 else {
      // Wrong answer - lose a life
      const newLives = lives - 1;
      setLives(newLives);
      
      setTimeout(() => {
        if (newLives === 0) {
          setGameOver(true);
        } else {
          // Reset for next attempt
          setSelectedAnswer(null);
          setShowResult(false);
          setAnimatingAlien(null);
        }
      }, 1500);
    }
  };

  const handleRetry = () => {
    setLives(3);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setShowExplanation(false);
    setGameOver(false);
    setAnimatingAlien(null);
    onRetryLevel();
  };

  const getAlienForOption = (index: number) => {
    const aliens = ['👽', '🛸', '🌟', '🚀'];
    return aliens[index];
  };

  const getOptionButtonClass = (index: number) => {
    let baseClass = "quiz-option group";
    
    if (selectedAnswer === null) {
      return `${baseClass} available`;
    }
    
    if (index === currentQuestion.correctAnswer && isCorrect) {
      return `${baseClass} correct`;
    }
    
    if (index === selectedAnswer && !isCorrect) {
      return `${baseClass} incorrect`;
    }
    
    return `${baseClass} disabled`;
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Dynamic Background based on Phase */}
      <div className={`absolute inset-0 bg-gradient-to-b ${phase.theme.background}`}>
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
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gradient-to-b from-red-900/90 to-gray-900/90 backdrop-blur-md border border-red-400/30 rounded-2xl p-8 w-full max-w-md mx-4 text-center animate-modal-appear">
            <div className="text-6xl mb-4">💥</div>
            <h2 className="text-3xl font-bold text-red-400 mb-4">Level Failed!</h2>
            <p className="text-white mb-6">
              You ran out of lives! Don't worry, every great space hacker learns from their mistakes.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleRetry}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-full hover:bg-green-600/40 transition-all duration-300 text-green-400 font-bold"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Retry Level</span>
              </button>
              <button
                onClick={onBackToPhases}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full hover:bg-blue-600/40 transition-all duration-300 text-blue-400 font-bold"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wrong Answer Encouragement Modal */}
      {showResult && !isCorrect && !gameOver && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gradient-to-b from-orange-900/90 to-red-900/90 backdrop-blur-md border border-orange-400/30 rounded-2xl p-6 w-full max-w-sm mx-4 text-center animate-modal-appear">
            <div className="text-4xl mb-3 animate-bounce">🤔</div>
            <h3 className="text-xl font-bold text-orange-400 mb-2">Oops! Try again!</h3>
            <p className="text-white text-sm mb-3">
              That's not quite right. Keep thinking, {character.name}!
            </p>
            <div className="flex items-center justify-center space-x-2 text-red-400">
              <span className="text-sm">Lives remaining:</span>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-4 h-4 ${i < lives ? 'text-red-400 fill-red-400' : 'text-gray-600'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Success Explanation Modal */}
      {showExplanation && isCorrect && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gradient-to-b from-green-900/90 to-cyan-900/90 backdrop-blur-md border border-green-400/30 rounded-2xl p-8 w-full max-w-md mx-4 text-center animate-modal-appear">
            <div className="text-6xl mb-4 animate-bounce">⭐</div>
            <h2 className="text-3xl font-bold text-green-400 mb-4">Correct!</h2>
            <p className="text-white mb-4 text-lg">+1 Star Earned!</p>
            {currentQuestion.explanation && (
              <div className="bg-black/30 rounded-lg p-4 mb-4">
                <p className="text-cyan-300 text-sm">{currentQuestion.explanation}</p>
              </div>
            )}
            <p className="text-gray-300 text-sm">Moving to next level...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 p-4 flex justify-between items-center">
        <button
          onClick={onBackToPhases}
          className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group"
        >
          <ArrowLeft className="w-6 h-6 group-hover:animate-pulse" />
          <span className="font-bold">Back to Phases</span>
        </button>

        {/* Stats */}
        <div className="flex items-center space-x-6">
          {/* Lives */}
          <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm border border-red-400/30 rounded-full px-4 py-2">
            <Heart className="w-5 h-5 text-red-400" />
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 ${i < lives ? 'text-red-400 fill-red-400' : 'text-gray-600'}`}
                />
              ))}
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm border border-yellow-400/30 rounded-full px-4 py-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{starsEarned}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        
        {/* Phase Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: phase.theme.primaryColor }}>
            {phase.name}
          </h1>
          <p className="text-cyan-300 text-lg">
            Level {currentLevelIndex + 1} of 15
          </p>
        </div>

        {/* Question Card */}
        <div className="w-full max-w-4xl mb-8">
          <div className="quiz-question-card">
            <div className="question-header">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-bold">Question {currentLevelIndex + 1}</span>
            </div>
            <h2 className="question-text">
              {currentQuestion.question}
            </h2>
          </div>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={getOptionButtonClass(index)}
              disabled={selectedAnswer !== null}
            >
              {/* Alien Character */}
              <div className={`option-alien ${animatingAlien === index ? (isCorrect ? 'explode' : 'shake') : ''}`}>
                {getAlienForOption(index)}
              </div>
              
              {/* Option Content */}
              <div className="option-content">
                <div className="option-letter">
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="option-text">
                  {option}
                </div>
              </div>

              {/* Result Indicator */}
              {showResult && isCorrect && (
                <div className="result-indicator">
                  {index === currentQuestion.correctAnswer && (
                    <div className="correct-indicator">✅</div>
                  )}
                </div>
              )}
              
              {showResult && !isCorrect && index === selectedAnswer && (
                <div className="result-indicator">
                    <div className="incorrect-indicator">❌</div>
                </div>
              )}

              {/* Glow Effect */}
              <div className="option-glow"></div>
            </button>
          ))}
        </div>

        {/* Character Display */}
        <div className="mt-8 text-center">
          <div className="flex flex-col items-center">
            <div className="text-5xl mt-2 mb-3 animate-bounce" style={{ color: phase.theme.alienColor }}>
                {character.emoji}
            </div>
              <p className="text-xl font-semibold" style={{ color: phase.theme.primaryColor }}>
                {character.name} is ready!
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizLevel;