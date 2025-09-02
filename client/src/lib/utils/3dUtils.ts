// 3D utility functions for molecular visualization and scientific accuracy

import * as THREE from 'three';
import { COLORS, VISUALIZATION, SCIENCE } from '../constants/gameConstants';

// DNA/RNA structure generation utilities
export class DNAHelixGenerator {
  static generateHelixPoints(
    turns: number = VISUALIZATION.DNA_HELIX.TURNS,
    pointsPerTurn: number = VISUALIZATION.DNA_HELIX.POINTS_PER_TURN,
    radius: number = VISUALIZATION.DNA_HELIX.RADIUS,
    height: number = VISUALIZATION.DNA_HELIX.HEIGHT
  ): Array<{ position: THREE.Vector3; strand: number; index: number }> {
    
    const points: Array<{ position: THREE.Vector3; strand: number; index: number }> = [];
    const totalPoints = turns * pointsPerTurn;
    
    for (let i = 0; i < totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * turns * Math.PI * 2;
      const y = (t - 0.5) * height;
      
      // Strand 1
      points.push({
        position: new THREE.Vector3(
          radius * Math.cos(angle),
          y,
          radius * Math.sin(angle)
        ),
        strand: 1,
        index: i
      });
      
      // Strand 2 (complementary, offset by π)
      points.push({
        position: new THREE.Vector3(
          radius * Math.cos(angle + Math.PI),
          y,
          radius * Math.sin(angle + Math.PI)
        ),
        strand: 2,
        index: i
      });
    }
    
    return points;
  }
  
  static generateBasePairs(
    sequence: string[],
    helixPoints: Array<{ position: THREE.Vector3; strand: number; index: number }>
  ): Array<{ from: THREE.Vector3; to: THREE.Vector3; baseType: string }> {
    
    const basePairs: Array<{ from: THREE.Vector3; to: THREE.Vector3; baseType: string }> = [];
    
    for (let i = 0; i < sequence.length && i * 2 < helixPoints.length; i++) {
      const point1 = helixPoints[i * 2];
      const point2 = helixPoints[i * 2 + 1];
      
      if (point1 && point2) {
        basePairs.push({
          from: point1.position,
          to: point2.position,
          baseType: sequence[i]
        });
      }
    }
    
    return basePairs;
  }
  
  static getComplementaryBase(base: string, isRNA: boolean = false): string {
    const pairs: { [key: string]: string } = isRNA
      ? { 'A': 'U', 'U': 'A', 'C': 'G', 'G': 'C' }
      : { 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C' };
    
    return pairs[base] || base;
  }
}

// Protein structure utilities
export class ProteinStructureGenerator {
  static generateAlphaHelix(
    aminoAcids: string[],
    startPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  ): Array<{ position: THREE.Vector3; aminoAcid: string; secondaryStructure: string }> {
    
    const points: Array<{ position: THREE.Vector3; aminoAcid: string; secondaryStructure: string }> = [];
    const radius = VISUALIZATION.PROTEINS.ALPHA_HELIX_RADIUS;
    const rise = 1.5; // Angstroms per residue
    const turnAngle = 100; // degrees per residue
    
    aminoAcids.forEach((aa, index) => {
      const angle = (index * turnAngle) * (Math.PI / 180);
      const y = index * rise;
      
      points.push({
        position: new THREE.Vector3(
          startPosition.x + radius * Math.cos(angle),
          startPosition.y + y,
          startPosition.z + radius * Math.sin(angle)
        ),
        aminoAcid: aa,
        secondaryStructure: 'alpha-helix'
      });
    });
    
    return points;
  }
  
  static generateBetaSheet(
    aminoAcids: string[],
    startPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
    direction: THREE.Vector3 = new THREE.Vector3(1, 0, 0)
  ): Array<{ position: THREE.Vector3; aminoAcid: string; secondaryStructure: string }> {
    
    const points: Array<{ position: THREE.Vector3; aminoAcid: string; secondaryStructure: string }> = [];
    const spacing = 3.5; // Angstroms between residues
    
    aminoAcids.forEach((aa, index) => {
      points.push({
        position: new THREE.Vector3(
          startPosition.x + direction.x * index * spacing,
          startPosition.y + direction.y * index * spacing,
          startPosition.z + direction.z * index * spacing
        ),
        aminoAcid: aa,
        secondaryStructure: 'beta-sheet'
      });
    });
    
    return points;
  }
  
