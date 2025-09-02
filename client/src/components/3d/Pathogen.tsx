import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../../lib/stores/useGameStore';
import { getCurrentLevelData } from '../../lib/gameLogic/levels';
import * as THREE from 'three';

interface PathogenProps {
  position?: [number, number, number];
  scale?: number;
  type?: 'virus' | 'bacteria' | 'parasite';
}

const Pathogen: React.FC<PathogenProps> = ({ 
  position = [5, 0, 0], 
  scale = 1, 
  type = 'virus' 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { currentLevel, gamePhase } = useGameStore();
  
  const levelData = getCurrentLevelData(gamePhase, currentLevel);
  const pathogenType = type || levelData?.pathogen?.type || 'virus';

  // Generate pathogen structure based on type
  const pathogenStructure = useMemo(() => {
    switch (pathogenType) {
      case 'virus':
        return {
          core: { radius: 0.8, color: '#FF4444' },
          spikes: Array.from({ length: 20 }, (_, i) => ({
            angle: (i / 20) * Math.PI * 2,
            length: 0.4,
            thickness: 0.05
          })),
          envelope: { radius: 1.0, color: '#FF6666' }
        };
      
      case 'bacteria':
        return {
          body: { length: 2, radius: 0.6, color: '#44AA44' },
          flagella: Array.from({ length: 4 }, (_, i) => ({
            angle: (i / 4) * Math.PI * 2,
            segments: 10
          })),
          membrane: { thickness: 0.05, color: '#66CC66' }
        };
      
      case 'parasite':
        return {
          body: { radius: 1.2, color: '#AA4444' },
          organelles: Array.from({ length: 8 }, (_, i) => ({
            position: [
              (Math.random() - 0.5) * 2,
              (Math.random() - 0.5) * 2,
              (Math.random() - 0.5) * 2
            ],
            size: 0.1 + Math.random() * 0.1,
            color: '#CC6666'
          }))
        };
      
      default:
        return { core: { radius: 1, color: '#888888' } };
    }
  }, [pathogenType]);

  // Animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const renderVirus = () => (
    <>
      {/* Viral envelope */}
      <mesh>
        <sphereGeometry args={[pathogenStructure.envelope?.radius || 1, 32, 32]} />
        <meshStandardMaterial 
          color={pathogenStructure.envelope?.color || '#FF6666'}
          transparent 
          opacity={0.3}
        />
      </mesh>

      {/* Viral core */}
      <mesh>
        <sphereGeometry args={[pathogenStructure.core?.radius || 0.8, 32, 32]} />
        <meshStandardMaterial color={pathogenStructure.core?.color || '#FF4444'} />
      </mesh>

      {/* Viral spikes */}
      {pathogenStructure.spikes?.map((spike, index) => (
        <group key={index} rotation={[0, spike.angle, 0]}>
          <mesh position={[1, 0, 0]}>
            <coneGeometry args={[spike.thickness, spike.length, 8]} />
            <meshStandardMaterial color="#AA2222" />
          </mesh>
        </group>
      ))}
    </>
  );

  const renderBacteria = () => (
    <>
      {/* Bacterial body */}
      <mesh>
        <capsuleGeometry args={[
          pathogenStructure.body?.radius || 0.6,
          pathogenStructure.body?.length || 2,
          16,
          32
        ]} />
        <meshStandardMaterial color={pathogenStructure.body?.color || '#44AA44'} />
      </mesh>

      {/* Cell membrane */}
      <mesh>
        <capsuleGeometry args={[
          (pathogenStructure.body?.radius || 0.6) + 0.05,
          (pathogenStructure.body?.length || 2) + 0.1,
          16,
          32
        ]} />
        <meshStandardMaterial 
          color={pathogenStructure.membrane?.color || '#66CC66'}
          transparent 
          opacity={0.4}
        />
      </mesh>

      {/* Flagella */}
      {pathogenStructure.flagella?.map((flagellum, index) => (
        <group key={index} rotation={[0, flagellum.angle, 0]}>
          {Array.from({ length: flagellum.segments }, (_, segIndex) => (
            <mesh 
              key={segIndex}
              position={[
                1.5 + segIndex * 0.2,
                Math.sin(segIndex * 0.5) * 0.2,
                0
              ]}
            >
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial color="#226622" />
            </mesh>
          ))}
        </group>
      ))}
    </>
  );

  const renderParasite = () => (
    <>
      {/* Parasite body */}
      <mesh>
        <sphereGeometry args={[pathogenStructure.body?.radius || 1.2, 32, 32]} />
        <meshStandardMaterial color={pathogenStructure.body?.color || '#AA4444'} />
      </mesh>

      {/* Internal organelles */}
      {pathogenStructure.organelles?.map((organelle, index) => (
        <mesh key={index} position={organelle.position as [number, number, number]}>
          <sphereGeometry args={[organelle.size, 16, 16]} />
          <meshStandardMaterial color={organelle.color} />
        </mesh>
      ))}
    </>
  );

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {pathogenType === 'virus' && renderVirus()}
      {pathogenType === 'bacteria' && renderBacteria()}
      {pathogenType === 'parasite' && renderParasite()}
    </group>
  );
};

export default Pathogen;
