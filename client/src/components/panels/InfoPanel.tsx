import React from 'react';
import { useGameStore } from '../../lib/stores/useGameStore';
import { getCurrentLevelData } from '../../lib/gameLogic/levels';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const InfoPanel: React.FC = () => {
  const { gamePhase, currentLevel, lastSimulationResult } = useGameStore();
  
  const levelData = getCurrentLevelData(gamePhase, currentLevel);

  const getResultIcon = (result: string | null) => {
    switch (result) {
      case 'success':
        return <CheckCircle className="result-icon success" />;
      case 'partial':
        return <AlertCircle className="result-icon partial" />;
      case 'failure':
        return <XCircle className="result-icon failure" />;
      default:
        return null;
    }
  };

  const getResultMessage = (result: string | null) => {
    switch (result) {
      case 'success':
        return 'Excellent! Your modification was successful and achieved the desired outcome.';
      case 'partial':
        return 'Partial success. Some improvements were observed, but optimization is needed.';
      case 'failure':
        return 'The modification failed or caused harmful side effects. Try a different approach.';
      default:
        return 'Make your modifications and click Simulate to see the results.';
    }
  };

  return (
    <div className="info-panel">
      {/* Level Information */}
      <Card className="level-info-card">
        <CardHeader>
          <CardTitle>Level Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="level-details">
            <h4>{levelData?.name}</h4>
            <p className="level-description">{levelData?.description}</p>
            
            <div className="objective">
              <strong>Objective:</strong>
              <p>{levelData?.objective}</p>
            </div>

            <div className="target-organism">
              <strong>Target:</strong>
              <span className="organism-name">{levelData?.targetOrganism}</span>
            </div>

            <div className="pathogen-info">
              <strong>Pathogen:</strong>
              <span className="pathogen-type">{levelData?.pathogen?.name}</span>
              <span className="pathogen-description">{levelData?.pathogen?.description}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simulation Results */}
      <Card className="results-card">
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="simulation-feedback">
            {getResultIcon(lastSimulationResult)}
            <p className="result-message">{getResultMessage(lastSimulationResult)}</p>
          </div>

          {lastSimulationResult && (
            <div className="detailed-results">
              <h5>Detailed Analysis:</h5>
              <ul className="result-details">
                {lastSimulationResult === 'success' && (
                  <>
                    <li>✓ Target pathogen neutralized effectively</li>
                    <li>✓ No harmful side effects detected</li>
                    <li>✓ Organism shows improved resistance</li>
                  </>
                )}
                {lastSimulationResult === 'partial' && (
                  <>
                    <li>◐ Pathogen partially inhibited</li>
                    <li>⚠ Some minor side effects observed</li>
                    <li>↗ Room for optimization</li>
                  </>
                )}
                {lastSimulationResult === 'failure' && (
                  <>
                    <li>✗ Pathogen remains active</li>
                    <li>✗ Potential harmful mutations detected</li>
                    <li>⚠ Consider alternative approach</li>
                  </>
                )}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scientific Context */}
      <Card className="science-card">
        <CardHeader>
          <CardTitle>Scientific Context</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="scientific-explanation">
            {gamePhase === 'genetic_modification' && (
              <div className="genetics-info">
                <h5>Genetic Modification Principles:</h5>
                <ul>
                  <li>CRISPR-Cas9 enables precise DNA editing</li>
                  <li>Guide RNAs direct Cas9 to specific sequences</li>
                  <li>DNA repair mechanisms complete the edit</li>
                  <li>Off-target effects must be minimized</li>
                </ul>
              </div>
            )}

            {gamePhase === 'drug_discovery' && (
              <div className="drug-info">
                <h5>Drug Discovery Principles:</h5>
                <ul>
                  <li>Drugs must bind specifically to targets</li>
                  <li>Binding affinity determines effectiveness</li>
                  <li>Selectivity reduces side effects</li>
                  <li>ADMET properties affect drug success</li>
                </ul>
              </div>
            )}

            <div className="hints">
              <h5>Helpful Hints:</h5>
              <ul>
                {levelData?.hints?.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoPanel;
