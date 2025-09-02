import React from 'react';
import { useGameStore } from '../../lib/stores/useGameStore';
import DNAHelix from './DNAHelix';
import Pathogen from './Pathogen';
import DrugMolecule from './DrugMolecule';
import Lighting from './Lighting';
import { OrbitControls, Environment } from '@react-three/drei';

const Scene: React.FC = () => {
  const { gamePhase, currentLevel } = useGameStore();

  return (
    <>
      {/* Lighting setup */}
      <Lighting />
      
      {/* Environment for reflections */}
      <Environment preset="studio" />
      
      {/* Camera controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />

      {/* Main 3D objects */}
      {(gamePhase === 'genetic_modification' || gamePhase === 'tutorial') && (
        <DNAHelix 
          position={[0, 0, 0]} 
          scale={1}
          animated={true}
        />
      )}

      {gamePhase === 'drug_discovery' && (
        <DrugMolecule 
          position={[-3, 0, 0]} 
          scale={1}
          showBonds={true}
        />
      )}

      {/* Pathogen visualization */}
      <Pathogen 
        position={[4, 0, 0]} 
        scale={1}
        type={currentLevel <= 3 ? 'bacteria' : currentLevel <= 5 ? 'virus' : 'parasite'}
      />

      {/* Background grid */}
      <gridHelper args={[20, 20, '#333333', '#111111']} />

      {/* Base plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#0a0f1c" 
          transparent 
          opacity={0.8}
        />
      </mesh>
    </>
  );
};

export default Scene;
