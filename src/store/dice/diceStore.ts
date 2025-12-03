import { create } from 'zustand';
import { DiceStore } from './DiceStore.types';
import { placeBetAPI } from '@/api/mocks/dice/dice';

const RTP = 0.98; // 98% RTP

export const useDiceStore = create<DiceStore>((set, get) => ({
  // Initial state
  balance: 1000,
  betAmount: 0.0001,
  winAmount: 0,
  multiplier: 2,
  target: 50,
  winChance: 50,
  direction: 'under',
  mode: 'manual',
  isPlaying: false,
  lastRoll: null,
  history: [],
  currency: 'USD',

  // Calculate multiplier based on win chance and RTP
  calculateMultiplier: () => {
    const { winChance } = get();
    if (winChance <= 0 || winChance >= 100) return 0;
    return (100 / winChance) * RTP;
  },

  // Calculate win chance based on target and direction
  calculateWinChance: () => {
    const { target, direction } = get();
    if (direction === 'under') {
      return target;
    } else {
      return 100 - target;
    }
  },

  // Calculate potential win amount
  calculateWinAmount: () => {
    const { betAmount, multiplier } = get();
    return betAmount * multiplier;
  },

  // Set bet amount
  setBetAmount: (amount: number) => {
    const winChance = get().calculateWinChance();
    const multiplier = (100 / winChance) * RTP;
    const winAmount = amount * multiplier;
    
    set({
      betAmount: amount,
      multiplier,
      winAmount,
    });
  },

  // Set target
  setTarget: (target: number) => {
    const clampedTarget = Math.max(1, Math.min(99, target));
    const { direction } = get();
    const winChance = direction === 'under' ? clampedTarget : 100 - clampedTarget;
    const multiplier = (100 / winChance) * RTP;
    const betAmount = get().betAmount;
    const winAmount = betAmount * multiplier;

    set({
      target: clampedTarget,
      winChance,
      multiplier,
      winAmount,
    });
  },

  // Set direction
  setDirection: (direction) => {
    const { target, betAmount } = get();
    const winChance = direction === 'under' ? target : 100 - target;
    const multiplier = (100 / winChance) * RTP;
    const winAmount = betAmount * multiplier;

    set({
      direction,
      winChance,
      multiplier,
      winAmount,
    });
  },

  // Set mode
  setMode: (mode) => {
    set({ mode });
  },

  // Set currency
  setCurrency: (currency) => {
    set({ currency });
  },

  // Place bet
  placeBet: async () => {
    const { betAmount, target, direction, balance } = get();

    if (betAmount > balance) {
      alert('Insufficient balance');
      return;
    }

    set({ isPlaying: true });

    try {
      const response = await placeBetAPI({
        bet_amount: betAmount,
        target_percent: target,
        direction,
      });

      if (response.success) {
        const history = get().history;
        set({
          lastRoll: response.data.roll,
          balance: response.data.balance,
          history: [response.data, ...history],
          isPlaying: false,
        });
      }
    } catch (error) {
      console.error('Bet failed:', error);
      set({ isPlaying: false });
    }
  },

  // Update balance
  updateBalance: (newBalance: number) => {
    set({ balance: newBalance });
  },

  // Reset game
  resetGame: () => {
    set({
      betAmount: 0.0001,
      target: 50,
      direction: 'under',
      lastRoll: null,
      isPlaying: false,
    });
  },
}));