  static getAminoAcidProperties(aminoAcid: string): {
    hydrophobicity: number;
    charge: number;
    size: number;
    color: string;
  } {
    
    const properties: { [key: string]: any } = {
      'A': { hydrophobicity: 0.5, charge: 0, size: 0.3, color: COLORS.AMINO_ACIDS.HYDROPHOBIC }, // Alanine
      'R': { hydrophobicity: -0.8, charge: 1, size: 0.8, color: COLORS.AMINO_ACIDS.CHARGED_POSITIVE }, // Arginine
      'N': { hydrophobicity: -0.2, charge: 0, size: 0.6, color: COLORS.AMINO_ACIDS.POLAR }, // Asparagine
      'D': { hydrophobicity: -0.6, charge: -1, size: 0.5, color: COLORS.AMINO_ACIDS.CHARGED_NEGATIVE }, // Aspartic acid
      'C': { hydrophobicity: 0.3, charge: 0, size: 0.4, color: COLORS.AMINO_ACIDS.SPECIAL }, // Cysteine
      'E': { hydrophobicity: -0.7, charge: -1, size: 0.7, color: COLORS.AMINO_ACIDS.CHARGED_NEGATIVE }, // Glutamic acid
      'Q': { hydrophobicity: -0.1, charge: 0, size: 0.7, color: COLORS.AMINO_ACIDS.POLAR }, // Glutamine
      'G': { hydrophobicity: 0.0, charge: 0, size: 0.1, color: COLORS.AMINO_ACIDS.SPECIAL }, // Glycine
      'H': { hydrophobicity: -0.1, charge: 0.5, size: 0.6, color: COLORS.AMINO_ACIDS.CHARGED_POSITIVE }, // Histidine
      'I': { hydrophobicity: 1.0, charge: 0, size: 0.7, color: COLORS.AMINO_ACIDS.HYDROPHOBIC }, // Isoleucine
      'L': { hydrophobicity: 0.9, charge: 0, size: 0.7, color: COLORS.AMINO_ACIDS.HYDROPHOBIC }, // Leucine
      'K': { hydrophobicity: -0.8, charge: 1, size: 0.7, color: COLORS.AMINO_ACIDS.CHARGED_POSITIVE }, // Lysine
      'M': { hydrophobicity: 0.7, charge: 0, size: 0.7, color: COLORS.AMINO_ACIDS.HYDROPHOBIC }, // Methionine
      'F': { hydrophobicity: 1.0, charge: 0, size: 0.8, color: COLORS.AMINO_ACIDS.AROMATIC }, // Phenylalanine
      'P': { hydrophobicity: 0.0, charge: 0, size: 0.5, color: COLORS.AMINO_ACIDS.SPECIAL }, // Proline
      'S': { hydrophobicity: -0.1, charge: 0, size: 0.4, color: COLORS.AMINO_ACIDS.POLAR }, // Serine
      'T': { hydrophobicity: 0.0, charge: 0, size: 0.5, color: COLORS.AMINO_ACIDS.POLAR }, // Threonine
      'W': { hydrophobicity: 0.9, charge: 0, size: 1.0, color: COLORS.AMINO_ACIDS.AROMATIC }, // Tryptophan
      'Y': { hydrophobicity: 0.3, charge: 0, size: 0.9, color: COLORS.AMINO_ACIDS.AROMATIC }, // Tyrosine
      'V': { hydrophobicity: 0.8, charge: 0, size: 0.6, color: COLORS.AMINO_ACIDS.HYDROPHOBIC }  // Valine
    };
    
    return properties[aminoAcid] || { hydrophobicity: 0, charge: 0, size: 0.5, color: '#FFFFFF' };
  }
}

// Molecular visualization utilities
export class MolecularVisualization {
  static createAtomGeometry(element: string): { geometry: THREE.SphereGeometry; color: string } {
    const atomData: { [key: string]: { radius: number; color: string } } = {
      'H': { radius: 0.31, color: '#FFFFFF' }, // Hydrogen - white
      'C': { radius: 0.70, color: '#444444' }, // Carbon - dark gray
      'N': { radius: 0.65, color: '#3050F8' }, // Nitrogen - blue
      'O': { radius: 0.60, color: '#FF0D0D' }, // Oxygen - red
      'S': { radius: 1.00, color: '#FFFF30' }, // Sulfur - yellow
      'P': { radius: 1.00, color: '#FF8000' }, // Phosphorus - orange
      'Cl': { radius: 0.99, color: '#1FF01F' }, // Chlorine - green
      'F': { radius: 0.57, color: '#90E050' }, // Fluorine - light green
      'Na': { radius: 1.86, color: '#AB5CF2' }, // Sodium - violet
      'Mg': { radius: 1.61, color: '#8AFF00' }, // Magnesium - green
      'Ca': { radius: 1.97, color: '#3DFF00' }, // Calcium - green
      'Fe': { radius: 1.24, color: '#E06633' }, // Iron - orange-red
      'Zn': { radius: 1.22, color: '#7D80B0' }  // Zinc - blue-gray
    };
    
    const data = atomData[element] || { radius: 0.5, color: '#CCCCCC' };
    
    return {
      geometry: new THREE.SphereGeometry(data.radius * VISUALIZATION.PROTEINS.ATOM_RADIUS_SCALE, 16, 16),
      color: data.color
    };
  }
  
