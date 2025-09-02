export interface LevelData {
  id: number;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  objective: string;
  targetOrganism: string;
  pathogen: {
    type: 'virus' | 'bacteria' | 'parasite';
    name: string;
    description: string;
    genome: string;
    resistanceMechanisms: string[];
    vulnerabilities: string[];
  };
  hints: string[];
  targetSequence?: string[];
  requiredComponents?: string[];
  successCriteria: {
    minEffectiveness: number;
    maxSideEffects: number;
  };
}

export const geneticModificationLevels: LevelData[] = [
  {
    id: 1,
    name: "Simple Bacterial Resistance",
    description: "Engineer E. coli bacteria to resist a common antibiotic",
    difficulty: 'easy',
    objective: "Modify the bacterial genome to express antibiotic resistance proteins",
    targetOrganism: "E. coli bacteria",
    pathogen: {
      type: 'bacteria',
      name: 'Antibiotic-resistant Streptococcus',
      description: 'A bacterial pathogen that has developed resistance to common antibiotics',
      genome: 'ATGCGATCGATCGATCG',
      resistanceMechanisms: ['beta-lactamase'],
      vulnerabilities: ['cell wall synthesis']
    },
    hints: [
      "Look for genes that code for antibiotic resistance proteins",
      "Beta-lactamase breaks down penicillin-type antibiotics",
      "Insert the resistance gene without disrupting essential functions"
    ],
    targetSequence: ['A', 'T', 'G', 'C', 'G', 'A', 'T', 'C'],
    successCriteria: {
      minEffectiveness: 0.7,
      maxSideEffects: 1
    }
  },
  {
    id: 2,
    name: "Yeast Antifungal Resistance",
    description: "Modify yeast cells to survive antifungal treatments",
    difficulty: 'easy',
    objective: "Enhance yeast cell wall integrity to resist fungal infections",
    targetOrganism: "Saccharomyces cerevisiae (yeast)",
    pathogen: {
      type: 'bacteria',
      name: 'Candida albicans',
      description: 'A fungal pathogen that causes infections in immunocompromised individuals',
      genome: 'GCGATCGATCGCGATCG',
      resistanceMechanisms: ['efflux pumps'],
      vulnerabilities: ['ergosterol biosynthesis']
    },
    hints: [
      "Focus on cell wall components like chitin and glucan",
      "Efflux pumps remove antifungal drugs from cells",
      "Ergosterol is essential for fungal cell membrane function"
    ],
    successCriteria: {
      minEffectiveness: 0.6,
      maxSideEffects: 2
    }
  },
  {
    id: 3,
    name: "Fruit Fly Immunity Enhancement",
    description: "Boost Drosophila immune system against viral infections",
    difficulty: 'easy',
    objective: "Strengthen the innate immune response in fruit flies",
    targetOrganism: "Drosophila melanogaster",
    pathogen: {
      type: 'virus',
      name: 'Drosophila C Virus',
      description: 'RNA virus that infects fruit flies and suppresses immune responses',
      genome: 'AUGCGAUCGAUCGAUCG',
      resistanceMechanisms: ['immune suppression'],
      vulnerabilities: ['RNA interference', 'toll pathway']
    },
    hints: [
      "The Toll pathway is crucial for antiviral immunity",
      "RNA interference can target viral RNA",
      "Antimicrobial peptides provide broad protection"
    ],
    successCriteria: {
      minEffectiveness: 0.65,
      maxSideEffects: 2
    }
  },
  {
    id: 4,
    name: "Plant Disease Resistance",
    description: "Engineer tobacco plants to resist bacterial wilt disease",
    difficulty: 'medium',
    objective: "Introduce multiple resistance genes for comprehensive protection",
    targetOrganism: "Nicotiana tabacum (tobacco plant)",
    pathogen: {
      type: 'bacteria',
      name: 'Ralstonia solanacearum',
      description: 'Bacterial pathogen causing bacterial wilt in plants',
      genome: 'ATCGATCGATCGATCGATCG',
      resistanceMechanisms: ['type III secretion', 'biofilm formation'],
      vulnerabilities: ['plant immune receptors', 'antimicrobial compounds']
    },
    hints: [
      "R genes encode plant immune receptors",
      "Multiple resistance genes provide better protection",
      "Consider both pathogen recognition and antimicrobial responses"
    ],
    successCriteria: {
      minEffectiveness: 0.75,
      maxSideEffects: 1
    }
  },
  {
    id: 5,
    name: "Mouse Viral Immunity",
    description: "Enhance mouse immune system against influenza virus",
    difficulty: 'medium',
    objective: "Modify immune cell genes to improve antiviral responses",
    targetOrganism: "Mus musculus (laboratory mouse)",
    pathogen: {
      type: 'virus',
      name: 'Influenza A H1N1',
      description: 'RNA virus that causes seasonal flu and can lead to pandemics',
      genome: 'AUGCGAUCUCGAUCGAU',
      resistanceMechanisms: ['antigenic drift', 'immune evasion'],
      vulnerabilities: ['neutralizing antibodies', 'T cell responses']
    },
    hints: [
      "Enhance both B cell and T cell responses",
      "Consider improving antigen presentation",
      "Multiple immune pathways provide redundancy"
    ],
    successCriteria: {
      minEffectiveness: 0.8,
      maxSideEffects: 1
    }
  },
  {
    id: 6,
    name: "Human Gene Therapy",
    description: "Correct genetic defects that make humans susceptible to infections",
    difficulty: 'hard',
    objective: "Use precision gene editing to fix immune system deficiencies",
    targetOrganism: "Homo sapiens",
    pathogen: {
      type: 'virus',
      name: 'HIV-1',
      description: 'Retrovirus that attacks immune system CD4+ T cells',
      genome: 'AUGCGAUCGAUCGAUCGAUC',
      resistanceMechanisms: ['reverse transcription', 'integration', 'latency'],
      vulnerabilities: ['CCR5 receptor', 'protease inhibition']
    },
    hints: [
      "CCR5 deletion provides natural HIV resistance",
      "Be extremely careful with off-target effects",
      "Consider ethical implications of human gene editing"
    ],
    successCriteria: {
      minEffectiveness: 0.9,
      maxSideEffects: 0
    }
  },
  {
    id: 7,
    name: "Livestock Protection",
    description: "Create disease-resistant cattle for agricultural applications",
    difficulty: 'hard',
    objective: "Engineer complex multi-gene resistance in large mammals",
    targetOrganism: "Bos taurus (cattle)",
    pathogen: {
      type: 'parasite',
      name: 'Trypanosoma congolense',
      description: 'Parasitic protozoan causing African sleeping sickness in cattle',
      genome: 'ATGCGATCGATCGATCGATCGATC',
      resistanceMechanisms: ['antigenic variation', 'immune suppression'],
      vulnerabilities: ['trypanolytic factors', 'complement activation']
    },
    hints: [
      "Trypanolytic factors can kill trypanosomes",
      "Multiple genes may need coordinated expression",
      "Consider animal welfare and food safety"
    ],
    successCriteria: {
      minEffectiveness: 0.85,
      maxSideEffects: 0
    }
  },
  {
    id: 8,
    name: "Advanced Viral Vector Engineering",
    description: "Create safe viral vectors for gene therapy applications",
    difficulty: 'hard',
    objective: "Engineer adenoviral vectors to deliver therapeutic genes without toxicity",
    targetOrganism: "Human cells",
    pathogen: {
      type: 'virus',
      name: 'Adenovirus Type 5',
      description: 'DNA virus commonly used in gene therapy but can cause immune responses',
      genome: 'ATCGATCGATCGATCGATCG',
      resistanceMechanisms: ['immune recognition'],
      vulnerabilities: ['capsid modification', 'tropism alteration']
    },
    hints: [
      "Modify capsid proteins to reduce immunogenicity",
      "Ensure vector can still deliver genes effectively",
      "Balance safety with therapeutic efficacy"
    ],
    targetSequence: ['A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C', 'G'],
    successCriteria: {
      minEffectiveness: 0.85,
      maxSideEffects: 0
    }
  },
  {
    id: 9,
    name: "Synthetic Biology Challenge",
    description: "Design entirely synthetic biological circuits for pathogen resistance",
    difficulty: 'hard',
    objective: "Create novel synthetic pathways that provide broad-spectrum resistance",
    targetOrganism: "Engineered microorganism",
    pathogen: {
      type: 'virus',
      name: 'Multiple RNA Viruses',
      description: 'Diverse RNA virus family requiring universal defense mechanisms',
      genome: 'AUGCGAUCGAUCGAUCGAUC',
      resistanceMechanisms: ['genetic diversity', 'rapid evolution'],
      vulnerabilities: ['conserved elements', 'RNA interference']
    },
    hints: [
      "Design circuits that detect conserved viral signatures",
      "Use modular approach for different virus families",
      "Implement feedback mechanisms for adaptive responses"
    ],
    targetSequence: ['A', 'U', 'G', 'C', 'G', 'A', 'U', 'C', 'G', 'A', 'U', 'C', 'G', 'A', 'U', 'C'],
    successCriteria: {
      minEffectiveness: 0.9,
      maxSideEffects: 0
    }
  },
  {
    id: 10,
    name: "Master Genetic Engineer",
    description: "Ultimate challenge: Engineer organisms for emerging pathogen threats",
    difficulty: 'hard',
    objective: "Create future-proof genetic modifications for unknown pathogens",
    targetOrganism: "Universal host system",
    pathogen: {
      type: 'virus',
      name: 'Unknown Emergent Pathogen',
      description: 'Hypothetical pathogen with unknown characteristics requiring predictive defense',
      genome: 'ATCGATCGATCGATCGATCGATCG',
      resistanceMechanisms: ['unknown mechanisms'],
      vulnerabilities: ['universal targets']
    },
    hints: [
      "Focus on fundamental biological processes",
      "Design modular systems that can adapt",
      "Consider both current and future threats"
    ],
    targetSequence: ['A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C', 'G'],
    successCriteria: {
      minEffectiveness: 0.95,
      maxSideEffects: 0
    }
  }
];

