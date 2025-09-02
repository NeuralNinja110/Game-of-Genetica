import React from 'react';
import { useGameStore } from '../../lib/stores/useGameStore';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';

const TutorialPanel: React.FC = () => {
  const { tutorialStep, nextTutorialStep, prevTutorialStep, skipTutorial } = useGameStore();

  const tutorialSteps = [
    {
      title: "Welcome to the Lab",
      content: "Welcome to the DNA & RNA Interactive Laboratory! This is where you'll learn to manipulate genetic material and design life-saving drugs.",
      action: "Look around the 3D environment. You can rotate the camera by clicking and dragging."
    },
    {
      title: "Understanding DNA",
      content: "DNA is the blueprint of life, made of four nucleotides: A, T, C, and G. They pair specifically: A with T, and C with G.",
      action: "Observe the DNA helix in the center. Notice how the bases pair together."
    },
    {
      title: "The DNA Editor",
      content: "Use the DNA Editor panel to modify genetic sequences. Select a nucleotide, then click on the DNA strand to make edits.",
      action: "Try selecting different nucleotides in the bottom panel. Notice how they're color-coded."
    },
    {
      title: "Understanding Pathogens",
      content: "Pathogens like viruses, bacteria, and parasites cause diseases. Each has unique characteristics and vulnerabilities.",
      action: "Look at the pathogen model on the right. Different levels feature different pathogen types."
    },
    {
      title: "Making Edits",
      content: "When you edit DNA, you're changing the organism's genetic instructions. This can create resistance to diseases.",
      action: "Select a nucleotide and try clicking on the DNA helix to make an edit."
    },
    {
      title: "Simulation",
      content: "After making changes, click 'Simulate' to see the biological outcome. Green means success, yellow is partial, red is failure.",
      action: "Make an edit and then click the Simulate button to see what happens."
    },
    {
      title: "Scientific Accuracy",
      content: "All interactions in this game are based on real biological principles. Wrong combinations will fail just like in real life.",
      action: "Remember: science matters! Think about real biological interactions."
    },
    {
      title: "Ready to Begin",
      content: "You're now ready to start your first challenge! Choose a game mode and begin saving lives through science.",
      action: "Click 'Complete Tutorial' to choose your first mode and level."
    }
  ];

  const currentStep = tutorialSteps[tutorialStep] || tutorialSteps[0];

  return (
    <div className="tutorial-panel">
      <Card className="tutorial-card">
        <CardHeader>
          <CardTitle className="tutorial-title">
            <BookOpen className="tutorial-icon" />
            Interactive Tutorial
            <span className="step-counter">
              Step {tutorialStep + 1} of {tutorialSteps.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="tutorial-content">
            <h4 className="step-title">{currentStep.title}</h4>
            <p className="step-description">{currentStep.content}</p>
            
            <div className="step-action">
              <strong>Try this:</strong>
              <p>{currentStep.action}</p>
            </div>

            <div className="tutorial-navigation">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTutorialStep}
                disabled={tutorialStep === 0}
                className="nav-button"
              >
                <ChevronLeft className="button-icon" />
                Previous
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={skipTutorial}
                className="skip-button"
              >
                Skip Tutorial
              </Button>

              {tutorialStep < tutorialSteps.length - 1 ? (
                <Button
                  variant="default"
                  size="sm"
                  onClick={nextTutorialStep}
                  className="nav-button"
                >
                  Next
                  <ChevronRight className="button-icon" />
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={skipTutorial}
                  className="complete-button"
                >
                  Complete Tutorial
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorialPanel;