  static createBondGeometry(
    from: THREE.Vector3,
    to: THREE.Vector3,
    bondType: 'single' | 'double' | 'triple' | 'aromatic' = 'single'
  ): { geometry: THREE.CylinderGeometry; position: THREE.Vector3; rotation: THREE.Euler } {
    
    const direction = new THREE.Vector3().subVectors(to, from);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
    
    // Bond thickness based on type
    const thickness = {
      'single': 0.02,
      'double': 0.03,
      'triple': 0.04,
      'aromatic': 0.025
    }[bondType];
    
    const geometry = new THREE.CylinderGeometry(thickness, thickness, length, 8);
    
    // Calculate rotation to align with bond direction
    const rotation = new THREE.Euler();
    const axis = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction.normalize());
    rotation.setFromQuaternion(quaternion);
    
    return {
      geometry,
      position: midpoint,
      rotation
    };
  }
  
  static calculateMolecularWeight(formula: { [element: string]: number }): number {
    const atomicWeights: { [key: string]: number } = {
      'H': 1.008, 'C': 12.011, 'N': 14.007, 'O': 15.999,
      'S': 32.065, 'P': 30.974, 'Cl': 35.453, 'F': 18.998,
      'Na': 22.990, 'Mg': 24.305, 'Ca': 40.078, 'Fe': 55.845, 'Zn': 65.38
    };
    
    let totalWeight = 0;
    for (const [element, count] of Object.entries(formula)) {
      totalWeight += (atomicWeights[element] || 0) * count;
    }
    
    return totalWeight;
  }
  
  static estimateLogP(atoms: { element: string }[]): number {
    // Simplified LogP calculation based on atomic contributions
    const contributions: { [key: string]: number } = {
      'C': 0.5, 'H': 0.2, 'N': -1.0, 'O': -1.5,
      'S': 0.0, 'P': -1.0, 'Cl': 0.5, 'F': -0.5
    };
    
    let logP = 0;
    atoms.forEach(atom => {
      logP += contributions[atom.element] || 0;
    });
    
    return logP;
  }
}

