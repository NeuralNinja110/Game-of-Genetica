// Biological simulation logic for scientifically accurate interactions

export interface SimulationResult {
  success: boolean;
  effectiveness: number; // 0-1
  sideEffects: string[];
  explanation: string;
  score: number;
}

export interface PathogenData {
  type: 'virus' | 'bacteria' | 'parasite';
  name: string;
  genome: string;
  resistanceMechanisms: string[];
  vulnerabilities: string[];
  reproductionRate: number;
  mutationRate: number;
}

export interface OrganismData {
  type: 'bacteria' | 'yeast' | 'fruit_fly' | 'plant' | 'mouse' | 'human';
  immuneSystem: {
    strength: number;
    adaptability: number;
    memory: boolean;
  };
  cellTypes: string[];
  criticalGenes: string[];
}

// DNA/RNA editing simulation
export function simulateGeneticModification(
  sequence: string[],
  targetOrganism: OrganismData,
  pathogen: PathogenData,
  editType: 'crispr' | 'base_editor' | 'prime_editor'
): SimulationResult {
  
  const sequenceStr = sequence.join('');
  const sideEffects: string[] = [];
  let effectiveness = 0;
  let explanation = '';
  
  // Check for off-target effects
  const offTargetSites = findOffTargetSites(sequenceStr, targetOrganism.criticalGenes);
  if (offTargetSites.length > 0) {
    sideEffects.push('Potential off-target effects detected');
    effectiveness -= 0.3;
  }
  
  // Check for frame shifts
  if (hasFrameShift(sequenceStr)) {
    sideEffects.push('Frame shift mutation may disrupt protein function');
    effectiveness -= 0.4;
  }
  
  // Check for resistance mechanisms
  const resistanceGenes = identifyResistanceGenes(sequenceStr);
  if (resistanceGenes.length > 0) {
    effectiveness += 0.4;
    explanation += `Enhanced resistance through ${resistanceGenes.join(', ')}. `;
  }
  
  // Check for essential gene disruption
  const essentialGenesDisrupted = checkEssentialGenes(sequenceStr, targetOrganism.criticalGenes);
  if (essentialGenesDisrupted.length > 0) {
    sideEffects.push('Essential genes may be disrupted');
    effectiveness -= 0.6;
  }
  
  // Immune system compatibility
  const immuneCompatibility = assessImmuneCompatibility(sequenceStr, targetOrganism.immuneSystem);
  effectiveness += immuneCompatibility * 0.3;
  
  // Pathogen-specific effectiveness
  const pathogenEffectiveness = assessPathogenResistance(sequenceStr, pathogen);
  effectiveness += pathogenEffectiveness * 0.5;
  
  // Normalize effectiveness
  effectiveness = Math.max(0, Math.min(1, effectiveness));
  
  const success = effectiveness > 0.7 && sideEffects.length === 0;
  const score = Math.round(effectiveness * 100 + (success ? 50 : 0) - sideEffects.length * 20);
  
  if (!explanation) {
    if (success) {
      explanation = 'Genetic modification successfully enhances organism resistance with minimal side effects.';
    } else if (effectiveness > 0.4) {
      explanation = 'Partial success achieved, but optimization needed to reduce side effects.';
    } else {
      explanation = 'Genetic modification failed to provide adequate resistance or caused harmful effects.';
    }
  }
  
  return {
    success,
    effectiveness,
    sideEffects,
    explanation,
    score: Math.max(0, score)
  };
}

