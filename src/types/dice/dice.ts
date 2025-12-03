// Game configuration types
export interface GameConfig {
  success: boolean;
  code: number;
  data: {
    id: string;
    game_link: string;
    status: number;
    rtp: number;
    max_bet: number;
    min_bet: number;
    max_win: number;
    title: string;
    description: string;
    updated_at: string;
    created_at: string;
    custom_settings: {
      precision: number;
      directions: Direction[];
      max_target: number;
      min_target: number;
    };
  };
}

// Bet response types
export interface BetResponse {
  success: boolean;
  code: number;
  data: BetData;
}

export interface BetData {
  direction: Direction;
  target_percent: number;
  roll: number;
  is_win: boolean;
  multiplier: number;
  win: number;
  bet_amount: number;
  bet_id: string;
  balance: number;
  client_seed: string;
  server_seed: string;
  next_hashed_server_seed: string;
}

// Game types
export type Direction = 'under' | 'over';
export type GameMode = 'manual' | 'auto' | 'advanced';

export interface GameState {
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
}