// Pathogen 3D model generators
export class PathogenModelGenerator {
  static generateVirus(
    type: 'icosahedral' | 'helical' | 'complex',
    size: number,
    hasEnvelope: boolean = false
  ): { 
    capsid: THREE.Mesh; 
    envelope?: THREE.Mesh; 
    spikes?: THREE.Mesh[] 
  } {
    
    const capsidGeometry = type === 'icosahedral' 
      ? new THREE.IcosahedronGeometry(size, 2)
      : new THREE.CylinderGeometry(size * 0.3, size * 0.3, size * 2, 8);
    
    const capsidMaterial = new THREE.MeshStandardMaterial({
      color: COLORS.PATHOGENS.VIRUS,
      transparent: true,
      opacity: 0.8,
      roughness: 0.3,
      metalness: 0.1
    });
    
    const capsid = new THREE.Mesh(capsidGeometry, capsidMaterial);
    
    const result: any = { capsid };
    
    if (hasEnvelope) {
      const envelopeGeometry = new THREE.SphereGeometry(size * 1.2, 32, 32);
      const envelopeMaterial = new THREE.MeshStandardMaterial({
        color: COLORS.PATHOGENS.VIRUS,
        transparent: true,
        opacity: 0.3,
        roughness: 0.8
      });
      result.envelope = new THREE.Mesh(envelopeGeometry, envelopeMaterial);
      
      // Add spikes
      result.spikes = [];
      for (let i = 0; i < 20; i++) {
        const spikeGeometry = new THREE.ConeGeometry(0.05, 0.3, 8);
        const spikeMaterial = new THREE.MeshStandardMaterial({
          color: '#AA2222'
        });
        const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
        
        // Position spike on surface
        const phi = Math.acos(-1 + (2 * i) / 20);
        const theta = Math.sqrt(20 * Math.PI) * phi;
        
        spike.position.setFromSphericalCoords(size * 1.2, phi, theta);
        spike.lookAt(new THREE.Vector3(0, 0, 0));
        
        result.spikes.push(spike);
      }
    }
    
    return result;
  }
  
  static generateBacteria(
    shape: 'spherical' | 'rod' | 'spiral',
    size: { length: number; width: number }
  ): {
    body: THREE.Mesh;
    membrane: THREE.Mesh;
    flagella?: THREE.Mesh[];
  } {
    
    let bodyGeometry: THREE.BufferGeometry;
    
    switch (shape) {
      case 'spherical':
        bodyGeometry = new THREE.SphereGeometry(size.width, 32, 32);
        break;
      case 'rod':
        bodyGeometry = new THREE.CapsuleGeometry(size.width, size.length, 16, 32);
        break;
      case 'spiral':
        // Create spiral geometry
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, -size.length/2, 0),
          new THREE.Vector3(size.width, -size.length/4, 0),
          new THREE.Vector3(-size.width, size.length/4, 0),
          new THREE.Vector3(0, size.length/2, 0)
        ]);
        bodyGeometry = new THREE.TubeGeometry(curve, 64, size.width * 0.3, 8, false);
        break;
      default:
        bodyGeometry = new THREE.CapsuleGeometry(size.width, size.length, 16, 32);
    }
    
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: COLORS.PATHOGENS.BACTERIA,
      roughness: 0.7,
      metalness: 0.1
    });
    
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    
    // Cell membrane
    const membraneGeometry = bodyGeometry.clone();
    membraneGeometry.scale(1.05, 1.05, 1.05);
    const membraneMaterial = new THREE.MeshStandardMaterial({
      color: COLORS.PATHOGENS.BACTERIA,
      transparent: true,
      opacity: 0.4,
      side: THREE.FrontSide
    });
    
    const membrane = new THREE.Mesh(membraneGeometry, membraneMaterial);
    
    // Flagella (optional)
    const flagella: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const flagellaPoints: THREE.Vector3[] = [];
      for (let j = 0; j < 20; j++) {
        flagellaPoints.push(new THREE.Vector3(
          size.length/2 + j * 0.2,
          Math.sin(j * 0.5) * 0.2,
          Math.cos(j * 0.5) * 0.2
        ));
      }
      
      const flagellaCurve = new THREE.CatmullRomCurve3(flagellaPoints);
      const flagellaGeometry = new THREE.TubeGeometry(flagellaCurve, 64, 0.01, 8, false);
      const flagellaMaterial = new THREE.MeshStandardMaterial({
        color: '#226622'
      });
      
      const flagellaObj = new THREE.Mesh(flagellaGeometry, flagellaMaterial);
      flagellaObj.rotateY((i / 4) * Math.PI * 2);
      flagella.push(flagellaObj);
    }
    
    return { body, membrane, flagella };
  }
}

// Animation utilities
export class AnimationUtils {
  static createDNARotationAnimation(
    helix: THREE.Group,
    speed: number = 0.2
  ): (deltaTime: number) => void {
    return (deltaTime: number) => {
      helix.rotation.y += speed * deltaTime;
    };
  }
  
