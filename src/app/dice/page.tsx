'use client';

import dynamic from 'next/dynamic';

const GameBoard = dynamic(() => import('./components/GameBoard'), { ssr: false });
const BetControls = dynamic(() => import('./components/BetControls'), { ssr: false });
const GameStats = dynamic(() => import('./components/GameStats'), { ssr: false });

export default function DicePage() {
  return (
    <main className="min-h-screen bg-[#232626] text-white">
      <div className="container mx-auto px-4 py-8 ">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#22c55e] to-[#10b981] bg-clip-text text-transparent">
            Dice Game
          </h1>
          <p className="text-gray-400 mt-2">Roll the dice and win big!</p>
        </header>

        {/* Game Layout */}
        <div className="grid lg:grid-cols-[400px_1fr] gap-8 items-start bg-[#292d2e] rounded-lg">
          {/* Left Panel - Bet Controls */}
          <div className="order-2 lg:order-1">
            <BetControls />
          </div>

          {/* Right Panel - Game Board */}
          <div className="order-1 lg:order-2">
            <GameBoard />
          </div>
        </div>

        {/* Game History */}
        <div className="mt-8 flex justify-center">
          <GameStats />
        </div>
      </div>
    </main>
  );
}
