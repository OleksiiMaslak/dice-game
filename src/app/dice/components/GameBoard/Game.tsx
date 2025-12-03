'use client';

import React from 'react';
import Image from 'next/image';
import { useDiceStore } from '@/store/dice/diceStore';

export default function GameBoard() {
  const { lastRoll, isPlaying } = useDiceStore();
  const dicePosition = lastRoll !== null ? lastRoll : 50;
  const displayValue = lastRoll !== null ? lastRoll : 50;

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      {/* Dice positioned above slider */}
      <div className='block w-12/12 mb-0' >
        <div
          className="transition-all duration-500 ease-out z-20"
          style={{
            marginLeft: lastRoll !== null ? `calc(${dicePosition}% - 75px)` : `calc(50% - 75px)`,
            transform: isPlaying ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          <div className="relative w-32 h-32 md:w-[120px] md:h-[120px]">
            <Image
              src="/dies.png"
              alt="Dice"
              fill
              className="object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.5))'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl  font-bold text-[#1a2c38] z-10 p-1 border-4 border-white rounded-full bg-white/80">
                {displayValue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slider */}
      <div className="w-full max-w-4xl relative">
        
        <DiceSlider />
      </div>

      {/* Game Stats */}
      <div className="w-full max-w-4xl">
        <GameInfo />
      </div>
    </div>
  );
}

function DiceSlider() {
  const { target, direction, setTarget, setDirection } = useDiceStore();
  const [localTarget, setLocalTarget] = React.useState(target);
  const [isSoundEnabled, setIsSoundEnabled] = React.useState(true);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const lastSoundTimeRef = React.useRef<number>(0);
  const isDraggingRef = React.useRef(false);

  React.useEffect(() => {
    audioRef.current = new Audio('/sound2.wav');
    audioRef.current.volume = 0.2;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = () => {
    if (isSoundEnabled && audioRef.current) {
      const now = Date.now();
      if (now - lastSoundTimeRef.current > 50) {
        lastSoundTimeRef.current = now;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = parseFloat((e.target as HTMLInputElement).value);
    
    setLocalTarget(value);
    setTarget(value);
    
    if (isDraggingRef.current) {
      playSound();
    }
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  React.useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const toggleDirection = () => {
    setDirection(direction === 'under' ? 'over' : 'under');
  };

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };

  const winZoneWidth = direction === 'under' ? localTarget : 100 - localTarget;
  const winZoneLeft = direction === 'under' ? 0 : localTarget;

  return (
    <div className="space-y-4">
      {/* Target Display */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400 text-sm">Target: {localTarget.toFixed(2)}</span>
        <div className="flex gap-2">
          <button
            onClick={toggleSound}
            className="px-3 py-1 bg-[#3a4142] hover:bg-[#2c3330] rounded text-sm transition-colors text-gray-300"
            title={isSoundEnabled ? 'Mute sound' : 'Unmute sound'}
          >
            {isSoundEnabled ? '🔊' : '🔇'}
          </button>
          <button
            onClick={toggleDirection}
            className="px-4 py-1 bg-[#3a4142] hover:bg-[#2c3330] rounded text-sm transition-colors text-gray-300"
          >
            {direction === 'under' ? 'Roll Under' : 'Roll Over'}
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative h-12 rounded-full overflow-hidden shadow-inner">
        {/* Win Zone */}
        <div
          className="absolute top-0 h-full bg-gradient-to-r from-[#22c55e] to-[#16a34a]"
          style={{
            left: `${winZoneLeft}%`,
            width: `${winZoneWidth}%`,
            transition: 'none'
          }}
        />
        
        {/* Lose Zone */}
        <div
          className="absolute top-0 h-full bg-gradient-to-r from-[#f97316] to-[#ea580c]"
          style={{
            left: direction === 'under' ? `${localTarget}%` : '0%',
            width: direction === 'under' ? `${100 - localTarget}%` : `${localTarget}%`,
            transition: 'none'
          }}
        />

        {/* Range Input */}
        <input
          type="range"
          min="1"
          max="99"
          step="0.01"
          value={localTarget}
          onInput={handleInput}
          onChange={handleInput}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          className="absolute top-0 w-full h-full opacity-0 cursor-pointer z-10"
          style={{ margin: 0, padding: 0 }}
        />

        {/* Custom Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-8 h-14 pointer-events-none z-20"
          style={{ 
            left: `calc(${localTarget}% - 16px)`,
            backgroundImage: 'url(/slider-bar-thumb.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
            transition: 'none'
          }}
        />
      </div>

      {/* Scale Markers */}
      <div className="relative text-gray-500 text-sm h-6">
        <span className="absolute" style={{ left: '0%', transform: 'translateX(0%)' }}>0</span>
        <span className="absolute" style={{ left: '25%', transform: 'translateX(-50%)' }}>25</span>
        <span className="absolute" style={{ left: '50%', transform: 'translateX(-50%)' }}>50</span>
        <span className="absolute" style={{ left: '75%', transform: 'translateX(-50%)' }}>75</span>
        <span className="absolute" style={{ left: '100%', transform: 'translateX(-100%)' }}>100</span>
      </div>
    </div>
  );
}

function GameInfo() {
  const { multiplier, target, direction, winChance } = useDiceStore();

  return (
    <div className="grid grid-cols-3 gap-4 p-6 bg-[#292d2e]/80 backdrop-blur-sm rounded-lg border border-[#3a4142]">
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-1">Payout</p>
        <p className="text-white text-xl font-bold">{multiplier.toFixed(4)}×</p>
      </div>
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-1">
          {direction === 'under' ? 'Less' : 'More'}
        </p>
        <p className="text-white text-xl font-bold flex items-center justify-center gap-2">
          {target.toFixed(2)}
          <svg className="w-5 h-5 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 3l7 7h-4v7h-6v-7H3l7-7z" />
          </svg>
        </p>
      </div>
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-1">Win Chance</p>
        <p className="text-white text-xl font-bold">{winChance.toFixed(2)}%</p>
      </div>
    </div>
  );
}
