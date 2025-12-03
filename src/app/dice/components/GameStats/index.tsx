'use client';

import React from 'react';
import { useDiceStore } from '@/store/dice/diceStore';
import { BetData } from '@/types/dice/dice';

export default function GameStats() {
  const { history } = useDiceStore();

  return (
    <div className="w-full max-w-4xl mt-8">
      <h3 className="text-xl font-bold mb-4">Game History</h3>
      <div className="bg-[#292d2e]/80 backdrop-blur-sm rounded-lg overflow-hidden border border-[#3a4142]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#3a4142]/50 text-gray-400 text-sm">
                <th className="px-4 py-3 text-left">Result</th>
                <th className="px-4 py-3 text-left">Target</th>
                <th className="px-4 py-3 text-left">Direction</th>
                <th className="px-4 py-3 text-right">Bet</th>
                <th className="px-4 py-3 text-right">Multiplier</th>
                <th className="px-4 py-3 text-right">Win</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No game history yet
                  </td>
                </tr>
              ) : (
                history.map((bet: BetData, index: number) => (
                  <tr
                    key={bet.bet_id}
                    className={`border-t border-[#3a4142] hover:bg-[#3a4142]/30 transition-colors ${
                      index % 2 === 0 ? 'bg-[#1a2c38]/20' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <span
                        className={`font-bold ${
                          bet.is_win ? 'text-[#22c55e]' : 'text-[#ef4444]'
                        }`}
                      >
                        {bet.roll.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">{bet.target_percent.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          bet.direction === 'under'
                            ? 'bg-[#22c55e]/20 text-[#22c55e]'
                            : 'bg-[#f97316]/20 text-[#f97316]'
                        }`}
                      >
                        {bet.direction === 'under' ? 'Under' : 'Over'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">{bet.bet_amount.toFixed(6)}</td>
                    <td className="px-4 py-3 text-right">{bet.multiplier.toFixed(4)}×</td>
                    <td
                      className={`px-4 py-3 text-right font-medium ${
                        bet.is_win ? 'text-[#22c55e]' : 'text-gray-500'
                      }`}
                    >
                      {bet.win.toFixed(6)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
