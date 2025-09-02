import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import { useAudio } from "./lib/stores/useAudio";
import { useGameStore } from "./lib/stores/useGameStore";
import "@fontsource/inter";
import "./styles/game.css";

// Import our game components
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import Scene from "./components/3d/Scene";
import GameUI from "./components/GameUI";

// Define control keys for the game
const controls = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "leftward", keys: ["KeyA", "ArrowLeft"] },
  { name: "rightward", keys: ["KeyD", "ArrowRight"] },
  { name: "rotate", keys: ["KeyR"] },
  { name: "zoom", keys: ["KeyZ"] },
  { name: "select", keys: ["Space"] },
  { name: "delete", keys: ["Delete", "Backspace"] },
];

// Main App component
function App() {
  const { gamePhase } = useGameStore();
  const [showCanvas, setShowCanvas] = useState(false);

  // Show the canvas once everything is loaded
  useEffect(() => {
    setShowCanvas(true);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {showCanvas && (
        <KeyboardControls map={controls}>
          {gamePhase === 'menu' && <MainMenu />}

          {(gamePhase === 'genetic_modification' || gamePhase === 'drug_discovery' || gamePhase === 'tutorial') && (
            <>
              <Canvas
                shadows
                camera={{
                  position: [0, 5, 10],
                  fov: 45,
                  near: 0.1,
                  far: 1000
                }}
                gl={{
                  antialias: true,
                  powerPreference: "high-performance"
                }}
              >
                <color attach="background" args={["#0a0f1c"]} />
                <Suspense fallback={null}>
                  <Scene />
                </Suspense>
              </Canvas>
              <GameUI />
            </>
          )}
        </KeyboardControls>
      )}
    </div>
  );
}

export default App;
