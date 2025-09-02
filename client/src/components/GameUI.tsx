import React from 'react';
import { useGameStore } from '../lib/stores/useGameStore';
import { useDNA } from '../lib/stores/useDNA';
import { useDrug } from '../lib/stores/useDrug';
import DNAEditor from './panels/DNAEditor';
import DrugBuilder from './panels/DrugBuilder';
import InfoPanel from './panels/InfoPanel';
import TutorialPanel from './panels/TutorialPanel';
import { Button } from './ui/button';
import { Home, RotateCcw, Play, Pause } from 'lucide-react';

const GameUI: React.FC = () => {
  const { 
    gamePhase, 
    currentLevel, 
    score, 
    timeElapsed,
    isSimulating,
    goToMenu,
    resetLevel,
    simulate
  } = useGameStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-ui">
      {/* Top HUD Bar */}
      <div className="top-hud">
        <div className="hud-left">
          <div className="score-display">
            <span className="score-label">Score:</span>
            <span className="score-value">{score.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="hud-center">
          <div className="level-info">
            <span className="mode-name">
              {gamePhase === 'genetic_modification' ? 'Genetic Modification' : 
               gamePhase === 'drug_discovery' ? 'Drug Discovery' : 'Tutorial'}
            </span>
            <span className="level-number">Level {currentLevel}</span>
          </div>
        </div>
        
        <div className="hud-right">
          <div className="time-display">
            <span className="time-label">Time:</span>
            <span className="time-value">{formatTime(timeElapsed)}</span>
          </div>
        </div>
      </div>

      {/* Left Sidebar - Tutorial/Help */}
      {gamePhase === 'tutorial' && <TutorialPanel />}

      {/* Bottom Action Panel */}
      <div className="bottom-panel">
        {gamePhase === 'genetic_modification' && <DNAEditor />}
        {gamePhase === 'drug_discovery' && <DrugBuilder />}
        
        <div className="action-buttons">
          <Button
            variant="outline"
            size="sm"
            onClick={resetLevel}
            className="action-button reset-button"
          >
            <RotateCcw className="button-icon" />
            Reset
          </Button>
          
          <Button
            variant="default"
            size="lg"
            onClick={simulate}
            disabled={isSimulating}
            className="action-button simulate-button"
          >
            {isSimulating ? <Pause className="button-icon" /> : <Play className="button-icon" />}
            {isSimulating ? 'Simulating...' : 'Simulate'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToMenu}
            className="action-button menu-button"
          >
            <Home className="button-icon" />
            Menu
          </Button>
        </div>
      </div>

      {/* Right Sidebar - Info & Feedback */}
      <InfoPanel />
    </div>
  );
};

export default GameUI;
