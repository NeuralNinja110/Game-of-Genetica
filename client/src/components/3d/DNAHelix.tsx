import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useDNA } from '../../lib/stores/useDNA';
import * as THREE from 'three';

interface DNAHelixProps {
  position?: [number, number, number];
  scale?: number;
  animated?: boolean;
}

// Get complementary DNA base
const getComplementaryBase = (base: string) => {
  const pairs: { [key: string]: string } = {
    'A': 'T',
    'T': 'A',
    'C': 'G',
    'G': 'C',
    'U': 'A' // For RNA
  };
  return pairs[base] || 'A';
};

// Get hydrogen bond count for base pairing
const getHydrogenBondCount = (base: string) => {
  const bonds: { [key: string]: number } = {
    'A': 2, // A-T has 2 hydrogen bonds
    'T': 2,
    'C': 3, // C-G has 3 hydrogen bonds
    'G': 3,
    'U': 2  // U-A has 2 hydrogen bonds (RNA)
  };
  return bonds[base] || 2;
};

const DNAHelix: React.FC<DNAHelixProps> = ({ 
  position = [0, 0, 0], 
  scale = 1, 
  animated = true 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { sequence, selectedNucleotide, editPosition } = useDNA();

  // Generate helix structure with scientific accuracy
  const helixData = useMemo(() => {
    const data: any[] = [];
    const turns = 6; // More realistic number of turns
    const basePairsPerTurn = 10.4; // Scientifically accurate B-form DNA
    const totalBasePairs = Math.ceil(turns * basePairsPerTurn);
    const helixRadius = 1.0; // 10 Ångströms in relative scale
    const helixPitch = 3.4; // Rise per base pair in relative scale
    const majorGrooveWidth = 2.2;
    const minorGrooveWidth = 1.2;

    for (let i = 0; i < totalBasePairs; i++) {
      const t = i / totalBasePairs;
      const angle = (i / basePairsPerTurn) * Math.PI * 2;
      const y = i * helixPitch - (totalBasePairs * helixPitch) / 2;

      // Major groove positioning
      const majorGrooveAngle = angle;
      const minorGrooveAngle = angle + Math.PI;

      // Strand 1 (5' to 3' direction)
      const strand1Position = [
        helixRadius * Math.cos(majorGrooveAngle),
        y,
        helixRadius * Math.sin(majorGrooveAngle)
      ];

      // Strand 2 (3' to 5' direction, antiparallel)
      const strand2Position = [
        helixRadius * Math.cos(minorGrooveAngle),
        y,
        helixRadius * Math.sin(minorGrooveAngle)
      ];

      // Get nucleotides
      const baseIndex = i % sequence.length;
      const nucleotide1 = sequence[baseIndex];
      const nucleotide2 = getComplementaryBase(nucleotide1);

      // Add base pairs with proper hydrogen bonding distances
      data.push({
        position: strand1Position,
        nucleotide: nucleotide1,
        strand: 1,
        index: i,
        basePairIndex: i,
        hydrogenBonds: getHydrogenBondCount(nucleotide1),
        sugarPhosphate: {
          sugar: [
            strand1Position[0] * 0.85,
            strand1Position[1],
            strand1Position[2] * 0.85
          ],
          phosphate: [
            strand1Position[0] * 1.15,
            strand1Position[1] + 0.2,
            strand1Position[2] * 1.15
          ]
        }
      });

      data.push({
        position: strand2Position,
        nucleotide: nucleotide2,
        strand: 2,
        index: i,
        basePairIndex: i,
        hydrogenBonds: getHydrogenBondCount(nucleotide2),
        sugarPhosphate: {
          sugar: [
            strand2Position[0] * 0.85,
            strand2Position[1],
            strand2Position[2] * 0.85
          ],
          phosphate: [
            strand2Position[0] * 1.15,
            strand2Position[1] - 0.2,
            strand2Position[2] * 1.15
          ]
        }
      });
    }

    return data;
  }, [sequence]);

  // Get color for nucleotide
  const getNucleotideColor = (nucleotide: string) => {
    const colors: { [key: string]: string } = {
      'A': '#FF6B6B', // Red for Adenine
      'T': '#4ECDC4', // Teal for Thymine
      'C': '#45B7D1', // Blue for Cytosine
      'G': '#96CEB4', // Green for Guanine
      'U': '#FECA57'  // Yellow for Uracil (RNA)
    };
    return colors[nucleotide] || '#FFFFFF';
  };

  // Animation
  useFrame((state) => {
    if (animated && groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {helixData.map((point, index) => (
        <group key={index}>
          {/* Nucleotide base (larger and more detailed) */}
          <mesh position={point.position}>
            <sphereGeometry args={[0.2, 20, 20]} />
            <meshStandardMaterial 
              color={getNucleotideColor(point.nucleotide)}
              emissive={point.index === editPosition ? '#333333' : '#000000'}
              transparent
              opacity={point.index === editPosition ? 1 : 0.9}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>

          {/* Sugar component */}
          {point.sugarPhosphate && (
            <mesh position={point.sugarPhosphate.sugar}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshStandardMaterial color="#8B4513" opacity={0.8} transparent />
            </mesh>
          )}

          {/* Phosphate component */}
          {point.sugarPhosphate && (
            <mesh position={point.sugarPhosphate.phosphate}>
              <sphereGeometry args={[0.1, 12, 12]} />
              <meshStandardMaterial color="#FFA500" opacity={0.8} transparent />
            </mesh>
          )}

          {/* Sugar-phosphate backbone connections */}
          {index < helixData.length - 2 && point.strand === helixData[index + 2]?.strand && (
            <>
              {/* Sugar to nucleotide */}
              <mesh position={[
                (point.position[0] + point.sugarPhosphate.sugar[0]) / 2,
                (point.position[1] + point.sugarPhosphate.sugar[1]) / 2,
                (point.position[2] + point.sugarPhosphate.sugar[2]) / 2
              ]}>
                <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
                <meshStandardMaterial color="#654321" />
              </mesh>
              
              {/* Sugar to phosphate */}
              <mesh position={[
                (point.sugarPhosphate.sugar[0] + point.sugarPhosphate.phosphate[0]) / 2,
                (point.sugarPhosphate.sugar[1] + point.sugarPhosphate.phosphate[1]) / 2,
                (point.sugarPhosphate.sugar[2] + point.sugarPhosphate.phosphate[2]) / 2
              ]}>
                <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
                <meshStandardMaterial color="#B8860B" />
              </mesh>

              {/* Phosphate to next sugar (backbone continuity) */}
              {helixData[index + 2] && helixData[index + 2].sugarPhosphate && (
                <mesh position={[
                  (point.sugarPhosphate.phosphate[0] + helixData[index + 2].sugarPhosphate.sugar[0]) / 2,
                  (point.sugarPhosphate.phosphate[1] + helixData[index + 2].sugarPhosphate.sugar[1]) / 2,
                  (point.sugarPhosphate.phosphate[2] + helixData[index + 2].sugarPhosphate.sugar[2]) / 2
                ]}>
                  <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
                  <meshStandardMaterial color="#DAA520" />
                </mesh>
              )}
            </>
          )}

          {/* Hydrogen bonds between base pairs */}
          {point.strand === 1 && index % 2 === 0 && helixData[index + 1] && (
            <>
              {Array.from({ length: point.hydrogenBonds }, (_, bondIndex) => (
                <mesh 
                  key={bondIndex}
                  position={[
                    (point.position[0] + helixData[index + 1].position[0]) / 2,
                    point.position[1] + (bondIndex - point.hydrogenBonds / 2) * 0.1,
                    (point.position[2] + helixData[index + 1].position[2]) / 2
                  ]}
                >
                  <cylinderGeometry args={[0.015, 0.015, 
                    Math.sqrt(
                      Math.pow(point.position[0] - helixData[index + 1].position[0], 2) +
                      Math.pow(point.position[2] - helixData[index + 1].position[2], 2)
                    ), 6]} />
                  <meshStandardMaterial 
                    color="#00FFFF" 
                    transparent 
                    opacity={0.6}
                  />
                </mesh>
              ))}
            </>
          )}
        </group>
      ))}

      {/* Major and Minor groove visualization */}
      <group>
        {/* Major groove indicator */}
        <mesh position={[1.5, 0, 0]}>
          <torusGeometry args={[0.1, 0.03, 6, 12]} />
          <meshBasicMaterial color="#FFD700" transparent opacity={0.4} />
        </mesh>
        
        {/* Minor groove indicator */}
        <mesh position={[-1.5, 0, 0]}>
          <torusGeometry args={[0.08, 0.02, 6, 12]} />
          <meshBasicMaterial color="#32CD32" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Selection indicator */}
      {editPosition !== null && helixData[editPosition] && (
        <mesh position={helixData[editPosition].position}>
          <ringGeometry args={[0.25, 0.35, 16]} />
          <meshBasicMaterial 
            color="#FFFF00" 
            transparent 
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

export default DNAHelix;
