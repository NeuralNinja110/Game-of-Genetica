// Game constants and configuration

// Color schemes for scientific accuracy and accessibility
export const COLORS = {
  // Nucleotide colors (standard in molecular biology)
  NUCLEOTIDES: {
    A: '#FF6B6B', // Adenine - Red
    T: '#4ECDC4', // Thymine - Teal  
    U: '#FECA57', // Uracil - Yellow
    C: '#45B7D1', // Cytosine - Blue
    G: '#96CEB4', // Guanine - Green
  },
  
  // Amino acid colors by properties
  AMINO_ACIDS: {
    HYDROPHOBIC: '#FFE66D',
    POLAR: '#A8E6CF',
    CHARGED_POSITIVE: '#FF8B94',
    CHARGED_NEGATIVE: '#FFB3BA',
    AROMATIC: '#C7CEEA',
    SPECIAL: '#B5EAD7'
  },
  
  // Drug component colors
  DRUG_COMPONENTS: {
    DNA_RNA_TARGETING: '#FF6B6B',
    PROTEIN_INHIBITORS: '#4ECDC4',
    MEMBRANE_DISRUPTORS: '#FECA57',
    DELIVERY_SYSTEMS: '#96CEB4',
    METABOLIC_INHIBITORS: '#B19CD9'
  },
  
  // Pathogen colors
  PATHOGENS: {
    VIRUS: '#FF4444',
    BACTERIA: '#44AA44',
    PARASITE: '#AA4444',
    FUNGUS: '#FFAA44'
  },
  
  // UI feedback colors
  FEEDBACK: {
    SUCCESS: '#22C55E',
    PARTIAL: '#EAB308',
    FAILURE: '#EF4444',
    NEUTRAL: '#6B7280',
    INFO: '#3B82F6',
    WARNING: '#F59E0B'
  },
  
  // Background and UI
  UI: {
    PRIMARY: '#1E40AF',
    SECONDARY: '#7C3AED',
    BACKGROUND: '#0F172A',
    SURFACE: '#1E293B',
    TEXT_PRIMARY: '#F8FAFC',
    TEXT_SECONDARY: '#CBD5E1',
    BORDER: '#334155',
    ACCENT: '#06B6D4'
  }
};

// 3D visualization constants
export const VISUALIZATION = {
  DNA_HELIX: {
    RADIUS: 2,
    HEIGHT: 8,
    TURNS: 4,
    POINTS_PER_TURN: 10,
    NUCLEOTIDE_SIZE: 0.15,
    BACKBONE_RADIUS: 0.05,
    BASE_PAIR_LENGTH: 4
  },
  
  PROTEINS: {
    ALPHA_HELIX_RADIUS: 0.8,
    BETA_SHEET_WIDTH: 1.5,
    RANDOM_COIL_VARIATION: 0.5,
    ATOM_RADIUS_SCALE: 0.1
  },
  
  PATHOGENS: {
    VIRUS: {
      CAPSID_RADIUS: 1.0,
      SPIKE_LENGTH: 0.4,
      SPIKE_COUNT: 20,
      ENVELOPE_THICKNESS: 0.1
    },
    BACTERIA: {
      LENGTH: 2.0,
      WIDTH: 0.6,
      FLAGELLA_SEGMENTS: 10,
      MEMBRANE_THICKNESS: 0.05
    },
    PARASITE: {
      SIZE: 1.5,
      ORGANELLE_COUNT: 8,
      ORGANELLE_SIZE_RANGE: [0.1, 0.2]
    }
  },
  
  CAMERA: {
    DEFAULT_POSITION: [0, 5, 10],
    MIN_DISTANCE: 3,
    MAX_DISTANCE: 50,
    FOV: 45,
    NEAR: 0.1,
    FAR: 1000
  },
  
  LIGHTING: {
    AMBIENT_INTENSITY: 0.3,
    DIRECTIONAL_INTENSITY: 1.0,
    POINT_LIGHT_INTENSITY: 0.5,
    SHADOW_MAP_SIZE: 2048
  }
};

