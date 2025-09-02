import React from 'react';
import { useGameStore } from '../lib/stores/useGameStore';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Tutorial: React.FC = () => {
  const { tutorialStep, nextTutorialStep, prevTutorialStep, completeTutorial } = useGameStore();

  const tutorialSteps = [
    {
      title: "Welcome to DNA & RNA Lab",
      content: "In this interactive laboratory, you'll learn to manipulate genetic material and design drugs to combat diseases. Let's start with the basics of DNA structure.",
      highlight: "dna-helix"
    },
    {
      title: "DNA Structure",
      content: "DNA is a double helix made of four nucleotides: Adenine (A), Thymine (T), Cytosine (C), and Guanine (G). A pairs with T, and C pairs with G.",
      highlight: "nucleotides"
    },
    {
      title: "RNA Differences",
      content: "RNA is similar to DNA but uses Uracil (U) instead of Thymine (T). RNA is typically single-stranded and plays crucial roles in protein synthesis.",
      highlight: "rna-strand"
    },
    {
      title: "Genetic Modification",
      content: "In Genetic Modification mode, you'll edit DNA sequences to make organisms resistant to diseases. Use CRISPR-like tools to make precise edits.",
      highlight: "dna-editor"
    },
    {
      title: "Drug Discovery",
      content: "In Drug Discovery mode, you'll design molecules that can bind to and neutralize pathogens. Consider binding affinity and toxicity.",
      highlight: "drug-builder"
    },
    {
      title: "Simulation & Feedback",
      content: "After making changes, click 'Simulate' to see the results. Green indicates success, yellow shows partial success, and red means failure.",
      highlight: "simulate-button"
    },
    {
      title: "Ready to Start",
      content: "You're now ready to begin! Choose a game mode and start experimenting. Remember, each action has scientific consequences.",
      highlight: "menu-buttons"
    }
  ];

  const currentStep = tutorialSteps[tutorialStep];

  return (
    <div className="tutorial-overlay">
      <Card className="tutorial-card">
        <CardHeader>
          <CardTitle>
            {currentStep.title}
            <span className="step-counter">
              {tutorialStep + 1} / {tutorialSteps.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="tutorial-content">{currentStep.content}</p>
          
          <div className="tutorial-navigation">
            <Button
              variant="outline"
              onClick={prevTutorialStep}
              disabled={tutorialStep === 0}
              className="nav-button"
            >
              <ChevronLeft className="button-icon" />
              Previous
            </Button>
            
            {tutorialStep < tutorialSteps.length - 1 ? (
              <Button
                variant="default"
                onClick={nextTutorialStep}
                className="nav-button"
              >
                Next
                <ChevronRight className="button-icon" />
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={completeTutorial}
                className="nav-button complete-button"
              >
                Start Playing!
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tutorial;