// Drug discovery simulation
export function simulateDrugInteraction(
  drugComponents: any[],
  pathogen: PathogenData,
  targetOrganism: OrganismData
): SimulationResult {
  
  const sideEffects: string[] = [];
  let effectiveness = 0;
  let explanation = '';
  
  if (drugComponents.length === 0) {
    return {
      success: false,
      effectiveness: 0,
      sideEffects: ['No drug components selected'],
      explanation: 'Drug design incomplete - no active components present.',
      score: 0
    };
  }
  
  // Check binding affinity
  const bindingAffinity = calculateBindingAffinity(drugComponents, pathogen);
  effectiveness += bindingAffinity * 0.4;
  
  // Check selectivity
  const selectivity = calculateSelectivity(drugComponents, pathogen, targetOrganism);
  if (selectivity < 0.5) {
    sideEffects.push('Low selectivity may cause host toxicity');
  }
  effectiveness += selectivity * 0.3;
  
  // Check drug resistance potential
  const resistancePotential = assessResistancePotential(drugComponents, pathogen);
  if (resistancePotential > 0.7) {
    sideEffects.push('High potential for pathogen resistance development');
  }
  effectiveness -= resistancePotential * 0.2;
  
  // Check pharmacokinetic properties
  const pkProperties = assessPharmacokinetics(drugComponents);
  effectiveness += pkProperties.bioavailability * 0.2;
  
  if (pkProperties.toxicity > 0.6) {
    sideEffects.push('Potential toxicity concerns');
  }
  
  // Multi-target approach bonus
  const targetDiversity = assessTargetDiversity(drugComponents);
  if (targetDiversity > 1) {
    effectiveness += 0.1;
    explanation += 'Multi-target approach reduces resistance risk. ';
  }
  
  // Normalize effectiveness
  effectiveness = Math.max(0, Math.min(1, effectiveness));
  
  const success = effectiveness > 0.7 && sideEffects.length === 0;
  const score = Math.round(effectiveness * 100 + (success ? 50 : 0) - sideEffects.length * 15);
  
  if (!explanation) {
    if (success) {
      explanation = 'Drug design successfully targets pathogen with high selectivity and low toxicity.';
    } else if (effectiveness > 0.4) {
      explanation = 'Drug shows promise but requires optimization for better efficacy and safety.';
    } else {
      explanation = 'Drug design fails to effectively target pathogen or shows significant safety concerns.';
    }
  }
  
  return {
    success,
    effectiveness,
    sideEffects,
    explanation,
    score: Math.max(0, score)
  };
}

// Helper functions for biological accuracy

function findOffTargetSites(sequence: string, criticalGenes: string[]): string[] {
  // Simplified off-target detection
  const offTargets: string[] = [];
  criticalGenes.forEach(gene => {
    const similarity = calculateSequenceSimilarity(sequence, gene);
    if (similarity > 0.8 && similarity < 1.0) {
      offTargets.push(gene);
    }
  });
  return offTargets;
}

function hasFrameShift(sequence: string): boolean {
  // Check if sequence length is divisible by 3 (codon structure)
  return sequence.length % 3 !== 0;
}

function identifyResistanceGenes(sequence: string): string[] {
  const resistancePatterns = [
    'ATGCGA', // Simplified resistance gene pattern
    'GCGAAT',
    'TTGCGC'
  ];
  
  return resistancePatterns.filter(pattern => sequence.includes(pattern));
}

function checkEssentialGenes(sequence: string, criticalGenes: string[]): string[] {
  return criticalGenes.filter(gene => {
    const similarity = calculateSequenceSimilarity(sequence, gene);
    return similarity > 0.9; // High similarity suggests potential disruption
  });
}

function calculateSequenceSimilarity(seq1: string, seq2: string): number {
  const minLength = Math.min(seq1.length, seq2.length);
  let matches = 0;
  
  for (let i = 0; i < minLength; i++) {
    if (seq1[i] === seq2[i]) matches++;
  }
  
  return matches / minLength;
}

function assessImmuneCompatibility(sequence: string, immuneSystem: any): number {
  // Simplified immune system compatibility assessment
  let compatibility = 0.5; // Base compatibility
  
  if (immuneSystem.adaptability > 0.7) {
    compatibility += 0.2; // High adaptability helps
  }
  
  if (immuneSystem.memory) {
    compatibility += 0.1; // Memory cells provide advantage
  }
  
  return Math.min(1, compatibility);
}

