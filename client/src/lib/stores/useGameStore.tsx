import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "menu" | "genetic_modification" | "drug_discovery" | "tutorial" | "leaderboard";

interface GameState {
  gamePhase: GamePhase;
  currentLevel: number;
  score: number;
  timeElapsed: number;
  tutorialStep: number;
  isSimulating: boolean;
  lastSimulationResult: string | null;
  
  // Actions
  startMode: (mode: GamePhase) => void;
  goToMenu: () => void;
  nextLevel: () => void;
  resetLevel: () => void;
  updateScore: (points: number) => void;
  updateTime: () => void;
  simulate: () => void;
  setSimulationResult: (result: string) => void;
  showLeaderboard: () => void;
  
  // Tutorial actions
  nextTutorialStep: () => void;
  prevTutorialStep: () => void;
  skipTutorial: () => void;
  completeTutorial: () => void;
  
  // Game management
  endGame: () => void;
}

export const useGameStore = create<GameState>()(
  subscribeWithSelector((set, get) => ({
    gamePhase: "menu",
    currentLevel: 1,
    score: 0,
    timeElapsed: 0,
    tutorialStep: 0,
    isSimulating: false,
    lastSimulationResult: null,
    
    startMode: (mode) => {
      console.log(`Starting ${mode} mode`);
      set({ 
        gamePhase: mode, 
        currentLevel: 1, 
        score: 0, 
        timeElapsed: 0,
        lastSimulationResult: null 
      });
    },
    
    goToMenu: () => {
      set({ 
        gamePhase: "menu",
        currentLevel: 1,
        score: 0,
        timeElapsed: 0,
        tutorialStep: 0,
        lastSimulationResult: null
      });
    },
    
    nextLevel: () => {
      const { currentLevel } = get();
      if (currentLevel < 7) {
        set({ 
          currentLevel: currentLevel + 1,
          timeElapsed: 0,
          lastSimulationResult: null
        });
      } else {
        set({ gamePhase: "menu" });
      }
    },
    
    resetLevel: () => {
      set({ 
        timeElapsed: 0,
        lastSimulationResult: null 
      });
    },
    
    updateScore: (points) => {
      set((state) => ({ score: Math.max(0, state.score + points) }));
    },
    
    updateTime: () => {
      set((state) => ({ timeElapsed: state.timeElapsed + 1 }));
    },
    
    simulate: async () => {
      const { gamePhase } = get();
      set({ isSimulating: true });
      
      // Simulate biological interaction
      setTimeout(() => {
        // Simple simulation logic - in real implementation this would be more complex
        const success = Math.random() > 0.4; // 60% success rate for demo
        const result = success ? 'success' : (Math.random() > 0.5 ? 'partial' : 'failure');
        
        set({ 
          isSimulating: false,
          lastSimulationResult: result
        });
        
        if (result === 'success') {
          get().updateScore(100);
        } else if (result === 'partial') {
          get().updateScore(50);
        } else {
          get().updateScore(-25);
        }
      }, 2000);
    },
    
    setSimulationResult: (result) => {
      set({ lastSimulationResult: result });
    },
    
    showLeaderboard: () => {
      set({ gamePhase: "leaderboard" });
    },
    
    nextTutorialStep: () => {
      set((state) => ({ 
        tutorialStep: Math.min(state.tutorialStep + 1, 7) 
      }));
    },
    
    prevTutorialStep: () => {
      set((state) => ({ 
        tutorialStep: Math.max(state.tutorialStep - 1, 0) 
      }));
    },
    
    skipTutorial: () => {
      set({ gamePhase: "menu", tutorialStep: 0 });
    },
    
    completeTutorial: () => {
      set({ gamePhase: "menu", tutorialStep: 0 });
    },
    
    endGame: () => {
      // Handle game completion
      set({ gamePhase: "menu" });
    }
  }))
);
