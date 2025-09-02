// Comprehensive pathogen database with scientifically accurate data

export interface PathogenProtein {
  name: string;
  function: string;
  structure: string; // Simplified structure representation
  bindingSites: string[];
  essentiality: 'essential' | 'important' | 'auxiliary';
}

export interface PathogenGenome {
  sequence: string;
  genes: {
    name: string;
    start: number;
    end: number;
    function: string;
    essential: boolean;
  }[];
  plasmids?: string[]; // For bacteria
  episomes?: string[]; // For viruses
}

export interface PathogenData {
  id: string;
  name: string;
  scientificName: string;
  type: 'virus' | 'bacteria' | 'parasite' | 'fungus';
  classification: {
    kingdom?: string;
    phylum?: string;
    class?: string;
    order?: string;
    family: string;
    genus: string;
    species: string;
  };
  
  // Physical characteristics
  size: {
    diameter?: number; // in nanometers
    length?: number;   // in nanometers
  };
  
  // Genome information
  genome: PathogenGenome;
  
  // Proteins and drug targets
  proteins: PathogenProtein[];
  drugTargets: string[];
  
  // Resistance mechanisms
  resistanceMechanisms: {
    type: 'enzymatic' | 'efflux' | 'target_modification' | 'bypass' | 'sequestration';
    mechanism: string;
    genes: string[];
    effectiveness: number; // 0-1
  }[];
  
