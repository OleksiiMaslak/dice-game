import { Direction, GameMode, BetData } from '@/types/dice/dice';

export interface DiceStore {
  // State
  balance: number;
  betAmount: number;
  winAmount: number;
  multiplier: number;
  target: number;
  winChance: number;
  direction: Direction;
  mode: GameMode;
  isPlaying: boolean;
  lastRoll: number | null;
  history: BetData[];
  currency: string;

  // Actions
  setBetAmount: (amount: number) => void;
  setTarget: (target: number) => void;
  setDirection: (direction: Direction) => void;
  setMode: (mode: GameMode) => void;
  setCurrency: (currency: string) => void;
  placeBet: () => Promise<void>;
  updateBalance: (newBalance: number) => void;
  resetGame: () => void;
  
  // Computed values
  calculateMultiplier: () => number;
  calculateWinChance: () => number;
  calculateWinAmount: () => number;
}