export const drugDiscoveryLevels: LevelData[] = [
  {
    id: 1,
    name: "Common Cold Antiviral",
    description: "Design a drug to combat rhinovirus infections",
    difficulty: 'easy',
    objective: "Create a simple antiviral compound targeting viral replication",
    targetOrganism: "Human respiratory epithelium",
    pathogen: {
      type: 'virus',
      name: 'Human Rhinovirus',
      description: 'RNA virus causing common cold symptoms',
      genome: 'AUGCGAUCGAUCGAU',
      resistanceMechanisms: ['rapid mutation'],
      vulnerabilities: ['3C protease', 'capsid binding']
    },
    hints: [
      "Target essential viral proteins like proteases",
      "Consider drugs that block viral entry",
      "Simple molecules often work better for respiratory delivery"
    ],
    requiredComponents: ['protease_inhibitor'],
    successCriteria: {
      minEffectiveness: 0.6,
      maxSideEffects: 2
    }
  },
  {
    id: 2,
    name: "Bacterial Infection Treatment",
    description: "Develop antibiotics for multi-drug resistant bacteria",
    difficulty: 'easy',
    objective: "Design compounds that bypass common resistance mechanisms",
    targetOrganism: "Human tissue",
    pathogen: {
      type: 'bacteria',
      name: 'MRSA (Methicillin-resistant Staphylococcus aureus)',
      description: 'Bacterial pathogen resistant to many antibiotics',
      genome: 'ATCGATCGATCGATCG',
      resistanceMechanisms: ['beta-lactamase', 'efflux pumps'],
      vulnerabilities: ['cell wall synthesis', 'protein synthesis']
    },
    hints: [
      "Target pathways not affected by common resistance",
      "Combination therapy can overcome resistance",
      "Consider novel mechanisms of action"
    ],
    requiredComponents: ['cell_wall_inhibitor'],
    successCriteria: {
      minEffectiveness: 0.7,
      maxSideEffects: 1
    }
  },
  {
    id: 3,
    name: "Antifungal Development",
    description: "Create treatments for systemic fungal infections",
    difficulty: 'easy',
    objective: "Design antifungal drugs with improved selectivity",
    targetOrganism: "Human host",
    pathogen: {
      type: 'bacteria', // Using bacteria type for fungi
      name: 'Aspergillus fumigatus',
      description: 'Opportunistic fungal pathogen causing aspergillosis',
      genome: 'GCGATCGATCGCGATC',
      resistanceMechanisms: ['efflux pumps', 'target modification'],
      vulnerabilities: ['ergosterol biosynthesis', 'cell wall synthesis']
    },
    hints: [
      "Target ergosterol pathway unique to fungi",
      "Avoid targeting human cholesterol synthesis",
      "Consider biofilm penetration"
    ],
    requiredComponents: ['ergosterol_inhibitor'],
    successCriteria: {
      minEffectiveness: 0.65,
      maxSideEffects: 2
    }
  },
  {
    id: 4,
    name: "Influenza Treatment",
    description: "Develop broad-spectrum influenza antivirals",
    difficulty: 'medium',
    objective: "Create drugs effective against multiple flu strains",
    targetOrganism: "Human respiratory system",
    pathogen: {
      type: 'virus',
      name: 'Influenza A H5N1',
      description: 'Highly pathogenic avian influenza with pandemic potential',
      genome: 'AUGCGAUCUCGAUCGAUC',
      resistanceMechanisms: ['antigenic drift', 'neuraminidase mutations'],
      vulnerabilities: ['neuraminidase', 'polymerase complex', 'M2 ion channel']
    },
    hints: [
      "Target conserved viral proteins",
      "Combination drugs reduce resistance",
      "Consider host-directed therapy"
    ],
    requiredComponents: ['neuraminidase_inhibitor', 'polymerase_inhibitor'],
    successCriteria: {
      minEffectiveness: 0.75,
      maxSideEffects: 1
    }
  },
  {
    id: 5,
    name: "Malaria Drug Design",
    description: "Combat drug-resistant malaria parasites",
    difficulty: 'medium',
    objective: "Design antimalarials with novel mechanisms of action",
    targetOrganism: "Human host",
    pathogen: {
      type: 'parasite',
      name: 'Plasmodium falciparum',
      description: 'Parasitic protozoan causing severe malaria',
      genome: 'ATGCGATCGATCGATCGATC',
      resistanceMechanisms: ['drug efflux', 'target mutations', 'metabolic bypass'],
      vulnerabilities: ['hemoglobin digestion', 'apicoplast', 'cell cycle']
    },
    hints: [
      "Target parasite-specific organelles like apicoplast",
      "Consider stage-specific interventions",
      "Multiple drug targets reduce resistance"
    ],
    requiredComponents: ['antimalarial_compound', 'resistance_breaker'],
    successCriteria: {
      minEffectiveness: 0.8,
      maxSideEffects: 1
    }
  },
  {
    id: 6,
    name: "HIV Treatment Cocktail",
    description: "Design combination therapy for HIV infection",
    difficulty: 'hard',
    objective: "Create multi-target approach to suppress viral replication",
    targetOrganism: "Human immune system",
    pathogen: {
      type: 'virus',
      name: 'HIV-1',
      description: 'Retrovirus that progressively destroys immune system',
      genome: 'AUGCGAUCGAUCGAUCGAUCG',
      resistanceMechanisms: ['high mutation rate', 'latent reservoirs', 'immune evasion'],
      vulnerabilities: ['reverse transcriptase', 'protease', 'integrase', 'entry receptors']
    },
    hints: [
      "Target multiple steps in viral lifecycle",
      "Consider latent reservoir activation",
      "Balance efficacy with long-term tolerability"
    ],
    requiredComponents: ['reverse_transcriptase_inhibitor', 'protease_inhibitor', 'integrase_inhibitor'],
    successCriteria: {
      minEffectiveness: 0.9,
      maxSideEffects: 0
    }
  },
  {
    id: 7,
    name: "Tuberculosis Treatment",
    description: "Develop drugs for extensively drug-resistant TB",
    difficulty: 'hard',
    objective: "Create novel anti-TB compounds overcoming all resistance",
    targetOrganism: "Human lung tissue",
    pathogen: {
      type: 'bacteria',
      name: 'Mycobacterium tuberculosis (XDR)',
      description: 'Extensively drug-resistant tuberculosis strain',
      genome: 'ATCGATCGATCGATCGATCGATCG',
      resistanceMechanisms: ['multiple efflux pumps', 'target mutations', 'metabolic dormancy'],
      vulnerabilities: ['cell wall synthesis', 'energy metabolism', 'persistence mechanisms']
    },
    hints: [
      "Target metabolically dormant bacteria",
      "Consider host-directed therapy",
      "Novel targets are essential for XDR strains"
    ],
    requiredComponents: ['novel_target_inhibitor', 'persistence_breaker', 'immune_modulator'],
    successCriteria: {
      minEffectiveness: 0.85,
      maxSideEffects: 0
    }
  },
  {
    id: 8,
    name: "Cancer Immunotherapy",
    description: "Design drugs that harness the immune system to fight cancer",
    difficulty: 'hard',
    objective: "Create targeted immunotherapy with minimal autoimmune effects",
    targetOrganism: "Human immune system",
    pathogen: {
      type: 'parasite', // Using parasite type for cancer cells
      name: 'Metastatic Cancer Cells',
      description: 'Rapidly dividing malignant cells that evade immune detection',
      genome: 'ATCGATCGATCGATCGATCGATCGATC',
      resistanceMechanisms: ['immune checkpoint', 'antigen loss', 'immunosuppression'],
      vulnerabilities: ['PD-1/PD-L1', 'CTLA-4', 'tumor antigens', 'CAR-T targets']
    },
    hints: [
      "Block immune checkpoint proteins",
      "Enhance T cell recognition of tumor antigens",
      "Consider combination immunotherapy approaches"
    ],
    requiredComponents: ['checkpoint_inhibitor', 'targeting_ligand', 'immune_enhancer'],
    successCriteria: {
      minEffectiveness: 0.8,
      maxSideEffects: 1
    }
  },
  {
    id: 9,
    name: "Neurotropic Virus Treatment",
    description: "Develop treatments for brain-invading viruses",
    difficulty: 'hard',
    objective: "Create drugs that cross blood-brain barrier to treat viral encephalitis",
    targetOrganism: "Human central nervous system",
    pathogen: {
      type: 'virus',
      name: 'Nipah Virus',
      description: 'Highly lethal paramyxovirus causing encephalitis',
      genome: 'AUGCGAUCGAUCGAUCGAUCGAUCG',
      resistanceMechanisms: ['blood-brain barrier', 'neural tropism', 'immune privilege'],
      vulnerabilities: ['fusion protein', 'polymerase complex', 'matrix protein']
    },
    hints: [
      "Design molecules that can cross blood-brain barrier",
      "Target viral fusion and entry mechanisms",
      "Consider neuroprotective effects"
    ],
    requiredComponents: ['brain_penetrant_drug', 'fusion_inhibitor', 'neuroprotectant'],
    successCriteria: {
      minEffectiveness: 0.85,
      maxSideEffects: 0
    }
  },
  {
    id: 10,
    name: "Master Drug Designer",
    description: "Ultimate challenge: Design universal broad-spectrum therapeutics",
    difficulty: 'hard',
    objective: "Create adaptable drug platforms for future pandemic preparedness",
    targetOrganism: "Universal human host",
    pathogen: {
      type: 'virus',
      name: 'Disease X Pathogen',
      description: 'Unknown future pandemic pathogen requiring rapid countermeasure development',
      genome: 'ATCGATCGATCGATCGATCGATCGATCGATCG',
      resistanceMechanisms: ['unknown pathways', 'rapid evolution', 'host adaptation'],
      vulnerabilities: ['conserved elements', 'host dependencies', 'universal targets']
    },
    hints: [
      "Target highly conserved biological processes",
      "Design modular drug platforms",
      "Consider host-directed therapy for broad spectrum activity"
    ],
    requiredComponents: ['universal_target_inhibitor', 'adaptable_scaffold', 'host_modulator'],
    successCriteria: {
      minEffectiveness: 0.9,
      maxSideEffects: 0
    }
  }
];

export function getCurrentLevelData(gamePhase: string, level: number): LevelData | null {
  if (gamePhase === 'genetic_modification') {
    return geneticModificationLevels[level - 1] || null;
  } else if (gamePhase === 'drug_discovery') {
    return drugDiscoveryLevels[level - 1] || null;
  }
  return null;
}

export function getLevelsByDifficulty(gamePhase: string, difficulty: 'easy' | 'medium' | 'hard'): LevelData[] {
  const levels = gamePhase === 'genetic_modification' ? geneticModificationLevels : drugDiscoveryLevels;
  return levels.filter(level => level.difficulty === difficulty);
}

export function getNextLevel(gamePhase: string, currentLevel: number): LevelData | null {
  const levels = gamePhase === 'genetic_modification' ? geneticModificationLevels : drugDiscoveryLevels;
  return levels[currentLevel] || null; // currentLevel is 0-indexed here
}