// Game mechanics constants
export const GAMEPLAY = {
  SCORING: {
    MAX_SCORE_EASY: 500,
    MAX_SCORE_MEDIUM: 750,
    MAX_SCORE_HARD: 1000,
    TIME_BONUS_MULTIPLIER: 0.2,
    EFFICIENCY_BONUS: 150,
    ACCURACY_BONUS: 100,
    CREATIVITY_BONUS: 200,
    SIDE_EFFECT_PENALTY: -30,
    ATTEMPT_PENALTY: -50
  },
  
  TIMING: {
    SIMULATION_DURATION: 2000, // milliseconds
    ANIMATION_DURATION: 1500,
    TOOLTIP_DELAY: 500,
    TARGET_TIME_EASY: 300, // seconds
    TARGET_TIME_MEDIUM: 600,
    TARGET_TIME_HARD: 900
  },
  
  DIFFICULTY: {
    EASY: {
      MAX_ATTEMPTS: 5,
      HINT_FREQUENCY: 3,
      SUCCESS_THRESHOLD: 0.6
    },
    MEDIUM: {
      MAX_ATTEMPTS: 4,
      HINT_FREQUENCY: 2,
      SUCCESS_THRESHOLD: 0.7
    },
    HARD: {
      MAX_ATTEMPTS: 3,
      HINT_FREQUENCY: 1,
      SUCCESS_THRESHOLD: 0.8
    }
  },
  
  PROGRESSION: {
    LEVELS_PER_MODE: 7,
    UNLOCK_THRESHOLD: 0.6, // minimum effectiveness to unlock next level
    MASTERY_THRESHOLD: 0.9  // threshold for "mastered" status
  }
};

// Scientific accuracy constants
export const SCIENCE = {
  // DNA/RNA properties
  NUCLEIC_ACIDS: {
    CODON_LENGTH: 3,
    STOP_CODONS: ['TAG', 'TAA', 'TGA'],
    START_CODONS: ['ATG'],
    GC_CONTENT_OPTIMAL: 0.5,
    MELTING_TEMP_BASE: 60 // Celsius
  },
  
  // Protein folding
  PROTEINS: {
    HYDROPHOBIC_CORE_ENERGY: -2.5, // kcal/mol
    HYDROGEN_BOND_ENERGY: -1.5,
    ELECTROSTATIC_ENERGY: -4.0,
    VAN_DER_WAALS_ENERGY: -0.5,
    FOLDING_COOPERATIVITY: 2.0
  },
  
  // Drug properties
  DRUGS: {
    LIPINSKI_MW_MAX: 500, // Da
    LIPINSKI_LOGP_MAX: 5,
    LIPINSKI_HBD_MAX: 5,
    LIPINSKI_HBA_MAX: 10,
    BINDING_AFFINITY_RANGE: [1e-9, 1e-3], // M
    IC50_RANGE: [1e-12, 1e-3] // M
  },
  
  // Pathogen characteristics
  PATHOGENS: {
    MUTATION_RATES: {
      DNA_VIRUS: 1e-8,
      RNA_VIRUS: 1e-6,
      BACTERIA: 1e-10,
      PARASITE: 1e-7,
      FUNGUS: 1e-9
    },
    REPLICATION_TIMES: { // minutes
      VIRUS: 480,
      BACTERIA: 20,
      PARASITE: 2880,
      FUNGUS: 720
    }
  }
};

// Educational content structure
export const EDUCATION = {
  TUTORIAL_STEPS: 8,
  HINT_CATEGORIES: [
    'molecular_structure',
    'biological_function',
    'drug_mechanism',
    'resistance_mechanism',
    'optimization_strategy'
  ],
  
  GLOSSARY: {
    MAX_DEFINITION_LENGTH: 200,
    INCLUDE_EXAMPLES: true,
    DIFFICULTY_LEVELS: ['beginner', 'intermediate', 'advanced']
  },
  
  FEEDBACK: {
    IMMEDIATE: true,
    DETAILED_EXPLANATION: true,
    VISUAL_INDICATORS: true,
    AUDIO_CUES: false // Will be handled by audio store
  }
};

