export interface ScoreData {
  baseScore: number;
  timeBonus: number;
  efficiencyBonus: number;
  accuracyBonus: number;
  creativityBonus: number;
  penalties: number;
  totalScore: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

// Calculate score based on simulation results and player performance
export function calculateLevelScore(
  effectiveness: number,
  timeElapsed: number,
  attempts: number,
  sideEffects: number,
  levelDifficulty: 'easy' | 'medium' | 'hard',
  isOptimalSolution: boolean = false
): ScoreData {
  
  // Base score from effectiveness
  const maxBaseScore = getMaxScoreForDifficulty(levelDifficulty);
  const baseScore = Math.round(effectiveness * maxBaseScore);
  
  // Time bonus (faster completion = higher bonus)
  const targetTime = getTargetTimeForDifficulty(levelDifficulty);
  const timeRatio = Math.max(0, (targetTime - timeElapsed) / targetTime);
  const timeBonus = Math.round(timeRatio * 200);
  
  // Efficiency bonus (fewer attempts = higher bonus)
  const maxAttempts = 5;
  const efficiencyRatio = Math.max(0, (maxAttempts - attempts) / maxAttempts);
  const efficiencyBonus = Math.round(efficiencyRatio * 150);
  
  // Accuracy bonus (no side effects = full bonus)
  const accuracyBonus = sideEffects === 0 ? 100 : Math.max(0, 100 - sideEffects * 25);
  
  // Creativity bonus for optimal solutions
  const creativityBonus = isOptimalSolution ? 200 : 0;
  
  // Penalties for poor performance
  const timePenalty = timeElapsed > targetTime * 2 ? -100 : 0;
  const attemptPenalty = attempts > maxAttempts ? -(attempts - maxAttempts) * 50 : 0;
  const sideEffectPenalty = -sideEffects * 30;
  const penalties = timePenalty + attemptPenalty + sideEffectPenalty;
  
  const totalScore = Math.max(0, baseScore + timeBonus + efficiencyBonus + accuracyBonus + creativityBonus + penalties);
  
  return {
    baseScore,
    timeBonus: Math.max(0, timeBonus),
    efficiencyBonus: Math.max(0, efficiencyBonus),
    accuracyBonus: Math.max(0, accuracyBonus),
    creativityBonus,
    penalties: Math.min(0, penalties),
    totalScore
  };
}

// Get maximum possible score for difficulty level
export function getMaxScoreForDifficulty(difficulty: 'easy' | 'medium' | 'hard'): number {
  switch (difficulty) {
    case 'easy': return 500;
    case 'medium': return 750;
    case 'hard': return 1000;
    default: return 500;
  }
}

// Get target completion time for difficulty level (in seconds)
export function getTargetTimeForDifficulty(difficulty: 'easy' | 'medium' | 'hard'): number {
  switch (difficulty) {
    case 'easy': return 300; // 5 minutes
    case 'medium': return 600; // 10 minutes
    case 'hard': return 900; // 15 minutes
    default: return 300;
  }
}

// Achievement system
export const achievements: Achievement[] = [
  {
    id: 'first_success',
    name: 'First Success',
    description: 'Complete your first level successfully',
    icon: '🎯',
    unlocked: false
  },
  {
    id: 'perfect_score',
    name: 'Perfect Score',
    description: 'Achieve maximum score on any level',
    icon: '⭐',
    unlocked: false
  },
  {
    id: 'speed_runner',
    name: 'Speed Runner',
    description: 'Complete a level in under 2 minutes',
    icon: '⚡',
    unlocked: false
  },
  {
    id: 'no_side_effects',
    name: 'No Side Effects',
    description: 'Complete 5 levels without any side effects',
    icon: '💚',
    unlocked: false
  },
  {
    id: 'genetic_master',
    name: 'Genetic Master',
    description: 'Complete all genetic modification levels',
    icon: '🧬',
    unlocked: false
  },
  {
    id: 'drug_discoverer',
    name: 'Drug Discoverer',
    description: 'Complete all drug discovery levels',
    icon: '💊',
    unlocked: false
  },
  {
    id: 'scientist',
    name: 'Scientist',
    description: 'Complete both game modes',
    icon: '👩‍🔬',
    unlocked: false
  },
  {
    id: 'creative_solution',
    name: 'Creative Solution',
    description: 'Find an alternative solution to a level',
    icon: '🎨',
    unlocked: false
  },
  {
    id: 'persistence',
    name: 'Persistence',
    description: 'Complete a hard level after 10+ attempts',
    icon: '💪',
    unlocked: false
  },
  {
    id: 'teacher',
    name: 'Teacher',
    description: 'Complete the tutorial perfectly',
    icon: '📚',
    unlocked: false
  }
];

// Check and unlock achievements
export function checkAchievements(
  playerStats: {
    levelsCompleted: number;
    geneticLevelsCompleted: number;
    drugLevelsCompleted: number;
    perfectScores: number;
    fastCompletions: number;
    noSideEffectLevels: number;
    totalAttempts: number;
    tutorialCompleted: boolean;
  },
  currentScore: ScoreData,
  timeElapsed: number,
  sideEffects: number,
  isAlternativeSolution: boolean = false
): Achievement[] {
  
  const newlyUnlocked: Achievement[] = [];
  
  // First Success
  if (!achievements[0].unlocked && playerStats.levelsCompleted === 1) {
    achievements[0].unlocked = true;
    achievements[0].unlockedAt = new Date();
    newlyUnlocked.push(achievements[0]);
  }
  
  // Perfect Score
  if (!achievements[1].unlocked && currentScore.totalScore >= getMaxScoreForDifficulty('hard')) {
    achievements[1].unlocked = true;
    achievements[1].unlockedAt = new Date();
    newlyUnlocked.push(achievements[1]);
  }
  
  // Speed Runner
  if (!achievements[2].unlocked && timeElapsed < 120) {
    achievements[2].unlocked = true;
    achievements[2].unlockedAt = new Date();
    newlyUnlocked.push(achievements[2]);
  }
  
  // No Side Effects
  if (!achievements[3].unlocked && playerStats.noSideEffectLevels >= 5) {
    achievements[3].unlocked = true;
    achievements[3].unlockedAt = new Date();
    newlyUnlocked.push(achievements[3]);
  }
  
  // Genetic Master
  if (!achievements[4].unlocked && playerStats.geneticLevelsCompleted >= 7) {
    achievements[4].unlocked = true;
    achievements[4].unlockedAt = new Date();
    newlyUnlocked.push(achievements[4]);
  }
  
  // Drug Discoverer
  if (!achievements[5].unlocked && playerStats.drugLevelsCompleted >= 7) {
    achievements[5].unlocked = true;
    achievements[5].unlockedAt = new Date();
    newlyUnlocked.push(achievements[5]);
  }
  
  // Scientist
  if (!achievements[6].unlocked && playerStats.geneticLevelsCompleted >= 7 && playerStats.drugLevelsCompleted >= 7) {
    achievements[6].unlocked = true;
    achievements[6].unlockedAt = new Date();
    newlyUnlocked.push(achievements[6]);
  }
  
  // Creative Solution
  if (!achievements[7].unlocked && isAlternativeSolution) {
    achievements[7].unlocked = true;
    achievements[7].unlockedAt = new Date();
    newlyUnlocked.push(achievements[7]);
  }
  
  // Teacher
  if (!achievements[9].unlocked && playerStats.tutorialCompleted) {
    achievements[9].unlocked = true;
    achievements[9].unlockedAt = new Date();
    newlyUnlocked.push(achievements[9]);
  }
  
  return newlyUnlocked;
}

// Leaderboard entry
export interface LeaderboardEntry {
  playerName: string;
  totalScore: number;
  levelsCompleted: number;
  averageTime: number;
  achievementsUnlocked: number;
  lastPlayed: Date;
}

// Calculate global ranking score
export function calculateGlobalScore(playerStats: any): number {
  const baseScore = playerStats.totalScore || 0;
  const levelBonus = playerStats.levelsCompleted * 100;
  const achievementBonus = playerStats.achievementsUnlocked * 250;
  const efficiencyBonus = playerStats.averageEffectiveness * 500;
  
  return baseScore + levelBonus + achievementBonus + efficiencyBonus;
}