  // Vulnerabilities
  vulnerabilities: {
    target: string;
    description: string;
    drugClass: string[];
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
  
  // Biological properties
  reproduction: {
    method: string;
    rate: number; // doubling time in minutes
    hostDependency: 'obligate' | 'facultative' | 'independent';
  };
  
  mutation: {
    rate: number; // mutations per genome per generation
    hotspots: string[]; // genomic regions with high mutation rates
    mechanisms: string[];
  };
  
  // Host interaction
  hostRange: string[];
  transmission: string[];
  pathogenesis: {
    mechanism: string;
    symptoms: string[];
    severity: 'mild' | 'moderate' | 'severe' | 'lethal';
  };
  
  // 3D visualization data
  structure3D: {
    capsid?: {
      symmetry: string;
      proteins: string[];
    };
    envelope?: {
      present: boolean;
      proteins: string[];
    };
    organelles?: {
      name: string;
      function: string;
      position: [number, number, number];
    }[];
  };
}

// Virus pathogens
export const virusPathogens: PathogenData[] = [
  {
    id: 'rhinovirus',
    name: 'Common Cold Virus',
    scientificName: 'Human Rhinovirus',
    type: 'virus',
    classification: {
      family: 'Picornaviridae',
      genus: 'Enterovirus',
      species: 'Rhinovirus A'
    },
    size: { diameter: 30 },
    genome: {
      sequence: 'AUGCGAUCGAUCGAUCGAUCGAUC',
      genes: [
        { name: 'VP1', start: 0, end: 8, function: 'Major capsid protein', essential: true },
        { name: '3C', start: 9, end: 15, function: 'Protease enzyme', essential: true },
        { name: 'RdRp', start: 16, end: 23, function: 'RNA polymerase', essential: true }
      ]
    },
    proteins: [
      {
        name: 'VP1',
        function: 'Capsid formation and receptor binding',
        structure: 'beta-barrel',
        bindingSites: ['ICAM-1'],
        essentiality: 'essential'
      },
      {
        name: '3C Protease',
        function: 'Viral protein processing',
        structure: 'chymotrypsin-like',
        bindingSites: ['polyprotein cleavage sites'],
        essentiality: 'essential'
      }
    ],
    drugTargets: ['3C protease', 'VP1 capsid', 'RNA polymerase'],
    resistanceMechanisms: [
      {
        type: 'target_modification',
        mechanism: 'Capsid protein mutations',
        genes: ['VP1'],
        effectiveness: 0.6
      }
    ],
    vulnerabilities: [
      {
        target: '3C protease',
        description: 'Essential for viral replication',
        drugClass: ['protease inhibitors'],
        difficulty: 'easy'
      }
    ],
    reproduction: {
      method: 'RNA replication',
      rate: 480, // 8 hours
      hostDependency: 'obligate'
    },
    mutation: {
      rate: 0.01,
      hotspots: ['VP1 region'],
      mechanisms: ['RNA polymerase errors']
    },
    hostRange: ['humans'],
    transmission: ['respiratory droplets', 'contact'],
    pathogenesis: {
      mechanism: 'Upper respiratory infection',
      symptoms: ['runny nose', 'cough', 'sore throat'],
      severity: 'mild'
    },
    structure3D: {
      capsid: {
        symmetry: 'icosahedral',
        proteins: ['VP1', 'VP2', 'VP3', 'VP4']
      },
      envelope: {
        present: false,
        proteins: []
      }
    }
  },
  
  {
    id: 'influenza_h1n1',
    name: 'Influenza A H1N1',
    scientificName: 'Influenza A virus (H1N1)',
    type: 'virus',
    classification: {
      family: 'Orthomyxoviridae',
      genus: 'Influenzavirus A',
      species: 'Influenza A virus'
    },
    size: { diameter: 100 },
    genome: {
      sequence: 'AUGCGAUCUCGAUCGAUCGAUCGAUC',
      genes: [
        { name: 'HA', start: 0, end: 6, function: 'Hemagglutinin surface protein', essential: true },
        { name: 'NA', start: 7, end: 13, function: 'Neuraminidase enzyme', essential: true },
        { name: 'PA', start: 14, end: 20, function: 'Polymerase acidic protein', essential: true },
        { name: 'M2', start: 21, end: 25, function: 'Ion channel protein', essential: true }
      ]
    },
    proteins: [
      {
        name: 'Hemagglutinin',
        function: 'Receptor binding and membrane fusion',
        structure: 'trimeric glycoprotein',
        bindingSites: ['sialic acid receptors'],
        essentiality: 'essential'
      },
      {
        name: 'Neuraminidase',
        function: 'Viral release from host cells',
        structure: 'tetrameric enzyme',
        bindingSites: ['sialic acid substrates'],
        essentiality: 'essential'
      }
    ],
    drugTargets: ['neuraminidase', 'M2 ion channel', 'polymerase complex'],
    resistanceMechanisms: [
      {
        type: 'target_modification',
        mechanism: 'Neuraminidase active site mutations',
        genes: ['NA'],
        effectiveness: 0.8
      },
      {
        type: 'bypass',
        mechanism: 'Alternative entry mechanisms',
        genes: ['HA'],
        effectiveness: 0.4
      }
    ],
    vulnerabilities: [
      {
        target: 'neuraminidase',
        description: 'Essential for viral budding',
        drugClass: ['neuraminidase inhibitors'],
        difficulty: 'medium'
      },
      {
        target: 'polymerase complex',
        description: 'Required for viral RNA synthesis',
        drugClass: ['polymerase inhibitors'],
        difficulty: 'hard'
      }
    ],
    reproduction: {
      method: 'Segmented RNA replication',
      rate: 360, // 6 hours
      hostDependency: 'obligate'
    },
    mutation: {
      rate: 0.02,
      hotspots: ['HA head domain', 'NA active site'],
      mechanisms: ['antigenic drift', 'reassortment']
    },
    hostRange: ['humans', 'pigs', 'birds'],
    transmission: ['respiratory droplets', 'aerosols'],
    pathogenesis: {
      mechanism: 'Respiratory epithelial infection',
      symptoms: ['fever', 'cough', 'body aches', 'fatigue'],
      severity: 'moderate'
    },
    structure3D: {
      envelope: {
        present: true,
        proteins: ['HA', 'NA', 'M2']
      },
      capsid: {
        symmetry: 'helical',
        proteins: ['NP', 'M1']
      }
    }
  },

  {
    id: 'hiv_1',
    name: 'HIV-1',
    scientificName: 'Human Immunodeficiency Virus type 1',
    type: 'virus',
    classification: {
      family: 'Retroviridae',
      genus: 'Lentivirus',
      species: 'Human immunodeficiency virus 1'
    },
    size: { diameter: 120 },
    genome: {
      sequence: 'AUGCGAUCGAUCGAUCGAUCGAUCGAUC',
      genes: [
        { name: 'gag', start: 0, end: 7, function: 'Structural proteins', essential: true },
        { name: 'pol', start: 8, end: 16, function: 'Enzymes (RT, integrase, protease)', essential: true },
        { name: 'env', start: 17, end: 23, function: 'Envelope proteins', essential: true },
        { name: 'tat', start: 24, end: 26, function: 'Transcription activator', essential: true }
      ]
    },
    proteins: [
      {
        name: 'Reverse Transcriptase',
        function: 'RNA to DNA conversion',
        structure: 'heterodimer p66/p51',
        bindingSites: ['RNA template', 'dNTPs'],
        essentiality: 'essential'
      },
      {
        name: 'Protease',
        function: 'Viral protein maturation',
        structure: 'homodimer',
        bindingSites: ['polyprotein cleavage sites'],
        essentiality: 'essential'
      },
      {
        name: 'Integrase',
        function: 'Viral DNA integration',
        structure: 'tetramer',
        bindingSites: ['viral DNA', 'host chromatin'],
        essentiality: 'essential'
      }
    ],
    drugTargets: ['reverse transcriptase', 'protease', 'integrase', 'CCR5 receptor', 'gp41 fusion'],
    resistanceMechanisms: [
      {
        type: 'target_modification',
        mechanism: 'RT active site mutations',
        genes: ['pol'],
        effectiveness: 0.9
      },
      {
        type: 'enzymatic',
        mechanism: 'Enhanced drug metabolism',
        genes: ['pol'],
        effectiveness: 0.7
      }
    ],
    vulnerabilities: [
      {
        target: 'reverse transcriptase',
        description: 'Unique to retroviruses',
        drugClass: ['NRTIs', 'NNRTIs'],
        difficulty: 'medium'
      },
      {
        target: 'protease',
        description: 'Essential for viral maturation',
        drugClass: ['protease inhibitors'],
        difficulty: 'hard'
      }
    ],
    reproduction: {
      method: 'Retroviral integration and transcription',
      rate: 1440, // 24 hours
      hostDependency: 'obligate'
    },
    mutation: {
      rate: 0.1,
      hotspots: ['RT domain', 'protease active site', 'env V3 loop'],
      mechanisms: ['RT errors', 'recombination']
    },
    hostRange: ['humans', 'chimpanzees'],
    transmission: ['blood', 'sexual contact', 'vertical'],
    pathogenesis: {
      mechanism: 'CD4+ T cell destruction',
      symptoms: ['immunodeficiency', 'opportunistic infections'],
      severity: 'lethal'
    },
    structure3D: {
      envelope: {
        present: true,
        proteins: ['gp120', 'gp41']
      },
      capsid: {
        symmetry: 'conical',
        proteins: ['p24', 'p17']
      }
    }
  }
];

// Bacterial pathogens
export const bacterialPathogens: PathogenData[] = [
  {
    id: 'ecoli',
    name: 'E. coli',
    scientificName: 'Escherichia coli',
    type: 'bacteria',
    classification: {
      kingdom: 'Bacteria',
      phylum: 'Proteobacteria',
      class: 'Gammaproteobacteria',
      order: 'Enterobacteriales',
      family: 'Enterobacteriaceae',
      genus: 'Escherichia',
      species: 'coli'
    },
    size: { length: 2000, diameter: 500 },
    genome: {
      sequence: 'ATGCGATCGATCGATCGATCGATC',
      genes: [
        { name: 'murA', start: 0, end: 6, function: 'Cell wall synthesis', essential: true },
        { name: 'bla', start: 7, end: 12, function: 'Beta-lactamase', essential: false },
        { name: 'gyrA', start: 13, end: 18, function: 'DNA gyrase', essential: true },
        { name: 'rpoB', start: 19, end: 23, function: 'RNA polymerase', essential: true }
      ]
    },
    proteins: [
      {
        name: 'Beta-lactamase',
        function: 'Antibiotic resistance',
        structure: 'serine hydrolase',
        bindingSites: ['beta-lactam antibiotics'],
        essentiality: 'auxiliary'
      },
      {
        name: 'DNA Gyrase',
        function: 'DNA supercoiling',
        structure: 'A2B2 tetramer',
        bindingSites: ['DNA', 'ATP'],
        essentiality: 'essential'
      }
    ],
    drugTargets: ['cell wall synthesis', 'DNA gyrase', 'RNA polymerase', 'protein synthesis'],
    resistanceMechanisms: [
      {
        type: 'enzymatic',
        mechanism: 'Beta-lactamase production',
        genes: ['bla'],
        effectiveness: 0.9
      },
      {
        type: 'efflux',
        mechanism: 'Multi-drug efflux pumps',
        genes: ['acrAB'],
        effectiveness: 0.7
      }
    ],
    vulnerabilities: [
      {
        target: 'cell wall synthesis',
        description: 'Essential for bacterial integrity',
        drugClass: ['beta-lactams', 'glycopeptides'],
        difficulty: 'easy'
      },
      {
        target: 'DNA gyrase',
        description: 'Unique to bacteria',
        drugClass: ['fluoroquinolones'],
        difficulty: 'medium'
      }
    ],
    reproduction: {
      method: 'Binary fission',
      rate: 20, // 20 minutes
      hostDependency: 'independent'
    },
    mutation: {
      rate: 0.001,
      hotspots: ['antibiotic resistance genes'],
      mechanisms: ['horizontal gene transfer', 'spontaneous mutations']
    },
    hostRange: ['humans', 'animals'],
    transmission: ['fecal-oral', 'contaminated food/water'],
    pathogenesis: {
      mechanism: 'Intestinal colonization and toxin production',
      symptoms: ['diarrhea', 'abdominal pain'],
      severity: 'mild'
    },
    structure3D: {
      organelles: [
        { name: 'nucleoid', function: 'DNA storage', position: [0, 0, 0] },
        { name: 'ribosomes', function: 'protein synthesis', position: [0.5, 0, 0] }
      ]
    }
  },

  {
    id: 'mrsa',
    name: 'MRSA',
    scientificName: 'Methicillin-resistant Staphylococcus aureus',
    type: 'bacteria',
    classification: {
      kingdom: 'Bacteria',
      phylum: 'Firmicutes',
      class: 'Bacilli',
      order: 'Bacillales',
      family: 'Staphylococcaceae',
      genus: 'Staphylococcus',
      species: 'aureus'
    },
    size: { diameter: 1000 },
    genome: {
      sequence: 'ATCGATCGATCGATCGATCG',
      genes: [
        { name: 'mecA', start: 0, end: 5, function: 'Methicillin resistance', essential: false },
        { name: 'pbp2a', start: 6, end: 11, function: 'Altered penicillin-binding protein', essential: false },
        { name: 'vanA', start: 12, end: 17, function: 'Vancomycin resistance', essential: false },
        { name: 'femA', start: 18, end: 19, function: 'Cell wall cross-linking', essential: true }
      ]
    },
    proteins: [
      {
        name: 'PBP2a',
        function: 'Cell wall synthesis with low beta-lactam affinity',
        structure: 'transpeptidase domain',
        bindingSites: ['peptidoglycan precursors'],
        essentiality: 'important'
      },
      {
        name: 'VanA',
        function: 'Vancomycin resistance ligase',
        structure: 'ATP-dependent ligase',
        bindingSites: ['D-Ala-D-Lac'],
        essentiality: 'auxiliary'
      }
    ],
    drugTargets: ['alternative cell wall targets', 'protein synthesis', 'membrane integrity'],
    resistanceMechanisms: [
      {
        type: 'target_modification',
        mechanism: 'Altered PBP with low drug affinity',
        genes: ['mecA'],
        effectiveness: 0.95
      },
      {
        type: 'target_modification',
        mechanism: 'Modified peptidoglycan precursors',
        genes: ['vanA'],
        effectiveness: 0.9
      }
    ],
    vulnerabilities: [
      {
        target: 'protein synthesis',
        description: 'Still susceptible to certain antibiotics',
        drugClass: ['lincomycin', 'chloramphenicol'],
        difficulty: 'hard'
      },
      {
        target: 'membrane integrity',
        description: 'Alternative mechanism',
        drugClass: ['daptomycin', 'polymyxins'],
        difficulty: 'medium'
      }
    ],
    reproduction: {
      method: 'Binary fission',
      rate: 30, // 30 minutes
      hostDependency: 'independent'
    },
    mutation: {
      rate: 0.002,
      hotspots: ['resistance gene cassettes'],
      mechanisms: ['horizontal gene transfer', 'transposon insertion']
    },
    hostRange: ['humans'],
    transmission: ['contact', 'healthcare settings'],
    pathogenesis: {
      mechanism: 'Tissue invasion and toxin production',
      symptoms: ['skin infections', 'pneumonia', 'sepsis'],
      severity: 'severe'
    },
    structure3D: {
      organelles: [
        { name: 'nucleoid', function: 'DNA storage', position: [0, 0, 0] },
        { name: 'cell wall', function: 'structural integrity', position: [0, 0, 0] }
      ]
    }
  }
];

// Parasitic pathogens
export const parasiticPathogens: PathogenData[] = [
  {
    id: 'plasmodium_falciparum',
    name: 'Malaria Parasite',
    scientificName: 'Plasmodium falciparum',
    type: 'parasite',
    classification: {
      kingdom: 'Protista',
      phylum: 'Apicomplexa',
      class: 'Aconoidasida',
      order: 'Haemosporida',
      family: 'Plasmodiidae',
      genus: 'Plasmodium',
      species: 'falciparum'
    },
    size: { diameter: 5000 },
    genome: {
      sequence: 'ATGCGATCGATCGATCGATCGATCGATC',
      genes: [
        { name: 'pfcrt', start: 0, end: 6, function: 'Chloroquine resistance transporter', essential: false },
        { name: 'pfmdr1', start: 7, end: 13, function: 'Multidrug resistance protein', essential: false },
        { name: 'pfk13', start: 14, end: 20, function: 'Artemisinin resistance', essential: false },
        { name: 'pfATP6', start: 21, end: 26, function: 'Calcium ATPase', essential: true }
      ]
    },
    proteins: [
      {
        name: 'PfCRT',
        function: 'Drug efflux and chloroquine resistance',
        structure: 'transmembrane transporter',
        bindingSites: ['chloroquine', 'heme'],
        essentiality: 'important'
      },
      {
        name: 'Plasmepsin',
        function: 'Hemoglobin degradation',
        structure: 'aspartic protease',
        bindingSites: ['hemoglobin'],
        essentiality: 'essential'
      }
    ],
    drugTargets: ['hemoglobin digestion', 'apicoplast', 'mitochondrial electron transport'],
    resistanceMechanisms: [
      {
        type: 'efflux',
        mechanism: 'Enhanced drug efflux',
        genes: ['pfcrt', 'pfmdr1'],
        effectiveness: 0.8
      },
      {
        type: 'target_modification',
        mechanism: 'Altered drug binding sites',
        genes: ['pfk13'],
        effectiveness: 0.7
      }
    ],
    vulnerabilities: [
      {
        target: 'hemoglobin digestion',
        description: 'Essential for parasite nutrition',
        drugClass: ['quinolines', 'artemisinins'],
        difficulty: 'medium'
      },
      {
        target: 'apicoplast',
        description: 'Unique organelle',
        drugClass: ['antibiotics targeting plastid'],
        difficulty: 'hard'
      }
    ],
    reproduction: {
      method: 'Complex lifecycle with sexual and asexual phases',
      rate: 2880, // 48 hours (schizont cycle)
      hostDependency: 'obligate'
    },
    mutation: {
      rate: 0.05,
      hotspots: ['drug resistance genes'],
      mechanisms: ['sexual recombination', 'gene conversion']
    },
    hostRange: ['humans', 'mosquitoes'],
    transmission: ['mosquito vectors'],
    pathogenesis: {
      mechanism: 'Red blood cell invasion and destruction',
      symptoms: ['fever', 'anemia', 'cerebral malaria'],
      severity: 'lethal'
    },
    structure3D: {
      organelles: [
        { name: 'nucleus', function: 'genetic material', position: [0, 0, 0] },
        { name: 'apicoplast', function: 'fatty acid synthesis', position: [0.3, 0, 0] },
        { name: 'mitochondrion', function: 'energy production', position: [-0.3, 0, 0] },
        { name: 'food vacuole', function: 'hemoglobin digestion', position: [0, 0.3, 0] }
      ]
    }
  }
];

// Fungal pathogens
export const fungalPathogens: PathogenData[] = [
  {
    id: 'aspergillus_fumigatus',
    name: 'Aspergillus',
    scientificName: 'Aspergillus fumigatus',
    type: 'fungus',
    classification: {
      kingdom: 'Fungi',
      phylum: 'Ascomycota',
      class: 'Eurotiomycetes',
      order: 'Eurotiales',
      family: 'Aspergillaceae',
      genus: 'Aspergillus',
      species: 'fumigatus'
    },
    size: { diameter: 3000 },
    genome: {
      sequence: 'GCGATCGATCGCGATCGATCGC',
      genes: [
        { name: 'erg11', start: 0, end: 5, function: 'Ergosterol biosynthesis', essential: true },
        { name: 'fks1', start: 6, end: 11, function: 'Beta-glucan synthesis', essential: true },
        { name: 'mdr1', start: 12, end: 17, function: 'Multidrug resistance', essential: false },
        { name: 'cyp51A', start: 18, end: 21, function: 'Azole target enzyme', essential: true }
      ]
    },
    proteins: [
      {
        name: 'Lanosterol 14α-demethylase',
        function: 'Ergosterol biosynthesis',
        structure: 'cytochrome P450',
        bindingSites: ['lanosterol', 'azole antifungals'],
        essentiality: 'essential'
      },
      {
        name: '1,3-β-glucan synthase',
        function: 'Cell wall synthesis',
        structure: 'membrane-bound enzyme complex',
        bindingSites: ['UDP-glucose', 'echinocandins'],
        essentiality: 'essential'
      }
    ],
    drugTargets: ['ergosterol biosynthesis', 'cell wall synthesis', 'DNA synthesis'],
    resistanceMechanisms: [
      {
        type: 'target_modification',
        mechanism: 'Altered ergosterol biosynthesis enzymes',
        genes: ['cyp51A'],
        effectiveness: 0.8
      },
      {
        type: 'efflux',
        mechanism: 'Enhanced drug efflux pumps',
        genes: ['mdr1'],
        effectiveness: 0.6
      }
    ],
    vulnerabilities: [
      {
        target: 'ergosterol biosynthesis',
        description: 'Essential for fungal membrane integrity',
        drugClass: ['azoles', 'polyenes'],
        difficulty: 'medium'
      },
      {
        target: 'cell wall synthesis',
        description: 'Unique to fungi',
        drugClass: ['echinocandins'],
        difficulty: 'easy'
      }
    ],
    reproduction: {
      method: 'Asexual spore formation',
      rate: 720, // 12 hours
      hostDependency: 'facultative'
    },
    mutation: {
      rate: 0.01,
      hotspots: ['drug target genes'],
      mechanisms: ['sexual recombination', 'parasexual cycle']
    },
    hostRange: ['humans', 'animals', 'environment'],
    transmission: ['airborne spores'],
    pathogenesis: {
      mechanism: 'Respiratory infection and tissue invasion',
      symptoms: ['pulmonary aspergillosis', 'allergic reactions'],
      severity: 'severe'
    },
    structure3D: {
      organelles: [
        { name: 'nucleus', function: 'genetic material', position: [0, 0, 0] },
        { name: 'mitochondria', function: 'energy production', position: [0.2, 0.2, 0] },
        { name: 'vacuole', function: 'storage and transport', position: [-0.2, 0, 0] },
        { name: 'cell wall', function: 'structural integrity', position: [0, 0, 0] }
      ]
    }
  }
];

// Combined pathogen database
export const allPathogens: PathogenData[] = [
  ...virusPathogens,
  ...bacterialPathogens,
  ...parasiticPathogens,
  ...fungalPathogens
];

// Utility functions
export function getPathogenById(id: string): PathogenData | undefined {
  return allPathogens.find(pathogen => pathogen.id === id);
}

export function getPathogensByType(type: PathogenData['type']): PathogenData[] {
  return allPathogens.filter(pathogen => pathogen.type === type);
}

export function getPathogensByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): PathogenData[] {
  const difficultyMap = {
    easy: ['rhinovirus', 'ecoli'],
    medium: ['influenza_h1n1', 'mrsa', 'plasmodium_falciparum'],
    hard: ['hiv_1', 'aspergillus_fumigatus']
  };
  
  return allPathogens.filter(pathogen => 
    difficultyMap[difficulty].includes(pathogen.id)
  );
}

export function calculatePathogenResistance(
  pathogen: PathogenData, 
  intervention: string[]
): number {
  let resistance = 0;
  
  pathogen.resistanceMechanisms.forEach(mechanism => {
    if (intervention.some(drug => 
      mechanism.genes.some(gene => drug.toLowerCase().includes(gene.toLowerCase()))
    )) {
      resistance += mechanism.effectiveness;
    }
  });
  
  return Math.min(1, resistance);
}

export function findOptimalTargets(pathogen: PathogenData): string[] {
  return pathogen.vulnerabilities
    .filter(vuln => vuln.difficulty === 'easy' || vuln.difficulty === 'medium')
    .map(vuln => vuln.target);
}
