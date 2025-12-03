'use client';

import React from 'react';
import { useDiceStore } from '@/store/dice/diceStore';

export default function BetControls() {
  const {
    betAmount,
    winAmount,
    balance,
    currency,
    isPlaying,
    setBetAmount,
    placeBet,
    mode,
    setMode,
  } = useDiceStore();

  const handleBet = async () => {
    if (!isPlaying) {
      await placeBet();
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setBetAmount(value);
  };

  const multiplyBet = (multiplier: number) => {
    setBetAmount(betAmount * multiplier);
  };

  const divideBet = () => {
    setBetAmount(betAmount / 2);
  };

  const setMax = () => {
    setBetAmount(balance);
  };

  const setQuickAmount = (amount: number) => {
    setBetAmount(amount);
  };

  const quickAmounts = balance >= 1 
    ? [1, 5, 10, 50] 
    : [0.001, 0.01, 0.1, 0.5];

  return (
    <div className="w-full max-w-md bg-[#323738]/90 backdrop-blur-sm rounded-lg p-6 space-y-6 border border-[#3a4142] justify-center">
      {/* Mode Tabs */}
      <div className="flex gap-2 border-b border-[#3a4142] pb-2">
        <button
          onClick={() => setMode('manual')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${mode === 'manual'
              ? 'text-[#22c55e]'
              : 'text-gray-400 hover:text-gray-300'
            }`}
        >
          Вручную
          {mode === 'manual' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#22c55e]" />
          )}
        </button>
      </div>

      {/* Currency Selector */}
      <div className="space-y-2">
        <label className="text-gray-400 text-sm">Currency</label>
        <select
          value={currency}
          onChange={(e) => useDiceStore.getState().setCurrency(e.target.value)}
          className="w-full bg-[#232626] text-white rounded-lg p-3 border border-[#3a4142] outline-none focus:border-[#22c55e] transition-colors"
          disabled={isPlaying}
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="UAH">UAH - Hryvnia</option>
          <option value="BTC">BTC - Bitcoin</option>
        </select>
      </div>

      {/* Bet Amount */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-gray-400 text-sm flex items-center gap-1">
            Amount
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
              <text x="10" y="14" fontSize="12" textAnchor="middle" fill="currentColor">?</text>
            </svg>
          </label>
        </div>
        
        <div className="flex items-center gap-2 bg-[#232626] rounded-lg p-3 border border-[#3a4142]">
          <div className="flex items-center gap-2 text-[#22c55e]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8"/>
            </svg>
            <input
              type="number"
              value={betAmount}
              onChange={handleAmountChange}
              step="0.0001"
              min="0"
              className="bg-transparent text-white font-medium outline-none w-24"
              disabled={isPlaying}
            />
          </div>
          
          <div className="flex gap-1 ml-auto">
            <button
              onClick={divideBet}
              className="px-3 py-1 bg-[#3a4142] hover:bg-[#2c3330] rounded text-sm transition-colors text-gray-300"
              disabled={isPlaying}
            >
              1/2
            </button>
            <button
              onClick={() => multiplyBet(2)}
              className="px-3 py-1 bg-[#3a4142] hover:bg-[#2c3330] rounded text-sm transition-colors text-gray-300"
              disabled={isPlaying}
            >
              2×
            </button>
            <button
              onClick={setMax}
              className="px-2 py-1 bg-[#3a4142] hover:bg-[#2c3330] rounded text-sm transition-colors flex items-center text-gray-300"
              disabled={isPlaying}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Amounts */}
        <div className="grid grid-cols-4 gap-2">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setQuickAmount(amount)}
              className="px-3 py-2 bg-[#3a4142] hover:bg-[#2c3330] rounded text-sm transition-colors text-gray-300"
              disabled={isPlaying}
            >
              {amount}
            </button>
          ))}
        </div>
      </div>

      {/* Win Amount */}
      <div className="space-y-2">
        <label className="text-gray-400 text-sm">Win Amount</label>
        <div className="flex items-center gap-2 bg-[#232626] rounded-lg p-3 border border-[#3a4142]">
          <div className="flex items-center gap-2 text-[#22c55e]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8"/>
            </svg>
            <span className="text-white font-medium">{winAmount.toFixed(6)}</span>
            <span className="text-gray-400 text-sm ml-1">{currency}</span>
          </div>
        </div>
      </div>

      {/* Bet Button */}
      <button
        onClick={handleBet}
        disabled={isPlaying || betAmount <= 0 || betAmount > balance}
        className={`
          w-full py-4 rounded-lg font-bold text-lg transition-all shadow-lg
          ${isPlaying || betAmount > balance
            ? 'bg-[#3a4142] cursor-not-allowed text-gray-500'
            : 'bg-[#22c55e] hover:bg-[#16a34a] active:scale-95 text-white'
          }
        `}
      >
        {isPlaying ? 'Betting...' : 'Bet'}
      </button>

      {/* Balance Info */}
      <div className="text-center text-sm text-gray-400">
        Balance: <span className="text-white font-medium">{balance.toFixed(6)}</span> USD
      </div>
    </div>
  );
}