function assessPathogenResistance(sequence: string, pathogen: PathogenData): number {
  // Check if sequence counters pathogen vulnerabilities
  let resistance = 0;
  
  pathogen.vulnerabilities.forEach(vulnerability => {
    if (sequence.includes(vulnerability)) {
      resistance += 0.3;
    }
  });
  
  return Math.min(1, resistance);
}

function calculateBindingAffinity(components: any[], pathogen: PathogenData): number {
  // Enhanced binding affinity calculation with molecular dynamics considerations
  let affinity = 0;
  let synergy = 0;
  
  components.forEach((component, index) => {
    // Base binding affinity based on target compatibility
    if (component.type === 'DNA/RNA Targeting' && pathogen.type === 'virus') {
      affinity += 0.4; // Viruses have RNA/DNA that can be targeted
    } else if (component.type === 'Protein Inhibitors') {
      affinity += 0.5; // Universal protein targets
    } else if (component.type === 'Delivery Systems') {
      synergy += 0.15; // Enhances other components
    }
    
    // Consider molecular size and fit
    const sizeCompatibility = calculateSizeCompatibility(component, pathogen);
    affinity += sizeCompatibility * 0.2;
    
    // Hydrophobic/hydrophilic interactions
    if (component.properties?.hydrophobic && pathogen.type === 'virus') {
      affinity += 0.2; // Viral lipid envelopes
    } else if (!component.properties?.hydrophobic && pathogen.type === 'bacteria') {
      affinity += 0.15; // Bacterial cell wall interactions
    }
    
    // Electrostatic interactions
    if (component.properties?.charged) {
      affinity += 0.1;
    }
  });
  
  // Synergistic effects for multi-component drugs
  if (components.length > 1) {
    affinity += synergy;
  }
  
  return Math.min(1, affinity);
}

function calculateSizeCompatibility(component: any, pathogen: PathogenData): number {
  // Mock size compatibility based on component and pathogen properties
  const sizeScore: { [key: string]: number } = {
    'small': 0.8,
    'medium': 0.6,
    'large': 0.4
  };
  
  return sizeScore[component.properties?.size] || 0.5;
}

function calculateSelectivity(components: any[], pathogen: PathogenData, organism: OrganismData): number {
  // Simplified selectivity calculation
  let selectivity = 0.5; // Base selectivity
  
  components.forEach(component => {
    if (component.properties?.charged && pathogen.type === 'bacteria') {
      selectivity += 0.2; // Charged molecules often selective for bacteria
    }
    
    if (component.properties?.hydrophobic && pathogen.type === 'virus') {
      selectivity += 0.2; // Hydrophobic molecules can target viral envelopes
    }
  });
  
  return Math.min(1, selectivity);
}

function assessResistancePotential(components: any[], pathogen: PathogenData): number {
  // Higher mutation rate = higher resistance potential
  let potential = pathogen.mutationRate;
  
  // Single-target drugs have higher resistance potential
  const uniqueTypes = new Set(components.map(c => c.type));
  if (uniqueTypes.size === 1) {
    potential += 0.3;
  }
  
  return Math.min(1, potential);
}

function assessPharmacokinetics(components: any[]): { bioavailability: number; toxicity: number } {
  let bioavailability = 0.5;
  let toxicity = 0;
  
  components.forEach(component => {
    if (component.properties?.size === 'small') {
      bioavailability += 0.2;
    } else if (component.properties?.size === 'large') {
      bioavailability -= 0.1;
      toxicity += 0.1;
    }
    
    if (component.type === 'Delivery Systems') {
      bioavailability += 0.3;
      toxicity -= 0.2;
    }
  });
  
  return {
    bioavailability: Math.max(0, Math.min(1, bioavailability)),
    toxicity: Math.max(0, Math.min(1, toxicity))
  };
}

function assessTargetDiversity(components: any[]): number {
  const targetTypes = new Set(components.map(c => c.type));
  return targetTypes.size;
}
