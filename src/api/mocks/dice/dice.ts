import { BetResponse, Direction } from './dice.types';

export interface PlaceBetRequest {
  bet_amount: number;
  target_percent: number;
  direction: Direction;
}

export async function placeBetAPI(request: PlaceBetRequest): Promise<BetResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const roll = Math.random() * 100;
  const isWin =
    request.direction === 'under'
      ? roll < request.target_percent
      : roll > request.target_percent;

  const winChance =
    request.direction === 'under'
      ? request.target_percent
      : 100 - request.target_percent;

  const multiplier = (100 / winChance) * 0.98; // 98% RTP
  const win = isWin ? request.bet_amount * multiplier : 0;

  // Mock balance calculation
  const currentBalance = 1000; // This should come from store
  const newBalance = currentBalance - request.bet_amount + win;

  return {
    success: true,
    code: 0,
    data: {
      direction: request.direction,
      target_percent: request.target_percent,
      roll: parseFloat(roll.toFixed(2)),
      is_win: isWin,
      multiplier: parseFloat(multiplier.toFixed(4)),
      win: parseFloat(win.toFixed(6)),
      bet_amount: request.bet_amount,
      bet_id: crypto.randomUUID(),
      balance: parseFloat(newBalance.toFixed(6)),
      client_seed: 'client123',
      server_seed: 'server_seed_abc',
      next_hashed_server_seed: 'hash_of_next_server_seed',
    },
  };
}
