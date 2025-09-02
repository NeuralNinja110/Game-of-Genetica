import React from 'react';
import { useGameStore } from '../lib/stores/useGameStore';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dna, Pill, BookOpen, Trophy } from 'lucide-react';

const MainMenu: React.FC = () => {
  const { startMode, showLeaderboard } = useGameStore();

  return (
    <div className="main-menu">
      <div className="menu-background">
        <div className="dna-animation"></div>
      </div>
      
      <div className="menu-content">
        <div className="game-title">
          <h1 className="title-text">Dna & RNA Interactive Lab</h1>
          <p className="subtitle-text">Explore genetic modification and drug discovery</p>
        </div>

        <div className="menu-cards">
          <Card className="mode-card genetic-card" onClick={() => startMode('genetic_modification')}>
            <CardHeader>
              <CardTitle className="card-title">
                <Dna className="mode-icon" />
                Genetic Modification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="card-description">
                Edit Dna/RNA sequences to make organisms resistant to diseases.
                Learn CRISPR-like editing and immune system interactions.
              </p>
              <div className="difficulty-indicators">
                <span className="difficulty easy">Easy: 3 levels</span>
                <span className="difficulty medium">Medium: 2 levels</span>
                <span className="difficulty hard">Hard: 2 levels</span>
              </div>
            </CardContent>
          </Card>

          <Card className="mode-card drug-card" onClick={() => startMode('drug_discovery')}>
            <CardHeader>
              <CardTitle className="card-title">
                <Pill className="mode-icon" />
                Drug Discovery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="card-description">
                Design and test drugs to break down pathogens and disease-causing sequences.
                Master molecular binding and drug interactions.
              </p>
              <div className="difficulty-indicators">
                <span className="difficulty easy">Easy: 3 levels</span>
                <span className="difficulty medium">Medium: 2 levels</span>
                <span className="difficulty hard">Hard: 2 levels</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="menu-buttons">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => startMode('tutorial')}
            className="menu-button tutorial-button"
          >
            <BookOpen className="button-icon" />
            Interactive Tutorial
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={showLeaderboard}
            className="menu-button leaderboard-button"
          >
            <Trophy className="button-icon" />
            Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