// Performance optimization
export const PERFORMANCE = {
  // 3D rendering
  RENDERING: {
    MAX_PARTICLES: 1000,
    LOD_DISTANCES: [10, 25, 50],
    FRUSTUM_CULLING: true,
    INSTANCED_RENDERING: true
  },
  
  // Animation
  ANIMATION: {
    FPS_TARGET: 60,
    FRAME_SKIP_THRESHOLD: 30,
    INTERPOLATION_STEPS: 16
  },
  
  // Memory management
  MEMORY: {
    TEXTURE_POOL_SIZE: 50,
    GEOMETRY_CACHE_SIZE: 100,
    AUTO_DISPOSE_TIMEOUT: 30000 // ms
  }
};

// Accessibility features
export const ACCESSIBILITY = {
  // Visual
  VISUAL: {
    HIGH_CONTRAST_MODE: false,
    COLOR_BLIND_SUPPORT: true,
    FONT_SIZE_SCALE: 1.0,
    MOTION_REDUCTION: false
  },
  
  // Audio
  AUDIO: {
    SOUND_ENABLED: true,
    VOLUME_MASTER: 0.7,
    VOLUME_EFFECTS: 0.8,
    VOLUME_MUSIC: 0.5
  },
  
  // Input
  INPUT: {
    KEYBOARD_NAVIGATION: true,
    MOUSE_SENSITIVITY: 1.0,
    TOUCH_GESTURES: true,
    VOICE_COMMANDS: false
  },
  
  // Text
  TEXT: {
    SCREEN_READER_SUPPORT: true,
    TOOLTIPS_ENABLED: true,
    DESCRIPTIONS_VERBOSE: true
  }
};

// Internationalization
export const I18N = {
  DEFAULT_LANGUAGE: 'en',
  SUPPORTED_LANGUAGES: ['en', 'es', 'fr', 'de', 'zh', 'ja'],
  DATE_FORMAT: 'YYYY-MM-DD',
  NUMBER_FORMAT: 'en-US',
  SCIENTIFIC_NOTATION: true
};

// API and data constants
export const API = {
  ENDPOINTS: {
    SAVE_PROGRESS: '/api/progress',
    LEADERBOARD: '/api/leaderboard',
    ACHIEVEMENTS: '/api/achievements',
    CUSTOM_PATHOGEN: '/api/custom-pathogen'
  },
  
  TIMEOUTS: {
    REQUEST: 30000,
    SIMULATION: 10000,
    SAVE: 5000
  },
  
  RETRY: {
    MAX_ATTEMPTS: 3,
    BACKOFF_MULTIPLIER: 2,
    INITIAL_DELAY: 1000
  }
};

// Development and debugging
export const DEBUG = {
  ENABLED: process.env.NODE_ENV === 'development',
  LOG_LEVEL: 'info',
  PERFORMANCE_MONITORING: true,
  ERROR_REPORTING: true,
  
  // Feature flags
  FEATURES: {
    ADVANCED_PHYSICS: false,
    MULTIPLAYER: false,
    VR_SUPPORT: false,
    AI_HINTS: false
  }
};

// File and asset paths
export const ASSETS = {
  MODELS: {
    DNA_HELIX: '/models/dna-helix.gltf',
    PROTEINS: '/models/proteins/',
    PATHOGENS: '/models/pathogens/'
  },
  
  TEXTURES: {
    DNA: '/textures/dna/',
    PROTEINS: '/textures/proteins/',
    UI: '/textures/ui/'
  },
  
  SOUNDS: {
    SUCCESS: '/sounds/success.mp3',
    FAILURE: '/sounds/failure.mp3',
    CLICK: '/sounds/click.mp3',
    AMBIENT: '/sounds/ambient.mp3'
  },
  
  ICONS: {
    NUCLEOTIDES: '/icons/nucleotides/',
    DRUGS: '/icons/drugs/',
    PATHOGENS: '/icons/pathogens/'
  }
};

// Export commonly used constant groups
export const GAME_CONSTANTS = {
  COLORS,
  VISUALIZATION,
  GAMEPLAY,
  SCIENCE,
  EDUCATION,
  ACCESSIBILITY
};

export default GAME_CONSTANTS;
