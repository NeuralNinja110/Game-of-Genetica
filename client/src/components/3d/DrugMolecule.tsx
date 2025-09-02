import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useDrug } from '../../lib/stores/useDrug';
import * as THREE from 'three';

interface DrugMoleculeProps {
  position?: [number, number, number];
  scale?: number;
  showBonds?: boolean;
}

const DrugMolecule: React.FC<DrugMoleculeProps> = ({ 
  position = [-5, 0, 0], 
  scale = 1,
  showBonds = true 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { drugComponents, selectedComponent, bindingTarget } = useDrug();

  // Generate molecule structure from components
  const moleculeStructure = useMemo(() => {
    const atoms: any[] = [];
    const bonds: any[] = [];

    drugComponents.forEach((component, compIndex) => {
      const basePosition = [
        (compIndex % 3) * 2 - 2,
        Math.floor(compIndex / 3) * 1.5 - 1,
        0
      ];

      // Add atoms for each component
      if (component.atoms && Array.isArray(component.atoms)) {
        component.atoms.forEach((atom, atomIndex) => {
          const offset = [
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 1.5
          ];

          atoms.push({
            id: `${compIndex}-${atomIndex}`,
            element: atom.element,
            position: [
              basePosition[0] + offset[0],
              basePosition[1] + offset[1],
              basePosition[2] + offset[2]
            ],
            component: compIndex
          });

          // Create bonds within component
          if (atomIndex > 0) {
            bonds.push({
              from: `${compIndex}-${atomIndex - 1}`,
              to: `${compIndex}-${atomIndex}`,
              type: 'single'
            });
          }
        });
      }

      // Create bonds between components
      if (compIndex > 0) {
        bonds.push({
          from: `${compIndex - 1}-0`,
          to: `${compIndex}-0`,
          type: 'single'
        });
      }
    });

    return { atoms, bonds };
  }, [drugComponents]);

  // Get color for element
  const getElementColor = (element: string) => {
    const colors: { [key: string]: string } = {
      'C': '#444444', // Carbon - dark gray
      'N': '#3050F8', // Nitrogen - blue
      'O': '#FF0D0D', // Oxygen - red
      'S': '#FFFF30', // Sulfur - yellow
      'P': '#FF8000', // Phosphorus - orange
      'H': '#FFFFFF', // Hydrogen - white
      'Cl': '#1FF01F', // Chlorine - green
      'F': '#90E050'  // Fluorine - light green
    };
    return colors[element] || '#888888';
  };

  // Get atom radius
  const getAtomRadius = (element: string) => {
    const radii: { [key: string]: number } = {
      'H': 0.1,
      'C': 0.15,
      'N': 0.14,
      'O': 0.13,
      'S': 0.18,
      'P': 0.18,
      'Cl': 0.17,
      'F': 0.12
    };
    return radii[element] || 0.15;
  };

  // Animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Render atoms */}
      {moleculeStructure.atoms.map((atom) => (
        <mesh key={atom.id} position={atom.position}>
          <sphereGeometry args={[getAtomRadius(atom.element), 16, 16]} />
          <meshStandardMaterial 
            color={getElementColor(atom.element)}
            emissive={atom.component === selectedComponent ? '#222222' : '#000000'}
          />
        </mesh>
      ))}

      {/* Render bonds */}
      {showBonds && moleculeStructure.bonds.map((bond, index) => {
        const fromAtom = moleculeStructure.atoms.find(a => a.id === bond.from);
        const toAtom = moleculeStructure.atoms.find(a => a.id === bond.to);
        
        if (!fromAtom || !toAtom) return null;

        const fromPos = new THREE.Vector3(...fromAtom.position);
        const toPos = new THREE.Vector3(...toAtom.position);
        const midpoint = fromPos.clone().add(toPos).multiplyScalar(0.5);
        const direction = toPos.clone().sub(fromPos);
        const length = direction.length();
        
        return (
          <group key={index}>
            <mesh 
              position={midpoint.toArray()}
              rotation={[0, 0, Math.atan2(direction.z, direction.x)]}
            >
              <cylinderGeometry args={[0.02, 0.02, length, 8]} />
              <meshStandardMaterial color="#666666" />
            </mesh>
          </group>
        );
      })}

      {/* Binding visualization */}
      {bindingTarget && (
        <mesh>
          <ringGeometry args={[2, 2.5, 16]} />
          <meshBasicMaterial 
            color="#00FF00" 
            transparent 
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

export default DrugMolecule;
