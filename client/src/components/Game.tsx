import React, { useEffect } from 'react';
import { useGameStore } from '../lib/stores/useGameStore';
import { useDNA } from '../lib/stores/useDNA';
import { useDrug } from '../lib/stores/useDrug';
import { useAudio } from '../lib/stores/useAudio';

const Game: React.FC = () => {
  const { 
    gamePhase, 
    currentLevel, 
    score, 
    timeElapsed,
    updateScore,
    nextLevel,
    endGame 
  } = useGameStore();
  
  const { simulateEdit } = useDNA();
  const { simulateDrug } = useDrug();
  const { playSuccess, playHit } = useAudio();

  // Game loop for updating time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gamePhase === 'genetic_modification' || gamePhase === 'drug_discovery') {
      interval = setInterval(() => {
        useGameStore.getState().updateTime();
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gamePhase]);

  // Handle successful completion of level objectives
  const handleLevelComplete = () => {
    playSuccess();
    updateScore(1000); // Base completion score
    
    setTimeout(() => {
      if (currentLevel < 7) {
        nextLevel();
      } else {
        endGame();
      }
    }, 2000);
  };

  // Handle failed attempts
  const handleFailure = () => {
    playHit();
    updateScore(-100); // Penalty for failure
  };

  return null; // Game logic component - no visual rendering
};

export default Game;