  static createPathogenMovement(
    pathogen: THREE.Group,
    amplitude: number = 0.1,
    frequency: number = 1
  ): (time: number) => void {
    const initialPosition = pathogen.position.clone();
    
    return (time: number) => {
      pathogen.position.y = initialPosition.y + Math.sin(time * frequency) * amplitude;
      pathogen.rotation.x = Math.sin(time * frequency * 0.5) * 0.1;
    };
  }
  
  static createMolecularVibration(
    molecule: THREE.Group,
    intensity: number = 0.02
  ): (time: number) => void {
    return (time: number) => {
      molecule.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          child.position.x += Math.sin(time * 10 + index) * intensity;
          child.position.y += Math.cos(time * 8 + index) * intensity;
          child.position.z += Math.sin(time * 12 + index) * intensity;
        }
      });
    };
  }
}

// Physics simulation utilities
export class PhysicsUtils {
  static calculateElectrostaticForce(
    charge1: number,
    charge2: number,
    distance: number,
    dielectric: number = 80 // water
  ): number {
    const k = 8.99e9; // Coulomb's constant
    const elementaryCharge = 1.602e-19;
    
    return (k * charge1 * charge2 * elementaryCharge * elementaryCharge) / 
           (dielectric * distance * distance);
  }
  
  static calculateBindingAffinity(
    interactions: Array<{ type: string; energy: number }>
  ): number {
    const totalEnergy = interactions.reduce((sum, interaction) => sum + interaction.energy, 0);
    const RT = 0.593; // kcal/mol at 298K
    
    return Math.exp(-totalEnergy / RT); // Kd in M
  }
  
  static simulateProteinFolding(
    sequence: string,
    temperature: number = 298
  ): { foldingEnergy: number; stability: number } {
    // Simplified protein folding simulation
    let hydrophobicContacts = 0;
    let electrostaticInteractions = 0;
    
    // Count favorable interactions (simplified)
    for (let i = 0; i < sequence.length - 3; i++) {
      const residue = sequence[i];
      const properties = ProteinStructureGenerator.getAminoAcidProperties(residue);
      
      if (properties.hydrophobicity > 0.5) {
        hydrophobicContacts++;
      }
      
      if (Math.abs(properties.charge) > 0.5) {
        electrostaticInteractions++;
      }
    }
    
    const foldingEnergy = -hydrophobicContacts * SCIENCE.PROTEINS.HYDROPHOBIC_CORE_ENERGY
                         - electrostaticInteractions * SCIENCE.PROTEINS.ELECTROSTATIC_ENERGY;
    
    const stability = Math.exp(-foldingEnergy / (8.314e-3 * temperature));
    
    return { foldingEnergy, stability };
  }
}

// Utility functions for common 3D operations
export function createTextSprite(
  text: string,
  color: string = '#FFFFFF',
  size: number = 16
): THREE.Sprite {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  context.font = `${size}px Arial`;
  
  const textWidth = context.measureText(text).width;
  canvas.width = textWidth + 20;
  canvas.height = size + 10;
  
  context.font = `${size}px Arial`;
  context.fillStyle = color;
  context.fillText(text, 10, size);
  
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  
  sprite.scale.set(canvas.width / 10, canvas.height / 10, 1);
  
  return sprite;
}

export function disposeMesh(mesh: THREE.Mesh): void {
  if (mesh.geometry) {
    mesh.geometry.dispose();
  }
  
  if (mesh.material) {
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(material => {
        if (material.map) material.map.dispose();
        material.dispose();
      });
    } else {
      if (mesh.material.map) mesh.material.map.dispose();
      mesh.material.dispose();
    }
  }
}

export function calculateBoundingBox(objects: THREE.Object3D[]): THREE.Box3 {
  const box = new THREE.Box3();
  
  objects.forEach(object => {
    const objectBox = new THREE.Box3().setFromObject(object);
    box.union(objectBox);
  });
  
  return box;
}

export function optimizeGeometry(geometry: THREE.BufferGeometry): THREE.BufferGeometry {
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  
  // Merge vertices if possible
  if (geometry instanceof THREE.Geometry) {
    geometry.mergeVertices();
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
  }
  
  return geometry;
}

// Export all utilities
export {
  DNAHelixGenerator,
  ProteinStructureGenerator,
  MolecularVisualization,
  PathogenModelGenerator,
  AnimationUtils,
  PhysicsUtils
};
